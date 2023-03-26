import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableText from "./DraggableText";

interface TextItem {
  id: string;
  text: string;
}

const DraggableWidget: React.FC = () => {
  const [texts, setTexts] = useState<TextItem[]>([
    { id: "1", text: "Item 1" },
    { id: "2", text: "Item 2" },
    { id: "3", text: "Item 3" },
  ]);

  const moveText = (dragId: string, hoverId: string) => {
    const dragIndex = texts.findIndex((item) => item.id === dragId);
    const hoverIndex = texts.findIndex((item) => item.id === hoverId);

    const newTexts = [...texts];
    const [draggedItem] = newTexts.splice(dragIndex, 1);
    newTexts.splice(hoverIndex, 0, draggedItem);
    setTexts(newTexts);
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={containerStyle}>
        {texts.map((textItem) => (
          <DraggableText
            key={textItem.id}
            id={textItem.id}
            text={textItem.text}
            moveText={moveText}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DraggableWidget;
