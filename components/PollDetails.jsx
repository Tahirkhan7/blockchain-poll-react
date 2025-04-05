import React from 'react';
import web3 from '../utils/web3';
import contract from '../utils/contract';

function PollDetails({ poll }) {
  const vote = async (index) => {
    const accounts = await web3.eth.getAccounts();
    try {
      await contract.methods.vote(poll.id, index).send({ from: accounts[0] });
      alert("Vote cast successfully!");
    } catch (err) {
      alert("Error voting: " + err.message);
    }
  };

  return (
    <div>
      <h4>{poll.question}</h4>
      <img src={poll.thumbnail} alt="thumbnail" style={{ width: '200px' }} />
      <ul>
        {poll.options.map((opt, idx) => (
          <li key={idx}>
            {web3.utils.hexToAscii(opt)} — Votes: {poll.votes[idx]}
            <button onClick={() => vote(idx)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PollDetails;
