import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import marqueeOne from './assets/1marquee.svg'
import marqueeTwo from './assets/2marquee.svg'
import marqueeThree from './assets/3marquee.svg'


function countChar(text) {
  // Given an input text block, return a object counting the characters it contains. 
  // Ignore characters not included in marquee letters alphabet.

  const charCounter = {}
  const alpha = "abcdefghijklmnopqrstuvwxyz0123456789.,:'&!/-"
  
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

function AlphaDisplay(props) {
  // 
  const charCount = Object.entries(props.counts).filter(x => x[1] !== 0).map(
    x => 
      <tr>
        <td id="table-character">{x[0]}</td>
        <td id="table-count">{x[1]}</td>
      </tr>
  )

  return (
    <>
       {charCount}
    </>
  )
};

function countDifference(text1, text2) {
  // given two text strings, return an object containing 3 dicts representing diff of texts

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
      <div id="dict1">
        <h3>Characters going up:</h3>
        <table>
            <AlphaDisplay counts={charsGoingUp}/>
        </table>
      </div>
      <div id="dict2">
        <h3>Characters coming down:</h3>
        <table>
            <AlphaDisplay counts={charsComingDown}/>
        </table>
      </div>
      <div id="dict3">
        <h3>Characters staying up:</h3>
        <table>
          <AlphaDisplay counts={charsStayingUp}/>
        </table>  
      </div>
    </div>
  )
};

// animation
//  learn how to usestate and use effect
// check subsolver src/pages/tutorial.tsx for timer under page three
// google useinterval
// }

function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  return (
    <div className="App">

      <img src={marqueeOne}></img>
      

      <textarea
      type="text1"
      value={text1}
      placeholder="Current Marquee"
      onChange={(e)=>setText1(e.target.value)}
      />

      <textarea
      type="text2"
      value={text2}
      placeholder="New Marquee"
      onChange={(e)=>setText2(e.target.value)}
      />
      
      <CounterRender dict={countDifference(text1, text2)} />

    </div>
  )
};


// TODO
// custom fonts? check against size of text box and previous marquee
// fix display of characters/counts 
// marquee graphic at top, animate
// local storage for typing? how to store previous new as new current

export default App