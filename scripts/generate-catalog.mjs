import fs from "node:fs";
import path from "node:path";

const root = path.resolve("..");
const appRoot = process.cwd();
const productsRoot = path.join(root, "magnateartisan_products");
const mediaRoot = path.join(root, "magnateartisan_site_media");
const publicRoot = path.join(appRoot, "public");
const dataRoot = path.join(appRoot, "src", "data");

const productManifestPath = path.join(productsRoot, "_manifest.json");
const siteMediaManifestPath = path.join(mediaRoot, "_manifest.json");

const collections = [
  {
    slug: "rococo",
    name: "Rococo",
    matcher: /rococo|18th|victorian|baroque|history|historical|carnival/i,
    summary: "Royal historical tailoring, ornate embroidery, capes, waistcoats, and theatre-grade presence.",
  },
  {
    slug: "mariachi",
    name: "Mariachi",
    matcher: /mariachi|charro|mexican/i,
    summary: "Formal charro silhouettes with metallic embroidery, ceremony detailing, and stage-ready structure.",
  },
  {
    slug: "matador",
    name: "Matador",
    matcher: /matador|bullfighter|torero|spanish/i,
    summary: "Spanish bolero jackets, sculpted shoulders, cape details, and dramatic ceremonial craft.",
  },
  {
    slug: "country-western",
    name: "Country Western",
    matcher: /country|western|cowboy|cowgirl|rodeo|cactus|fringe/i,
    summary: "Cowboy tailoring, fringe work, rhinestones, florals, and western wedding statement pieces.",
  },
  {
    slug: "womens-couture",
    name: "Women's Couture",
    matcher: /women|woman|womens|women's|skirt|dress|shorts|cowgirl/i,
    summary: "Bespoke women's jackets, skirt sets, crop silhouettes, and embroidered occasionwear.",
  },
  {
    slug: "wedding-festive",
    name: "Wedding & Festive",
    matcher: /wedding|groom|reception|festive|cocktail|party|evening|formal/i,
    summary: "Ceremony and reception pieces built around measurement, ornament, and arrival.",
  },
  {
    slug: "bespoke-custom",
    name: "Bespoke Custom",
    matcher: /custom|customized|bespoke|designer|hand/i,
    summary: "Made-to-measure commissions shaped around reference images, embroidery ideas, and occasion timing.",
  },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 95);
}

function cleanPrice(value) {
  const match = String(value || "").match(/(?:Price|range):\s*(.+)$/i);
  return match ? match[1].trim() : String(value || "").replace(/^Price:\s*/i, "").trim();
}

function classifyCollection(title) {
  const first = collections.find((collection) => collection.matcher.test(title));
  return first || collections[collections.length - 1];
}

function classifyGarmentType(title) {
  if (/skirt|shorts|trouser|pants|breeches|lower/i.test(title) && !/blazer|jacket|suit|coat/i.test(title)) {
    return "lower_body";
  }
  if (/dress|cape|cloak|3 piece|3-piece|4 piece|4-piece|2 piece|2-piece|suit|outfit|set/i.test(title)) {
    return "dresses";
  }
  return "upper_body";
}

