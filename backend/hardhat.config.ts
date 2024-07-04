import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/6e4dcb86b707401a84e505b5ae7c8964",
        blockNumber: 20228494
      }
    }
  }
};

export default config;