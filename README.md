## Getting Started

Run it in development mode.

```bash
npm run dev
```

Build it.

```bash
contract:build
```

Deploy it.

```bash
snarkos developer deploy "leonet_program.aleo" --private-key "PRIVATE_KEY" --query "https://vm.aleo.org/api" --path "./leonet_program/build/" --broadcast "https://vm.aleo.org/api/testnet3/transaction/broadcast" --priority-fee 100000
```