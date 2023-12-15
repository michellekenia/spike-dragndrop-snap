import Card from "../Card/index";
import List from "../List/index";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { useState } from "react";

const Incorporate = () => {
  const itemsNormal = {
    available: [
      {
        id: 1,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a4477",
        title: "algoritmo do ovo frito",
        subtitle: "pegue uma frigideira",
        img: 'https://static.paodeacucar.com/img/uploads/1/762/24748762.png'
      },
      {
        id: 3,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a449",
        title: "algoritmo do ovo frito",
        subtitle: "pegue um ovo",
        img: 'https://static.paodeacucar.com/img/uploads/1/609/24190609.png'

      },
      // {
      //   id: 2,
      //   uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a448",
      //   title: "algoritmo do ovo frito",
      //   subtitle: "coloque a frigideira no fogão"
      // },
    ],

    assigned: [{
      id: 2,
      uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a448",
      title: "algoritmo do ovo frito",
      subtitle: "coloque a frigideira no fogão",
      img:'https://static.paodeacucar.com/img/uploads/1/40/25351040.jpeg'

    }]
  };

  const [items, setItems] = useState(itemsNormal);
  const [isCorrect, setIsCorrect] = useState(false)

  const removeFromList = (list: any, index: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list: any, index: any, element: any) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const idOrdered = (list: any) => {
    let isOrdered = true
    for (let i = 0; i < list.length; i++){
      console.log(`${list[i].subtitle} id: ${list[i].id} -> ${list[i].id != i+1}`)
      if (list[i].id != i+1){
        isOrdered = false;
        break;
      }
    }

    return isOrdered;
  };
  

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      console.log(result);
      return;
    }
    const listCopy: any = { ...items };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;

    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    
    if(listCopy.assigned.length>itemsNormal.available.length)
      setIsCorrect(idOrdered(listCopy.assigned))
    setItems(listCopy);
  };

  return (
    <>
    <h1 className="text-2xl font-bold mt-12 mb-14" >{(isCorrect?'Parabéns, a sequência está correta!':'Tente organizar a sequência novamente!')}</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex p-12">
          <List title="Disponíveis" onDragEnd={onDragEnd} name="available">
            {items.available.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id + ""} index={index}>
                {(
                  provided: DraggableProvided | any,
                  snapshot: DraggableStateSnapshot
                ) => (
                  <div>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card data={item} />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          </List>
          
          <List title="Atribuídos" onDragEnd={onDragEnd} name="assigned">
            {items.assigned?.map((item, index) => (
              <Draggable draggableId={item.uuid} index={index} key={item.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card data={item} />
                  </div>
                )}
              </Draggable>
            ))}
          </List>
        </div>
      </DragDropContext>
    </>
  );
};

export default Incorporate;
