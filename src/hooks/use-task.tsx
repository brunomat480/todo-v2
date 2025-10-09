import { useState } from "react";
import useLocalStorage from "use-local-storage";
import { delay } from "../helpers/utils";
import { TASKS_KEY, TaskState, type Task } from "../models/task";

export default function useTask() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASKS_KEY, [])
  const [isUpdatingTask, setIsUpdatingTask] = useState(false)
  const [isDeletingTask, setIsDeletingTask] = useState(false)

  function prepareTask() {
    setTasks([...tasks, {
      id: Math.random().toString(36).substring(2, 9),
      title: "",
      state: TaskState.Creating
    }])
  }

  async function updateTask(id: string, paylaod: { title: Task['title'] }) {
    setIsUpdatingTask(true)
    await delay(1000)

    setTasks(
      tasks.map((task) => task.id === id ? { ...task, state: TaskState.Created, ...paylaod } : task)
    )

    setIsUpdatingTask(false)
  }

  function updateTaskStatus(id: string, concluded: boolean) {
    setTasks(
      tasks.map((task) => task.id === id ? { ...task, concluded } : task)
    )
  }

  async function deleteTask(id: string) {
    setIsDeletingTask(true)
    await delay(1000)

    setTasks(
      tasks.filter((task) => task.id !== id)
    )

    setIsDeletingTask(false)
  }

  return {
    prepareTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    isUpdatingTask,
    isDeletingTask
  }
}