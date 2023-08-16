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
  size: "sm" | "md" | "lg" | "xl" | number = "md",
  type: "library" | "storage" = "storage"
) {
  let quality = 50;

  if (typeof size === "number") {
    quality = size;
  } else {
    switch (size) {
      case "sm":
        quality = 10;
        break;
      default:
        quality = 50;
        break;
      case "lg":
        quality = 80;
        break;
      case "xl":
        quality = 100;
        break;
    }
  }

  return type === "storage"
    ? `https://ik.imagekit.io/pfx7oxlvq0/o/${path}?alt=media&tr=f-auto,q-${quality}`
    : `https://ik.imagekit.io/pfx7oxlvq0/Atlas%20Academy%20Blog/${path}?tr=f-auto,q-${quality}`;
}
