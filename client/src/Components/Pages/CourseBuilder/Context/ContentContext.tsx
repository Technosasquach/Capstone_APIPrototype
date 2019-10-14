import React, {useState} from 'react';
import { EditorState } from 'draft-js';
const initialState = {
    Content: [] as EditorState[],
    Images: [] as String[][],
    IDS: [] as String[][],
    setContent(_data: any): any {},
    setImages(_data: any): any {},
    setIDS(_data: any): any {},
};

export const ContentContext = React.createContext(initialState);

const contentProvider = (props:any) => {
  const [Content, setContent] = useState([EditorState.createEmpty()])
  const [Images, setImages] = useState([[]] as string[][]);
  const [IDS, setIDS] = useState([[]] as string[][]);

  return (
    <ContentContext.Provider value={{
      Content: Content,
      Images: Images,
      IDS: IDS,
      setContent,
      setImages,
      setIDS
    }}>
      {props.children}
    </ContentContext.Provider>
  )
};

export default contentProvider;