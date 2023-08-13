const numberFormatter = Intl.NumberFormat("en", { notation: "compact" });
export function formatBigNumber(num: number) {
  return numberFormatter.format(num);
}

export function formatDate(dateString: string, format: "sm" | "lg" = "lg") {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = format === "lg" ?
    date.toLocaleDateString("en-US", { month: "short" }) :
    date.toLocaleDateString("en-US", { month: "numeric" });
  const year = date.getFullYear();

  return format === "lg" ?
    `${day} ${month} ${year}` :
    `${month}/${day}/${year}`;
}

export function slugify(text: string) {
  return text.replaceAll(" ", "-").toLowerCase();
}
