import { useCreateMaterialMutation, useDeleteMaterialMutation, useEditMaterialMutation, useMaterialsQuery } from "@/modules/hooks/index";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ConfirmDeleteModal } from "@/components/common/ConfirmDelete/ConfirmDeleteModal";
import { FormModal } from "@/components/common/FormModal/FormModal";
import { Header } from "@/components/common/Header/HeaderGeneric";
import { Material, Service, UpdateMaterial } from "@/modules/interfaces";
import { MaterialsTable } from "./MaterialsTable";

export function MaterialsPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [materialToDelete, setServiceToDelete] = useState<Material | null>(null);
  const [materialToEdit, setMaterialToEdit] = useState<Material | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const service = location?.state?.service as Service;


  useEffect(() => {
    if (!location?.state) {
      return navigate("/services");
    }
  }, [location, navigate]);


  const { isLoading, error, data, refetch } = useMaterialsQuery(service?.id ?? 0);

  const createMaterialMutation = useCreateMaterialMutation(service?.id ?? 0, refetch);

  const deleteMaterialMutation = useDeleteMaterialMutation(service?.id ?? 0, refetch, setIsConfirmModalOpen);

  const editMaterialMutation = useEditMaterialMutation(service?.id ?? 0, refetch, setIsModalOpen);

  const handleDeleteClick = (material: Material) => {
    setServiceToDelete(material);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (materialToDelete) {
      if (materialToDelete?.id !== undefined) {
        deleteMaterialMutation.mutateAsync(materialToDelete.id);
      }
    }
  };
  const handleUpdateMaterial = (updatedMaterial: UpdateMaterial) => {
    if (materialToEdit) {
      if (materialToEdit?.id !== undefined) {
        const update: UpdateMaterial = { name: updatedMaterial.name, description: updatedMaterial.description, quantity: +updatedMaterial.quantity };
        editMaterialMutation.mutateAsync({ materialId: materialToEdit.id, updatedMaterial: update });
      }
    }
  };

  const handleEditClick = (material: Material) => {
    setMaterialToEdit(material);
    setIsModalOpen(true);
  };

  const handleAddMaterialClick = () => {
    setMaterialToEdit(null);
    setIsModalOpen(true);
  };


  const handleCreateMaterial = (newMaterial: Material) => {
    createMaterialMutation.mutateAsync({ ...newMaterial, quantity: +newMaterial.quantity });
  };


  if (isLoading) return "Loading...";
  if (error) return "An error occurred: " + error.message;
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <Header title={`Serviços: ${service.name}`} ButtonsProps={{ onClick: handleAddMaterialClick, label: "Adicionar Novo Material" }} />
        <MaterialsTable
          data={data}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data: Material) => materialToEdit ? handleUpdateMaterial(data) : handleCreateMaterial(data)}
          itemToEdit={materialToEdit}
          fields={[
            { label: 'Nome', name: 'name', type: 'text', required: true },
            { label: 'Descrição', name: 'description', type: 'text' },
            { label: 'Quantidade', name: 'quantity', type: 'number', required: true },
          ]}
          title="Material" />

        <ConfirmDeleteModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmDelete}
          name={materialToDelete?.name || ""}
          title={"material"}
        />
      </div>
    </main>
  )
}