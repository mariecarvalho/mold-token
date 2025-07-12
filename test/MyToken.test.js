const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MoldToken", function () {
  it("Should deploy with correct initial supply", async function () {
    const Token = await ethers.getContractFactory("contracts/MoldToken.sol:MoldToken");
    const token = await Token.deploy();
    
    const supply = await token.totalSupply();
    expect(supply).to.equal(1000000n * 10n ** 18n);
  });
});
