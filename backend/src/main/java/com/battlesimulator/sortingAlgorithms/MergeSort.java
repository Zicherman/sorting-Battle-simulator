package com.battlesimulator.sortingAlgorithms;

public class MergeSort<T extends Comparable<T>> extends AbstractSortingAlgorithm<T> {

    public MergeSort() {
        super("Merge sort");
    }

    @Override
    public void performSort(T[] array) {
        if (array == null || array.length <= 1) return;
        mergeSort(array, 0, array.length - 1);
    }

    private void mergeSort(T[] array, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(array, left, mid);
            mergeSort(array, mid + 1, right);
            mergeInPlace(array, left, mid, right);
        }
    }

    private void mergeInPlace(T[] array, int start, int mid, int end) {
        int start2 = mid + 1;

        // If the direct merge is already sorted, no need to do anything
        if (compare(array, mid, start2) <= 0) {
            return;
        }

        while (start <= mid && start2 <= end) {
            // If element 1 is in the right place
            if (compare(array, start, start2) <= 0) {
                start++;
            } else {
                // Element at start2 is smaller than element at start.
                // Shift it into the 'start' position using adjacent swaps to preserve animation!
                int index = start2;
                while (index != start) {
                    swap(array, index - 1, index);
                    index--;
                }

                // Update all pointers
                start++;
                mid++;
                start2++;
            }
        }
    }
}