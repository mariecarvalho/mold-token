const { expect } = require("chai");

describe("MoldToken", function () {
  it("Should deploy and assign initial supply to owner", async function () {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("MoldToken");
    const token = await Token.deploy();
    const balance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(balance);
  });
});
