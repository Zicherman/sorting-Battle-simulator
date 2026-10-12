package com.battlesimulator.sortingAlgorithms;

import java.util.ArrayList;
import java.util.List;

public class BucketSort<T extends Comparable<T>> extends AbstractSortingAlgorithm<T> {

    public BucketSort() {
        super("Bucket sort");
    }

    @Override
    public void performSort(T[] array) {
        int n = array.length;
        if (n <= 1) return;

        // Find min and max values to calculate bucket ranges
        int min = ((Number) array[0]).intValue();
        int max = min;
        for (int i = 1; i < n; i++) {
            int val = ((Number) array[i]).intValue();
            if (val < min) min = val;
            if (val > max) max = val;
        }

        if (min == max) return;

        int bucketCount = Math.max(1, (int) Math.sqrt(n));
        int range = max - min + 1;

        // 1. Group elements by their bucket index
        List<List<T>> buckets = new ArrayList<>(bucketCount);
        for (int i = 0; i < bucketCount; i++) {
            buckets.add(new ArrayList<>());
        }

        for (int i = 0; i < n; i++) {
            // Visual comparison flash when inspecting the element
            compare(array, i, i);
            int val = ((Number) array[i]).intValue();
            int bucketIdx = (val - min) * bucketCount / range;
            if (bucketIdx >= bucketCount) bucketIdx = bucketCount - 1;
            buckets.get(bucketIdx).add(array[i]);
        }

        // 2. Move elements in-place into their respective bucket zones using swaps
        int writeIdx = 0;
        int[] bucketBoundaries = new int[bucketCount + 1];
        bucketBoundaries[0] = 0;

        for (int b = 0; b < bucketCount; b++) {
            for (T targetVal : buckets.get(b)) {
                // Find where this element currently sits from writeIdx onwards
                int findIdx = writeIdx;
                while (findIdx < n && !array[findIdx].equals(targetVal)) {
                    findIdx++;
                }
                // Bring it to writeIdx using a swap
                if (findIdx < n && findIdx != writeIdx) {
                    swap(array, writeIdx, findIdx);
                }
                writeIdx++;
            }
            bucketBoundaries[b + 1] = writeIdx;
        }

        // 3. Sort each bucket individually using Insertion Sort
        for (int b = 0; b < bucketCount; b++) {
            int start = bucketBoundaries[b];
            int end = bucketBoundaries[b + 1];
            for (int i = start + 1; i < end; i++) {
                int j = i;
                while (j > start && compare(array, j - 1, j) > 0) {
                    swap(array, j - 1, j);
                    j--;
                }
            }
        }
    }
}