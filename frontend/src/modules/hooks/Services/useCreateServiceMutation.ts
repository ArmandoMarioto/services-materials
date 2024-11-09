import { api } from "@/backend/api";
import { Service } from "@/modules/interfaces/service.interface";
import { useMutation } from "@tanstack/react-query";

export const useCreateServiceMutation = (refetch?:any) => useMutation({
    mutationFn: (newService: Service) =>
      api.post("/services", newService),
    onSuccess: () => {
        if(refetch)
      refetch();
      alert(`Criação realizada com sucesso`);
    },
    onError: (error) => {
      alert(`Falha ao criar serviço: ${error.message}`);
    }
  });