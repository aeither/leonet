## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

```bash
snarkos developer deploy "leonet_program.aleo" --private-key "PRIVATE_KEY" --query "https://vm.aleo.org/api" --path "./leonet_program/build/" --broadcast "https://vm.aleo.org/api/testnet3/transaction/broadcast" --priority-fee 100000
```