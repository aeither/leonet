import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToUtf8(word: string): string[] {
  const encoder = new TextEncoder();
  const utf8Array = encoder.encode(word);

  let finalArray: string[] = [];
  utf8Array.forEach((num) => {
    const stringNum = `${num}u8`;
    finalArray.push(stringNum);
  });

  // Fill the remaining elements with empty strings
  const remainingLength = 32 - finalArray.length;
  for (let i = 0; i < remainingLength; i++) {
    finalArray.push("0u8");
  }

  return finalArray;
}
