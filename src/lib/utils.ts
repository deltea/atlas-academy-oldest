const numberFormatter = Intl.NumberFormat("en", { notation: "compact" });
export function formatBigNumber(num: number) {
  return numberFormatter.format(num);
}

export function formatDate(dateString: string, format: "sm" | "lg" = "lg") {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = format === "lg" ?
    date.toLocaleDateString("en-US", { month: "short" }) :
    date.getMonth();
  const year = date.getFullYear();

  return format === "lg" ?
    `${day} ${month} ${year}` :
    `${day}/${month}/${year}`;
}

export function slugify(text: string) {
  return text.replaceAll(" ", "-").toLowerCase();
}
