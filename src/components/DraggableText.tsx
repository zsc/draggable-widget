import React from "react";
import { useDrag } from "react-dnd";

interface DraggableTextProps {
  id: string;
  text: string;
  moveText: (dragId: string, hoverId: string) => void;
}

interface DragItem {
  id: string;
}

const DraggableText: React.FC<DraggableTextProps> = ({ id, text, moveText }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "text",
    item: { id } as DragItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item: DragItem | undefined, monitor) => {
      const dropResult = monitor.getDropResult<DragItem>();
      if (item && dropResult) {
        moveText(item.id, dropResult.id);
      }
    },
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} style={{ opacity }} data-testid={`text-${id}`}>
      {text}
    </div>
  );
};

export default DraggableText;

