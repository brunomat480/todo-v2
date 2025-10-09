import Button from "../components/button";

import PlusIcon from "../assets/icons/plus.svg?react";
import useTask from "../hooks/use-task";
import useTasks from "../hooks/use-tasks";
import { TaskState, type Task } from "../models/task";
import TaskItem from "./task-item";

export default function TaskList() {
  const { tasks, isLoadingTasks } = useTasks()
  const { prepareTask } = useTask()

  function handleNewTask() {
    prepareTask()
  }

  return (
    <>
      <section>
        <Button className="w-full" icon={PlusIcon} onClick={handleNewTask} disabled={tasks.some((task) => task.state === TaskState.Creating) || isLoadingTasks}>Nova Tarefa</Button>
      </section>

      <section className="space-y-2">
        {!isLoadingTasks && tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        {isLoadingTasks && (
          Array.from({ length: 3 }).map((_, i) => (
            <TaskItem task={{} as Task} loading key={i} />
          ))
        )}
      </section>
    </>
  )
}