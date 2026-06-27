import fs from "node:fs";
import path from "node:path";

const appRoot = process.cwd();
const dataPath = path.join(appRoot, "src", "data", "ai-generation-manifest.json");
const publicRoot = path.join(appRoot, "public");

function loadEnvFile(fileName) {
  const envPath = path.join(appRoot, fileName);
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (!process.env[key]) {
      process.env[key] = rest.join("=").replace(/^["']|["']$/g, "");
    }
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const leffaUrl = process.env.LEFFA_API_URL;

const modelRefs = {
  male: [
    path.join(publicRoot, "ai-assets", "model-references", "male-01.jpg"),
    path.join(publicRoot, "ai-assets", "model-references", "male-02.jpg"),
  ],
  female: [
    path.join(publicRoot, "ai-assets", "model-references", "female-01.jpg"),
    path.join(publicRoot, "ai-assets", "model-references", "female-02.jpg"),
  ],
};

function missingModelReferences() {
  return Object.values(modelRefs)
    .flat()
    .filter((file) => !fs.existsSync(file));
}

function outputIndex(output) {
  const match = output.match(/editorial-(\d+)/);
  return match ? Number(match[1]) - 1 : 0;
}

async function fileToBlob(filePath, contentType) {
  const bytes = await fs.promises.readFile(filePath);
  return new Blob([bytes], { type: contentType });
}

async function saveLeffaResult(response, targetPath) {
  const contentType = response.headers.get("content-type") || "";
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });

  if (contentType.includes("application/json")) {
    const data = await response.json();
    const imageUrl = data.imageUrl || data.output || data.result;
    if (!imageUrl) throw new Error(`Leffa JSON response did not include imageUrl/output/result: ${JSON.stringify(data)}`);

    if (imageUrl.startsWith("data:")) {
      const [, encoded] = imageUrl.split(",");
      await fs.promises.writeFile(targetPath, Buffer.from(encoded, "base64"));
      return;
    }

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) throw new Error(`Could not fetch Leffa output ${imageUrl}`);
    await fs.promises.writeFile(targetPath, Buffer.from(await imageResponse.arrayBuffer()));
    return;
  }

  await fs.promises.writeFile(targetPath, Buffer.from(await response.arrayBuffer()));
}

async function runJob(job) {
  const modelIndex = outputIndex(job.output) % 2;
  const modelRef = modelRefs[job.modelGender]?.[modelIndex] || modelRefs.male[modelIndex];
  const garmentPath = path.join(publicRoot, job.sourceImage.replace(/^\//, ""));
  const targetPath = path.join(publicRoot, job.output.replace(/^\//, ""));

  const form = new FormData();
  form.append("personImage", await fileToBlob(modelRef, "image/jpeg"), path.basename(modelRef));
  form.append("garmentImage", await fileToBlob(garmentPath, "image/jpeg"), path.basename(garmentPath));
  form.append("garmentType", job.garmentType);
  form.append("stylePreset", job.stylePreset);
  form.append("seed", String(1000 + outputIndex(job.output)));
  form.append("productSlug", job.productSlug);

  const response = await fetch(leffaUrl, { method: "POST", body: form });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Leffa returned ${response.status}: ${body.slice(0, 500)}`);
  }

  await saveLeffaResult(response, targetPath);
}

async function main() {
  if (!leffaUrl) {
    console.error("LEFFA_API_URL is not set. Start Leffa and set LEFFA_API_URL to its /try-on endpoint.");
    process.exit(2);
  }

  try {
    const healthUrl = new URL(leffaUrl);
    const healthResponse = await fetch(`${healthUrl.origin}/`, { method: "GET" });
    if (healthResponse.status >= 500) {
      throw new Error(`Leffa host returned ${healthResponse.status}`);
    }
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error(`Leffa is not reachable at ${leffaUrl}. Start the service before running the batch. Details: ${detail}`);
    process.exit(4);
  }

  const missing = missingModelReferences();
  if (missing.length) {
    console.error("Missing stock model reference photos:");
    for (const file of missing) console.error(`- ${file}`);
    console.error("Add two male and two female JPG references before running the 276-image batch.");
    process.exit(3);
  }

  const jobs = JSON.parse(await fs.promises.readFile(dataPath, "utf8"));
  let completed = 0;
  let failed = 0;

  for (const job of jobs) {
    if (job.status === "success") continue;
    try {
      job.status = "running";
      job.error = "";
      await fs.promises.writeFile(dataPath, JSON.stringify(jobs, null, 2));
      await runJob(job);
      job.status = "success";
      completed += 1;
      console.log(`[success] ${job.productSlug} -> ${job.output}`);
    } catch (error) {
      job.status = "failed";
      job.error = error instanceof Error ? error.message : String(error);
      failed += 1;
      console.error(`[failed] ${job.productSlug}: ${job.error}`);
    }
    await fs.promises.writeFile(dataPath, JSON.stringify(jobs, null, 2));
  }

  console.log(`Batch complete. success=${completed} failed=${failed}`);
}

main();
