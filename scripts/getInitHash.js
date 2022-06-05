const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    
    const InitH = await ethers.getContractFactory("GetInitHash", deployer);
    const inith = await InitH.deploy();
    console.log("Contract:", inith.address);

    const outp = await inith.getInitHash();
    console.log(outp);

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });