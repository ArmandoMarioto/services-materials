export interface Material {
  id?: number;
  name: string;
  description: string;
  quantity: number;
}
export interface UpdateMaterial {
  name: string;
  description: string;
  quantity: number;
}

export interface MaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMaterial: (newMaterial: Material) => void;
  onUpdateMaterial: (updatedMaterial: UpdateMaterial) => void;
  materialToEdit: Material | null;

}

export interface MaterialTableProps {
  data: Material[];
  onEdit: (material: Material) => void;
  onDelete: (material: Material) => void;
}