import { useState, useEffect } from "react";
import Visualizer from "./Visualizer";
import "./App.css";

const apiMap = {
  "Bubble Sort": "bubble",
  "Selection Sort": "selection",
  "Insertion Sort": "insertion",
  "Heap Sort": "heap",
  "Quick Sort": "quick",
};

function App() {
  // algorithm list
  const algorithms = [
    "Bubble Sort",
    "Selection Sort",
    "Insertion Sort",
    "Heap Sort",
    "Quick Sort",
  ];

  // state of the array and array size
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(5); // ברירת מחדל: 20 איברים

  // selected algorithms useState (Split into two explicit slots)
  const [fighter1, setFighter1] = useState(null);
  const [fighter2, setFighter2] = useState(null);

  //state to hold the steps of each fighter
  const [fighter1Data, setFighter1Data] = useState(null);
  const [fighter2Data, setFighter2Data] = useState(null);

  // generate new array function
  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 96) + 5);
    }
    setArray(newArray); // פעולה זו מאפסת את המערך הקודם ושומרת את החדש
  };

  // when the app is running generate array
  useEffect(() => {
    generateArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // array size chenge
  const handleSizeChange = (e) => {
    setArraySize(Number(e.target.value));
  };

  //function that handle the algorithm click
  const toggleFighter = (algName) => {
    // If this algorithm already chose, we will cancel it from its specific slot
    if (fighter1 === algName) {
      setFighter1(null);
    } else if (fighter2 === algName) {
      setFighter2(null);
    }
    // If not chosen, fill the first available slot
    else if (!fighter1) {
      setFighter1(algName);
    } else if (!fighter2) {
      setFighter2(algName);
    }
  };

  //TODO modify it
  const handleSort = async (alg1, alg2) => {
    console.log("here");
    const endpoint1 = apiMap[alg1];
    const endpoint2 = apiMap[alg2];

    try {
      const requeste1 = fetch(`http://localhost:8080/api/sort/${endpoint1}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ array: array }),
      });
      const requeste2 = fetch(`http://localhost:8080/api/sort/${endpoint2}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ array: array }),
      });

      const [response1, response2] = await Promise.all([requeste1, requeste2]);

      const [data1, data2] = await Promise.all([
        response1.json(),
        response2.json(),
      ]);

      setFighter1Data(data1);
      setFighter2Data(data2);

      setArray(data1.returnArray);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app-container">
      <h1>Sorting Algorithms Battle Simulator</h1>
      {/* data input section */}
      <div className="top-section data-input">
        <div className="input-controls">
          <div className="size-control">
            <label htmlFor="arraySize">Array Size: {arraySize}</label>
            <input
              type="range"
              id="arraySize"
              min="5"
              max="100"
              value={arraySize}
              onChange={handleSizeChange}
            />
          </div>

          {/* generate array button */}
          <button onClick={generateArray} className="generate-btn">
            Generate New Array
          </button>
          {/* TODO remove it later */}
          <button onClick={() => handleSort(fighter1, fighter2)}>sort</button>
        </div>{" "}
        {/* <-- כאן נסגר ה-input-controls בצורה תקינה */}
        {/* array display */}
        <div className="array-display">
          <p>Current Array: [{array.join(", ")}]</p>
        </div>
      </div>{" "}
      {/* <-- כאן נסגר ה-top-section בצורה תקינה */}
      {/* central section */}
      <div className="middle-section battle-arena">
        {/* algorithm 1 */}
        <Visualizer
          fighterName={fighter1}
          initialArray={array}
          steps={steps1}
          isRunning={isRunning}
        />

        {/* start button (and enable it only when we choose 2 algorithms)*/}
        <button className="start-button" disabled={!fighter1 || !fighter2}>
          START
        </button>

        {/* algorithm 2 */}
        <Visualizer
          fighterName={fighter2}
          initialArray={array}
          steps={steps2}
          isRunning={isRunning}
        />
      </div>
      {/* bottom section - algorithms selection*/}
      <div className="bottom-section algorithm-selector">
        {algorithms.map((alg, index) => {
          // נבדוק האם האלגוריתם הנוכחי נמצא באחד ממשבצות הנבחרים
          const isSelected = fighter1 === alg || fighter2 === alg;

          return (
            <div
              key={index}
              // נוסיף קלאס CSS מיוחד אם הוא נבחר
              className={`fighter-card ${isSelected ? "selected" : ""}`}
              onClick={() => toggleFighter(alg)}
            >
              {alg}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
