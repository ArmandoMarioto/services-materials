import { FormModalProps, FormModalState } from '@/components/interfaces/formModal.interface';
import { Button } from '@/components/ui/button';
import React, { Component } from 'react';

export class FormModal<T> extends Component<FormModalProps<T>, FormModalState<T>> {
    constructor(props: FormModalProps<T>) {
        super(props);
        const initialFormData = props.fields.reduce((acc, field) => {
            acc[field.name] = (field.type === 'number' ? 1 : '') as T[keyof T];
            return acc;
        }, {} as T);
        this.state = {
            formData: props.itemToEdit || initialFormData,
        };
    }

    componentDidUpdate(prevProps: FormModalProps<T>) {
        if (prevProps.itemToEdit !== this.props.itemToEdit) {
            this.setState({
                formData: this.props.itemToEdit || ({} as T),
            });
        }
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: event.target.type === 'number' ? Number(value) : value,
            },
        }));
    };

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.props.onSubmit(this.state.formData);
        this.props.onClose();
    };

    render() {
        const { isOpen, onClose, fields, title } = this.props;
        const { formData } = this.state;

        if (!isOpen) return null;

        return (
            <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="modal-content bg-white p-4 rounded shadow-lg w-1/3">
                    <h2 className="text-xl font-bold mb-4">{title}</h2>
                    <form onSubmit={this.handleSubmit}>
                        {fields.map((field) => (
                            <div key={field.name as string} className="mb-4">
                                <label className="block text-sm font-medium">{field.label}</label>
                                <input
                                    type={field.type}
                                    name={field.name as string}
                                    value={formData[field.name] as string | number}
                                    onChange={this.handleInputChange}
                                    required={field?.required ?? false}
                                    min={field.type === 'number' ? 1 : undefined}
                                    className="w-full p-2 border rounded bg-transparent"
                                />
                            </div>
                        ))}
                        <div className="flex justify-end">
                            <Button type="button" onClick={onClose} className="mr-2">
                                Cancelar
                            </Button>
                            <Button type="submit">{this.props.itemToEdit ? 'Atualizar' : 'Criar'}</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}