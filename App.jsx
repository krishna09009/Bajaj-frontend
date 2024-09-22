import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const result = await axios.post('http://localhost:3000/bfhl', parsedInput);
      setResponse(result.data);
    } catch (err) {
      setError(err.message); 
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <div>
            <h3>Alphabets:</h3>
            <p>{response.alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div>
            <h3>Numbers:</h3>
            <p>{response.numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>
            <h3>Highest lowercase alphabet:</h3>
            <p>{response.highest_lowercase_alphabet.join(', ')}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter JSON input"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <h2>Select options to display:</h2>
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes('Alphabets')}
                onChange={() => handleOptionChange('Alphabets')}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes('Numbers')}
                onChange={() => handleOptionChange('Numbers')}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes('Highest lowercase alphabet')}
                onChange={() => handleOptionChange('Highest lowercase alphabet')}
              />
              Highest lowercase alphabet
            </label>
          </div>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;