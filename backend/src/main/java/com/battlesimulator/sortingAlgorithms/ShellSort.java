package com.battlesimulator.sortingAlgorithms;

public class ShellSort<T extends Comparable<T>> extends AbstractSortingAlgorithm<T> {
    
    public ShellSort() {
        super("Shell sort");
    }

    @Override
    public void performSort(T[] array) {
        int n = array.length;

        // Start with a big gap, then reduce the gap by half each iteration
        for (int gap = n / 2; gap > 0; gap /= 2) {
            
            // Perform a gapped insertion sort for this gap size
            for (int i = gap; i < n; i++) {
                int j = i;
                
                // Compare elements that are 'gap' distance apart and swap if needed
                while (j >= gap && compare(array, j - gap, j) > 0) {
                    swap(array, j - gap, j);
                    j -= gap;
                }
            }
        }
    }
}