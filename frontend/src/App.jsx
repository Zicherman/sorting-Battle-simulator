// frontend/src/App.jsx
import { useState, useEffect, useCallback } from "react";
import Visualizer from "./Visualizer";
import "./App.css";

const apiMap = {
  "Bubble Sort": "bubble",
  "Selection Sort": "selection",
  "Insertion Sort": "insertion",
  "Heap Sort": "heap",
  "Quick Sort": "quick",
  "Shell Sort": "shell",
  "Merge Sort": "merge",
  "Bucket Sort": "bucket",
  "Radix Sort": "radix",
};

const algorithms = [
  "Bubble Sort",
  "Selection Sort",
  "Insertion Sort",
  "Heap Sort",
  "Quick Sort",
  "Shell Sort",
  "Merge Sort",
  "Bucket Sort",
  "Radix Sort",
];

function App() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(20);

  const [fighter1, setFighter1] = useState(null);
  const [fighter2, setFighter2] = useState(null);

  const [fighter1Data, setFighter1Data] = useState(null);
  const [fighter2Data, setFighter2Data] = useState(null);

  const [activeRunners, setActiveRunners] = useState(0);
  const isRunning = activeRunners > 0;

  // פונקציה שמייצרת מערך חדש (מקבלת גודל אופציונלי כדי לתמוך בעזיבת הסליידר)
  const generateArray = (customSize = arraySize) => {
    if (isRunning) return;
    setActiveRunners(0);
    setFighter1Data(null);
    setFighter2Data(null);

    const newArray = [];
    for (let i = 0; i < customSize; i++) {
      newArray.push(Math.floor(Math.random() * 96) + 5);
    }
    setArray(newArray);
  };

  // רץ פעם אחת בלבד בטעינת האפליקציה
  useEffect(() => {
    generateArray(arraySize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // <-- שינוי 1: בזמן הגרירה מעדכנים רק את המספר בתצוגה (בלי לקרוא ל-generateArray)
  const handleSizeChange = (e) => {
    if (isRunning) return;
    setArraySize(Number(e.target.value));
  };

  // <-- שינוי 2: פונקציה שנקראת רק כשעוזבים את הלחיצה על הסליידר!
  const handleSliderRelease = () => {
    if (isRunning) return;
    generateArray(arraySize);
  };

  // <-- שינוי 3: פונקציית Reset שמפסיקה את הקרב ומחזירה את המערך למצבו ההתחלתי
  const handleReset = () => {
    setActiveRunners(0); // עוצר את מצב הריצה ומשחרר כפתורים
    setFighter1Data(null); // מוחק את הצעדים של לוחם 1 (מאפס את ה-Visualizer שלו)
    setFighter2Data(null); // מוחק את הצעדים של לוחם 2 (מאפס את ה-Visualizer שלו)
    setFighter1(null);
    setFighter2(null);
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

  const handleFighterFinish = useCallback(() => {
    setActiveRunners((prev) => Math.max(0, prev - 1));
  }, []);

  const handleSort = async (alg1, alg2) => {
    if (!alg1 || !alg2 || isRunning) return;

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
      setActiveRunners(2);
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
            {/* <-- שינוי 4: הוספת onMouseUp ו-onTouchEnd לסליידר */}
            <input
              type="range"
              id="arraySize"
              min="5"
              max="100"
              value={arraySize}
              onChange={handleSizeChange}
              onMouseUp={handleSliderRelease}
              onTouchEnd={handleSliderRelease}
              disabled={isRunning}
            />
          </div>

          <button
            onClick={() => generateArray(arraySize)}
            className="generate-btn"
            disabled={isRunning}
          >
            Generate New Array
          </button>
        </div>
      </div>

      {/* central section */}
      <div className="middle-section battle-arena">
        <Visualizer
          fighterName={fighter1}
          initialArray={array}
          steps={fighter1Data?.steps}
          executionTime={fighter1Data?.executionTime}
          onFinish={handleFighterFinish}
        />

        {/* <-- שינוי 5: עטיפת כפתורי ה-START וה-RESET יחד במרכז הזירה */}
        <div className="center-controls">
          <button
            className="start-button"
            disabled={!fighter1 || !fighter2 || isRunning}
            onClick={() => handleSort(fighter1, fighter2)}
          >
            {isRunning ? "RUNNING" : "START"}
          </button>

          <button
            className="reset-button"
            // disabled={
            //   !fighter1Data ||
            //   !fighter2Data ||
            //   !isRunning ||
            //   !fighter2 ||
            //   !fighter1
            // }
            onClick={handleReset}
          >
            RESET
          </button>
        </div>

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
