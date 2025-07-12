import { useState } from "react";
import { ethers } from "ethers";
import MoldTokenABI from "../MoldToken.json";

const CONTRACT_ADDRESS = "INSERT HERE";

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [contract, setContract] = useState(null);
  const [paused, setPaused] = useState(false);

  async function connect() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setAccount(userAddress);

      const moldContract = new ethers.Contract(CONTRACT_ADDRESS, MoldTokenABI, signer);
      setContract(moldContract);

      const bal = await moldContract.balanceOf(userAddress);
      setBalance(ethers.formatUnits(bal, 18));

      const isPaused = await moldContract.paused();
      setPaused(isPaused);
    } else {
      alert("Please install MetaMask!");
    }
  }

  async function pauseContract() {
    if (!contract) return;
    try {
      const tx = await contract.pause();
      await tx.wait();
      setPaused(true);
    } catch (err) {
      alert("Error pausing contract: " + err.message);
    }
  }

  async function unpauseContract() {
    if (!contract) return;
    try {
      const tx = await contract.unpause();
      await tx.wait();
      setPaused(false);
    } catch (err) {
      alert("Error unpausing contract: " + err.message);
    }
  }

  async function burnTokens(amount) {
    if (!contract) return;
    try {
      const tx = await contract.burn(ethers.parseUnits(amount, 18));
      await tx.wait();

      // Atualiza saldo após queimar
      const bal = await contract.balanceOf(account);
      setBalance(ethers.formatUnits(bal, 18));
    } catch (err) {
      alert("Error burning tokens: " + err.message);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>MoldToken DApp</h1>
      {account ? (
        <>
          <p>Connected as: {account}</p>
          <p>Your MOLD Balance: {balance}</p>
          <p>Contract paused? {paused ? "Yes" : "No"}</p>

          <button onClick={pauseContract} disabled={paused}>
            Pause Contract
          </button>
          <button onClick={unpauseContract} disabled={!paused}>
            Unpause Contract
          </button>

          <button onClick={() => burnTokens("10")}>Burn 10 Tokens</button>
        </>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;