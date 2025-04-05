import React, {useContext} from 'react';
import web3 from '../utils/web3';
import contract from '../utils/contract';
import { WalletContext } from '../context/WalletContext';

function PollDetails({ poll }) {
  const { account } = useContext(WalletContext);

  const vote = async (index) => {
    if (!account) return alert("Please connect your wallet first.");
    try {
      await contract.methods.vote(poll.id, index).send({ from: account });
      alert("Vote cast successfully!");
    } catch (err) {
      alert("Error voting: " + err.message);
    }
  };

  const decodeOption = (hex) => {
    try {
      return web3.utils.hexToUtf8(hex).replace(/\u0000/g, '');
    } catch {
      return hex;
    }
  };

  return (
    <div>
      <h4>{poll.question}</h4>
      <img src={poll.thumbnail} alt="thumbnail" style={{ width: '200px' }} />
      <ul>
        {poll.options.map((opt, idx) => (
          <li key={idx}>
            {decodeOption(opt)} — Votes: {poll.votes[idx]}
            <button onClick={() => vote(idx)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PollDetails;
