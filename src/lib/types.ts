export type GarmentType = "upper_body" | "lower_body" | "dresses";

export type Product = {
  id: string;
  slug: string;
  title: string;
  price: string;
  description?: string;
  collection: string;
  collectionName: string;
  images: string[];
  primaryImage: string;
  aiGarmentImage: string;
  tryOnOutputs: string[];
  sourceFolder: string;
  garmentType: GarmentType;
  modelGender: "male" | "female";
  imageCount: number;
  whatsappNote: string;
  status?: "published" | "draft" | "hidden";
  saleLabel?: string;
  discountType?: "none" | "percent" | "amount";
  discountValue?: number;
  tags?: string[];
  updatedAt?: string;
};

export type Collection = {
  slug: string;
  name: string;
  summary: string;
  count: number;
  coverImage: string;
  visible?: boolean;
  sortOrder?: number;
};

export type SiteMedia = {
  images: { src: string; bytes: number; contentType: string; originalUrl: string }[];
  videos: { src: string; bytes: number; contentType: string; originalUrl: string }[];
  posters: { src: string; bytes: number; contentType: string; originalUrl: string }[];
};

export type MeasurementGuide = {
  label: string;
  src: string;
  audience: "men" | "women";
};
