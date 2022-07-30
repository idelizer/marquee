import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function countChar(text) {
  // Given an input text block, return a object counting the characters it contains. 
  // Ignore characters not included in marquee letters alphabet and remove characters 
  // that appear zero times from object. 

  const charCounter = {}
  const alpha = "abcdefghijklmnopqrstuvwxyz0123456789.,:'&!"
  
  for (let char of alpha) {
    charCounter[char] = 0;
  };

  text = text.toLowerCase().split("")

  for (let char of text) {
    if (char in charCounter) {
       charCounter[char] ++;
    };
  };

// remove all chars from display that are not in text 
  for (let key of Object.keys(charCounter)) {
    if (charCounter[key] === 0) {
      delete charCounter[key];
    };
  };

  return charCounter
};

function CharDisplay(props) {
  return <h1>{props.char}: {props.count}</h1>;
}

function FullAlpha(props) {
  const charCount = Object.entries(props.counts).map(
    x => <div><CharDisplay char={x[0]} count={x[1]}/></div>
  )

  return (
    <div>
      {charCount}
    </div>
  )
}

function App() {
  const [text, setText] = useState("");
  // const element = <h1>Hello, world!</h1>;
  //       {element}
  //       {JSON.stringify(countChar(text))}

  return (
    <div className="App">
      <input
        type="text"
        value={text}
        onChange={(e)=>setText(e.target.value)}
      />

      <FullAlpha counts={countChar(text)} />

    </div>
  )
}

export default App


// get text
// split text into substrings
// count chars into object

// do twice (current marquee, next marquee)
// compare objects