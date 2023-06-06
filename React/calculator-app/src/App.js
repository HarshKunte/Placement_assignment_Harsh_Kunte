import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (value) => {
    setDisplay(display + value);
  };

  const handleClear = () => {
    setDisplay('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = eval(display);
      setResult(calculatedResult);
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div className="calculator">
      <h1>Calculator</h1>
      <div className="display">
        <input type="text" value={display} readOnly />
      </div>
      <div className="buttons">
        <button onClick={() => handleInput('7')}>7</button>
        <button onClick={() => handleInput('8')}>8</button>
        <button onClick={() => handleInput('9')}>9</button>
        <button onClick={() => handleInput('+')}>+</button>
        <button onClick={() => handleInput('4')}>4</button>
        <button onClick={() => handleInput('5')}>5</button>
        <button onClick={() => handleInput('6')}>6</button>
        <button onClick={() => handleInput('-')}>-</button>
        <button onClick={() => handleInput('1')}>1</button>
        <button onClick={() => handleInput('2')}>2</button>
        <button onClick={() => handleInput('3')}>3</button>
        <button onClick={() => handleInput('*')}>*</button>
        <button onClick={() => handleInput('0')}>0</button>
        <button onClick={() => handleInput('.')}>.</button>
        <button onClick={() => handleCalculate()}>=</button>
        <button onClick={() => handleInput('/')}>/</button>
        <button onClick={() => handleClear()} className="clear-button">
          Clear
        </button>
      </div>
      <div className="result">{result}</div>
    </div>
  );
}

export default App;
