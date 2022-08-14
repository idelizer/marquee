import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function countChar(text) {
  // Given an input text block, return a object counting the characters it contains. 
  // Ignore characters not included in marquee letters alphabet.

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

// remove all chars from display that are not in text --> now done in AlphaDisplay with filter  
  // for (let key of Object.keys(charCounter)) {
  //   if (charCounter[key] === 0) {
  //     delete charCounter[key];
  //   };
  // };

  return charCounter
};

function CharDisplay(props) {
  return <h1>{props.char}: {props.count}</h1>;
};

function AlphaDisplay(props) {
  const charCount = Object.entries(props.counts).filter(x => x[1] !== 0).map(
    x => <div><CharDisplay char={x[0]} count={x[1]}/></div>
  )

  return (
    <div>
      {charCount}
    </div>
  )
};

function countDifference(text1, text2) {
  const charsGoingUp = {};       // dict of chars going up on marquee
  const charsComingDown = {};    // dict of chars coming off marquee
  const charsStayingUp = {};     // dict of chars staying on marquee

  let dict1 = countChar(text1['text1']);
  let dict2 = countChar(text2['text2']);

  for (let [key, value] of Object.entries(dict2)) {
    if (value > dict1[key]) {                   
      charsGoingUp[key] = value - dict1[key];
      charsStayingUp[key] = dict1[key]
    };

    if (value < dict1[key]) {
      charsComingDown[key] = dict1[key] - value;
      charsStayingUp[key] = dict2[key]

    };

    if (value != 0) {
      if (value === dict1[key]) {
        charsStayingUp[key] = value;
      };  
    };
  }

  return {
    "charsGoingUp": Object.entries(charsGoingUp),
    "charsComingDown": Object.entries(charsComingDown),
    "charsStayingUp": Object.entries(charsStayingUp),
  }
 
};




function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  // const element = <h1>Hello, world!</h1>;
  //       {element}
  //       {JSON.stringify(countChar(text))}

  return (
    <div className="App">
      <h1>Current Marquee</h1>
      <input
        type="text1"
        value={text1}
        onChange={(e)=>setText1(e.target.value)}
      />
      <AlphaDisplay counts={countChar(text1)} />

      <h1>New Marquee</h1>
      <input
        type="text2"
        value={text2}
        onChange={(e)=>setText2(e.target.value)}
      />
      <AlphaDisplay counts={countChar(text2)} />

      <h1>Difference</h1>
      <h2></h2>

    </div>
  )
};

export default App


// get text
// split text into substrings
// count chars into object

// do twice (current marquee, next marquee)
// compare objects