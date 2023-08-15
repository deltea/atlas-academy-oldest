import { v4 as uuid } from "uuid";

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

export function getUuid() {
  return uuid();
}

export function getImage(
  path: string,
  size: "sm" | "md" | "lg" | "xl" = "md",
  type: "library" | "storage" = "storage"
) {
  let dimensions = 800;
  switch (size) {
    case "sm":
      dimensions = 400;
      break;
    default:
      dimensions = 800;
      break;
    case "lg":
      dimensions = 1000;
      break;
    case "xl":
      dimensions = 3000;
      break;
  }

  let quality = 80;
  switch (size) {
    case "sm":
      quality = 20;
      break;
    default:
      quality = 80;
      break;
    case "lg":
      quality = 100;
      break;
    case "xl":
      quality = 120;
      break;
  }

  return type === "storage"
    ? `https://ik.imagekit.io/pfx7oxlvq0/o/${path}?alt=media&tr=w-${dimensions},h-${dimensions}`
    : `https://ik.imagekit.io/pfx7oxlvq0/Atlas%20Academy%20Blog/${path}?tr=f-auto,q-${quality}`;
}
