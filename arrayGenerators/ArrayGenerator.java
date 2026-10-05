import java.util.Random;

//this is will be helper class that provide static methods use to generate arrays
public class ArrayGenerator {
    public static final int DEFAULT_SIZE = 10; 
    public static final int MIN_RANGE = 1;
    public static final int MAX_RANGE = 30;
    
    //we dont need to make instances of this class
    private ArrayGenerator() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    //creats random values array with spesific size
    public static Integer[] randomGenerate(int size) {
        Integer[] array = new Integer[size];
        Random rand = new Random();

        for (int i = 0; i < size; i++) {
            array[i] = rand.nextInt(MAX_RANGE - MIN_RANGE + 1) + MIN_RANGE;
        }
        return array;
    }
    
    public static Integer[] randomGenerate() {
        return randomGenerate(DEFAULT_SIZE);
    }

    //TO-DO - adding manual generating methods
}