export interface TableBodyProps {
  items: any;
  currentPage?:number;
  pageSize?:number;
  
}

export interface TableProps {
  onClick: (item: Record<string, string>) => void;
}
