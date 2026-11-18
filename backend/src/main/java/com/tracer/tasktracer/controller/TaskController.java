package com.tracer.tasktracer.controller;

import com.tracer.tasktracer.models.Task;
import com.tracer.tasktracer.services.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @PostMapping
    public void createTask(@RequestParam String title, @RequestParam LocalDateTime expiresAt) {
        taskService.createTask(title, expiresAt);
    }

    @PutMapping("/{id}")
    public Task editTask(@PathVariable Long id, @RequestParam String title, @RequestParam LocalDateTime expiresAt) {
        return taskService.editTask(id, title, expiresAt);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @PostMapping("/{id}/toggleCompleted")
    public void toggleCompleted(@PathVariable Long id) {
        taskService.toggleCompleted(id);
    }
}
