import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MoldTokenABI from './MoldToken.json'; // import JSON ABI manually

const CONTRACT_ADDRESS = "<PUT_DEPLOYED_ADDRESS_HERE>";

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");

  async function connect() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setAccount(await signer.getAddress());

      const contract = new ethers.Contract(CONTRACT_ADDRESS, MoldTokenABI, signer);
      const bal = await contract.balanceOf(await signer.getAddress());
      setBalance(ethers.formatUnits(bal, 18));
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>MoldToken DApp</h1>
      {account ? (
        <>
          <p>Connected as: {account}</p>
          <p>Your MOLD Balance: {balance}</p>
        </>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
