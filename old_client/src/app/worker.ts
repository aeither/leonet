import { leonet_program } from "@/lib/leonet_program";
import {
  Account,
  initThreadPool,
  PrivateKey,
  ProgramManager,
} from "@aleohq/sdk";

await initThreadPool();

async function localProgramExecution() {
  const programManager = new ProgramManager(undefined, undefined, undefined);

  // Create a temporary account for the execution of the program
  const account = new Account();
  programManager.setAccount(account);

  const executionResponse = await programManager.run(
    leonet_program,
    "main",
    ["5u32", "5u32"],
    false
  );
  return executionResponse.getOutputs();
}

function getPrivateKey() {
  return new PrivateKey().to_string();
}

onmessage = async function (e) {
  if (e.data === "execute") {
    const result = await localProgramExecution();
    postMessage({ type: "execute", result: result });
  } else if (e.data === "key") {
    const result = getPrivateKey();
    postMessage({ type: "key", result: result });
  }
};
