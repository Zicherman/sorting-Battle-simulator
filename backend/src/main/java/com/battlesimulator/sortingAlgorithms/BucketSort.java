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
            // הוספת צעד השוואת דמה כדי שה-Visualizer יאיר את האיבר הנקרא בצהוב
            compare(array, i, i); 
            
            int val = ((Number) array[i]).intValue();
            int bucketIndex = (val * bucketCount) / (max + 1);
            buckets.get(bucketIndex).add(array[i]);
        }

        // שפיכת הדליים חזרה למערך. הם מרוכזים לפי טווחים, אבל עדיין לא ממוינים לגמרי בפנים
        int writeIdx = 0;
        for (int i = 0; i < bucketCount; i++) {
            for (T targetVal : buckets.get(i)) {
                overwrite(array, writeIdx, targetVal); 
                writeIdx++;
            }
        }

        // הפעלת Insertion Sort על המערך הראשי כדי למיין סופית ולאנמץ את ה"שיניים"
        for(int i = 1; i < n; i++){
            for(int j = i; j > 0; j--){
                if (compare(array, j-1, j) > 0) {
                    swap(array, j-1, j);
                } else {
                    break;
                }
            }
        }
    }
}