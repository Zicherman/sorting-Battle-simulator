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

  const [isPaused, setIsPaused] = useState(false);
  const [restartSignal, setRestartSignal] = useState(0);

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
    setIsPaused(false);
  };

  const handleRestartBattle = () => {
    setRestartSignal((prev) => prev + 1); // Triggers the useEffect in Visualizer to reset steps
    setIsPaused(false); // Unpause if paused
    setActiveRunners(2); // Set runners back to active
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
    setIsPaused(false);
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
          isPaused={isPaused}
          restartSignal={restartSignal}
        />

        {/* <-- מרכז הזירה - כפתורים --> */}
        <div
          className="center-controls"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "center",
          }}
        >
          {/* כפתור ה-START נשאר גדול וברור */}
          <button
            className="start-button"
            disabled={!fighter1 || !fighter2 || isRunning}
            onClick={() => handleSort(fighter1, fighter2)}
            style={{ width: "100%" }}
          >
            {isRunning ? "RUNNING" : "START"}
          </button>

          {/* שורת כפתורי הפעולות הקטנים - תופיע רק כשיש מידע על המסך */}
          {(fighter1Data || fighter2Data) && (
            <div
              style={{ display: "flex", gap: "12px", justifyContent: "center" }}
            >
              {/* CLEAR (פח אשפה) */}
              <button
                className="icon-button"
                onClick={handleReset}
                title="Clear Arena"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>

              {/* PAUSE / RESUME (השהיה/ניגון) */}
              <button
                className="icon-button"
                onClick={() => setIsPaused(!isPaused)}
                title={isPaused ? "Resume" : "Pause"}
              >
                {isPaused ? (
                  // אייקון Play
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                ) : (
                  // אייקון Pause
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                )}
              </button>

              {/* RESTART (חץ רענון) */}
              <button
                className="icon-button"
                onClick={handleRestartBattle}
                title="Restart Battle"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
              </button>
            </div>
          )}
        </div>

        <Visualizer
          fighterName={fighter2}
          initialArray={array}
          steps={fighter2Data?.steps}
          executionTime={fighter2Data?.executionTime}
          onFinish={handleFighterFinish}
          isPaused={isPaused}
          restartSignal={restartSignal}
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
