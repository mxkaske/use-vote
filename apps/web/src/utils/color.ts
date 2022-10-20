import { default as ColorHash } from "color-hash";
import crypto from "crypto";

var customHash = function (str: string) {
  const strHash = crypto.createHash("sha512").update(str).digest("hex");
  let hash = 0;
  for (let i = 0; i < strHash.length; i++) {
    const chr = strHash.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  console.log(hash);
  return Math.abs(hash);
};

export const colorHash = new ColorHash({ hash: customHash });
