package sortingAlgorithms;

public class HeapSort<T extends Comparable<T>> extends AbstractSortingAlgorithm<T> {

    public HeapSort() {
        super("Heap sort");
    }

    public void performSort(T[] array) {
        int n = array.length;

        // שלב 1: בניית הערימה (Max Heap)
        // מתחילים מהאבא האחרון (n/2 - 1) ועולים למעלה עד השורש באינדקס 0
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(array, n, i);
        }

        // שלב 2: שליפה ומיון
        // רצים מהסוף להתחלה - בכל פעם לוקחים את הכי גדול (שבראש) וזורקים לסוף
        for (int i = n - 1; i > 0; i--) {
            swap(array, 0, i); // העברת המקסימום הנוכחי לסוף המערך
            
            // תיקון הערימה עבור שאר האיברים שנשארו (הגודל מתכווץ ל-i)
            heapify(array, i, 0); 
        }
    }

    // פונקציית העזר: מחלחלת איבר קטן למטה כדי לשמור על חוקיות הערימה
    private void heapify(T[] array, int n, int i) {
        int largest = i; // מניחים כרגע שהאבא הוא הכי גדול
        int left = 2 * i + 1; // אינדקס הילד השמאלי
        int right = 2 * i + 2; // אינדקס הילד הימני

        if (left < n && compare(array, left, largest) > 0) {
            largest = left;
        }

        if (right < n && compare(array, right, largest) > 0) {
            largest = right;
        }

        if (largest != i) {
            swap(array, i, largest);
            heapify(array, n, largest);
        }
    }
}