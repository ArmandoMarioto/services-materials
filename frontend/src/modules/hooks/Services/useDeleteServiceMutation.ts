import { api } from "@/backend/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteServiceMutation = (refetch: any, setIsConfirmModalOpen: Function) => useMutation({
  mutationFn: (serviceId: number) => api.delete(`/services/${serviceId}`),
  onSuccess: () => {
    refetch();
    setIsConfirmModalOpen(false);
  },
  onError: (error) => {
    alert(`Falha ao excluir serviço: ${error.message}`);
  }
});