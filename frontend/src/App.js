import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import MyBlogs from "./pages/MyBlogs";
import NewBlog from "./pages/NewBlog";
import Blog from "./components/Blog";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";

const logo = require('./images/icon.svg').default;
const BNB_TESTNET_CHAINID = `0x${Number(97).toString(16)}`;

function App() {

  const [metaMaskEnabled, setMetaMaskEnabled] = useState(false);
  async function connectWallet() {
    const { ethereum } = window;
    if (! ethereum) {
      setMetaMaskEnabled(false);
      return;
    }

    // Change network;
    const accounts = await ethereum.request({method: "eth_requestAccounts"});
    await ethereum.request({method: "wallet_switchEthereumChain", params: [{ chainId: BNB_TESTNET_CHAINID }]});
    console.log("accounts: ", accounts);
    console.log("Connected ", accounts[0]);

    setMetaMaskEnabled(true);
  }

  useEffect(() => {
    connectWallet();
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => window.location.reload());
      window.ethereum.on("accountsChanged", () => {window.sessionStorage.clear(); connectWallet(); window.location.reload();});
    }
    else {
      setMetaMaskEnabled(false);
    }
  }, []);
  
  return (
    <BrowserRouter>
    {metaMaskEnabled ? (
        <div className="App">
          <div className="leftBar">
            <LeftBar />
          </div>
          <div className="mainWindow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new-blog" element={<NewBlog />} />
              <Route path="/my-blogs" element={<MyBlogs />} />
              <Route path="/blog/:path/:mode/:id" element={<Blog />} />
              <Route path="/blog/:path/:mode" element={<Blog />} />
            </Routes>
          </div>
        </div>
    ) : (
      <div className="unConnectWallet">
        <img src={logo} alt="web3" className="unconnected-logo"/>
        <h1>My Blog</h1>
        <p>Connect MetaMask wallet to start</p>
      </div>
    )}
    </BrowserRouter>
  );
}

export default App;
