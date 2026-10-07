package com.battlesimulator.sortingAlgorithms;

public class SortStep{
    StepType type;
    int indexi;
    int indexj;

    public SortStep(StepType type, int i, int j){
        this.type = type;
        this.indexi = i;
        this.indexj = j;
    }

    public StepType getType(){
        return type;
    }

    public int getIndexi() {
        return indexi;
    }

    public int getIndexj() {
        return indexj;
    }
}

