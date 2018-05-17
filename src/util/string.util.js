export function generateHash(str) {
  let hash = 0;
  let i;
  let chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
}

export function isNonEmpty (str) {
  return typeof str === "string" && str !== "";
}

export function clearSpecialCharacters (str) {
  return str.replace(/[^a-zA-Z ]/g, "")
}

export function limitLength(str, maxLength) {
  return str.substr(0, maxLength) + (str.length > maxLength ? "..." : "");
}