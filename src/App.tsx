import React from 'react';
import './App.css';
import { deployContractService } from './deployContractService'
import { deployContractWithoutWaitService } from './deployContractServiceWithoutWait'

function App() {
  const [button1State, setButton1State] = React.useState('');
  const [button2State, setButton2State] = React.useState('');
  const [address1State, setAddress1State] = React.useState('');
  const [address2State, setAddress2State] = React.useState('');

  const deploy1Delay = async (t:number) => {
    return new Promise<void>((resolve) => {
      // adding delay of 4s
      setTimeout(() => {
        setAddress1State('hoge');
        resolve();
      }, t);
    });
  }
  const deploy2Delay = async (t:number) => {
    return new Promise<void>((resolve) => {
      // adding delay of 4s
      setTimeout(() => {
        setAddress2State('piyo');
        resolve();
      }, t);
    });
  }
  const handleClick1 = async () => {
    setButton1State("deploying");
    const contractAddress = await deployContractService();
    setAddress1State(contractAddress);
    // await deploy1Delay(4000);
    setButton1State("deployed");
  }
  const handleClick2 = async () => {
    setButton2State("deploying");
    const contractAddress = await deployContractWithoutWaitService();
    setAddress2State(contractAddress);
    // await deploy2Delay(1000);
    setButton2State("deployed");
  }

  return (
    <div className="App">
      <h1>Deploy a test contract</h1>
      <h3>Wait until the contract has been deployed</h3>
      <button onClick={handleClick1} disabled={button1State === 'deploying' || button1State === 'deployed'}>
        {button1State === '' ? 'Deploy' : button1State === 'deploying' ? 'Deploying': 'Deployed'}
      </button>
      <p>{address1State === '' ? '': address1State}</p>
      <h3>Without waiting</h3>
      <button onClick={handleClick2} disabled={button2State === 'deploying' || button2State === 'deployed'}>
        {button2State === '' ? 'Deploy' : button2State === 'deploying' ? 'Deploying': 'Deployed'}
      </button>
      <p>{address2State === '' ? '': address2State}</p>
    </div>
  );
}

export default App;
