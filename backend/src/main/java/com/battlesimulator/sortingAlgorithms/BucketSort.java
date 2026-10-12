package com.battlesimulator.sortingAlgorithms;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BucketSort<T extends Comparable<T>> extends AbstractSortingAlgorithm<T> {

    public BucketSort() {
        super("Bucket sort");
    }

    @Override
    public void performSort(T[] array) {
        int n = array.length;
        if (n <= 1) return;

        // מציאת הערך המקסימלי כדי לדעת איך לחלק לדליים
        int max = ((Number) array[0]).intValue();
        for (int i = 1; i < n; i++) {
            int val = ((Number) array[i]).intValue();
            if (val > max) max = val;
        }

        // ניצור דליים (בדרך כלל כשורש של כמות האיברים)
        int bucketCount = (int) Math.sqrt(n);
        if (bucketCount < 1) bucketCount = 1;
        
        List<List<T>> buckets = new ArrayList<>(bucketCount);
        for (int i = 0; i < bucketCount; i++) {
            buckets.add(new ArrayList<>());
        }

        // חלוקת האיברים מהמערך לתוך הדליים המתאימים
        for (int i = 0; i < n; i++) {
            int val = ((Number) array[i]).intValue();
            int bucketIndex = (val * bucketCount) / (max + 1);
            buckets.get(bucketIndex).add(array[i]);
        }

        // מיון של כל דלי בנפרד והחזרתו למערך המקורי
        int writeIdx = 0;
        for (int i = 0; i < bucketCount; i++) {
            List<T> bucket = buckets.get(i);
            
            // ממיינים את הדלי הספציפי (ברמה הפנימית)
            Collections.sort(bucket); 
            
            // החלק החשוב שלנו: שופכים את התוכן חזרה למערך בעזרת דריסה (OVERWRITE)
            for (T targetVal : bucket) {
                
                overwrite(array, writeIdx, targetVal); // אין שגיאות steps!
                writeIdx++;
                
            }
        }
    }
}