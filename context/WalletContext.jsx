import React, { createContext, useEffect, useState } from 'react';
import Web3 from 'web3';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  // Load Web3 and try to auto-connect if previously connected
  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      const wasConnected = localStorage.getItem('walletConnected');
      if (wasConnected) {
        // Try reconnect silently
        window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        });
      }

      // Listen for account change
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          localStorage.setItem('walletConnected', true);
        } else {
          setAccount(null);
          localStorage.removeItem('walletConnected');
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask!");

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      localStorage.setItem('walletConnected', true);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem('walletConnected');
  };

  return (
    <WalletContext.Provider value={{ web3, account, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
