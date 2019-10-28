import React, { useState, useEffect } from 'react';
import {card, structure, selected} from './../Types'

const initialState = {
    Parent: {} as card,
    Children: [] as String[],
    Structure: {} as structure,
    Selected: {} as selected,
    Name: "",
    setParent(_data: any): any {},
    setChildren(_data: any): any {},
    setStructure(_data: any): any {},
    setSelected(_data: any): any {},
    setName(_data: any): any {}
};

export const StructureContext = React.createContext(initialState);

const structureProvider = (props:any) => {
    const [Parent, setParent] = useState({} as card);
    const [Children, setChildren] = useState([] as string[]);
    const [Structure, setStructure] = useState({index: ([] as number[]), treeIndex: ([] as string[]), cards: ([] as card[])} as structure);
    const [Selected, setSelected] = useState({index: 0, type: 0} as selected);
    const [Name, setName] = useState(undefined as any);

    useEffect(() => {
        if(Selected.index == 0) {
          setName(Parent.name);
        } else {
          try {
            setName(Structure.cards[Selected.index-1].name);
          } catch {
            setSelected({index: 0, type: 0});
          }
        }
    }, [Selected]);

    return (
        <StructureContext.Provider value={{
        Parent: Parent,
        Children: Children,
        Structure: Structure,
        Selected: Selected,
        Name: Name,
        setParent,
        setChildren,
        setStructure,
        setSelected,
        setName
        }}>
        {props.children}
        </StructureContext.Provider>
    )
};

export default structureProvider;