"use client";

import Image from "next/image";
import {
  Boxes,
  ChevronDown,
  Download,
  FileText,
  ImagePlus,
  Loader2,
  LogOut,
  PackagePlus,
  Save,
  Search,
  Settings2,
  Star,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Collection, GarmentType, Product } from "@/lib/types";
import type { InvoiceLineItem, StaffCmsState, StaffInvoice } from "@/lib/staff-types";
import { cn, discountedPrice, formatMoney, hasDiscount } from "@/lib/utils";

type TabKey = "products" | "categories" | "invoices" | "publish";

const garmentTypes: GarmentType[] = ["upper_body", "lower_body", "dresses"];
const invoiceStatuses: StaffInvoice["status"][] = ["draft", "sent", "paid", "cancelled"];
const invoiceLogoPath = "/site-media/images/Magnate_Artisians_Logo_Black_430x_cad215cc-035c-4730-9d6d-aef01ef840af_ff89df955d.png";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function nowIso() {
  return new Date().toISOString();
}

function newInvoiceNumber(count: number) {
  return `MA-${String(count + 1).padStart(4, "0")}`;
}

function lineSubtotal(item: InvoiceLineItem) {
  return Math.max(0, Number(item.quantity || 0) * Number(item.unitPrice || 0));
}

function lineDiscountAmount(item: InvoiceLineItem) {
  const subtotal = lineSubtotal(item);
  const discountType = item.discountType || (item.discount ? "amount" : "none");
  const discountValue = Number(item.discountValue ?? item.discount ?? 0);
  if (discountType === "percent") return Math.min(subtotal, subtotal * (Math.max(0, discountValue) / 100));
  if (discountType === "amount") return Math.min(subtotal, Math.max(0, discountValue));
  return 0;
}

function lineTotal(item: InvoiceLineItem) {
  return Math.max(0, lineSubtotal(item) - lineDiscountAmount(item));
}

function invoiceTotal(invoice: StaffInvoice) {
  return invoice.lineItems.reduce((total, item) => total + lineTotal(item), 0);
}

function invoiceSubtotal(invoice: StaffInvoice) {
  return invoice.lineItems.reduce((total, item) => total + lineSubtotal(item), 0);
}

function invoiceDiscountTotal(invoice: StaffInvoice) {
  return invoice.lineItems.reduce((total, item) => total + lineDiscountAmount(item), 0);
}

function invoiceDateLabel(value?: string) {
  if (!value) return new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });
  return new Date(value).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });
}

