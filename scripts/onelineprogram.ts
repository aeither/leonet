import { readFile, writeFile } from "fs/promises";

const filePath = "../leonet_program/build/main.aleo";

function convertToSingleLine(text: string) {
  // Remove line breaks and extra white spaces
  const singleLineText = text.replace(/\n/g, "").replace(/\s+/g, " ").trim();

  return singleLineText;
}

const main = async () => {
  const leonet_program = await readFile(filePath, "utf-8");

  const singleLineText = convertToSingleLine(leonet_program);

  // Write to TypeScript file
  const fileContent = `export const oneliner = "${singleLineText}";`;
  await writeFile("output.ts", fileContent);
  console.log("File written successfully.");
};

main()
  .then(() => {
    console.log("Conversion Success");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
