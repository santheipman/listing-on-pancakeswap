# Listing on PancakeSwap

### Run locally

```
npx hardhat run scripts/localAddLiqAndSwap.js
```

### Run on BSC testnet (use existing `PancakeSwapRouter` & `PancakeSwapFactory`)
Deploy new token contract (optional):

```
npx hardhat run scripts/testnetDeployToken.js --network bsctestnet
```

Replace `LPTN` 's value (in both `testnetAddLiquidity.js` & `testnetSwap.js`)  with your token's contract address. Then run:

```
npx hardhat run scripts/testnetAddLiquidity.js --network bsctestnet
npx hardhat run scripts/testnetSwap.js --network bsctestnet
```