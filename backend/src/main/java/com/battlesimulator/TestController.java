package com.battlesimulator;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.battlesimulator.sortingAlgorithms.AbstractSortingAlgorithm;
import com.battlesimulator.sortingAlgorithms.BubbleSort;
import com.battlesimulator.sortingAlgorithms.HeapSort;
import com.battlesimulator.sortingAlgorithms.InsertionSort;
import com.battlesimulator.sortingAlgorithms.QuickSort;
import com.battlesimulator.sortingAlgorithms.SelectionSort;

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
}