const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const MoldToken = await hre.ethers.getContractFactory("contracts/MoldToken.sol:MoldToken");
  const mold = await MoldToken.deploy();

  console.log(`MoldToken deployed to: ${mold.target}`); // em ethers v6, use .target para endereço do contrato
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
