import { TableGenericProps } from "@/components/interfaces/table.interface";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TableGeneric<T>({ columns, data, emptyMessage, actions = [] }: TableGenericProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index}>{column.header}</TableHead>
          ))}
          {actions.length > 0 && <TableHead className="text-right">Ações</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length > 0 ? (
          data.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>
                  {column.render ? column.render(item[column.key], item) : (item[column.key] as React.ReactNode) || String(item[column.key])}
                </TableCell>
              ))}
              {actions.length > 0 && (
                <TableCell className="text-right flex">
                  {actions.map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      variant="outline"
                      className="mr-2 justify-center items-center"
                      onClick={() => action.onClick(item)}
                    >
                      {action.label}
                      {action.icon}
                    </Button>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="text-center">
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

  