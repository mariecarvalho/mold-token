const { expect } = require("chai");

describe("MoldToken", function () {
    it("Should deploy with correct initial supply", async function () {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("MoldToken");
        const initialSupply = ethers.utils.parseEther("1000000");
        const token = await Token.deploy(initialSupply);

        const balance = await token.balanceOf(owner.address);
        expect(balance).to.equal(initialSupply);
    });
});
