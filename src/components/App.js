import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Identicon from "identicon.js";
import "./App.css";
import Decentragram from "../abis/Decentragram.json";
import Navbar from "./Navbar";
import Main from "./Main";

//Connect to ipfs
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

function App() {
  const [account, setAccount] = useState("");
  const [decentragram, setDecentragram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageCount, setImageCount] = useState(0);
  const [images, setImages] = useState([]);
  const [buffer, setBuffer] = useState([]);

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

    const networkId = await web3.eth.net.getId();
    const networkData = Decentragram.networks[networkId];
    if (networkData) {
      const decentragram = web3.eth.Contract(
        Decentragram.abi,
        networkData.address
      );
      setDecentragram(decentragram);

      const imagesCount = await decentragram.methods.imageCount().call();
      setImageCount(imagesCount);
      setLoading(false);
    } else {
      window.alert("Decentagram contract not deploed to detected network");
    }
  }

  useEffect(() => {
    loadWeb3();
    loadBlockChaindata();
  }, []);

  const captureFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
      console.log(Buffer(reader.result));
    };
  };

  const uploadImage = (desc) => {
    console.log("Submitting files to ipfs");

    ipfs.add(buffer, (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("Ipfs result", result);

      // setLoading(true);
      // decentragram.methods
      //   .uploadImage(result[0].hash, desc)
      //   .send({ from: account })
      //   .on("transactionHash", (hash) => {
      //     setLoading(false);
      //     console.log(hash);
      //   });
    });
  };

  return (
    <div>
      <Navbar account={account} />
      {loading ? (
        <div id="loader" className="text-center mt-5">
          <p>Loading...</p>
        </div>
      ) : (
        <Main captureFile={captureFile} uploadImage={uploadImage} />
      )}
    </div>
  );
}

export default App;
