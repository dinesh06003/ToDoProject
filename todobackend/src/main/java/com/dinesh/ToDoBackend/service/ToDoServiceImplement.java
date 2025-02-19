package com.dinesh.ToDoBackend.service;

import com.dinesh.ToDoBackend.model.ToDo;
import com.dinesh.ToDoBackend.repo.ToDoRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ToDoServiceImplement implements ToDoService {

    private final ToDoRepo toDoRepo;

    public ToDoServiceImplement(ToDoRepo toDoRepo) {
        this.toDoRepo = toDoRepo;
    }

    @Override
    public ResponseEntity<ToDo> getToDoById(int id) {
        Optional<ToDo> todo = toDoRepo.findById(id);
        return todo.map(toDo -> new ResponseEntity<>(toDo, HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<ToDo> createToDo(ToDo todo) {
        if (todo.getDueDate() == null) {
            todo.setDueDate(LocalDate.now().plusDays(1));
        }
        ToDo savedToDo = toDoRepo.save(todo);
        return new ResponseEntity<>(savedToDo, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ToDo> updateToDo(int id, ToDo todo) {
        Optional<ToDo> existingToDo = toDoRepo.findById(id);
        if (existingToDo.isPresent()) {
            ToDo updatedToDo = existingToDo.get();
            updatedToDo.setTitle(todo.getTitle());
            updatedToDo.setCompleted(todo.isCompleted());
            updatedToDo.setDueDate(todo.getDueDate() != null ? todo.getDueDate() : updatedToDo.getDueDate()); // Update dueDate if provided
            ToDo savedToDo = toDoRepo.save(updatedToDo);
            return new ResponseEntity<>(savedToDo, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<String> deleteToDo(int id) {
        if (toDoRepo.existsById(id)) {
            Optional<ToDo> existingToDo = toDoRepo.findById(id);
            toDoRepo.deleteById(id);
            String message = String.format("Deleted ToDo Item with ID: %d and Title: %s",
                    id, existingToDo.get().getTitle());
            return new ResponseEntity<>(message, HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<>("Item Not Found", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<List<ToDo>> getAllItems() {
        List<ToDo> toDoList = toDoRepo.findAll();
        return toDoList.isEmpty() ? ResponseEntity.noContent().build()
                : new ResponseEntity<>(toDoList, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<ToDo>> getToDosByDueDate(LocalDate dueDate) {
        List<ToDo> toDos = toDoRepo.findByDueDate(dueDate);
        return toDos.isEmpty() ? ResponseEntity.noContent().build()
                : new ResponseEntity<>(toDos, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<ToDo>> searchToDosByTitle(String title) {
        List<ToDo> results = toDoRepo.findByTitleContainingIgnoreCase(title);
        return results.isEmpty() ? ResponseEntity.noContent().build() : new ResponseEntity<>(results, HttpStatus.OK);
    }

}
