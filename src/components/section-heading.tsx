export function SectionHeading({
  title,
  copy,
  align = "left",
}: {
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className={align === "center" ? "gold-line mx-auto mb-6 w-32" : "gold-line mb-6 w-32"} />
      <h2 className="display text-balance text-5xl leading-none text-[#f6efe3] md:text-7xl">{title}</h2>
      {copy ? <p className="mt-5 text-base leading-8 text-[#b7aa99] md:text-lg">{copy}</p> : null}
    </div>
  );
}
