import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BenBKTokenModule = buildModule("BenBKTokenModule", (m) => {

  const BenBKToken = m.contract("BenBKToken");

  return { BenBKToken };
});

export default BenBKTokenModule;
