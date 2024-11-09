import { api } from "@/backend/api";
import { Material } from "@/modules/interfaces/material.interface";
import { useMutation } from "@tanstack/react-query";


export const useCreateMaterialMutation = (serviceId: number, refetch?: () => void) => useMutation({
    mutationFn: (newMaterial: Material) =>
        api.post(`/services/${serviceId}/materials`, newMaterial),
    onSuccess: () => {
        if (refetch)
            refetch();
        alert(`Criação realizada com sucesso`);
    },
    onError: (error) => {
        alert(`Falha ao criar material: ${error.message}`);
    }
});