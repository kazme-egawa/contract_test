import { ethers } from "ethers"
// 1. Import the contract file
import compiled from './Incrementer.json'

export const deployContractWithoutWaitService = async () => {
  // 2. The Ethers provider logic
  const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');

  // 3. Save the bytecode and ABI
  const bytecode = compiled.bytecode;
  const abi = compiled.abi;

  // 4. Create signer
  if(!process.env.SIGNER_PRIVATE_KEY) throw Error('Error: SIGNER PRIVATE KRY is invalid.')
  let signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

  // 5. Create contract factory instance with signer
  const incrementer = new ethers.ContractFactory(abi, bytecode, signer);

  // 6. Deploy
  const contract = await incrementer.deploy([5]);

  console.log(`Contract deployed at address: ${contract.address}`);

  return contract.address;
}