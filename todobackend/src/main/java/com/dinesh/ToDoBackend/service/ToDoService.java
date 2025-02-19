package com.dinesh.ToDoBackend.service;

import com.dinesh.ToDoBackend.model.ToDo;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;

public interface ToDoService {

    ResponseEntity<ToDo> getToDoById(int id);

    ResponseEntity<ToDo> createToDo(ToDo todo);

    ResponseEntity<ToDo> updateToDo(int id, ToDo todo);

    ResponseEntity<String> deleteToDo(int id);

    ResponseEntity<List<ToDo>> getAllItems();

    ResponseEntity<List<ToDo>> getToDosByDueDate(LocalDate dueDate);

    ResponseEntity<List<ToDo>> searchToDosByTitle(String title);
}
