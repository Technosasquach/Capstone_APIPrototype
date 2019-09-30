import React, { useState, useCallback, useEffect } from 'react'
import Card from './NodeDrag'
import update from 'immutability-helper'

import Carder from './Card'

const style = {
  width: "100%",
}

export interface Item {
  id: number
  text: string
}

export interface ContainerState {
  cards: Item[]
}

interface card {
  id: string;
  name: string;
}

interface structure {
  index: [number];
  cards: [card]
}

interface Props {
  Structure: structure;
  Parent: card;
}

const Container: React.FC<Props> = ({Structure, Parent}) => {
  {
    const [cards, setCards] = useState([] as Item[]);

    useEffect(() => {
        if(Structure.cards !== undefined && Structure.cards.length > 0) {
          let arr: Item[] = [];
          let i = 0;
          Structure.cards.map((item) => {
              arr.push({id: i++, text: item.name});
          })
          setCards(arr);
        } else if (cards.length > 0) {
          setCards([]);
        }
    }, [Structure]);

    const updateStructure = (dragger: number, where: number) => {
      const temp = Structure.index[dragger];
      const temper = Structure.index[where];
      Structure.index[dragger] = temper;
      Structure.index[where] = temp;
    }

    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        updateStructure(dragIndex, hoverIndex);
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
        {Parent.name !== undefined && <Carder name={Parent.name} id={Parent.id} />}
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    )
  }
}

export default Container
