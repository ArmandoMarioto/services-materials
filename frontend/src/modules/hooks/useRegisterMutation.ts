import { api } from "@/backend/api";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = () => useMutation({
    mutationFn: ({ username, password }: { username: string, password: string }) => api.post(`/auth/register`, {
      username,
      password
    }),
    onSuccess: () => {
      alert(`Registrado com sucesso`);
    },
    onError: (error) => {
      alert(`Falha ao criar usuario: ${error.message}`);
    }
  });