async function imageToDataUrl(src: string) {
  const response = await fetch(src);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function exportInvoicePdf(invoice: StaffInvoice) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ format: "a4", unit: "pt" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const gold = "#9b793e";
  const ink = "#16110c";
  const muted = "#6f6252";
  let y = 46;

  doc.setFillColor("#fffaf1");
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  doc.setDrawColor(gold);
  doc.setLineWidth(1.2);
  doc.line(margin, y, pageWidth - margin, y);

  try {
    const logo = await imageToDataUrl(invoiceLogoPath);
    doc.addImage(logo, "PNG", margin, y + 20, 58, 58);
  } catch {
    doc.setDrawColor(gold);
    doc.rect(margin, y + 20, 58, 58);
  }

  doc.setFont("times", "normal");
  doc.setTextColor(ink);
  doc.setFontSize(28);
  doc.text("Magnate Artisan", margin + 76, y + 45);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(gold);
  doc.text("BESPOKE ATELIER", margin + 78, y + 63, { charSpace: 2.2 });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(gold);
  doc.text("INVOICE", pageWidth - margin, y + 28, { align: "right", charSpace: 2.4 });
  doc.setFont("helvetica", "normal");
  doc.setTextColor(muted);
  doc.setFontSize(10);
  doc.text(invoice.number, pageWidth - margin, y + 48, { align: "right" });
  doc.text(`Date: ${invoiceDateLabel(invoice.createdAt)}`, pageWidth - margin, y + 64, { align: "right" });
  doc.text(`Status: ${invoice.status.toUpperCase()}`, pageWidth - margin, y + 80, { align: "right" });

  y += 112;
  doc.setDrawColor("#d6c49d");
  doc.line(margin, y, pageWidth - margin, y);
  y += 28;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(gold);
  doc.text("PREPARED FOR", margin, y, { charSpace: 1.8 });
  doc.text("COMMISSION DETAILS", pageWidth / 2 + 10, y, { charSpace: 1.8 });

  y += 19;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(ink);
  doc.setFontSize(12);
  doc.text(invoice.clientName || "New Client", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(muted);
  doc.setFontSize(10);
  doc.text(invoice.clientEmail || "Email to be confirmed", margin, y + 17);
  doc.text(invoice.clientPhone || "Phone to be confirmed", margin, y + 34);
  doc.text(doc.splitTextToSize("Bespoke consultation, fabric direction, embroidery detailing, fittings, and delivery coordination.", 220), pageWidth / 2 + 10, y);

  y += 78;
  doc.setDrawColor(gold);
  doc.line(margin, y, pageWidth - margin, y);
  y += 22;

  const columns = [
    { label: "ITEM", x: margin },
    { label: "QTY", x: pageWidth - 244 },
    { label: "UNIT", x: pageWidth - 192 },
    { label: "DISCOUNT", x: pageWidth - 124 },
    { label: "TOTAL", x: pageWidth - margin },
  ];
  doc.setFont("helvetica", "bold");
  doc.setTextColor(gold);
  doc.setFontSize(8);
  columns.forEach((column) => doc.text(column.label, column.x, y, { align: column.label === "ITEM" ? "left" : "right", charSpace: 1.2 }));
  y += 18;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(ink);
  doc.setFontSize(10);
  invoice.lineItems.forEach((item, index) => {
    if (y > pageHeight - 150) {
      doc.addPage();
      doc.setFillColor("#fffaf1");
      doc.rect(0, 0, pageWidth, pageHeight, "F");
      y = 54;
    }
    const description = doc.splitTextToSize(`${String(index + 1).padStart(2, "0")}  ${item.description}`, 250);
    doc.text(description, margin, y);
    doc.text(String(item.quantity || 0), pageWidth - 244, y, { align: "right" });
    doc.text(formatMoney(item.unitPrice), pageWidth - 192, y, { align: "right" });
    doc.text(lineDiscountAmount(item) ? formatMoney(lineDiscountAmount(item)) : "-", pageWidth - 124, y, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.text(formatMoney(lineTotal(item)), pageWidth - margin, y, { align: "right" });
    doc.setFont("helvetica", "normal");
    y += Math.max(34, description.length * 13 + 14);
    doc.setDrawColor("#eadfc6");
    doc.line(margin, y - 12, pageWidth - margin, y - 12);
  });

  y += 18;
  const totalsX = pageWidth - 226;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(muted);
  doc.text("Subtotal", totalsX, y);
  doc.text(formatMoney(invoiceSubtotal(invoice)), pageWidth - margin, y, { align: "right" });
  y += 18;
  doc.text("Discount", totalsX, y);
  doc.text(formatMoney(invoiceDiscountTotal(invoice)), pageWidth - margin, y, { align: "right" });
  y += 24;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(ink);
  doc.text("Total", totalsX, y);
  doc.text(formatMoney(invoiceTotal(invoice)), pageWidth - margin, y, { align: "right" });

  if (invoice.notes) {
    y += 42;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(gold);
    doc.text("NOTES", margin, y, { charSpace: 1.8 });
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(muted);
    doc.setFontSize(10);
    doc.text(doc.splitTextToSize(invoice.notes, pageWidth - margin * 2), margin, y);
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor("#827363");
  doc.text("Magnate Artisan Bespoke Atelier - Quote subject to final measurements, fabric choice, and handwork confirmation.", pageWidth / 2, pageHeight - 36, { align: "center" });
  doc.save(`${invoice.number}-magnate-artisan.pdf`);
}

function createBlankInvoice(count: number): StaffInvoice {
  const timestamp = nowIso();
  return {
    id: crypto.randomUUID(),
    number: newInvoiceNumber(count),
    clientName: "New Client",
    clientEmail: "",
    clientPhone: "",
    eventDate: "",
    status: "draft",
    notes: "",
    lineItems: [
      {
        id: crypto.randomUUID(),
        description: "Bespoke garment commission",
        quantity: 1,
        unitPrice: 0,
        discountType: "none",
        discountValue: 0,
      },
    ],
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

function createBlankProduct(collection: Collection): Product {
  const id = crypto.randomUUID();
  const slug = `new-product-${id.slice(0, 8)}`;
  return {
    id,
    slug,
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
    garmentType: "upper_body",
    modelGender: "male",
    imageCount: 0,
    whatsappNote: "I am interested in this bespoke piece. I would like to discuss sizing, fabric, embroidery, and delivery timing.",
    status: "draft",
    saleLabel: "",
    discountType: "none",
    discountValue: 0,
    tags: [],
    updatedAt: nowIso(),
  };
}

function statLabel(value: number, label: string) {
  return `${new Intl.NumberFormat("en-US").format(value)} ${label}`;
}

export function StaffDashboard() {
  const [state, setState] = useState<StaffCmsState | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("products");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [query, setQuery] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetch("/api/staff/cms")
      .then((response) => {
        if (!response.ok) throw new Error("Staff session expired.");
        return response.json();
      })
      .then((data: StaffCmsState) => {
        setState(data);
        setSelectedProductId(data.products[0]?.id || "");
        setSelectedInvoiceId(data.invoices[0]?.id || "");
      })
      .catch((error: Error) => setMessage(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  const selectedProduct = state?.products.find((product) => product.id === selectedProductId);
  const selectedInvoice = state?.invoices.find((invoice) => invoice.id === selectedInvoiceId);
  const visibleProducts = state?.products.filter((product) => product.status !== "hidden") || [];
  const filteredProducts = useMemo(() => {
    if (!state) return [];
    const needle = query.trim().toLowerCase();
    return state.products.filter((product) => {
      const matchesQuery = !needle || `${product.title} ${product.collectionName} ${product.price}`.toLowerCase().includes(needle);
      const matchesCollection = collectionFilter === "all" || product.collection === collectionFilter;
      return matchesQuery && matchesCollection;
    });
  }, [collectionFilter, query, state]);

  function updateState(nextState: StaffCmsState) {
    setState({
      ...nextState,
      updatedAt: nowIso(),
    });
  }

  function updateProduct(productId: string, patch: Partial<Product>) {
    if (!state) return;
    const products = state.products.map((product) => {
      if (product.id !== productId) return product;
      const next = { ...product, ...patch, updatedAt: nowIso() };
      const collection = state.collections.find((item) => item.slug === next.collection);
      if (collection) next.collectionName = collection.name;
      next.images = Array.from(new Set(next.images || []));
      next.primaryImage = next.primaryImage || next.images[0] || "";
      next.aiGarmentImage = next.aiGarmentImage || next.primaryImage;
      next.imageCount = next.images.length;
      return next;
    });
    updateState({ ...state, products });
  }

  function addProduct() {
    if (!state) return;
    const collection = state.collections[0];
    if (!collection) return;
    const product = createBlankProduct(collection);
    updateState({ ...state, products: [product, ...state.products] });
    setSelectedProductId(product.id);
  }

  function duplicateProduct() {
    if (!state || !selectedProduct) return;
    const copy: Product = {
      ...selectedProduct,
      id: crypto.randomUUID(),
      slug: `${selectedProduct.slug}-copy-${Date.now().toString().slice(-4)}`,
      title: `${selectedProduct.title} Copy`,
      status: "draft",
      updatedAt: nowIso(),
    };
    updateState({ ...state, products: [copy, ...state.products] });
    setSelectedProductId(copy.id);
  }

  function deleteProduct() {
    if (!state || !selectedProduct) return;
    const products = state.products.filter((product) => product.id !== selectedProduct.id);
    updateState({ ...state, products });
    setSelectedProductId(products[0]?.id || "");
  }

  function updateCollection(slug: string, patch: Partial<Collection>) {
    if (!state) return;
    const collections = state.collections.map((collection) => (collection.slug === slug ? { ...collection, ...patch } : collection));
    const products = state.products.map((product) => {
      const collection = collections.find((item) => item.slug === product.collection);
      return collection ? { ...product, collectionName: collection.name } : product;
    });
    updateState({ ...state, collections, products });
  }

  function addCollection() {
    if (!state) return;
    const slug = `new-collection-${state.collections.length + 1}`;
    updateState({
      ...state,
      collections: [
        ...state.collections,
        {
          slug,
          name: "New Collection",
          summary: "Describe the collection direction.",
          count: 0,
          coverImage: "",
          visible: true,
          sortOrder: state.collections.length + 1,
        },
      ],
    });
  }

  function deleteCollection(slug: string) {
    if (!state) return;
    const fallback = state.collections.find((collection) => collection.slug !== slug);
    if (!fallback) return;
    const collections = state.collections.filter((collection) => collection.slug !== slug);
    const products = state.products.map((product) =>
      product.collection === slug ? { ...product, collection: fallback.slug, collectionName: fallback.name } : product,
    );
    updateState({ ...state, collections, products });
  }

  async function uploadImages(files: FileList | null) {
    if (!selectedProduct || !files?.length) return;
    setIsUploading(true);
    const form = new FormData();
    Array.from(files).forEach((file) => form.append("files", file));
    const response = await fetch("/api/staff/upload", { method: "POST", body: form });
    const data = (await response.json()) as { uploaded?: string[]; error?: string };
    setIsUploading(false);

    if (!response.ok || !data.uploaded?.length) {
      setMessage(data.error || "Upload failed.");
      return;
    }

    const images = [...selectedProduct.images, ...data.uploaded];
    updateProduct(selectedProduct.id, {
      images,
      primaryImage: selectedProduct.primaryImage || data.uploaded[0],
    });
    setMessage(`${data.uploaded.length} image${data.uploaded.length === 1 ? "" : "s"} uploaded.`);
  }

  function removeImage(image: string) {
    if (!selectedProduct) return;
    const images = selectedProduct.images.filter((item) => item !== image);
    updateProduct(selectedProduct.id, {
      images,
      primaryImage: selectedProduct.primaryImage === image ? images[0] || "" : selectedProduct.primaryImage,
    });
  }

  function updateInvoice(invoiceId: string, patch: Partial<StaffInvoice>) {
    if (!state) return;
    const invoices = state.invoices.map((invoice) =>
      invoice.id === invoiceId ? { ...invoice, ...patch, updatedAt: nowIso() } : invoice,
    );
    updateState({ ...state, invoices });
  }

  function addInvoice() {
    if (!state) return;
    const invoice = createBlankInvoice(state.invoices.length);
    updateState({ ...state, invoices: [invoice, ...state.invoices] });
    setSelectedInvoiceId(invoice.id);
  }

  function deleteInvoice(invoiceId: string) {
    if (!state) return;
    const invoices = state.invoices.filter((invoice) => invoice.id !== invoiceId);
    updateState({ ...state, invoices });
    setSelectedInvoiceId(invoices[0]?.id || "");
  }

  function updateLineItem(lineId: string, patch: Partial<InvoiceLineItem>) {
    if (!selectedInvoice) return;
    updateInvoice(selectedInvoice.id, {
      lineItems: selectedInvoice.lineItems.map((item) => (item.id === lineId ? { ...item, ...patch } : item)),
    });
  }

  function addLineItemFromProduct(product: Product) {
    if (!selectedInvoice) return;
    updateInvoice(selectedInvoice.id, {
      lineItems: [
        ...selectedInvoice.lineItems,
        {
          id: crypto.randomUUID(),
          productId: product.id,
          description: product.title,
          quantity: 1,
          unitPrice: discountedPrice(product.price, product.discountType, product.discountValue),
          discountType: "none",
          discountValue: 0,
        },
      ],
    });
  }

  function removeLineItem(lineId: string) {
    if (!selectedInvoice) return;
    updateInvoice(selectedInvoice.id, {
      lineItems: selectedInvoice.lineItems.filter((item) => item.id !== lineId),
    });
  }

  async function saveState(endpoint = "/api/staff/cms", method = "PUT") {
    if (!state) return;
    setIsSaving(true);
    setMessage("");
    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: method === "PUT" ? JSON.stringify(state) : undefined,
    });
    const data = (await response.json()) as StaffCmsState | { error?: string };
    setIsSaving(false);
    if (!response.ok) {
      setMessage("error" in data ? data.error || "Save failed." : "Save failed.");
      return;
    }
    setState(data as StaffCmsState);
    setMessage(endpoint.includes("publish") ? "Published into source catalog JSON for the local storefront." : "Saved local CMS changes.");
  }

  async function logout() {
    await fetch("/api/staff/logout", { method: "POST" });
    window.location.href = "/staff/login";
  }

  async function resetLocalState() {
    setIsSaving(true);
    const response = await fetch("/api/staff/reset", { method: "POST" });
    const data = (await response.json()) as StaffCmsState;
    setIsSaving(false);
    setState(data);
    setSelectedProductId(data.products[0]?.id || "");
    setMessage("Local CMS reset from source catalog.");
  }

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center text-[#fff4df]">
        <div className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em]">
          <Loader2 className="animate-spin text-[#e4c982]" size={18} />
          Loading staff atelier
        </div>
      </main>
    );
  }

  if (!state) {
    return (
      <main className="grid min-h-screen place-items-center px-4 text-center text-[#fff4df]">
        <div>
          <h1 className="display text-5xl">Staff dashboard unavailable.</h1>
          <p className="mt-3 text-[#b7aa99]">{message || "Please log in again."}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070604] text-[#fff4df]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-[#b99858]/16 bg-[#090705]/96 p-5 lg:block">
        <div>
          <p className="display text-3xl">Magnate Artisan</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.36em] text-[#b99858]">Staff Atelier</p>
        </div>
        <nav className="mt-10 grid gap-2">
          {[
            { key: "products" as TabKey, label: "Products", icon: Boxes },
            { key: "categories" as TabKey, label: "Categories", icon: Settings2 },
            { key: "invoices" as TabKey, label: "Invoices", icon: FileText },
            { key: "publish" as TabKey, label: "Publish", icon: UploadCloud },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveTab(item.key)}
              className={cn(
                "flex min-h-12 items-center gap-3 border px-4 text-left text-sm uppercase tracking-[0.14em] transition",
                activeTab === item.key
                  ? "border-[#b99858]/55 bg-[#b99858]/12 text-[#e4c982]"
                  : "border-transparent text-[#b7aa99] hover:border-[#b99858]/25 hover:text-[#fff4df]",
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={logout}
          className="absolute bottom-5 left-5 right-5 flex min-h-12 items-center justify-center gap-2 border border-[#b99858]/25 text-sm uppercase tracking-[0.16em] text-[#d7cbbb] transition hover:border-[#e4c982] hover:text-[#fff4df]"
        >
          <LogOut size={17} />
          Logout
        </button>
      </aside>

      <section className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-[#b99858]/16 bg-[#070604]/88 px-4 py-4 backdrop-blur md:px-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#e4c982]">Local CMS Prototype</p>
              <h1 className="display mt-1 text-4xl text-[#fff4df] md:text-5xl">Staff control room</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => saveState()}
                disabled={isSaving}
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#b99858] px-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#080604] transition hover:bg-[#e4c982] disabled:opacity-60"
              >
                {isSaving ? <Loader2 className="animate-spin" size={17} /> : <Save size={17} />}
                Save Local
              </button>
              <button
                type="button"
                onClick={() => saveState("/api/staff/publish", "POST")}
                disabled={isSaving}
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#5b1625] px-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#fff4df] transition hover:bg-[#731e31] disabled:opacity-60"
              >
                <UploadCloud size={17} />
                Publish JSON
              </button>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              statLabel(state.products.length, "products"),
              statLabel(visibleProducts.length, "visible"),
              statLabel(state.collections.length, "categories"),
              statLabel(state.invoices.length, "invoices"),
            ].map((stat) => (
              <div key={stat} className="border border-[#b99858]/16 bg-white/[0.025] px-4 py-3 text-sm uppercase tracking-[0.14em] text-[#d7cbbb]">
                {stat}
              </div>
            ))}
          </div>
          {message ? <p className="mt-4 border border-[#b99858]/22 bg-[#17120e] px-4 py-3 text-sm text-[#d7cbbb]">{message}</p> : null}
        </header>

        <div className="grid gap-4 border-b border-[#b99858]/16 px-4 py-4 md:px-8 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {(["products", "categories", "invoices", "publish"] as TabKey[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "min-h-11 border px-3 text-xs uppercase tracking-[0.14em]",
                  activeTab === tab ? "border-[#e4c982] text-[#e4c982]" : "border-[#b99858]/18 text-[#b7aa99]",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 md:p-8">
          {activeTab === "products" ? (
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">
              <section className="luxury-panel p-5">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8f8271]" size={17} />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search products"
                      className="min-h-12 w-full border border-[#b99858]/20 bg-black/35 pl-10 pr-3 text-sm text-[#fff4df] outline-none focus:border-[#e4c982]"
                    />
                  </label>
                  <select
                    value={collectionFilter}
                    onChange={(event) => setCollectionFilter(event.target.value)}
                    className="min-h-12 border border-[#b99858]/20 bg-black/35 px-3 text-sm text-[#fff4df] outline-none focus:border-[#e4c982]"
                  >
                    <option value="all">All categories</option>
                    {state.collections.map((collection) => (
                      <option key={collection.slug} value={collection.slug}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={addProduct} className="inline-flex min-h-10 items-center gap-2 bg-[#b99858] px-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#080604]">
                    <PackagePlus size={16} /> Add
                  </button>
                  <button type="button" onClick={duplicateProduct} className="min-h-10 border border-[#b99858]/25 px-3 text-xs uppercase tracking-[0.14em] text-[#d7cbbb]">
                    Duplicate
                  </button>
                  <button type="button" onClick={deleteProduct} className="inline-flex min-h-10 items-center gap-2 border border-[#7b1d31]/50 px-3 text-xs uppercase tracking-[0.14em] text-[#ffc0ca]">
                    <Trash2 size={15} /> Delete
                  </button>
                </div>
                <div className="mt-5 max-h-[720px] overflow-y-auto pr-1">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setSelectedProductId(product.id)}
                      className={cn(
                        "grid w-full grid-cols-[64px_1fr] gap-3 border-b border-[#b99858]/12 py-3 text-left transition hover:bg-white/[0.03]",
                        selectedProductId === product.id && "bg-[#b99858]/10",
                      )}
                    >
                      <div className="relative aspect-square overflow-hidden bg-[#17120e]">
                        {product.primaryImage ? <Image src={product.primaryImage} alt="" fill sizes="64px" className="object-cover" unoptimized /> : null}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#fff4df]">{product.title}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#e4c982]">{product.collectionName}</p>
                        <p className="mt-1 text-xs text-[#8f8271]">
                          {formatMoney(product.price)} · {product.status || "published"} · {product.imageCount} images
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {selectedProduct ? (
                <ProductEditor
                  product={selectedProduct}
                  collections={state.collections}
                  updateProduct={updateProduct}
                  uploadImages={uploadImages}
                  removeImage={removeImage}
                  isUploading={isUploading}
                />
              ) : null}
            </div>
          ) : null}

          {activeTab === "categories" ? (
            <CategoriesEditor state={state} updateCollection={updateCollection} addCollection={addCollection} deleteCollection={deleteCollection} />
          ) : null}

          {activeTab === "invoices" ? (
            <InvoicesEditor
              invoices={state.invoices}
              products={state.products}
              selectedInvoice={selectedInvoice}
              setSelectedInvoiceId={setSelectedInvoiceId}
              addInvoice={addInvoice}
              deleteInvoice={deleteInvoice}
              updateInvoice={updateInvoice}
              addLineItemFromProduct={addLineItemFromProduct}
              updateLineItem={updateLineItem}
              removeLineItem={removeLineItem}
            />
          ) : null}

          {activeTab === "publish" ? (
            <section className="grid gap-6 xl:grid-cols-2">
              <div className="luxury-panel p-6">
                <UploadCloud className="text-[#e4c982]" size={30} />
                <h2 className="display mt-5 text-5xl text-[#fff4df]">Publish local edits.</h2>
                <p className="mt-4 leading-8 text-[#b7aa99]">
                  Save keeps edits in the local prototype CMS. Publish writes those edits back into `src/data/catalog.json` and `src/data/collections.json` so the current storefront can use them during local demos and commits.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => saveState()}
                    disabled={isSaving}
                    className="inline-flex min-h-12 items-center gap-2 bg-[#b99858] px-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#080604]"
                  >
                    <Save size={17} /> Save Local CMS
                  </button>
                  <button
                    type="button"
                    onClick={() => saveState("/api/staff/publish", "POST")}
                    disabled={isSaving}
                    className="inline-flex min-h-12 items-center gap-2 bg-[#5b1625] px-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#fff4df]"
                  >
                    <UploadCloud size={17} /> Publish Storefront JSON
                  </button>
                </div>
              </div>
              <div className="border border-[#b99858]/22 bg-[#17120e]/50 p-6">
                <h3 className="display text-4xl text-[#fff4df]">Prototype notes</h3>
                <div className="mt-5 grid gap-4 text-sm leading-7 text-[#b7aa99]">
                  <p>This free version is local file-backed. It is excellent for presentation, screenshots, and workflow demos.</p>
                  <p>On Vercel production, filesystem writes are not permanent. For real staff usage, move the same data shape to Supabase Auth, Postgres, and Storage.</p>
                  <p>Uploaded images are saved to `public/staff-uploads` locally. Keep or commit only the uploads you actually want in the prototype.</p>
                </div>
                <button
                  type="button"
                  onClick={resetLocalState}
                  disabled={isSaving}
                  className="mt-7 border border-[#7b1d31]/50 px-5 py-3 text-sm uppercase tracking-[0.16em] text-[#ffc0ca]"
                >
                  Reset local CMS from source catalog
                </button>
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  );
}

function ProductEditor({
  product,
  collections,
  updateProduct,
  uploadImages,
  removeImage,
  isUploading,
}: {
  product: Product;
  collections: Collection[];
  updateProduct: (productId: string, patch: Partial<Product>) => void;
  uploadImages: (files: FileList | null) => void;
  removeImage: (image: string) => void;
  isUploading: boolean;
}) {
  const isDiscounted = hasDiscount(product.discountType, product.discountValue);
  const salePrice = discountedPrice(product.price, product.discountType, product.discountValue);

  return (
    <section className="luxury-panel p-5">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#e4c982]">Product Editor</p>
          <h2 className="display mt-2 text-4xl leading-none text-[#fff4df]">{product.title}</h2>
        </div>
        <div className="border border-[#b99858]/20 px-4 py-3 text-sm text-[#d7cbbb]">
          {isDiscounted ? (
            <>
              <span className="text-[#e4c982]">{formatMoney(salePrice)}</span>{" "}
              <span className="line-through opacity-60">{formatMoney(product.price)}</span>
            </>
          ) : (
            <>Starting {formatMoney(product.price)}</>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Field label="Title">
          <input value={product.title} onChange={(event) => updateProduct(product.id, { title: event.target.value })} className="staff-input" />
        </Field>
        <Field label="Slug">
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <input value={product.slug} onChange={(event) => updateProduct(product.id, { slug: event.target.value })} className="staff-input" />
            <button type="button" onClick={() => updateProduct(product.id, { slug: slugify(product.title) })} className="border border-[#b99858]/25 px-3 text-xs uppercase tracking-[0.12em] text-[#d7cbbb]">
              Generate
            </button>
          </div>
        </Field>
        <Field label="Category">
          <select value={product.collection} onChange={(event) => updateProduct(product.id, { collection: event.target.value })} className="staff-input">
            {collections.map((collection) => (
              <option key={collection.slug} value={collection.slug}>
                {collection.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status">
          <select value={product.status || "published"} onChange={(event) => updateProduct(product.id, { status: event.target.value as Product["status"] })} className="staff-input">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="hidden">Hidden</option>
          </select>
        </Field>
        <Field label="Price">
          <input value={product.price} onChange={(event) => updateProduct(product.id, { price: event.target.value })} className="staff-input" />
        </Field>
        <Field label="Sale Label">
          <input value={product.saleLabel || ""} onChange={(event) => updateProduct(product.id, { saleLabel: event.target.value })} placeholder="Private Sale, Festive Offer..." className="staff-input" />
        </Field>
        <Field label="Discount Type">
          <select value={product.discountType || "none"} onChange={(event) => updateProduct(product.id, { discountType: event.target.value as Product["discountType"] })} className="staff-input">
            <option value="none">No discount</option>
            <option value="percent">Percentage</option>
            <option value="amount">Fixed amount</option>
          </select>
        </Field>
        <Field label="Discount Value">
          <input type="number" value={product.discountValue || 0} onChange={(event) => updateProduct(product.id, { discountValue: Number(event.target.value) })} className="staff-input" />
        </Field>
        <Field label="Garment Type">
          <select value={product.garmentType} onChange={(event) => updateProduct(product.id, { garmentType: event.target.value as GarmentType })} className="staff-input">
            {garmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Model Gender">
          <select value={product.modelGender} onChange={(event) => updateProduct(product.id, { modelGender: event.target.value as Product["modelGender"] })} className="staff-input">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Field>
      </div>

      <Field label="Description" className="mt-4">
        <textarea value={product.description || ""} onChange={(event) => updateProduct(product.id, { description: event.target.value })} className="staff-input min-h-28 py-3" />
      </Field>
      <Field label="WhatsApp Note" className="mt-4">
        <textarea value={product.whatsappNote} onChange={(event) => updateProduct(product.id, { whatsappNote: event.target.value })} className="staff-input min-h-24 py-3" />
      </Field>

      <div className="mt-7 border border-[#b99858]/16 p-4">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#e4c982]">Images & Cover</p>
            <p className="mt-2 text-sm text-[#b7aa99]">Upload, delete, and set product cover photos.</p>
          </div>
          <label className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 bg-[#b99858] px-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#080604]">
            {isUploading ? <Loader2 className="animate-spin" size={17} /> : <ImagePlus size={17} />}
            Add Images
            <input type="file" multiple accept="image/*" onChange={(event) => uploadImages(event.target.files)} className="hidden" />
          </label>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {product.images.map((image) => (
            <article key={image} className="border border-[#b99858]/18 bg-black/25 p-3">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#17120e]">
                <Image src={image} alt="" fill sizes="240px" className="object-cover" unoptimized />
                {product.primaryImage === image ? (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 bg-[#b99858] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#080604]">
                    <Star size={12} /> Cover
                  </span>
                ) : null}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => updateProduct(product.id, { primaryImage: image })} className="min-h-9 border border-[#b99858]/25 text-xs uppercase tracking-[0.12em] text-[#d7cbbb]">
                  Set Cover
                </button>
                <button type="button" onClick={() => removeImage(image)} className="min-h-9 border border-[#7b1d31]/50 text-xs uppercase tracking-[0.12em] text-[#ffc0ca]">
                  Delete
                </button>
              </div>
            </article>
          ))}
          {!product.images.length ? <p className="border border-dashed border-[#b99858]/22 p-6 text-sm text-[#8f8271]">No images yet. Upload product photography to make this product presentable.</p> : null}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn("grid gap-2 text-xs uppercase tracking-[0.17em] text-[#e4c982]", className)}>
      {label}
      {children}
    </label>
  );
}

function ProductInvoiceCombobox({ products, onSelect }: { products: Product[]; onSelect: (product: Product) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filteredProducts = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return products
      .filter((product) => {
        if (product.status === "hidden") return false;
        if (!needle) return true;
        return `${product.title} ${product.collectionName} ${product.price}`.toLowerCase().includes(needle);
      })
      .slice(0, 12);
  }, [products, search]);

  function chooseProduct(product: Product) {
    onSelect(product);
    setSearch("");
    setIsOpen(false);
  }

  return (
    <div className="relative w-full md:max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8f8271]" size={16} />
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search and add product..."
          className="staff-input pr-10 pl-10"
        />
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle product list"
          className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center text-[#e4c982] transition hover:bg-[#b99858]/10"
        >
          <ChevronDown size={17} className={cn("transition", isOpen && "rotate-180")} />
        </button>
      </div>

      {isOpen ? (
        <div className="absolute right-0 top-[calc(100%+8px)] z-40 max-h-96 w-full overflow-y-auto border border-[#b99858]/28 bg-[#090705] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => chooseProduct(product)}
              className="grid w-full grid-cols-[46px_1fr] gap-3 border-b border-[#b99858]/10 p-2 text-left transition last:border-b-0 hover:bg-[#b99858]/10"
            >
              <div className="relative aspect-square overflow-hidden bg-[#17120e]">
                {product.primaryImage ? <Image src={product.primaryImage} alt="" fill sizes="46px" className="object-cover" unoptimized /> : null}
              </div>
              <span className="min-w-0">
                <span className="block truncate text-sm text-[#fff4df]">{product.title}</span>
                <span className="mt-1 block text-xs uppercase tracking-[0.12em] text-[#e4c982]">{product.collectionName}</span>
                <span className="mt-1 block text-xs text-[#8f8271]">{formatMoney(discountedPrice(product.price, product.discountType, product.discountValue))}</span>
              </span>
            </button>
          ))}
          {!filteredProducts.length ? (
            <p className="px-3 py-5 text-sm text-[#8f8271]">No matching products. Try a collection, color, or price.</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function CategoriesEditor({
  state,
  updateCollection,
  addCollection,
  deleteCollection,
}: {
  state: StaffCmsState;
  updateCollection: (slug: string, patch: Partial<Collection>) => void;
  addCollection: () => void;
  deleteCollection: (slug: string) => void;
}) {
  return (
    <section className="luxury-panel p-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#e4c982]">Categories</p>
          <h2 className="display mt-2 text-5xl text-[#fff4df]">Collection control</h2>
        </div>
        <button type="button" onClick={addCollection} className="bg-[#b99858] px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#080604]">
          Add Category
        </button>
      </div>
      <div className="mt-6 grid gap-4">
        {state.collections.map((collection) => (
          <article key={collection.slug} className="grid gap-4 border border-[#b99858]/16 p-4 xl:grid-cols-[0.85fr_1fr_0.8fr_auto] xl:items-start">
            <Field label="Name">
              <input value={collection.name} onChange={(event) => updateCollection(collection.slug, { name: event.target.value })} className="staff-input" />
            </Field>
            <Field label="Summary">
              <textarea value={collection.summary} onChange={(event) => updateCollection(collection.slug, { summary: event.target.value })} className="staff-input min-h-24 py-3" />
            </Field>
            <Field label="Cover Image Path">
              <input value={collection.coverImage} onChange={(event) => updateCollection(collection.slug, { coverImage: event.target.value })} className="staff-input" />
            </Field>
            <div className="grid gap-2">
              <p className="text-xs uppercase tracking-[0.17em] text-[#e4c982]">{collection.count} pieces</p>
              <button type="button" onClick={() => updateCollection(collection.slug, { visible: !(collection.visible ?? true) })} className="min-h-10 border border-[#b99858]/25 px-3 text-xs uppercase tracking-[0.12em] text-[#d7cbbb]">
                {(collection.visible ?? true) ? "Visible" : "Hidden"}
              </button>
              <button type="button" onClick={() => deleteCollection(collection.slug)} className="min-h-10 border border-[#7b1d31]/50 px-3 text-xs uppercase tracking-[0.12em] text-[#ffc0ca]">
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function InvoicesEditor({
  invoices,
  products,
  selectedInvoice,
  setSelectedInvoiceId,
  addInvoice,
  deleteInvoice,
  updateInvoice,
  addLineItemFromProduct,
  updateLineItem,
  removeLineItem,
}: {
  invoices: StaffInvoice[];
  products: Product[];
  selectedInvoice?: StaffInvoice;
  setSelectedInvoiceId: (id: string) => void;
  addInvoice: () => void;
  deleteInvoice: (id: string) => void;
  updateInvoice: (invoiceId: string, patch: Partial<StaffInvoice>) => void;
  addLineItemFromProduct: (product: Product) => void;
  updateLineItem: (lineId: string, patch: Partial<InvoiceLineItem>) => void;
  removeLineItem: (lineId: string) => void;
}) {
  return (
    <div className="grid gap-6 2xl:grid-cols-[0.62fr_1.38fr]">
      <section className="luxury-panel min-w-0 p-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="display text-4xl text-[#fff4df]">Invoices</h2>
          <button type="button" onClick={addInvoice} className="bg-[#b99858] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#080604]">
            Add
          </button>
        </div>
        <div className="mt-5 grid gap-2">
          {invoices.map((invoice) => (
            <button
              key={invoice.id}
              type="button"
              onClick={() => setSelectedInvoiceId(invoice.id)}
              className={cn(
                "border p-4 text-left transition",
                selectedInvoice?.id === invoice.id ? "border-[#e4c982] bg-[#b99858]/10" : "border-[#b99858]/16 hover:border-[#b99858]/35",
              )}
            >
              <p className="font-mono text-sm text-[#e4c982]">{invoice.number}</p>
              <p className="mt-1 text-[#fff4df]">{invoice.clientName}</p>
              <p className="mt-1 text-sm text-[#b7aa99]">{formatMoney(invoiceTotal(invoice))} · {invoice.status}</p>
            </button>
          ))}
          {!invoices.length ? <p className="border border-dashed border-[#b99858]/22 p-6 text-sm text-[#8f8271]">No invoices yet.</p> : null}
        </div>
      </section>

      {selectedInvoice ? (
        <section className="luxury-panel min-w-0 p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#e4c982]">Invoice Builder</p>
              <h2 className="display mt-2 text-5xl text-[#fff4df]">{selectedInvoice.number}</h2>
            </div>
            <div className="grid gap-3 text-left md:text-right">
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-[#b7aa99]">Total</p>
                <p className="font-mono text-3xl text-[#e4c982]">{formatMoney(invoiceTotal(selectedInvoice))}</p>
              </div>
              <button
                type="button"
                onClick={() => exportInvoicePdf(selectedInvoice)}
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#b99858]/30 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#fff4df] transition hover:border-[#e4c982] hover:bg-[#b99858]/10"
              >
                <Download size={16} />
                Export PDF
              </button>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Field label="Client Name">
              <input value={selectedInvoice.clientName} onChange={(event) => updateInvoice(selectedInvoice.id, { clientName: event.target.value })} className="staff-input" />
            </Field>
            <Field label="Status">
              <select value={selectedInvoice.status} onChange={(event) => updateInvoice(selectedInvoice.id, { status: event.target.value as StaffInvoice["status"] })} className="staff-input">
                {invoiceStatuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </Field>
            <Field label="Email">
              <input value={selectedInvoice.clientEmail || ""} onChange={(event) => updateInvoice(selectedInvoice.id, { clientEmail: event.target.value })} className="staff-input" />
            </Field>
            <Field label="Phone">
              <input value={selectedInvoice.clientPhone || ""} onChange={(event) => updateInvoice(selectedInvoice.id, { clientPhone: event.target.value })} className="staff-input" />
            </Field>
          </div>
          <Field label="Notes" className="mt-4">
            <textarea value={selectedInvoice.notes || ""} onChange={(event) => updateInvoice(selectedInvoice.id, { notes: event.target.value })} className="staff-input min-h-24 py-3" />
          </Field>

          <div className="mt-6 border border-[#b99858]/16 p-4">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <h3 className="display text-3xl text-[#fff4df]">Line items</h3>
              <ProductInvoiceCombobox products={products} onSelect={addLineItemFromProduct} />
            </div>
            <div className="mt-4 grid gap-3">
              {selectedInvoice.lineItems.map((item) => (
                <article key={item.id} className="grid gap-3 border border-[#b99858]/12 bg-black/15 p-3 2xl:grid-cols-[minmax(220px,1fr)_76px_116px_120px_96px_120px_auto] 2xl:items-end">
                  <Field label="Description">
                    <input value={item.description} onChange={(event) => updateLineItem(item.id, { description: event.target.value })} className="staff-input" />
                  </Field>
                  <Field label="Qty">
                    <input type="number" min="0" value={item.quantity} onChange={(event) => updateLineItem(item.id, { quantity: Number(event.target.value) })} className="staff-input" />
                  </Field>
                  <Field label="Unit Price">
                    <input type="number" min="0" value={item.unitPrice} onChange={(event) => updateLineItem(item.id, { unitPrice: Number(event.target.value) })} className="staff-input" />
                  </Field>
                  <Field label="Discount">
                    <select
                      value={item.discountType || (item.discount ? "amount" : "none")}
                      onChange={(event) =>
                        updateLineItem(item.id, {
                          discountType: event.target.value as InvoiceLineItem["discountType"],
                          discountValue: event.target.value === "none" ? 0 : item.discountValue ?? item.discount ?? 0,
                        })
                      }
                      className="staff-input"
                    >
                      <option value="none">None</option>
                      <option value="percent">Percent %</option>
                      <option value="amount">Amount</option>
                    </select>
                  </Field>
                  <Field label={item.discountType === "percent" ? "Percent" : "Value"}>
                    <input
                      type="number"
                      min="0"
                      value={item.discountValue ?? item.discount ?? 0}
                      onChange={(event) => updateLineItem(item.id, { discountValue: Number(event.target.value), discount: undefined })}
                      className="staff-input"
                      disabled={(item.discountType || (item.discount ? "amount" : "none")) === "none"}
                    />
                  </Field>
                  <div className="border border-[#b99858]/14 bg-[#17120e]/70 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#8f8271]">Total</p>
                    <p className="mt-1 font-mono text-sm text-[#e4c982]">{formatMoney(lineTotal(item))}</p>
                    {lineDiscountAmount(item) ? <p className="mt-1 text-xs text-[#b7aa99]">-{formatMoney(lineDiscountAmount(item))}</p> : null}
                  </div>
                  <button type="button" onClick={() => removeLineItem(item.id)} className="grid min-h-11 place-items-center border border-[#7b1d31]/45 text-[#ffc0ca] transition hover:bg-[#5b1625]/25">
                    <Trash2 size={18} />
                  </button>
                </article>
              ))}
            </div>
            <div className="mt-5 ml-auto grid max-w-sm gap-2 border-t border-[#b99858]/16 pt-4 text-sm">
              <div className="flex justify-between text-[#b7aa99]">
                <span>Subtotal</span>
                <span>{formatMoney(invoiceSubtotal(selectedInvoice))}</span>
              </div>
              <div className="flex justify-between text-[#b7aa99]">
                <span>Line discounts</span>
                <span>-{formatMoney(invoiceDiscountTotal(selectedInvoice))}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-[#e4c982]">
                <span>Total</span>
                <span>{formatMoney(invoiceTotal(selectedInvoice))}</span>
              </div>
            </div>
          </div>
          <button type="button" onClick={() => deleteInvoice(selectedInvoice.id)} className="mt-6 border border-[#7b1d31]/50 px-5 py-3 text-sm uppercase tracking-[0.16em] text-[#ffc0ca]">
            Delete Invoice
          </button>
        </section>
      ) : null}
    </div>
  );
}
