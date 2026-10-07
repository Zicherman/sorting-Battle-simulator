package com.battlesimulator;

import java.util.List;

import com.battlesimulator.sortingAlgorithms.SortStep;

public class SortResponse {
    private Integer[] returnArray;
    private List<SortStep> steps;
    private long swaps;
    private long comparisons;
    private long executionTime;

    public Integer[] getReturnArray() {
        return returnArray;
    }

    public List<SortStep> getSteps() {
        return steps;
    }

    public long getComparisons() {
        return comparisons;
    }

    public long getExecutionTime() {
        return executionTime;
    }

    public long getSwaps() {
        return swaps;
    }

    public void setReturnArray(Integer[] returnArray) {
        this.returnArray = returnArray;
    }

    public void setSteps(List<SortStep> steps) {
        this.steps = steps;
    }

    public void setComparisons(long comparisons) {
        this.comparisons = comparisons;
    }

    public void setExecutionTime(long executionTime) {
        this.executionTime = executionTime;
    }

    public void setSwaps(long swaps) {
        this.swaps = swaps;
    }
}