function classifyModelGender(title) {
  if (/women|woman|womens|women's|cowgirl/i.test(title)) return "female";
  return "male";
}

function copyProductAssets(product, productIndex, usedSlugs) {
  const title = product.title;
  let slug = slugify(title) || `product-${productIndex}`;
  if (usedSlugs.has(slug)) slug = `${slug}-${productIndex}`;
  usedSlugs.add(slug);

  const sourceFolder = path.join(root, product.folder);
  const targetFolder = path.join(publicRoot, "catalog", slug);
  const garmentFolder = path.join(publicRoot, "ai-assets", "garments", slug);
  ensureDir(targetFolder);
  ensureDir(garmentFolder);

  const imageFiles = fs
    .readdirSync(sourceFolder)
    .filter((name) => /\.(jpe?g|png|webp)$/i.test(name))
    .sort();

  const images = imageFiles.map((name, index) => {
    const ext = path.extname(name).toLowerCase();
    const outName = `image-${String(index + 1).padStart(2, "0")}${ext}`;
    fs.copyFileSync(path.join(sourceFolder, name), path.join(targetFolder, outName));
    return `/catalog/${slug}/${outName}`;
  });

  const aiGarmentImage = images[0] || "";
  if (imageFiles[0]) {
    const ext = path.extname(imageFiles[0]).toLowerCase();
    fs.copyFileSync(path.join(sourceFolder, imageFiles[0]), path.join(garmentFolder, `garment${ext}`));
  }

  const collection = classifyCollection(title);
  return {
    id: product.handle || slug,
    slug,
    title,
    price: cleanPrice(product.price),
    collection: collection.slug,
    collectionName: collection.name,
    images,
    primaryImage: images[0] || "",
    aiGarmentImage,
    tryOnOutputs: [
      `/catalog/${slug}/ai_model_outputs/editorial-01.png`,
      `/catalog/${slug}/ai_model_outputs/editorial-02.png`,
    ],
    sourceFolder: product.folder,
    garmentType: classifyGarmentType(title),
    modelGender: classifyModelGender(title),
    imageCount: images.length,
    whatsappNote: `I am interested in ${title}. I would like to discuss bespoke sizing, fabric, embroidery, and delivery timing.`,
  };
}

function copySiteMedia() {
  if (!fs.existsSync(siteMediaManifestPath)) return { images: [], videos: [], posters: [] };

  const targetBase = path.join(publicRoot, "site-media");
  ensureDir(targetBase);
  const manifest = JSON.parse(fs.readFileSync(siteMediaManifestPath, "utf8"));
  const result = { images: [], videos: [], posters: [] };

  for (const item of manifest) {
    const source = path.join(root, item.file);
    if (!fs.existsSync(source)) continue;
    const category = item.category === "videos" ? "videos" : item.category === "video_posters" ? "posters" : "images";
    const targetDir = path.join(targetBase, category);
    ensureDir(targetDir);
    const fileName = path.basename(item.file);
    fs.copyFileSync(source, path.join(targetDir, fileName));
    result[category].push({
      src: `/site-media/${category}/${fileName}`,
      bytes: item.bytes,
      contentType: item.content_type,
      originalUrl: item.url,
    });
  }

  return result;
}

function main() {
  ensureDir(path.join(publicRoot, "catalog"));
  ensureDir(path.join(publicRoot, "ai-assets", "garments"));
  ensureDir(dataRoot);

  const rawProducts = JSON.parse(fs.readFileSync(productManifestPath, "utf8"));
  const usedSlugs = new Set();
  const products = rawProducts.map((product, index) => copyProductAssets(product, index + 1, usedSlugs));

  const siteMedia = copySiteMedia();
  const collectionRows = collections.map((collection) => {
    const collectionProducts = products.filter((product) => product.collection === collection.slug);
    return {
      slug: collection.slug,
      name: collection.name,
      summary: collection.summary,
      count: collectionProducts.length,
      coverImage: collectionProducts[0]?.primaryImage || products[0]?.primaryImage || "",
    };
  });

  const aiJobs = products.flatMap((product) =>
    [1, 2].map((variant) => ({
      productSlug: product.slug,
      productTitle: product.title,
      sourceImage: product.aiGarmentImage,
      garmentType: product.garmentType,
      modelGender: product.modelGender,
      stylePreset: "luxury_editorial",
      output: `/catalog/${product.slug}/ai_model_outputs/editorial-${String(variant).padStart(2, "0")}.png`,
      status: "pending",
      error: "",
    })),
  );

  fs.writeFileSync(path.join(dataRoot, "catalog.json"), JSON.stringify(products, null, 2));
  fs.writeFileSync(path.join(dataRoot, "collections.json"), JSON.stringify(collectionRows, null, 2));
  fs.writeFileSync(path.join(dataRoot, "site-media.json"), JSON.stringify(siteMedia, null, 2));
  fs.writeFileSync(path.join(dataRoot, "ai-generation-manifest.json"), JSON.stringify(aiJobs, null, 2));

  console.log(`Generated ${products.length} products, ${collectionRows.length} collections, ${aiJobs.length} AI jobs.`);
  console.log(`Copied ${siteMedia.images.length} images, ${siteMedia.videos.length} videos, ${siteMedia.posters.length} posters.`);
}

main();
