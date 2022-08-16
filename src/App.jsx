import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function countChar(text) {
  // Given an input text block, return a object counting the characters it contains. 
  // Ignore characters not included in marquee letters alphabet.

  const charCounter = {}
  const alpha = "abcdefghijklmnopqrstuvwxyz0123456789.,:'&!/"
  
  for (let char of alpha) {
    charCounter[char] = 0;
  };

  text = text.toLowerCase().split("")

  for (let char of text) {
    if (char in charCounter) {
       charCounter[char] ++;
    };
  };

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

  let dict1 = countChar(text1);
  let dict2 = countChar(text2);

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
    "charsGoingUp": charsGoingUp,
    "charsComingDown": charsComingDown,
    "charsStayingUp": charsStayingUp,
  }
 
};

function CounterRender(props) {
  const charsGoingUp = props.dict.charsGoingUp
  const charsComingDown = props.dict.charsComingDown
  const charsStayingUp = props.dict.charsStayingUp

  return (
    <div>
      <div>
        <h2>Characters going up: </h2>
        <AlphaDisplay counts={charsGoingUp} />
      </div>
      <div> 
        <h2>Characters coming down: </h2>
        <AlphaDisplay counts={charsComingDown} />
      </div>
      <div>
        <h2>Characters staying up: </h2>
        <AlphaDisplay counts={charsStayingUp} />
      </div>
    </div>
  )
};

function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  return (
    <div className="App">
      <h1>Current Marquee</h1>
      <input
        type="text1"
        value={text1}
        onChange={(e)=>setText1(e.target.value)}
      />
      {/* <AlphaDisplay counts={countChar(text1)} /> */}

      <h1>New Marquee</h1>
      <input
        type="text2"
        value={text2}
        onChange={(e)=>setText2(e.target.value)}
      />
      {/* <AlphaDisplay counts={countChar(text2)} /> */}

      <h1>Difference</h1>
      <CounterRender dict={countDifference(text1, text2)} />

    </div>
  )
};

export default App