import React, { useState, useCallback, useEffect, useRef } from 'react'
import Card from './NodeDrag'
import update from 'immutability-helper'

const style = {
  width: 400,
}

export interface Item {
  id: number
  text: string
}

export interface ContainerState {
  cards: Item[]
}

interface Props {
    Structure: {
      id: string,
      name: string,
    }[]
}

function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

const Container: React.FC<Props> = ({Structure}) => {
  {
    const [cards, setCards] = useState([] as Item[]);

    const prevAmount = usePrevious(Structure);
    useEffect(() => {
        if(Structure !== prevAmount) {
            let arr: Item[] = [];
            let i = 1;
            Structure.map((item) => {
                arr.push({id: i++, text: item['name']});
            })
            setCards(arr);
        }
    });

    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex]
        setCards(
          update(cards, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
          }),
        )
      },
      [cards],
    )

    const renderCard = (card: { id: number; text: string }, index: number) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      )
    }

    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    )
  }
}

export default Container
