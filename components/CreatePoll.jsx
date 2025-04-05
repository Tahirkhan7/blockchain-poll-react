import React, { useContext, useState } from 'react';
import web3 from '../utils/web3';
import contract from '../utils/contract';
import { WalletContext } from '../context/WalletContext';

export default function CreatePoll({ onPollCreated }) {
  const { account } = useContext(WalletContext);
  const [question, setQuestion] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [options, setOptions] = useState(['', '']);

  const addOption = () => setOptions([...options, '']);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account) return alert("Please connect your wallet first.");

    try {
      const bytes32Options = options.map(opt => {
        const hex = web3.utils.utf8ToHex(opt);
        return web3.utils.padRight(hex, 64);
      });

      await contract.methods
        .createPoll(question, thumbnail, bytes32Options)
        .send({ from: account });

      alert("Poll created successfully!");
      setQuestion('');
      setThumbnail('');
      setOptions(['', '']);
      if (onPollCreated) onPollCreated();
    } catch (err) {
      console.error("Create Poll Error:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Create a New Poll</h3>
      <input
        style={styles.input}
        type="text"
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <input
        style={styles.input}
        type="text"
        placeholder="Thumbnail URL (optional)"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      />

      <div>
        <h4>Options</h4>
        {options.map((opt, idx) => (
          <input
            key={idx}
            style={styles.input}
            type="text"
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={addOption} style={styles.addBtn}>
          + Add Option
        </button>
      </div>

      <button type="submit" style={styles.submitBtn}>Create Poll</button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  input: {
    width: '90%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  addBtn: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    marginBottom: '10px',
  },
  submitBtn: {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};