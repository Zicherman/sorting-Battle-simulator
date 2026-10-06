package gui;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.*;
import javafx.stage.Stage;

public class BattleSimulatorApp extends Application {

    @Override
    public void start(Stage primaryStage) {
        BorderPane root = new BorderPane();
        root.setStyle("-fx-background-color: #ffffff;");
        root.setPadding(new Insets(20));

        // חלק עליון (Top)
        VBox topSection = new VBox(10);
        topSection.setAlignment(Pos.CENTER);
        
        Label title = new Label("Sorting algorithms battle simulator");
        title.setStyle("-fx-font-size: 24px; -fx-font-weight: bold;");
        
        Button dataInputBtn = new Button("Data input");
        dataInputBtn.setPrefWidth(800);
        dataInputBtn.setStyle("-fx-background-color: #21618C; -fx-text-fill: white;");
        
        topSection.getChildren().addAll(title, dataInputBtn);
        root.setTop(topSection);

        // חלק מרכזי (Center)
        HBox centerSection = new HBox(30);
        centerSection.setAlignment(Pos.CENTER);
        centerSection.setPadding(new Insets(30, 0, 30, 0));
        
        VBox leftArena = new VBox();
        leftArena.setPrefSize(350, 250);
        leftArena.setStyle("-fx-background-color: #21618C;"); 
        
        Button startBtn = new Button("start");
        startBtn.setPrefSize(80, 40);
        startBtn.setStyle("-fx-background-color: #21618C; -fx-text-fill: white;");
        
        VBox rightArena = new VBox();
        rightArena.setPrefSize(350, 250);
        rightArena.setStyle("-fx-background-color: #21618C;");
        
        centerSection.getChildren().addAll(leftArena, startBtn, rightArena);
        root.setCenter(centerSection);

        // חלק תחתון (Bottom)
        HBox bottomSection = new HBox(20);
        bottomSection.setAlignment(Pos.CENTER);
        
        for (int i = 1; i <= 5; i++) {
            Button algBtn = new Button("Algorithm " + i);
            algBtn.setPrefSize(120, 100);
            algBtn.setStyle("-fx-background-color: #21618C; -fx-text-fill: white;");
            bottomSection.getChildren().add(algBtn);
        }
        root.setBottom(bottomSection);

        Scene scene = new Scene(root, 1000, 700);
        primaryStage.setTitle("Sorting Battle Simulator");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}