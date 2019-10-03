import React, { useRef, useState } from 'react'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import ItemTypes from './ItemTypes'
import { XYCoord } from 'dnd-core'

import { Button } from 'antd'

import './NodeDrag.less'

import {selected} from './../../Types'

const style = {
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
}

const styletwo = {
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
}

const quizstyle = {
  width: '90%',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
}

export interface CardProps {
  id: any
  text: string
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void,
  setSelected: (input: selected) => void;
}

interface DragItem {
  index: number
  id: string
  type: string
}
const Card: React.FC<CardProps> = ({ id, text, index, moveCard, setSelected }) => {
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
    setSelected({index: id + 1, type: 0});
  }

  const setquiz = () => {
    setQuiz(true);
  }

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div ref={ref}>
      <div style={Quiz ? {...styletwo, opacity }: { ...style, opacity }}>
        <span>
          {Quiz && true}
          {text}
          <Button onClick={editPage} className={"Selector"}>></Button>
          <Button onClick={setquiz} className={"Selector"}>+</Button>
        </span>
      </div>
      {Quiz && <div style={{...quizstyle}}>
        {text} Quiz
      </div>}
    </div>
  )
}

export default Card
