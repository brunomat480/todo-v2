import { useState, type ChangeEvent, type FormEvent } from "react";
import ButtonIcon from "../components/button-icon";
import Card from "../components/card";
import InputCheckbox from "../components/input-checkbox";
import InputText from "../components/input-text";
import Text from "../components/text";

import { cx } from "class-variance-authority";
import CheckIcon from "../assets/icons/check.svg?react";
import PencelIcon from "../assets/icons/pencil.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import XIcon from "../assets/icons/x.svg?react";
import { TaskState, type Task } from "../models/task";

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(
    task?.state === TaskState.Creating
  )
  const [taskTitle, setTaskTitle] = useState('')

  function handleEditTask() {
    setIsEditing(true)
  }

  function handleExitEditTask() {
    setIsEditing(false)
  }

  function handleChangeTaskTitle(event: ChangeEvent<HTMLInputElement>) {
    setTaskTitle(event.target.value || '')
  }

  function handleSaveTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsEditing(false)
  }

  return (
    <Card size="md">
      {!isEditing ? (
        <div className="flex items-center gap-4">
          <InputCheckbox
            value={task.concluded?.toString()}
            checked={task?.concluded}
          />
          <Text
            className={cx("flex-1", {
              "line-through": task.concluded
            })}
          >
            {task?.title}
          </Text>
          <div className="flex gap-1">
            <ButtonIcon icon={TrashIcon} variant="tertiary" />
            <ButtonIcon icon={PencelIcon} variant="tertiary" onClick={handleEditTask} />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSaveTask} className="flex items-center gap-4">
          <InputText className="flex-1" onChange={handleChangeTaskTitle} required autoFocus />
          <div className="flex gap-1">
            <ButtonIcon type="button" icon={XIcon} variant="secondary" onClick={handleExitEditTask} />
            <ButtonIcon type="submit" icon={CheckIcon} variant="primary" />
          </div>
        </form>
      )}
    </Card>
  )
} 