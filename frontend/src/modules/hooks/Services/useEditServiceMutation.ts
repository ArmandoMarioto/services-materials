import { api } from "@/backend/api";
import { UpdateService } from "@/modules/interfaces/service.interface";
import { useMutation } from "@tanstack/react-query";

export const useEditServiceMutation = (refetch?:any,setIsModalOpen?:Function) => useMutation({
    mutationFn: ({ serviceId, updatedService }: { serviceId: number, updatedService: UpdateService }) => api.put(`/services/${serviceId}`, updatedService),
    onSuccess: () => {
        if(refetch)
      refetch();
        if(setIsModalOpen)
      setIsModalOpen(false); 
      alert(`Alteração realizada com sucesso`);
    },
    onError: (error) => {
      alert(`Falha ao alterar serviço: ${error.message}`);
    }
  });