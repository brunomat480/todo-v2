import ButtonIcon from "../components/button-icon";
import Card from "../components/card";
import InputChecbox from "../components/input-checkbox";
import Text from "../components/text";

import PencelIcon from "../assets/icons/pencil.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";

export default function TaskItem() {
  return (
    <Card size="md" className="flex items-center gap-4">
      <InputChecbox />
      <Text className="flex-1">Fazer compras da semana</Text>
      <div className="flex gap-1">
        <ButtonIcon icon={TrashIcon} variant="tertiary" />
        <ButtonIcon icon={PencelIcon} variant="tertiary" />
      </div>
    </Card>
  )
} 