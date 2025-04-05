import React, { useState } from 'react';
import contract from '../utils/contract';
import web3 from '../utils/web3';

function CreatePoll() {
  const [question, setQuestion] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [options, setOptions] = useState('');

  const handleSubmit = async () => {
    const accounts = await web3.eth.getAccounts();
    const optionsArray = options
  .split(',')
  .map(opt => web3.utils.padRight(web3.utils.asciiToHex(opt.trim()), 64));


    await contract.methods.createPoll(question, thumbnail, optionsArray)
      .send({ from: accounts[0] });
  };

  return (
    <div>
      <h2>Create Poll</h2>
      <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Question" />
      <input value={thumbnail} onChange={e => setThumbnail(e.target.value)} placeholder="Thumbnail URL" />
      <input value={options} onChange={e => setOptions(e.target.value)} placeholder="Comma-separated options" />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}

export default CreatePoll;
