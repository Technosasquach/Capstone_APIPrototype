import React, { useState, useCallback, useEffect, useContext } from 'react'
import Card from './NodeDrag'
import update from 'immutability-helper'

import {StructureContext} from './../../Context/StructureContext';

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



const Container: React.FC = (props: any) => {
    const structureContext = useContext(StructureContext);
    const [cards, setCards] = useState([] as Item[]);

    useEffect(() => {
        if(structureContext.Structure.cards !== undefined && structureContext.Structure.cards.length > 0) {
          let arr: Item[] = [];
          let i = 0;
          structureContext.Structure.index.map((index) => {
            const temp = structureContext.Structure.cards[index];
            arr.push({id: i++, text: temp.name});
          })
          setCards(arr);
        } else if (cards.length > 0) {
          setCards([]);
        }
    }, [structureContext.Structure]);

    const updateStructure = (dragger: number, where: number) => {
      const temp = structureContext.Structure.index[dragger];
      const temper = structureContext.Structure.index[where];
      structureContext.Structure.index[dragger] = temper;
      structureContext.Structure.index[where] = temp;
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
        {structureContext.Parent.name !== undefined && <Carder name={structureContext.Parent.name} id={structureContext.Parent.id} setSelected={structureContext.setSelected} Selected={structureContext.Selected}/>}
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    )
  
}

export default Container
