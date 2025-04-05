import React, { useContext } from 'react';
import { WalletContext } from '../context/WalletContext.jsx';

const Header = () => {
  const { account, connectWallet, disconnectWallet } = useContext(WalletContext);

  return (
    <div style={styles.header}>
      <h1 style={styles.logo}>🗳️ PollChain</h1>
      <h2>📊 Blockchain Poll DApp</h2>
      <div>
      {account ? (
        <span style={styles.address}>
          Connected: {account.slice(0, 6)}...{account.slice(-4)}{' '}
          <button onClick={disconnectWallet} style={styles.button2}>Disconnect</button>
          </span>
      ) : (
        <button onClick={connectWallet} style={styles.button}>Connect Wallet</button>
      )}
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 24px',
    background: '#1f2937',
    color: '#fff',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
  },
  button: {
    marginLeft: '16px',
    padding: '8px 14px',
    background: '#3b82f6',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
  },
  button2: {
    marginLeft: '16px',
    padding: '8px 14px',
    background: 'red',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
  },
  address: {
    marginLeft: '16px',
    fontSize: '14px',
    color: '#cbd5e1',
  },
};

export default Header;
