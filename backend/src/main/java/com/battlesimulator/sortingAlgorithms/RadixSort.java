package com.battlesimulator.sortingAlgorithms;

import java.util.ArrayList;
import java.util.List;

public class RadixSort<T extends Comparable<T>> extends AbstractSortingAlgorithm<T> {

    public RadixSort() {
        super("Radix sort");
    }

    @Override
    public void performSort(T[] array) {
        int n = array.length;
        if (n <= 1) return;

        int max = ((Number) array[0]).intValue();
        for (int i = 1; i < n; i++) {
            int val = ((Number) array[i]).intValue();
            if (val > max) max = val;
        }

        // מעבר על כל ספרה (אחדות, עשרות, מאות...)
        for (int exp = 1; max / exp > 0; exp *= 10) {
            
            List<List<T>> buckets = new ArrayList<>(10);
            for (int d = 0; d < 10; d++) {
                buckets.add(new ArrayList<>());
            }

            // שלב הקריאה: הכנסת האיברים לדליים לפי הספרה הנוכחית
            for (int i = 0; i < n; i++) {
                // התוספת לאנימציה: "הבזק" על האיבר שאנחנו קוראים עכשיו כדי למיין לדלי
                compare(array, i, i); 
                
                int val = ((Number) array[i]).intValue();
                int digit = (val / exp) % 10;
                buckets.get(digit).add(array[i]);
            }

            // שלב הכתיבה: החזרת האיברים למערך ודריסתם (גל האנימציה הסגול)
            int writeIdx = 0;
            for (int d = 0; d < 10; d++) {
                for (T targetVal : buckets.get(d)) {
                    overwrite(array, writeIdx, targetVal);
                    writeIdx++;
                }
            }
        }
    }
}