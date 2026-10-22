package com.battlesimulator.sortingAlgorithms;

public class SortStep {
    StepType type;
    int indexi;
    int indexj;
    Integer value; // הוספנו: שמירת הערך לדריסה

    // בנאי מקורי להשוואות והחלפות (SWAP/COMPARISON)
    public SortStep(StepType type, int i, int j) {
        this.type = type;
        this.indexi = i;
        this.indexj = j;
    }

    // הוספנו: בנאי חדש ייעודי לדריסות (OVERWRITE)
    public SortStep(StepType type, int i, Integer value) {
        this.type = type;
        this.indexi = i;
        this.indexj = -1; // לא רלוונטי בדריסה
        this.value = value;
    }

    public StepType getType() {
        return type;
    }

    public int getIndexi() {
        return indexi;
    }

    public int getIndexj() {
        return indexj;
    }

    // הוספנו: גישה לערך החדש
    public Integer getValue() {
        return value;
    }
}