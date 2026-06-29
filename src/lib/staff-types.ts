import type { Collection, Product } from "@/lib/types";

export type InvoiceLineItem = {
  id: string;
  productId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  discountType?: "none" | "percent" | "amount";
  discountValue?: number;
};

export type StaffInvoice = {
  id: string;
  number: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  eventDate?: string;
  status: "draft" | "sent" | "paid" | "cancelled";
  notes?: string;
  lineItems: InvoiceLineItem[];
  createdAt: string;
  updatedAt: string;
};

export type StaffCmsState = {
  products: Product[];
  collections: Collection[];
  invoices: StaffInvoice[];
  updatedAt: string;
};
