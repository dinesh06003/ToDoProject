package com.dinesh.ToDoBackend.controller;

import com.dinesh.ToDoBackend.model.ToDo;
import com.dinesh.ToDoBackend.service.ToDoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class ToDoController {
    private final ToDoService toDoService;

    public ToDoController(ToDoService toDoService){
        this.toDoService = toDoService;
    }

    @GetMapping("/items")
    public ResponseEntity<List<ToDo>> getAllList(){
        return toDoService.getAllItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToDo> getToDoById(@PathVariable int id){
        return toDoService.getToDoById(id);
    }

    @PostMapping
    public ResponseEntity<ToDo> createToDo(@RequestBody ToDo todo){
        if (todo.getDueDate() == null) {
            todo.setDueDate(LocalDate.now().plusDays(1)); // Set current date if due date is not provided
        }
        return toDoService.createToDo(todo);
    }


    @PutMapping("/{id}")
    public ResponseEntity<ToDo> updateToDo(@PathVariable int id, @RequestBody ToDo todo){
        return toDoService.updateToDo(id, todo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteToDO(@PathVariable int id){
        return toDoService.deleteToDo(id);
    }

    @GetMapping("/due/{date}")
    public ResponseEntity<List<ToDo>> getToDosByDueDate(@PathVariable String date){
        LocalDate dueDate = LocalDate.parse(date);
        return toDoService.getToDosByDueDate(dueDate);
    }
    @GetMapping("/search")
    public ResponseEntity<List<ToDo>> searchToDosByTitle(@RequestParam String title) {
        return toDoService.searchToDosByTitle(title);
    }
}
