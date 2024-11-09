import { api } from "@/backend/api";
import { UpdateMaterial } from "@/modules/interfaces/material.interface";
import { useMutation } from "@tanstack/react-query";


export const useEditMaterialMutation = (serviceId: number, refetch?: () => void, setIsModalOpen?: (isOpen: boolean) => void) => useMutation({
    mutationFn: ({ materialId, updatedMaterial }: { materialId: number, updatedMaterial: UpdateMaterial }) => api.put(`/services/${serviceId}/materials/${materialId}`, updatedMaterial),
    onSuccess: () => {
        if (refetch)
            refetch();
        if (setIsModalOpen)
            setIsModalOpen(false);
        alert(`Alteração realizada com sucesso`);
    },
    onError: (error) => {
        alert(`Falha ao alterar material: ${error.message}`);
    }
});