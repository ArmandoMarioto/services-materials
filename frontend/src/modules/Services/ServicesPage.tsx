import { ConfirmDeleteModal } from "@/components/common/ConfirmDelete/ConfirmDeleteModal";
import { FormModal } from "@/components/common/FormModal/FormModal";
import { Header } from "@/components/common/Header/HeaderGeneric";
import { useCreateServiceMutation, useDeleteServiceMutation, useEditServiceMutation, useServicesQuery } from "@/modules/hooks";
import { Service, UpdateService } from "@/modules/interfaces/service.interface";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServicesTable } from "./ServicesTable";

export function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);

  const navigate = useNavigate();

  const { isLoading, error, data, refetch } = useServicesQuery();

  const createServiceMutation = useCreateServiceMutation(refetch);

  const deleteServiceMutation = useDeleteServiceMutation(refetch, setIsConfirmModalOpen);

  const alterServiceMutation = useEditServiceMutation(refetch, setIsModalOpen);

  const handleDeleteClick = (service: Service) => {
    setServiceToDelete(service);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (serviceToDelete) {
      if (serviceToDelete?.id !== undefined) {
        deleteServiceMutation.mutateAsync(serviceToDelete.id);
      }
    }
  };
  const handleUpdateService = (updatedService: UpdateService) => {
    if (serviceToEdit) {
      if (serviceToEdit?.id !== undefined) {
        const update: UpdateService = { name: updatedService.name, description: updatedService.description };
        alterServiceMutation.mutateAsync({ serviceId: serviceToEdit.id, updatedService: update });
      }
    }
  };

  const handleEditClick = (service: Service) => {
    setServiceToEdit(service);
    setIsModalOpen(true);
  };

  const handleAddServiceClick = () => {
    setServiceToEdit(null);
    setIsModalOpen(true);
  };


  const handleCreateService = (newService: Service) => {
    createServiceMutation.mutateAsync(newService);
  };

  const handleClickMaterials = (service: Service) => {
    navigate(`/services/${service.id}/materials`, { state: { service } });
  }

  if (isLoading) return "Loading...";
  if (error) return "An error occurred: " + error.message;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <Header title="Serviços" ButtonsProps={{ onClick: handleAddServiceClick, label: "Adicionar Novo Serviço" }} />
        <ServicesTable
          data={data}
          onDelete={handleDeleteClick}
          onEdit={handleEditClick}
          toMaterials={handleClickMaterials}
        />
        <FormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data: Service) => serviceToEdit ? handleUpdateService(data) : handleCreateService(data)}
          itemToEdit={serviceToEdit}
          fields={[
            { label: 'Nome', name: 'name', type: 'text', required: true },
            { label: 'Descrição', name: 'description', type: 'text' },
          ]}

          title="Serviço" />
        {/* <ServiceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreateService={handleCreateService}
          onUpdateService={handleUpdateService}
          serviceToEdit={serviceToEdit}
        /> */}
        <ConfirmDeleteModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmDelete}
          name={serviceToDelete?.name || ""}
          title={"Serviço"}
        />
      </div>
    </main>
  )
}