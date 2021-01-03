import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Identicon from "identicon.js";
import "./App.css";
import Decentragram from "../abis/Decentragram.json";
import Navbar from "./Navbar";
import Main from "./Main";

function App() {
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);

  //Connect with metamask

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("non ethereum browser detected.");
    }
  }
  async function loadBlockChaindata() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  useEffect(() => {
    loadWeb3();
    loadBlockChaindata();
  }, []);

  return (
    <div>
      <Navbar account={account} />
      {loading ? (
        <div id="loader" className="text-center mt-5">
          <p>Loading...</p>
        </div>
      ) : (
        <Main
        // Code...
        />
      )}
    </div>
  );
}

export default App;
