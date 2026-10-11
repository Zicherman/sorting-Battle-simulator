// frontend/src/App.jsx
// שינוי 1: הוספנו ייבוא של useCallback
import { useState, useEffect, useCallback } from "react";
import Visualizer from "./Visualizer";
import "./App.css";

const apiMap = {
  "Bubble Sort": "bubble",
  "Selection Sort": "selection",
  "Insertion Sort": "insertion",
  "Heap Sort": "heap",
  "Quick Sort": "quick",
};

const algorithms = [
  "Bubble Sort",
  "Selection Sort",
  "Insertion Sort",
  "Heap Sort",
  "Quick Sort",
];

function App() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(5);

  const [fighter1, setFighter1] = useState(null);
  const [fighter2, setFighter2] = useState(null);

  const [fighter1Data, setFighter1Data] = useState(null);
  const [fighter2Data, setFighter2Data] = useState(null);

  // שינוי 2: isRunning נגזר אוטומטית מ-activeRunners (מחקנו את useState(false) של isRunning)
  const [activeRunners, setActiveRunners] = useState(0);
  const isRunning = activeRunners > 0;

  const generateArray = () => {
    if (isRunning) return; // חסימה בזמן ריצה
    setActiveRunners(0); // איפוס מונה הרצים
    setFighter1Data(null);
    setFighter2Data(null);

    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 96) + 5);
    }
    setArray(newArray);
  };

  useEffect(() => {
    generateArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSizeChange = (e) => {
    if (isRunning) return; // שינוי 3: חסימת הזזת הסליידר בזמן ריצה
    setArraySize(Number(e.target.value));
  };

  const toggleFighter = (algName) => {
    if (isRunning) return;
    setFighter1Data(null);
    setFighter2Data(null);
    if (fighter1 === algName) {
      setFighter1(null);
    } else if (fighter2 === algName) {
      setFighter2(null);
    } else if (!fighter1) {
      setFighter1(algName);
    } else if (!fighter2) {
      setFighter2(algName);
    }
  };

  // שינוי 4: עטיפה ב-useCallback כדי שהפונקציה תישאר יציבה בזיכרון בזמן האנימציה
  const handleFighterFinish = useCallback(() => {
    setActiveRunners((prev) => Math.max(0, prev - 1));
  }, []);

  const handleSort = async (alg1, alg2) => {
    if (!alg1 || !alg2 || isRunning) return;

    // איפוס נתונים קודמים לפני תחילת קרב חדש
    setFighter1Data(null);
    setFighter2Data(null);

    const endpoint1 = apiMap[alg1];
    const endpoint2 = apiMap[alg2];

    try {
      const request1 = fetch(`http://localhost:8080/api/sort/${endpoint1}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ array: array }),
      });
      const request2 = fetch(`http://localhost:8080/api/sort/${endpoint2}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ array: array }),
      });

      const [response1, response2] = await Promise.all([request1, request2]);

      const [data1, data2] = await Promise.all([
        response1.json(),
        response2.json(),
      ]);

      setFighter1Data(data1);
      setFighter2Data(data2);
      setActiveRunners(2); // מפעיל את isRunning = true!
    } catch (err) {
      console.error("Error fetching sort data:", err);
      setActiveRunners(0);
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
            {/* שינוי 5: הוספת disabled={isRunning} לסליידר */}
            <input
              type="range"
              id="arraySize"
              min="5"
              max="100"
              value={arraySize}
              onChange={handleSizeChange}
              disabled={isRunning}
            />
          </div>

          {/* שינוי 6: הוספת disabled={isRunning} לכפתור הג'ינרוט */}
          <button
            onClick={generateArray}
            className="generate-btn"
            disabled={isRunning}
          >
            Generate New Array
          </button>
        </div>
      </div>

      {/* central section */}
      <div className="middle-section battle-arena">
        {/* שינוי 7: הסרת || [] מ-steps והעברת onFinish={handleFighterFinish} */}
        <Visualizer
          fighterName={fighter1}
          initialArray={array}
          steps={fighter1Data?.steps}
          executionTime={fighter1Data?.executionTime}
          onFinish={handleFighterFinish}
        />

        {/* שינוי 8: נעילת כפתור ה-START גם כש-isRunning הוא true */}
        <button
          className="start-button"
          disabled={!fighter1 || !fighter2 || isRunning}
          onClick={() => handleSort(fighter1, fighter2)}
        >
          {isRunning ? "RUNNING..." : "START"}
        </button>

        {/* שינוי 9: הסרת || [] מ-steps והעברת onFinish={handleFighterFinish} */}
        <Visualizer
          fighterName={fighter2}
          initialArray={array}
          steps={fighter2Data?.steps}
          executionTime={fighter2Data?.executionTime}
          onFinish={handleFighterFinish}
        />
      </div>

      {/* bottom section - algorithms selection */}
      <div className="bottom-section algorithm-selector">
        {algorithms.map((alg, index) => {
          const isSelected = fighter1 === alg || fighter2 === alg;

          return (
            <div
              key={index}
              // שינוי 10: הוספת קלאס disabled-card בזמן ריצה
              className={`fighter-card ${isSelected ? "selected" : ""} ${
                isRunning ? "disabled-card" : ""
              }`}
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
