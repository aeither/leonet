# Leonet

leonet is a mini game platform with a leaderboard where the player address is not revealed. The ClickMaster game is a game where the player has to make the maximum amount of click within 1 minute.


# How it works

![howitworks](https://github.com/aeither/leonet/assets/36173828/8479d76e-9bff-4479-ab3a-8c1c921259a5)

An array to hold an username up to 32 characters.
Option to select predefined avatar by associating images with number id.

```rust
struct User {
    username: [u8; 32];
    avatar: u8;
    score: u64;
    games_played: u64;
}
```

Update score with username utf-8 encoded
```bash
snarkos developer execute --private-key APrivateKey1zkpFykR4fKtyfrQtYuA7wYbNFQsC8qoUqeQt6iT2B44dn9z --query https://aleo.obscura.network/v1/201d4fc4-8194-4462-90dd-6f31d8e278c4 leaderboard_123124.aleo update_score "[ "72u8", "101u8", "108u8", "108u8", "111u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8" ]" 0u8 123field 12u64 --broadcast https://aleo.obscura.network/v1/201d4fc4-8194-4462-90dd-6f31d8e278c4/testnet3/transaction/broadcast
```

Fetching mappings with simple Obscura RPC call.

```ts
const data = await fetch(
  "https://aleo.obscura.network/v1/API_KEY/testnet3/program/leaderboard_123122.aleo/mapping/users/1field"
);
```

# Screenshots

![CleanShot 2023-11-18 at 05 01 58@2x](https://github.com/aeither/leonet/assets/36173828/6d1bb494-1f17-4af5-a0ad-153356f5cd47)

![CleanShot 2023-11-18 at 05 02 21@2x](https://github.com/aeither/leonet/assets/36173828/fac7a969-ce26-4df3-a74a-4aa1e4479eaf)

![CleanShot 2023-11-18 at 05 02 50@2x](https://github.com/aeither/leonet/assets/36173828/e7ada2a1-d974-40fd-85bf-827c8ba6c0d9)

# What next

The architecture of the project idea. A zk platform to host casual games competitions in leaderboard to win prizes in stablecoin.

![CleanShot 2023-11-18 at 05 14 22@2x](https://github.com/aeither/leonet/assets/36173828/e378a7b6-087b-4dcf-a115-2c93d8c86377)

# More

https://explorer.hamp.app/transaction?id=at18ufyhhlf7xvv0g6lu9pjq8e32usqdkm8t5afnhxfkm7de427xyzqlcld20

https://explorer.hamp.app/transaction?id=at1urmj78evhrhz2camjyq2a49dz8ufmxmpmlfdd6xjy2q9zpz5j58s0eeljk

# Built from zkleaderboard-aleo

Learn how to build and deploy your own leaderboard on-chain, using Aleo's network and Leo language. Demo project used for zkLeaderboard workshop. Part of zkHouse Istanbul during DevConnect 2023.

You can find details about the [Aleo Hackathon Bounty here](https://ecovirtual.notion.site/zkHouse-Hackathon-Bounty-f9bb5ed4e1b24d3db82480ece5f90dc9)

## Before we begin

### PNPM

Make sure you have [Node.js](https://nodejs.org/en) LTS installed.

Enable corepack in order to be able to use PNPM (NPM for cool kids):

```sh
corepack enable
```

### Aleo account

Install [Leo Wallet](https://www.leo.app/) and follow the steps to create an Aleo account.

Give yourself some credits by tapping the faucet. You can find it on the [Aleo Discord](https://discord.com/invite/aleohq) server. Currently the maximum amount of credits per mint is 15.

### Leo CLI

Make sure you have installed the latest version of the [Leo CLI](https://github.com/AleoHQ/leo)

### Obscura key

Follow [these steps](https://docs.obscura.network/Obscura-Api-Key/00_api-key/) to generate you Obscura API Key.

### .env

Create a `client/.env` file and define the following env variables.

> ⚠️ Currently the Aleo SDK does not work alongside Leo wallet, so in order to run the app with the SDK you have to manually specify your Private Key as an environment variable. If you are reading this from the future, please only use testnet accounts!

```env
VITE_PRIVATE_KEY=<your_aleo_private_key_exported_from_wallet>
VITE_NETWORK_URL="https://aleo.obscura.network/v1/<your_obscura_key>"
VITE_PROGRAM_NAME="leaderboard_<your_name>.aleo"
```

## Deploy and run

Navigate to the `client/` directory, this is where you will be running most of your commands:

```sh
cd client/
```

Install the required dependencies:

```sh
pnpm install
```

Build the `.aleo` program:

```sh
pnpm aleo:build
```

Deploy the program to the testnet (for this operation you need to have at least 2.1 aleo credits in your wallet):

```sh
pnpm aleo:deploy
```

Check your wallet activities. In a couple of minutes you should see an activity item confirming the deployment. The testnet is not always stable, so if after 5 minutes you still don't see the item, try re-running the deployment command.

You should also be able to find your program in the block explorer when navigating to `https://explorer.aleo.org/program/leaderboard_<your_name>.aleo`

If your program was deployed successfully, you can run the app:

```sh
pnpm dev
```
