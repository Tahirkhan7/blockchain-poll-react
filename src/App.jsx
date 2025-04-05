import React from 'react';
import { WalletProvider } from '../context/WalletContext.jsx';
import Header from '../components/Header';
import CreatePoll from '../components/CreatePoll';
import PollList from '../components/PollList';
import Footer from '../components/Footer.jsx';

function App() {
  return (
    <WalletProvider>
      <Header />
      <div style={{ padding: '24px' }}>
        <CreatePoll />
        <hr />
        <PollList />
      </div>
      <Footer />
    </WalletProvider>
  );
}

export default App;
