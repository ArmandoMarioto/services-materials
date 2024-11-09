import { api } from "@/backend/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteMaterialMutation = (serviceId: number, refetch?: () => void, setIsConfirmModalOpen?: Function) => useMutation({
    mutationFn: (materialId: number) => api.delete(`/services/${serviceId}/materials/${materialId}`),
    onSuccess: () => {
        if (refetch)
            refetch();
        if (setIsConfirmModalOpen)
            setIsConfirmModalOpen(false);
    },
    onError: (error) => {
        alert(`Falha ao excluir material: ${error.message}`);
    }
});