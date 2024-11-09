import { api } from "@/backend/api";
import { useQuery } from "@tanstack/react-query";

export const useMaterialsQuery = (ServiceId: number) => useQuery({
    queryKey: ["materials"],
    queryFn: () => api.get(`/services/${ServiceId}/materials`).then((response) => response.data),
});