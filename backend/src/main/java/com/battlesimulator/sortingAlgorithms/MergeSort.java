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
        // איחוד ליניארי קלאסי לתוך רשימת עזר
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

        // השינוי שלנו: במקום לחפש איפה האיבר נמצא במערך ולהחליף, 
        // פשוט עוברים על רשימת העזר ודורסים את המערך המקורי!
        for (int k = 0; k < merged.size(); k++) {
            int writeIdx = left + k;
            T targetVal = merged.get(k);
            
            // שימוש בפונקציה החדשה שעושה הכל: מעדכנת, סופרת ומתעדת אנימציה של OVERWRITE
            overwrite(array, writeIdx, targetVal); 
        }
    }
}