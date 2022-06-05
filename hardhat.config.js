require("@nomiclabs/hardhat-waffle");
const { mnemonic } = require('./secrets.json');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.16",
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.8.0",
      },
      {
        version: "0.4.18",
      },
    ],
    overrides: {
        "contracts/PancakeRouter.sol": {
          version: "0.6.6",
        },
        "contracts/PancakeFactory.sol": {
          version: "0.5.16",
        }
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true 
    },
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    }
  }
};
