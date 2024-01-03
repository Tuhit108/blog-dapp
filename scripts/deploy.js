const hre = require("hardhat");

async function main() {
  const Blog = await hre.ethers.getContractFactory("Blog");
  const blog = await Blog.deploy("Blog", "BG");

  await blog.deployed();

  console.log(`Blog was deployed to ${blog.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
