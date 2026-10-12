package com.battlesimulator.sortingAlgorithms;

import java.util.ArrayList;
import java.util.List;

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
            mergeLinear(array, left, mid, right);
        }
    }

    private void mergeLinear(T[] array, int left, int mid, int right) {
        // 1. איחוד ליניארי קלאסי O(n) לתוך רשימת עזר תוך ספירת ההשוואות האמיתיות!
        List<T> merged = new ArrayList<>(right - left + 1);
        int i = left;
        int j = mid + 1;

        while (i <= mid && j <= right) {
            if (compare(array, i, j) <= 0) {
                merged.add(array[i]);
                i++;
            } else {
                merged.add(array[j]);
                j++;
            }
        }

        while (i <= mid) {
            merged.add(array[i]);
            i++;
        }

        while (j <= right) {
            merged.add(array[j]);
            j++;
        }

        // 2. העברת האיברים למקומם בתת-המערך ב-SWAP ישיר אחד לכל איבר (בלי גרירה איטית!)
        for (int k = 0; k < merged.size(); k++) {
            int writeIdx = left + k;
            T targetVal = merged.get(k);

            int findIdx = writeIdx;
            while (findIdx <= right && !array[findIdx].equals(targetVal)) {
                findIdx++;
            }

            if (findIdx <= right && findIdx != writeIdx) {
                swap(array, writeIdx, findIdx);
            }
        }
    }
}