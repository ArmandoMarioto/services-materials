import { api } from "@/backend/api";
import { useQuery } from "@tanstack/react-query";

export const useServicesQuery = () =>useQuery({
    queryKey: ["services"],
    queryFn: () => api.get("/services").then((response) => response.data),
  });