import { randomUUID } from "crypto";
import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import catalogSeed from "@/data/catalog.json";
import collectionSeed from "@/data/collections.json";
import type { Collection, GarmentType, Product } from "@/lib/types";
import type { StaffCmsState } from "@/lib/staff-types";

const rootDir = process.cwd();
const localCmsDir = path.join(rootDir, ".local-cms");
const statePath = path.join(localCmsDir, "catalog-state.json");
const uploadDir = path.join(rootDir, "public", "staff-uploads");

export const staffUploadPublicBase = "/staff-uploads";

function normalizeProduct(product: Product): Product {
  const images = Array.from(new Set(product.images || []));
  const primaryImage = product.primaryImage && images.includes(product.primaryImage) ? product.primaryImage : images[0] || product.primaryImage || "";

  return {
    ...product,
    description: product.description || "",
    images,
    primaryImage,
    aiGarmentImage: product.aiGarmentImage || primaryImage,
    tryOnOutputs: product.tryOnOutputs || [],
    imageCount: images.length,
    status: product.status || "published",
    saleLabel: product.saleLabel || "",
    discountType: product.discountType || "none",
    discountValue: Number(product.discountValue || 0),
    tags: product.tags || [],
    updatedAt: product.updatedAt || new Date().toISOString(),
  };
}

function collectionCounts(products: Product[], collections: Collection[]) {
  return collections.map((collection) => {
    const visibleProducts = products.filter((product) => product.collection === collection.slug && product.status !== "hidden");
    return {
      ...collection,
      visible: collection.visible ?? true,
      count: visibleProducts.length,
      coverImage: collection.coverImage || visibleProducts[0]?.primaryImage || "",
    };
  });
}

function seedState(): StaffCmsState {
  const products = (catalogSeed as Product[]).map(normalizeProduct);
  const collections = collectionCounts(products, collectionSeed as Collection[]);
  return {
    products,
    collections,
    invoices: [],
    updatedAt: new Date().toISOString(),
  };
}

async function ensureCmsState() {
  await mkdir(localCmsDir, { recursive: true });
  try {
    await readFile(statePath, "utf8");
  } catch {
    await writeState(seedState());
  }
}

export async function readState(): Promise<StaffCmsState> {
  await ensureCmsState();
  const content = await readFile(statePath, "utf8");
  const parsed = JSON.parse(content) as StaffCmsState;
  const products = parsed.products.map(normalizeProduct);
  return {
    products,
    collections: collectionCounts(products, parsed.collections || []),
    invoices: parsed.invoices || [],
    updatedAt: parsed.updatedAt || new Date().toISOString(),
  };
}

export async function writeState(state: StaffCmsState) {
  await mkdir(localCmsDir, { recursive: true });
  const products = state.products.map(normalizeProduct);
  const collections = collectionCounts(products, state.collections);
  const nextState: StaffCmsState = {
    products,
    collections,
    invoices: state.invoices || [],
    updatedAt: new Date().toISOString(),
  };
  const tempPath = `${statePath}.${randomUUID()}.tmp`;
  await writeFile(tempPath, JSON.stringify(nextState, null, 2), "utf8");
  await rename(tempPath, statePath);
  return nextState;
}

export async function publishStateToSource() {
  const state = await readState();
  const dataDir = path.join(rootDir, "src", "data");
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const catalogPath = path.join(dataDir, "catalog.json");
  const collectionsPath = path.join(dataDir, "collections.json");

  await writeFile(path.join(localCmsDir, `catalog.backup.${stamp}.json`), await readFile(catalogPath, "utf8"), "utf8");
  await writeFile(path.join(localCmsDir, `collections.backup.${stamp}.json`), await readFile(collectionsPath, "utf8"), "utf8");
  await writeFile(catalogPath, JSON.stringify(state.products, null, 2), "utf8");
  await writeFile(collectionsPath, JSON.stringify(state.collections, null, 2), "utf8");
  return state;
}

export async function resetStateFromSource() {
  return writeState(seedState());
}

export async function saveUpload(file: File) {
  await mkdir(uploadDir, { recursive: true });
  const extension = path.extname(file.name).toLowerCase() || ".jpg";
  const safeBase = slugify(path.basename(file.name, extension)).slice(0, 60) || "image";
  const filename = `${Date.now()}-${safeBase}${extension}`;
  const destination = path.join(uploadDir, filename);
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(destination, bytes);
  return `${staffUploadPublicBase}/${filename}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

export function newProduct(collection: Collection): Product {
  const id = randomUUID();
  return normalizeProduct({
    id,
    slug: `new-product-${id.slice(0, 8)}`,
    title: "New Bespoke Piece",
    price: "0.00",
    description: "",
    collection: collection.slug,
    collectionName: collection.name,
    images: [],
    primaryImage: "",
    aiGarmentImage: "",
    tryOnOutputs: [],
    sourceFolder: "staff-created",
    garmentType: "upper_body" as GarmentType,
    modelGender: "male",
    imageCount: 0,
    whatsappNote: "I am interested in this bespoke piece. I would like to discuss sizing, fabric, embroidery, and delivery timing.",
    status: "draft",
    saleLabel: "",
    discountType: "none",
    discountValue: 0,
    tags: [],
  });
}
