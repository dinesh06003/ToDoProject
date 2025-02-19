package com.dinesh.ToDoBackend.repo;

import com.dinesh.ToDoBackend.model.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ToDoRepo extends JpaRepository<ToDo, Integer> {
    List<ToDo> findByDueDate(LocalDate dueDate);

    List<ToDo> findByTitleContainingIgnoreCase(String title);
}
