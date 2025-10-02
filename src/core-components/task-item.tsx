import { useState } from "react";
import ButtonIcon from "../components/button-icon";
import Card from "../components/card";
import InputChecbox from "../components/input-checkbox";
import InputText from "../components/input-text";
import Text from "../components/text";

import CheckIcon from "../assets/icons/check.svg?react";
import PencelIcon from "../assets/icons/pencil.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import XIcon from "../assets/icons/x.svg?react";

export default function TaskItem() {
  const [isEditing, setIsEditing] = useState(false)

  function handleEditTask() {
    setIsEditing(true)
  }

  function handleExitEditTask() {
    setIsEditing(false)
  }

  return (
    <Card size="md" className="flex items-center gap-4">
      {!isEditing ? (
        <>
          <InputChecbox />
          <Text className="flex-1">Fazer compras da semana</Text>
          <div className="flex gap-1">
            <ButtonIcon icon={TrashIcon} variant="tertiary" />
            <ButtonIcon icon={PencelIcon} variant="tertiary" onClick={handleEditTask} />
          </div>
        </>
      ) : (
        <>
          <InputText className="flex-1" />
          <div className="flex gap-1">
            <ButtonIcon icon={XIcon} variant="secondary" onClick={handleExitEditTask} />
            <ButtonIcon icon={CheckIcon} variant="primary" />
          </div>
        </>
      )}


    </Card>
  )
} 