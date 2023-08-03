const numberFormatter = Intl.NumberFormat("en", { notation: "compact" });
export function formatBigNumber(num: number) {
  return numberFormatter.format(num);
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

export function slugify(text: string) {
  return text.replaceAll(" ", "-").toLowerCase();
}
