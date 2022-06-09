// import { items } from "./fixtures";

export interface IProps {
  onHide?: (show: boolean) => void;
  show?: boolean;
  target?: HTMLElement | null;
  // TODO: use codegen types
  items: DirectoryItem[];
  width?: string;
}

export interface IState {
  buffer: {
    index: number | null;
    depth: number | null;
  };
  index: number | null;
  depth: number | null;
}

export interface CategoryItem {
  id: string;
  name: string;
}

export interface PageItem {
  id: string;
  name: string;
}

export interface CollectionItem {
  id: string;
  name: string;
}

export interface ParentItem {
  id: string;
  name: string;
}

export interface DirectoryItem {
  id: string;
  name: string;
  category: CategoryItem | null;
  collection: CollectionItem | null;
  page: PageItem | null;
  parent: ParentItem;
  children: DirectoryItem[] | null;
}

export interface DirectoryItems {
  items: DirectoryItem[];
}
