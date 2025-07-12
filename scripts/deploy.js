const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    const initialSupply = ethers.utils.parseEther("1000000"); // 1 million MOLD tokens
    const Token = await ethers.getContractFactory("MoldToken");
    const token = await Token.deploy(initialSupply);

    console.log("MoldToken deployed to:", token.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
