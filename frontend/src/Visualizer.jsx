// frontend/src/Visualizer.jsx
import { useState, useEffect } from "react";
import styled from "styled-components";

// 1. מיכל העמודות (הזירה הפנימית)
const BarsContainer = styled.div`
  display: flex;
  align-items: flex-end; /* מצמיד את העמודות לתחתית כך שיצמחו למעלה */
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0.75rem;
  gap: 0.2vw;
  box-sizing: border-box;
`;

// 2. העמודה הבודדת - נשלטת על ידי props של גובה ומצב
const ArrayBar = styled.div`
  flex: 1; /* רוחב דינמי שמתחלק שווה בשווה לפי גודל המערך */
  height: ${(props) => props.$height}%;

  /* צבע ברירת מחדל לבן, משתנה לפי סוג הפעולה מה-State */
  background-color: ${(props) => {
    if (props.$status === "SWAP") return "#e74c3c"; // אדום - החלפה
    if (props.$status === "COMPARE") return "#f1c40f"; // צהוב - השוואה
    if (props.$status === "SORTED") return "#2ecc71"; // ירוק - מיקום נכון / סיום
    return "#ffffff"; // לבן - ברירת מחדל
  }};

  transition:
    height 0.08s ease,
    background-color 0.05s ease;
  border-top-left-radius: 0.15rem;
  border-top-right-radius: 0.15rem;
`;

function Visualizer({
  fighterName,
  initialArray,
  steps,
  isRunning,
  speed = 40,
}) {
  const [displayArray, setDisplayArray] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [activeIndices, setActiveIndices] = useState([]);
  const [stepType, setStepType] = useState(null);

  const [swaps, setSwaps] = useState(0);
  const [comparisons, setComparisons] = useState(0);

  // איפוס המערך והמונים כשמג'נרטים מערך חדש או מחליפים לוחם
  useEffect(() => {
    setDisplayArray([...initialArray]);
    setCurrentStepIdx(0);
    setActiveIndices([]);
    setStepType(null);
    setSwaps(0);
    setComparisons(0);
  }, [initialArray, fighterName]);

  // איפוס לקראת תחילת ריצה חדשה כשמתקבלים צעדים מהשרת
  useEffect(() => {
    if (steps && steps.length > 0) {
      setDisplayArray([...initialArray]);
      setCurrentStepIdx(0);
      setSwaps(0);
      setComparisons(0);
    }
  }, [steps, initialArray]);

  // מנוע האנימציה שעובר על הצעדים מהשרת
  useEffect(() => {
    if (!isRunning || !steps || steps.length === 0) return;

    // אם הגענו לסוף הצעדים - כל המערך במקום הנכון (SORTED)
    if (currentStepIdx >= steps.length) {
      setActiveIndices([]);
      setStepType("SORTED");
      return;
    }

    const timer = setTimeout(() => {
      const step = steps[currentStepIdx];

      // שליפת האינדקסים וסוג הצעד מתוך האובייקט שחזר מ-SortStep.java
      const i = step.index1 ?? step.i;
      const j = step.index2 ?? step.j;
      const type = step.type ?? step.stepType;

      setActiveIndices([i, j]);
      setStepType(type);

      if (type === "COMPARE") {
        setComparisons((prev) => prev + 1);
      } else if (type === "SWAP") {
        setSwaps((prev) => prev + 1);
        setDisplayArray((prevArr) => {
          const newArr = [...prevArr];
          const temp = newArr[i];
          newArr[i] = newArr[j];
          newArr[j] = temp;
          return newArr;
        });
      }

      setCurrentStepIdx((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isRunning, steps, currentStepIdx, speed]);

  // פונקציית עזר שקובעת את ה-status שיועבר כ-prop לכל עמודה
  const getBarStatus = (idx) => {
    if (stepType === "SORTED") return "SORTED";
    if (activeIndices.includes(idx)) return stepType; // יחזיר 'COMPARE' או 'SWAP'
    return "DEFAULT"; // יגרום לעמודה להיות לבנה
  };

  return (
    <div className="animation-panel">
      <h2>{fighterName || "Waiting for Fighter..."}</h2>

      <div className="animation-screen">
        {fighterName ? (
          <BarsContainer>
            {displayArray.map((value, idx) => (
              <ArrayBar key={idx} $height={value} $status={getBarStatus(idx)} />
            ))}
          </BarsContainer>
        ) : (
          <p>Select an algorithm below</p>
        )}
      </div>

      <div className="stats-bar">
        <div className="stat-box">Swap: {swaps}</div>
        <div className="stat-box">Comp: {comparisons}</div>
      </div>
    </div>
  );
}

export default Visualizer;
