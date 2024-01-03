import { Buffer } from "buffer";
import {create} from 'ipfs-http-client';
const config = require("../config.json");

export function getIPFS(){
    let ipfs;
    const auth = 'Basic ' + Buffer.from(config.INFURA_API_ID + ':' + config.INFURA_API_SECRET).toString('base64');
    
    try {
      ipfs = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: auth,
        },
    });
    
    } catch (error) {
      console.error("IPFS error ", error);
      ipfs = undefined;
    }
    return ipfs;
  }

export async function getMetadata(path){

  try{
    const fdata = await fetch(`https://ipfs.infura.io:5001/api/v0/cat?arg=${path}`, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(config.INFURA_API_ID + ':' + config.INFURA_API_SECRET).toString('base64')
        }
    });

    const res = await fdata.json();
    console.log("vao day", res)
    return res;
  }
  catch(e){
    return {message: e};
  }
    
}

