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

export function loadDarkMode() {
  if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function getDarkMode() {
  if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    return true;
  } else {
    return false;
  }
}

export function setDarkMode(darkMode: boolean) {
  localStorage.theme = darkMode ? "dark" : "light";
  loadDarkMode();
}
