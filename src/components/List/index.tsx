import React from "react";
import { Droppable, DragDropContext } from "react-beautiful-dnd";

type ListProps = {
  children?: React.ReactNode;
  title: string;
  onDragEnd: (data: any) => void;
  name: string;
};

const List = ({ children, title, onDragEnd, name }: ListProps) => {
  return (
    <div className="flex flex-col w-6/12">
      <h2 className="text-2xl font-bold mb-2 mx-5">{title}</h2>
      <div className="">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={name} type={name}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="h-screen"
              >
                <div className="p-5 rounded-md min-h-max bg-yellow-50 mx-2 gap-y-3 flex flex-col h-screen">
                  {children}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default List;