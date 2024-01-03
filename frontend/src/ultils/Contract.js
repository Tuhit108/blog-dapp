import { ethers } from "ethers";
const config = require('../config.json')

const ABI = require("../Blog.json").abi;
const CONTRACT_ADDRESS = config.CONTRACT_ADDRESS;

export function getContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  };

export async function getOwnedAddr(){
    const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
    return accounts[0];
}