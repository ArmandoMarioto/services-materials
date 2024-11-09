import { Material } from "./material.interface";

export interface Service {
    id?: number;
    name: string;
    description: string;
    materials: Material[];
  }

  export interface UpdateService {
    name: string;
    description: string;
  }
  
export interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateService: (newService: Service) => void;
  onUpdateService: (updatedService: UpdateService) => void; 
  serviceToEdit: Service | null; 

}

export interface ServiceTableProps {
  data: Service[];
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
  toMaterials: (service: Service) => void;
}