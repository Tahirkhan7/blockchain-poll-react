import React from 'react';
import CreatePoll from '../components/CreatePoll';
import PollList from '../components/PollList';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>📊 Blockchain Poll DApp</h1>
      <CreatePoll />
      <hr />
      <PollList />
    </div>
  );
}

export default App;
