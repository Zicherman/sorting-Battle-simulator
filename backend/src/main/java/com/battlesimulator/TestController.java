package com.battlesimulator;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.battlesimulator.sortingAlgorithms.AbstractSortingAlgorithm;
import com.battlesimulator.sortingAlgorithms.BubbleSort;
import com.battlesimulator.sortingAlgorithms.BucketSort;
import com.battlesimulator.sortingAlgorithms.HeapSort;
import com.battlesimulator.sortingAlgorithms.InsertionSort;
import com.battlesimulator.sortingAlgorithms.MergeSort;
import com.battlesimulator.sortingAlgorithms.QuickSort;
import com.battlesimulator.sortingAlgorithms.RadixSort;
import com.battlesimulator.sortingAlgorithms.SelectionSort;
import com.battlesimulator.sortingAlgorithms.ShellSort;


@RestController
@CrossOrigin 
public class TestController {

    @GetMapping("/api/test")
    public String sayHello() {
        return "The Java Backend is alive!";
    }

    @PostMapping("/api/sort/quick")
    public SortResponse processQuickSort(@RequestBody SortRequest request) {
        
        Integer[] arrayToSort = request.getArray();
        AbstractSortingAlgorithm<Integer> quickSort = new QuickSort<>();
        quickSort.sort(arrayToSort);

        SortResponse response = new SortResponse();

        response.setReturnArray(arrayToSort);
        response.setSteps(quickSort.getSteps());
        response.setComparisons(quickSort.getComparisons());
        response.setSwaps(quickSort.getSwaps());
        response.setExecutionTime(quickSort.getExecutionTime());

        return response;
    }

    @PostMapping ("/api/sort/bubble")
    public SortResponse processBubbleSort(@RequestBody SortRequest request){
        Integer[] arrayToSort = request.getArray();
        
        AbstractSortingAlgorithm<Integer> bubbleSort = new BubbleSort<>();
        bubbleSort.sort(arrayToSort);

        SortResponse response = new SortResponse();

        response.setReturnArray(arrayToSort);
        response.setSteps(bubbleSort.getSteps());
        response.setComparisons(bubbleSort.getComparisons());
        response.setSwaps(bubbleSort.getSwaps());
        response.setExecutionTime(bubbleSort.getExecutionTime());

        return response;
    }

    @PostMapping ("/api/sort/selection")
    public SortResponse processSelectionSort(@RequestBody SortRequest request){
        Integer[] arrayToSort = request.getArray();
        
        AbstractSortingAlgorithm<Integer> selectionSort = new SelectionSort<>();
        selectionSort.sort(arrayToSort);

        SortResponse response = new SortResponse();

        response.setReturnArray(arrayToSort);
        response.setSteps(selectionSort.getSteps());
        response.setComparisons(selectionSort.getComparisons());
        response.setSwaps(selectionSort.getSwaps());
        response.setExecutionTime(selectionSort.getExecutionTime());

        return response;
    }

    @PostMapping ("/api/sort/insertion")
    public SortResponse processInsertionSort(@RequestBody SortRequest request){
        Integer[] arrayToSort = request.getArray();
        
        AbstractSortingAlgorithm<Integer> insertionSort = new InsertionSort<>();
        insertionSort.sort(arrayToSort);

        SortResponse response = new SortResponse();

        response.setReturnArray(arrayToSort);
        response.setSteps(insertionSort.getSteps());
        response.setComparisons(insertionSort.getComparisons());
        response.setSwaps(insertionSort.getSwaps());
        response.setExecutionTime(insertionSort.getExecutionTime());

        return response;
    }

    @PostMapping ("/api/sort/heap")
    public SortResponse processHeapSort(@RequestBody SortRequest request){
        Integer[] arrayToSort = request.getArray();
        
        AbstractSortingAlgorithm<Integer> heapSort = new HeapSort<>();
        heapSort.sort(arrayToSort);

        SortResponse response = new SortResponse();

        response.setReturnArray(arrayToSort);
        response.setSteps(heapSort.getSteps());
        response.setComparisons(heapSort.getComparisons());
        response.setSwaps(heapSort.getSwaps());
        response.setExecutionTime(heapSort.getExecutionTime());

        return response;
    }

    @PostMapping ("/api/sort/shell")
    public SortResponse processShellSort(@RequestBody SortRequest request){
        Integer[] arrayToSort = request.getArray();
        
        AbstractSortingAlgorithm<Integer> shellSort = new ShellSort<>();
        shellSort.sort(arrayToSort);

        SortResponse response = new SortResponse();

        response.setReturnArray(arrayToSort);
        response.setSteps(shellSort.getSteps());
        response.setComparisons(shellSort.getComparisons());
        response.setSwaps(shellSort.getSwaps());
        response.setExecutionTime(shellSort.getExecutionTime());

        return response;
    }

    @PostMapping ("/api/sort/merge")
    public SortResponse processMergeSort(@RequestBody SortRequest request){
        Integer[] arrayToSort = request.getArray();
        
        AbstractSortingAlgorithm<Integer> mergeSort = new MergeSort<>();
        mergeSort.sort(arrayToSort);

        SortResponse response = new SortResponse();

        response.setReturnArray(arrayToSort);
        response.setSteps(mergeSort.getSteps());
        response.setComparisons(mergeSort.getComparisons());
        response.setSwaps(mergeSort.getSwaps());
        response.setExecutionTime(mergeSort.getExecutionTime());

        return response;
    }

    @PostMapping ("/api/sort/bucket")
    public SortResponse processBucketSort(@RequestBody SortRequest request){
        Integer[] arrayToSort = request.getArray();
        
        AbstractSortingAlgorithm<Integer> bucketSort = new BucketSort<>();
        bucketSort.sort(arrayToSort);

        SortResponse response = new SortResponse();

        response.setReturnArray(arrayToSort);
        response.setSteps(bucketSort.getSteps());
        response.setComparisons(bucketSort.getComparisons());
        response.setSwaps(bucketSort.getSwaps());
        response.setExecutionTime(bucketSort.getExecutionTime());

        return response;
    }

        @PostMapping ("/api/sort/radix")
    public SortResponse processRadixSort(@RequestBody SortRequest request){
        Integer[] arrayToSort = request.getArray();
        
        AbstractSortingAlgorithm<Integer> radixSort = new RadixSort<>();
        radixSort.sort(arrayToSort);

        SortResponse response = new SortResponse();

        response.setReturnArray(arrayToSort);
        response.setSteps(radixSort.getSteps());
        response.setComparisons(radixSort.getComparisons());
        response.setSwaps(radixSort.getSwaps());
        response.setExecutionTime(radixSort.getExecutionTime());

        return response;
    }
}