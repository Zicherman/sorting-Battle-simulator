// frontend/src/Visualizer.jsx
import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

const BarsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0.75rem;
  gap: 0.2vw;
  box-sizing: border-box;
`;

const ArrayBar = styled.div`
  flex: 1;
  height: ${(props) => props.$height}%;

  background-color: ${(props) => {
    if (props.$status === "SWAP") return "#e74c3c"; // אדום - החלפה
    if (props.$status === "COMPARISON") return "#f1c40f"; // צהוב - השוואה
    if (props.$status === "SORTED") return "#2ecc71"; // ירוק - הגיע למקומו הסופי!
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
  executionTime,
  onFinish,
  speed = 40,
}) {
  const [displayArray, setDisplayArray] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [activeIndices, setActiveIndices] = useState([]);
  const [stepType, setStepType] = useState(null);

  const [swaps, setSwaps] = useState(0);
  const [comparisons, setComparisons] = useState(0);

  // חישוב המערך הממוין הסופי כדי שנדע מתי איבר יושב בערך הנכון שלו
  const targetSortedArray = useMemo(() => {
    return [...initialArray].sort((a, b) => a - b);
  }, [initialArray]);

  // חישוב הצעד האחרון שבו כל אינדקס עובר החלפה (SWAP)
  // ברגע שעברנו את הצעד הזה והאיבר שווה לערך הסופי שלו - הוא ייצבע בירוק קבוע תוך כדי הריצה!
  const lastSwapStepForIndex = useMemo(() => {
    const map = {};
    if (!steps) return map;
    steps.forEach((step, stepIdx) => {
      if (step.type === "SWAP") {
        const i = step.indexi ?? step.index1 ?? step.i;
        const j = step.indexj ?? step.index2 ?? step.j;
        map[i] = stepIdx;
        map[j] = stepIdx;
      }
    });
    return map;
  }, [steps]);

  // איפוס כשמג'נרטים מערך חדש, מחליפים לוחם או מקבלים צעדים חדשים
  useEffect(() => {
    setDisplayArray([...initialArray]);
    setCurrentStepIdx(0);
    setActiveIndices([]);
    setStepType(null);
    setSwaps(0);
    setComparisons(0);
  }, [initialArray, fighterName, steps]);

  // מנוע האנימציה
  useEffect(() => {
    // ירוץ רק אם יש צעדים אמיתיים שנשלחו מלחיצה על START
    if (!steps || steps.length === 0) return;

    // סיום כל הצעדים
    if (currentStepIdx >= steps.length) {
      if (stepType !== "SORTED") {
        setActiveIndices([]);
        setStepType("SORTED");
        if (onFinish) onFinish(); // מודיע ל-App שהלוחם הזה סיים!
      }
      return;
    }

    const timer = setTimeout(() => {
      const step = steps[currentStepIdx];

      const i = step.indexi ?? step.index1 ?? step.i;
      const j = step.indexj ?? step.index2 ?? step.j;
      const rawType = step.type ?? step.stepType;

      // נרמול השם כדי שיתפוס גם COMPARISON וגם COMPARE
      const normalizedType =
        rawType === "COMPARISON" || rawType === "COMPARE"
          ? "COMPARISON"
          : rawType;

      setActiveIndices([i, j]);
      setStepType(normalizedType);

      if (normalizedType === "COMPARISON") {
        setComparisons((prev) => prev + 1);
      } else if (normalizedType === "SWAP") {
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
  }, [steps, currentStepIdx, speed, stepType, onFinish]);

  // פונקציה שקובעת את צבע העמודה בכל רגע נתון
  const getBarStatus = (idx) => {
    // 1. אם כל המיון הסתיים - הכל ירוק
    if (stepType === "SORTED") return "SORTED";

    // 2. אם העמודה מושווית או מוחלפת ממש בצעד הנוכחי - צהוב או אדום
    if (activeIndices.includes(idx)) return stepType;

    // 3. בדיקה תוך כדי ריצה: אם הריצה התחילה, האיבר כבר נמצא בערך הסופי שלו,
    // והוא לא יעבור יותר שום SWAP בהמשך הריצה - צבע אותו בירוק כבר עכשיו!
    if (steps && steps.length > 0 && currentStepIdx > 0) {
      const lastSwap = lastSwapStepForIndex[idx] ?? -1;
      if (
        currentStepIdx > lastSwap &&
        displayArray[idx] === targetSortedArray[idx]
      ) {
        return "SORTED";
      }
    }
    return "DEFAULT";
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
        {executionTime !== undefined && stepType === "SORTED" && (
          <div className="stat-box">
            Time: {(executionTime / 1000000).toFixed(4)} ms
          </div>
        )}
        <div className="stat-box">Comp: {comparisons}</div>
      </div>
    </div>
  );
}

export default Visualizer;
