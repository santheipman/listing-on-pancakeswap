const { ethers } = require("hardhat");

async function main() {

    const name = "LiquProd Token";
    const symbol = "LPTM";
    const initialAmount = ethers.utils.parseEther('50000'); //50000 * (10**18);
    
    const [deployer] = await ethers.getSigners();

    console.log("Deploying Token contract with the account:", deployer.address);
    const Token = await ethers.getContractFactory("TestToken", deployer);
    const token = await Token.deploy(name, symbol, initialAmount);
    console.log("Token contract:", token.address);
}
  
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});