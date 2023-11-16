import { writeFile } from "fs/promises";
import leonet_program from "../leonet_program/build/main.aleo?raw";

function convertToSingleLine(text: string) {
  // Remove line breaks and extra white spaces
  const singleLineText = text.replace(/\n/g, "").replace(/\s+/g, " ").trim();

  return singleLineText;
}

const main = async () => {
  const multilineText = `This is a
    multiline
    plain text.`;

  const singleLineText = convertToSingleLine(multilineText);

  // Write to TypeScript file
  const fileContent = `export const oneliner = "${singleLineText}";`;
  writeFile("output.ts", fileContent)
    .then(() => console.log("File written successfully."))
    .catch((err) => console.error("Error writing file:", err));
};

main()
  .then(async () => {
    console.log("Converstion Success");
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
