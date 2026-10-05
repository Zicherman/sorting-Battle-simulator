import java.util.Random;

public class quickSort<T extends Comparable<T>> extends AbstractSortingAlgorithm<T> {
    
    private Random rand;
    
    public quickSort() {
        super("Quick Sort");
        this.rand = new Random();
    }

    @Override
    public void performSort(T[] array) {
        quickSort(array, 0, array.length - 1);
    }

    private void quickSort(T[] array, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(array, low, high);

            quickSort(array, low, pivotIndex - 1);
            quickSort(array, pivotIndex + 1, high);
        }
    }
    
    private int partition(T[] array, int low, int high) {
        //Pick a random index between low and high (inclusive)
        int randomPivotIndex = rand.nextInt(high - low + 1) + low;
        
        //Swap the random element with the last element (Lomuto partition).
        swap(array, randomPivotIndex, high);

        //Standard Lomuto partitioning
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (compare(array, j, high) <= 0) {
                i++;
                swap(array, i, j);
            }
        }
        //return the pivot to his place and return the pivot position
        swap(array, i + 1, high);
        return i + 1;
    }
}