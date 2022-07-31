import { ethers } from "ethers"
// 1. Import the contract file
import compiled from './Incrementer.json'

export const deployContractService = async () => {
  // 2. The Ethers provider logic
  const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');

  // 3. Save the bytecode and ABI
  const bytecode = compiled.bytecode;
  const abi = compiled.abi;

  // 4. Create signer
  let signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

  // 5. Create contract factory instance with signer
  const incrementer = new ethers.ContractFactory(abi, bytecode, signer);
  console.log(`Attempting to deploy from account: ${signer.address}`);

  // 6. Deploy
  const contract = await incrementer.deploy([5]);

  // 7. Send tx and wait for receipt
  await contract.deployed();

  console.log(`Contract deployed at address: ${contract.address}`);

  return contract.address;
}