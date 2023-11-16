function convertToUtf8(word: string): string[] {
  const encoder = new TextEncoder();
  const utf8Array = encoder.encode(word);

  let finalArray: string[] = []
  utf8Array.forEach((num) => {
    const stringNum = `${num}u8`;
    console.log(stringNum);
    finalArray.push(stringNum);
  });

  return finalArray;
}

const word = "Hello";
const utf8Array = convertToUtf8(word);
console.log(utf8Array);

function convertFromUtf8(utf8Array: Uint8Array): string {
  const decoder = new TextDecoder();
  return decoder.decode(utf8Array);
}

const utf8Array2 = new Uint8Array([72, 101, 108, 108, 111]);
const word2 = convertFromUtf8(utf8Array2);
console.log(word2);
