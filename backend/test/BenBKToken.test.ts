import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect, assert } from "chai";
import hre from "hardhat";

describe("BenBKToken Tests", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const BenBKToken = await hre.ethers.getContractFactory("BenBKToken");
    const benBKToken = await BenBKToken.deploy();

    return { benBKToken, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy the contract and get the right price for 1 ETH", async function () {
      const { benBKToken, owner, otherAccount } = await loadFixture(deployFixture);
      const ethPriceFromChainlink = await benBKToken.getChainlinkDataFeedLatestAnswer();
      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainlink, 8);
      assert(parseInt(ethInDollars) >= 3000 && parseInt(ethInDollars) <= 3500);
    });    
  });

  describe("Mint", function () {
    it("Should NOT mint if not enough funds are provided", async function () {
      const { benBKToken, owner, otherAccount } = await loadFixture(deployFixture);
      const ethPriceFromChainlink = await benBKToken.getChainlinkDataFeedLatestAnswer();
      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainlink, 8);
      const amountMint = 18;
      const amountEthFor18Tokens = (10 * amountMint) / parseInt(ethInDollars)
      const priceFor18Tokens = hre.ethers.parseEther(amountEthFor18Tokens.toString());
      console.log(priceFor18Tokens);
      await expect(benBKToken.mint(owner.address, 20, { value: priceFor18Tokens })).to.be.revertedWith('Not enough funds provided');
    });
    
    it("Should mint if enough funds are provided", async function () {
      const { benBKToken, owner, otherAccount } = await loadFixture(deployFixture);
      const ethPriceFromChainlink = await benBKToken.getChainlinkDataFeedLatestAnswer();
      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainlink, 8);
      const amountMint = 20;
      const amountEthFor20Tokens = (10 * amountMint) / parseInt(ethInDollars)
      const priceFor20Tokens = hre.ethers.parseEther(amountEthFor20Tokens.toString());
      console.log(priceFor20Tokens)
      await benBKToken.mint(owner.address, 20, { value: priceFor20Tokens });
      const balanceOfOwner = await benBKToken.balanceOf(owner.address);
      assert(Number(balanceOfOwner) === 20);
    }); 
  });
});
