import { TableGeneric } from "@/components/common/Table/TableGeneric";
import { Material, MaterialTableProps } from "@/modules/interfaces";
import { Pencil, Trash2 } from "lucide-react";

export function MaterialsTable({ data, onDelete, onEdit }: MaterialTableProps) {

  const columns: { header: string; key: keyof Material }[] = [
    { header: 'ID', key: 'id' },
    { header: 'Nome', key: 'name' },
    { header: 'Descrição', key: 'description' },
    { header: 'Quantidade', key: 'quantity' },
  ];

  const actions = [
    {
      icon: <Pencil className="h-4 w-4" />,
      onClick: onEdit,
    },
    {
      icon: <Trash2 className="h-4 w-4" />,
      onClick: onDelete,
    },
  ];
  return (
    <TableGeneric columns={columns} data={data} emptyMessage="Nenhum material encontrado" actions={actions} />
  );
}