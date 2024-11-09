export interface FormModalProps<T> {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: T) => void;
    itemToEdit?: T | null;
    fields: Array<{ label: string; name: keyof T; type: 'text' | 'number'; required?: boolean }>;
    title: string;
}

export interface FormModalState<T> {
    formData: T;
}