# Sorting Battle Simulator

## Project structure

```text
Sorting-Battle-Project/
├── backend/                         # Java Spring Boot backend
│   ├── pom.xml
│   └── src/
│       └── main/java/com/battlesimulator/
│           ├── arrayGenerators/
│           │   └── ArrayGenerator.java
│           ├── sortingAlgorithms/
│           │   ├── AbstractSortingAlgorithm.java
│           │   ├── BubbleSort.java
│           │   ├── HeapSort.java
│           │   ├── InsertionSort.java
│           │   ├── QuickSort.java
│           │   ├── SelectionSort.java
│           │   ├── SortStep.java
│           │   └── StepType.java
│           ├── BattleSimulatorApplication.java
│           └── TestController.java
├── frontend/                        # React + Vite frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── assets/                  # Images and bundled assets
│   │   ├── App.jsx                  # Main UI component
│   │   ├── App.css                  # Main UI styles
│   │   ├── index.css                # Global styles
│   │   └── main.jsx                 # Frontend entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

Generated build output and installed dependencies are omitted from this view.
