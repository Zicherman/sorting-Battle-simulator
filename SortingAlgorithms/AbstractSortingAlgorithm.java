import java.util.ArrayList;
import java.util.List;

public abstract class AbstractSortingAlgorithm <T extends Comparable<T>> {
    private String name;
    private long comperisons;
    private long executionTime;
    private long swaps;
    private List<SortStep> steps;
    //MAYBE: change the steptype to be private
    // private enum StepType {
    //     COMPARE,
    //     SWAP
    // }

    public AbstractSortingAlgorithm(String name){
        this.name = name;
        this.steps = new ArrayList<>();
    }

    protected  void swap(T[] arr, int i, int j) {
       T temp;
       temp = arr[i];
       arr[i] = arr[j];
       arr[j] = temp; 
       swaps++;
       steps.add(new SortStep(StepType.SWAP, i, j));
    }

    protected int compare(T[] array, int i, int j){
        comperisons++;
        
        steps.add(new SortStep(StepType.COMPARISON, i, j));

        return  array[i].compareTo(array[j]);
    }

    public abstract void performSort(T[] array);

    public void sort(T[] array){
        swaps = 0;
        comperisons = 0;
        executionTime = 0;
        //TODO add a start timer
        performSort(array);
        //TODO stop the timer and set execution time
    }
}