package sortingAlgorithms;

public class BubbleSort<T extends Comparable<T>> extends AbstractSortingAlgorithm<T> {

    public BubbleSort() {
        super("Bubble Sort");
    }

    @Override
    public void performSort(T[] array) {
        int n = array.length;
        // We only need to do n-1 passes
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                // Must check > 0, not == 1
                if (compare(array, j, j + 1) > 0) {
                    swap(array, j, j + 1);
                }
            }
        }
    }
}