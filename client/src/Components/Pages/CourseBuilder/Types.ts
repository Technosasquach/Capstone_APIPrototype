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

export interface selected {
  index: number;
  type: number;
}