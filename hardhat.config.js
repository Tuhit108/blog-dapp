require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    'hardhat': {},
    'goerli': {
      url: process.env.GOERLI_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY],
    },
    'bnb-testnet': {
      url: process.env.BNB_TESTNET_URL,
      accounts: [process.env.BNB_TESTNET_PRIVATE_KEY],
    },
  }
};
