package com.battlesimulator.sortingAlgorithms;

import java.util.ArrayList;
import java.util.List;

public abstract class AbstractSortingAlgorithm <T extends Comparable<T>> {
    private String name;
    private long comparisons;
    private long executionTime;
    private long swaps;
    private List<SortStep> steps;

    public AbstractSortingAlgorithm(String name){
        this.name = name;
        this.steps = new ArrayList<>();
    }

    protected  void swap(T[] arr, int i, int j) {
       T temp;
       temp = arr[i];
       arr[i] = arr[j];
       arr[j] = temp; 
       swaps++;
       steps.add(new SortStep(StepType.SWAP, i, j));
    }

    protected int compare(T[] array, int i, int j){
        comparisons++;
        
        steps.add(new SortStep(StepType.COMPARISON, i, j));

        return  array[i].compareTo(array[j]);
    }

    public abstract void performSort(T[] array);

    public void sort(T[] array){
        swaps = 0;
        comparisons = 0;
        steps.clear();
        
        long startTime = System.nanoTime();
        performSort(array);
        long endTime = System.nanoTime();
        executionTime = endTime - startTime;
    }

    public long getComparisons() {
        return comparisons;
    }

    public long getExecutionTime() {
        return executionTime;
    }

    public String getName() {
        return name;
    }

    public List<SortStep> getSteps() {
        return steps;
    }

    public long getSwaps() {
        return swaps;
    }
    
}