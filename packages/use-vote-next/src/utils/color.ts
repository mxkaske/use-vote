import crypto from "crypto";

export const strToColor = (str: string) => {
  const strHash = crypto.createHash("sha512").update(str).digest("hex");
  let hash = 0;
  for (let i = 0; i < strHash.length; i++) {
    hash = strHash.charCodeAt(i) + ((hash << 6) - hash);
    hash = hash & hash;
  }
  const shorten = hash % 360;
  return `hsl(${shorten},100%,50%)`;
};
