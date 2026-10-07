package com.battlesimulator.sortingAlgorithms;

public class InsertionSort <T extends Comparable<T>> extends AbstractSortingAlgorithm<T> {
    
    public InsertionSort(){
        super("Insertion sort");
    }

    @Override 
    public void performSort(T[] array){
        for(int i=1; i < array.length; i++){
            for(int j=i; j>0; j--){
                if (compare(array, j-1, j)>0) {
                    swap(array, j-1, j);
                } else {
                    break;
                }
            }
        }
    }
}
