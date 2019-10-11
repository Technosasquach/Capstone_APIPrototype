import React, { useRef, useState, useContext } from 'react'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import ItemTypes from './ItemTypes'
import { XYCoord } from 'dnd-core'

import { Button } from 'antd'

import './NodeDrag.less'

import {StructureContext} from './../../Context/StructureContext';

export interface CardProps {
  id: any
  text: string
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void,
}

interface DragItem {
  index: number
  id: string
  type: string
}
const Card: React.FC<CardProps> = ({ id, text, index, moveCard }) => {
  const structureContext = useContext(StructureContext);
  const [Quiz, setQuiz] = useState(false);

  const ref = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current!.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const editPage = () => {
    structureContext.setSelected({index: id + 1, type: 0});
  }

  const editQuiz = () => {
    structureContext.setSelected({index: id + 1, type: 1});
  }

  const setquiz = () => {
    setQuiz(!Quiz);
  }

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div ref={ref}>
      <div className="card" style={{ opacity }}>
        <span>
          {text}
          <Button onClick={editPage} className={"Selector"}>></Button>
          <Button onClick={setquiz} className={"Selector"}>{Quiz ? 'x' : '+'}</Button>
        </span>
      </div>
      {Quiz && <div className="quizcard">
        {text} Quiz
        <Button onClick={editQuiz} className={"Selector"}>></Button>
      </div>}
    </div>
  )
}

export default Card
