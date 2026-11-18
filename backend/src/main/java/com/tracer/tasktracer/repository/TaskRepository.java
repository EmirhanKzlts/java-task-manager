package com.tracer.tasktracer.repository;

import com.tracer.tasktracer.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
