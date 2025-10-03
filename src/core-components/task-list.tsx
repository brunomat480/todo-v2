import Button from "../components/button";

import PlusIcon from "../assets/icons/plus.svg?react";
import useTask from "../hooks/use-task";
import TaskItem from "./task-item";

export default function TaskList() {
  const { prepareTask } = useTask()

  function handleNewTask() {
    prepareTask()
  }

  return (
    <>
      <section>
        <Button className="w-full" icon={PlusIcon} onClick={handleNewTask}>Nova Tarefa</Button>
      </section>

      <section className="space-y-2">
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </section>
    </>
  )
}