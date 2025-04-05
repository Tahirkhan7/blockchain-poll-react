import React, { useEffect, useState } from 'react';
import contract from '../utils/contract';
import PollDetails from './PollDetails';

function PollList() {
  const [polls, setPolls] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const total = await contract.methods.getTotalPolls().call();
        console.log("Total polls:", total); // 👈

        const loaded = [];

        for (let i = 0; i < total; i++) {
          const poll = await contract.methods.getPoll(i).call();
          console.log("Poll", i, poll); // 👈

          loaded.push({
            id: poll[0],
            question: poll[1],
            thumbnail: poll[2],
            votes: poll[3],
            options: poll[4]
          });
        }

        setPolls(loaded);
      } catch (err) {
        console.error("Error fetching polls:", err);
      }
    };

    fetchPolls();
  }, []);

  return (
    <div>
      <h3>Poll List</h3>
      {polls.length === 0 ? (
        <p>No polls found.</p>
      ) : (
        polls.map(poll => (
          <div key={poll.id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '10px' }}>
            <h4 onClick={() => setSelected(poll)}>{poll.question}</h4>
            {poll.thumbnail && <img src={poll.thumbnail} alt="thumbnail" width={150} />}
          </div>
        ))
      )}
      {selected && <PollDetails poll={selected} />}
    </div>
  );
}

export default PollList;
