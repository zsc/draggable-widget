import React from "react";
import { useDrag, useDrop } from "react-dnd";

interface DraggableTextProps {
  id: string;
  text: string;
  moveText: (dragId: string, hoverId: string) => void;
}

interface DragItem {
  id: string;
}

const DraggableText: React.FC<DraggableTextProps> = ({ id, text, moveText }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "text",
    item: { id } as DragItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: "text",
    hover: (item: DragItem) => {
      if (item.id !== id) {
        moveText(item.id, id);
      }
    },
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={(node) => {
        drag(node);
        drop(node);
        preview(node);
      }}
      style={{ opacity }}
      data-testid={`text-${id}`}
    >
      {text}
    </div>
  );
};

export default DraggableText;

