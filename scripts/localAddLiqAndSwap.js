const { ethers } = require("hardhat");

async function main() {

    let wbnb, factory, router, tokenA, tokenB;

    const provider = await ethers.provider;
    const options = {
        gasLimit: ethers.BigNumber.from("5000000")
    };
    const [deployerPancake, tokenIssuer, user] = await ethers.getSigners();
    const waitTime = 600;

    async function deployPancakeContracts() {
        console.log("Deploying Pancake contracts with the account:", deployerPancake.address);

        const WBNB = await ethers.getContractFactory("WBNB", deployerPancake);
        wbnb = await WBNB.deploy();
        console.log("WBNB contract:", wbnb.address);
        
        const PancakeFactory = await ethers.getContractFactory("PancakeFactory", deployerPancake);
        factory = await PancakeFactory.deploy(deployerPancake.address);
        console.log("PancakeFactory contract:", factory.address);
    
        const PancakeRouter = await ethers.getContractFactory("PancakeRouter", deployerPancake);
        router = await PancakeRouter.deploy(factory.address, wbnb.address);
        console.log("PancakeRouter contract:", router.address, "\n");
    }

    async function deployTokenSwapContracts() {
        console.log("Deploying Token contracts with the account:", tokenIssuer.address);

        const TokenA = await ethers.getContractFactory("TestToken", tokenIssuer);
        tokenA = await TokenA.deploy("TokenA", "ACOIN", 10000);
        console.log("TokenA contract:", tokenA.address);
    
        const TokenB = await ethers.getContractFactory("TestToken", tokenIssuer);
        tokenB = await TokenB.deploy("TokenB", "BCOIN", 20000);
        console.log("TokenB contract:", tokenB.address, "\n");

    }

    async function addLiquidity() {
        await tokenA.connect(tokenIssuer).approve(router.address, 5000); // Allow router to spend 5000 ACOIN of tokenIssuer
        await tokenB.connect(tokenIssuer).approve(router.address, 15000); // Allow router to spend 15000 BCOIN of tokenIssuer

        const startTime = (await provider.getBlock("latest")).timestamp; // get current time

        await router.connect(tokenIssuer).addLiquidity(
            tokenA.address, tokenB.address, 5000, 15000, 0, 0, tokenIssuer.address, startTime + waitTime, options
        ); // add liquidity
        console.log("Liquidity added: ACOIN-BCOIN: 5000-15000\n");
    }

    async function swap() {
        await tokenA.connect(tokenIssuer).transfer(user.address, 100);

        await tokenA.connect(user).approve(router.address, 100);

        const startTime = (await provider.getBlock("latest")).timestamp; // get current time

        await router.connect(user).swapExactTokensForTokens(
            100, 0, [tokenA.address, tokenB.address], user.address, startTime + waitTime, options
        );
        console.log("User swapped 100 ACOIN for %s BCOIN", (await tokenB.balanceOf(user.address)).toString());
    }

    await deployPancakeContracts();
    await deployTokenSwapContracts();
    await addLiquidity();
    await swap();
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });