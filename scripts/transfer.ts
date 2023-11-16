// USER 1
import {
    Account,
    AleoKeyProvider,
    AleoNetworkClient,
    NetworkRecordProvider,
    ProgramManager
} from "@aleohq/sdk";

// Create a new NetworkClient, KeyProvider, and RecordProvider
const account = new Account({
  privateKey: "APrivateKey1zkp9p8bttYsy3EuwiGrb4PXmrtjzZkpGvBCGVCgvpcwVjUV",
});
const networkClient = new AleoNetworkClient("https://vm.aleo.org/api");
const keyProvider = new AleoKeyProvider();
const recordProvider = new NetworkRecordProvider(account, networkClient);

// Initialize a program manager with the key provider to automatically fetch keys for executions
const USER_2_ADDRESS = "user2Address";
const programManager = new ProgramManager(
  "https://vm.aleo.org/api",
  keyProvider,
  recordProvider
);
programManager.setAccount(account);

/// Send private transfer to user 2
const tx_id = await programManager.transfer(1,USER_2_ADDRESS,"transfer_private", 3, false)
console.log("🚀 ~ file: transfer.ts:30 ~ tx_id:", tx_id)
// const tx_id = await programManager.transfer(
//   1,
//   USER_2_ADDRESS,
//   "transfer_private",
//   0.2
// );
