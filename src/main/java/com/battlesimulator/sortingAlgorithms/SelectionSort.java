package com.battlesimulator.sortingAlgorithms;

public class SelectionSort<T extends Comparable<T>> extends AbstractSortingAlgorithm<T> {

    public SelectionSort() {
        super("Selection Sort");
    }

    @Override
    public void performSort(T[] array) {
        int n = array.length;
        // We only need to do n-1 passes
        for (int i = 0; i < n - 1; i++) {
            
            int maxIndex = 0;
            for (int j = 1; j <= n - 1 - i; j++) {
                if (compare(array, j, maxIndex) > 0) {
                    maxIndex = j;
                }
            }
        swap(array, maxIndex, n - 1 - i);    
        }
    }
}
