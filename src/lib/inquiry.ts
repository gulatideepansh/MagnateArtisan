export type PreferredContact = "whatsapp" | "email";

export type InquiryDetails = {
  name: string; email: string; preferredContact: PreferredContact; occasion: string;
  eventDate: string; location: string; reference: string; measurements: string;
  colors: string; notes: string;
};

export function inquiryMessage(details: InquiryDetails, intro = "I would like to begin a bespoke order.") {
  const fields: Array<[string, string]> = [
    ["Name", details.name], ["Email", details.email], ["Preferred contact", details.preferredContact],
    ["Occasion", details.occasion], ["Event date", details.eventDate], ["City / country", details.location],
    ["Product or reference", details.reference], ["Measurements status", details.measurements],
    ["Colours / fabric", details.colors], ["Customisation notes", details.notes],
  ];
  return ["Hello Magnate Artisan,", "", intro, ...fields.filter(([, value]) => value.trim()).map(([label, value]) => `${label}: ${value.trim()}`), "", "Please help me confirm sizing, design options, timeline, and next steps."].join("\n");
}

export function inquiryUrl(details: InquiryDetails, intro?: string) {
  const message = inquiryMessage(details, intro);
  if (details.preferredContact === "email") {
    const email = process.env.NEXT_PUBLIC_INQUIRY_EMAIL || "hello@magnateartisan.com";
    return `mailto:${email}?subject=${encodeURIComponent("Bespoke inquiry")}&body=${encodeURIComponent(message)}`;
  }
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "61400000000";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
