export interface TableBodyProps {
  items: Array<Record<string, string>>;
}

export interface TableProps {
  onClick: (item: Record<string, string>) => void;
}
