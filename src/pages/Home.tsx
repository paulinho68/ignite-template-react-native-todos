import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks(tasksBefore =>
      [
        ...tasksBefore,
        {
          title: newTaskTitle,
          id: new Date().getTime(),
          done: false
        }
      ]);
  }

  function handleToggleTaskDone(id: number) {
    const editableTask = tasks.find(task => task.id === id);
    const indexPosition = tasks.findIndex(task => task.id === id);
    const newTask = {
      id: editableTask?.id,
      title: editableTask?.title,
      done: !editableTask?.done
    } as Task;
    const newTasks = [...tasks.filter(task => task.id !== id)];
    newTasks.splice(indexPosition, 0, newTask);
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks(tasksBefore => tasksBefore.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})