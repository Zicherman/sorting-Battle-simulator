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
    if (props.$status === "SWAP") return "#e74c3c";
    if (props.$status === "OVERWRITE") return "#9b59b6"; // הוספנו: סגול - דריסת ערך!
    if (props.$status === "COMPARISON") return "#f1c40f";
    if (props.$status === "SORTED") return "#2ecc71";
    return "#ffffff";
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

  const targetSortedArray = useMemo(() => {
    return [...initialArray].sort((a, b) => a - b);
  }, [initialArray]);

  const lastSwapStepForIndex = useMemo(() => {
    const map = {};
    if (!steps) return map;
    steps.forEach((step, stepIdx) => {
      if (step.type === "SWAP" || step.type === "OVERWRITE") {
        const i = step.indexi ?? step.index1 ?? step.i;
        const j = step.indexj ?? step.index2 ?? step.j;
        if (i !== undefined && i !== -1) map[i] = stepIdx;
        if (j !== undefined && j !== -1) map[j] = stepIdx;
      }
    });
    return map;
  }, [steps]);

  useEffect(() => {
    setDisplayArray([...initialArray]);
    setCurrentStepIdx(0);
    setActiveIndices([]);
    setStepType(null);
    setSwaps(0);
    setComparisons(0);
  }, [initialArray, fighterName, steps]);

  useEffect(() => {
    if (!steps || steps.length === 0) return;

    if (currentStepIdx >= steps.length) {
      if (stepType !== "SORTED") {
        setActiveIndices([]);
        setStepType("SORTED");
        if (onFinish) onFinish();
      }
      return;
    }

    const timer = setTimeout(() => {
      const step = steps[currentStepIdx];

      const i = step.indexi ?? step.index1 ?? step.i;
      const j = step.indexj ?? step.index2 ?? step.j;
      const val = step.value ?? step.val; // הוספנו: משיכת הערך לדריסה
      const rawType = step.type ?? step.stepType;

      const normalizedType =
        rawType === "COMPARISON" || rawType === "COMPARE"
          ? "COMPARISON"
          : rawType;

      // הוספנו: אם זו דריסה, רק אינדקס i פעיל. אחרת, i ו-j
      setActiveIndices(normalizedType === "OVERWRITE" ? [i] : [i, j]);
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
      } else if (normalizedType === "OVERWRITE") {
        // הוספנו: טיפול באנימציה של דריסה
        setDisplayArray((prevArr) => {
          const newArr = [...prevArr];
          newArr[i] = val; // משנה רק את הגובה של העמודה
          return newArr;
        });
      }

      setCurrentStepIdx((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [steps, currentStepIdx, speed, stepType, onFinish]);

  const getBarStatus = (idx) => {
    if (stepType === "SORTED") return "SORTED";
    if (activeIndices.includes(idx)) return stepType;

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
        <div className="stat-box">Swap/Write: {swaps}</div>
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
