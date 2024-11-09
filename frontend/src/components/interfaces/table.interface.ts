export interface Column<T> {
    header: string;
    key: keyof T;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
  }
  export interface Action<T> {
    label?: string;
    icon?: React.ReactNode;
    onClick: (item: T) => void;
  }
  
 export interface TableGenericProps<T> {
    columns: Column<T>[];
    data: T[];
    emptyMessage: string;
    actions?: Action<T>[];
  }