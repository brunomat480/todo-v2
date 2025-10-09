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
import Skeleton from "../components/skeleton";
import useTask from "../hooks/use-task";
import { TaskState, type Task } from "../models/task";

interface TaskItemProps {
  task: Task
  loading?: boolean
}

export default function TaskItem({ task, loading }: TaskItemProps) {
  const { updateTask, updateTaskStatus, deleteTask, isUpdatingTask, isDeletingTask } = useTask()

  const [isEditing, setIsEditing] = useState(
    task?.state === TaskState.Creating
  )
  const [taskTitle, setTaskTitle] = useState(task.title || '')

  function handleEditTask() {
    setIsEditing(true)
  }

  function handleExitEditTask() {
    if (task.state === TaskState.Creating) {
      deleteTask(task.id)
    }

    setIsEditing(false)
  }

  function handleChangeTaskTitle(event: ChangeEvent<HTMLInputElement>) {
    setTaskTitle(event.target.value || '')
  }

  async function handleSaveTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await updateTask(task.id, { title: taskTitle })
    setIsEditing(false)
  }

  function handleChangeTaskStatus(event: ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked

    updateTaskStatus(task.id, checked)
  }

  async function handleDeleteTask() {
    await deleteTask(task.id)
  }

  return (
    <Card size="md">
      {!isEditing ? (
        <div className="flex items-center gap-4">
          <InputCheckbox
            checked={task?.concluded}
            onChange={handleChangeTaskStatus}
            loading={loading}
          />
          {!loading ? (
            <Text
              className={cx("flex-1", {
                "line-through": task.concluded
              })}
            >
              {task?.title}
            </Text>
          ) : (
            <Skeleton className="flex-1 h-6" />
          )}
          <div className="flex gap-1">
            <ButtonIcon icon={TrashIcon} variant="tertiary" onClick={handleDeleteTask} loading={loading} handling={isDeletingTask} />
            <ButtonIcon icon={PencelIcon} variant="tertiary" onClick={handleEditTask} loading={loading} />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSaveTask} className="flex items-center gap-4">
          <InputText
            value={taskTitle}
            className="flex-1"
            onChange={handleChangeTaskTitle}
            required
            autoFocus
          />
          <div className="flex gap-1">
            <ButtonIcon type="button" icon={XIcon} variant="secondary" onClick={handleExitEditTask} />
            <ButtonIcon type="submit" icon={CheckIcon} variant="primary" handling={isUpdatingTask} />
          </div>
        </form>
      )}
    </Card>
  )
} 