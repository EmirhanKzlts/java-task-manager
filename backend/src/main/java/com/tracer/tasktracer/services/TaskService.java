package com.tracer.tasktracer.services;

import com.tracer.tasktracer.models.Task;
import com.tracer.tasktracer.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public void createTask(String title, LocalDateTime expiresAt) {
        Task task = new Task();
        task.setTitle(title);
        task.setCreatedAt(LocalDateTime.now());
        task.setExpiresAt(expiresAt);
        task.setCompleted(false);
        taskRepository.save(task);
    }

    public Task editTask(Long id, String title, LocalDateTime expiresAt) {
        Task task = getTaskById(id);
        task.setTitle(title);
        task.setExpiresAt(expiresAt);
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public void toggleCompleted(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid task ID."));
        task.setCompleted(!task.isCompleted());
        taskRepository.save(task);
    }

}
