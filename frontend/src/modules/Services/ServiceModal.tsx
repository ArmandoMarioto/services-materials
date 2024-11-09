import { Button } from "@/components/ui/button";
import React, { Component } from 'react';
import { Material } from "../interfaces/material.interface";
import { Service, ServiceModalProps } from "../interfaces/service.interface";



export class ServiceModal extends Component<ServiceModalProps, Service> {
  constructor(props: ServiceModalProps) {
    super(props);
    const { serviceToEdit } = this.props;
    this.state = serviceToEdit
      ? { ...serviceToEdit }
      : { name: "", description: "", materials: [] };
  }
  componentDidUpdate(prevProps: ServiceModalProps) {
    if (prevProps.serviceToEdit !== this.props.serviceToEdit) {
      if (this.props.serviceToEdit) {
        this.setState({ ...this.props.serviceToEdit });
      } else {
        this.setState({ name: '', description: '', materials: [] });
      }
    }
  }
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleMaterialChange = (index: number, field: keyof Material, value: string | number) => {
    this.setState((prevState) => {
      const updatedMaterials = [...prevState.materials];
      updatedMaterials[index] = {
        ...updatedMaterials[index],
        [field]: value,
      };
      return { materials: updatedMaterials };
    });
  };

  addMaterial = () => {
    this.setState((prevState) => ({
      materials: [...prevState.materials, { name: '', description: '', quantity: 0 }],
    }));
  };

  removeMaterial = (index: number) => {
    this.setState((prevState) => {
      const updatedMaterials = [...prevState.materials];
      updatedMaterials.splice(index, 1);
      return { materials: updatedMaterials };
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { name, description, materials } = this.state;
    if (this.props.serviceToEdit) {
      const { id } = this.props.serviceToEdit;
      if (id !== undefined) {
        this.props.onUpdateService({ name, description });
      }
    } else {
      this.props.onCreateService({ name, description, materials });
    }
    this.setState({ name: '', description: '', materials: [] });
    this.props.onClose();
  };

  render() {
    const { isOpen, onClose } = this.props;
    const { name, description, materials } = this.state;

    if (!isOpen) return null;

    return (
      <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="modal-content bg-white p-4 rounded shadow-lg w-1/3">
          <h2 className="text-xl font-bold mb-4">Novo Serviço</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">Nome</label>
              <input

                type="text"
                name="name"
                value={name}
                onChange={this.handleInputChange}
                required
                className="w-full p-2 border rounded bg-transparent"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium ">Descrição</label>
              <textarea
                name="description"
                value={description}
                onChange={this.handleInputChange}
                className="w-full p-2 border rounded bg-transparent"
              />
            </div>

            {!this.props.serviceToEdit ? (<div className="mb-4">
              <h3 className="text-lg font-semibold">Materiais</h3>
              {materials.map((material, index) => (
                <div key={index} className="mb-2 border p-2 rounded">
                  <label className="block text-sm font-medium">Nome do Material</label>
                  <input
                    type="text"
                    value={material.name}
                    onChange={(e) => this.handleMaterialChange(index, 'name', e.target.value)}
                    required
                    className="w-full p-1 border rounded mb-2"
                  />
                  <label className="block text-sm font-medium">Descrição</label>
                  <input
                    type="text"
                    value={material.description}
                    onChange={(e) => this.handleMaterialChange(index, 'description', e.target.value)}
                    className="w-full p-1 border rounded mb-2"
                  />
                  <label className="block text-sm font-medium">Quantidade</label>
                  <input
                    type="number"
                    value={material.quantity || 1}
                    onChange={(e) => this.handleMaterialChange(index, 'quantity', Number(e.target.value))}
                    required
                    className="w-full p-1 border rounded mb-2"
                    min="1"

                  />
                  <Button type="button" variant="outline" onClick={() => this.removeMaterial(index)}>
                    Remover Material
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={this.addMaterial} className="mt-2">
                Adicionar Material
              </Button>
            </div>) : null}


            <div className="flex justify-end">
              <Button type="button" onClick={onClose} className="mr-2">Cancelar</Button>
              <Button type="submit">{this.props.serviceToEdit ? "Atualizar" : "Criar"}</Button>

            </div>
          </form>
        </div>
      </div>
    );
  }
}
