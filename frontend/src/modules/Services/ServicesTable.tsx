import { TableGeneric } from "@/components/common/Table/TableGeneric";
import { Service, ServiceTableProps } from "@/modules/interfaces/service.interface";
import { Pencil, Trash2 } from "lucide-react";

export function ServicesTable({ data, onEdit, onDelete, toMaterials }: ServiceTableProps) {

  const columns: { header: string; key: keyof Service }[] = [
    { header: 'ID', key: 'id' },
    { header: 'Nome', key: 'name' },
    { header: 'Descrição', key: 'description' },
  ];

  const actions = [
    {
      label: 'Materials',
      icon: null,
      onClick: toMaterials,
    },
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
    <TableGeneric columns={columns} data={data} emptyMessage="Nenhum serviço encontrado" actions={actions} />
  );
}
