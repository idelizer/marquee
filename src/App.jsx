import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function charCounter(text) {
  const charCount = {}
  const alpha = "abcdefghijklmnopqrstuvwxyz0123456789.,:'&!"
  
  for (let char of alpha) {
    charCount[char] = 0;
  };

  text = text.toLowerCase().split("")

  for (let char of text) {
    if (char in charCount) {
       charCount[char] ++;
    };
  };

  return charCount
};

function App() {
  const [text, setText] = useState("");

  return (
    <div className="App">
      <input
        type="text"
        value={text}
        onChange={(e)=>setText(e.target.value)}
      />
      {JSON.stringify(charCounter(text))}
      

    </div>
  )
}

export default App


// get text
// split text into substrings
// count chars into object

// do twice (current marquee, next marquee)
// compare objects