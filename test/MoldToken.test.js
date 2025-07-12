const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MoldToken", function () {
  it("Should deploy and assign initial supply to owner", async function () {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("contracts/MoldToken.sol:MoldToken");
    const token = await Token.deploy();
    const balance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(balance);
  });

  it("Should deploy with correct initial supply", async function () {
    const Token = await ethers.getContractFactory("contracts/MoldToken.sol:MoldToken");
    const token = await Token.deploy();
    expect(await token.totalSupply()).to.equal(1000000n * 10n ** 18n);
  });
});
