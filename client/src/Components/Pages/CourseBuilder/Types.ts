export interface card {
    id: string;
    name: string;
  }
  
export interface structure {
    index: [number];
    treeIndex: [string];
    cards: [card];
  }
  
export interface content {
    key: number;
    content: any;
    removeable: boolean;
    imageData: string;
}

export interface quiz {
  index: number;
  questions: string[];
  options: string[][];
  answer: number;
}

export interface selected {
  index: number;
  type: number;
}