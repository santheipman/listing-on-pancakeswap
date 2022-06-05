const { ethers } = require("hardhat");

async function main() {

    const provider = await ethers.provider;
    const [user] = await ethers.getSigners();
    const waitTime = 600;
    const LPTNAmount = ethers.utils.parseEther('2000');
    const BUSDAmount = ethers.utils.parseEther('1'); // 1 BUSD - 2000 LPTN

    const _router = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3";
    const LPTN = "0x29352AA8cCECd93548488d9194557F3F3B394E4B";
    const BUSD = "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7";

    const router = await ethers.getContractAt("IPancakeRouter02", _router);
    const tokenA = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", LPTN);
    const tokenB = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", BUSD); 

    await tokenA.connect(user).approve(router.address, LPTNAmount);
    await tokenB.connect(user).approve(router.address, BUSDAmount);

    const startTime = (await provider.getBlock("latest")).timestamp; // get current time
    const options = {
        gasLimit: ethers.BigNumber.from("5000000")
    };
    await router.connect(user).addLiquidity(
        tokenA.address, tokenB.address, LPTNAmount, BUSDAmount, 0, 0, user.address, startTime + waitTime, options
    ); // add liquidity
}
  
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});