import { ConfirmDeleteModalProps } from "@/components/interfaces/confirmDelete.interface";
import { Button } from "@/components/ui/button";
import { Component } from "react";

export class ConfirmDeleteModal extends Component<ConfirmDeleteModalProps> {
  handleConfirm = () => {
    const { onConfirm } = this.props;
    if (onConfirm) onConfirm();
  };

  handleClose = () => {
    const { onClose } = this.props;
    if (onClose) onClose();
  };

  render() {
    const { isOpen, title, name } = this.props;

    if (!isOpen) return null;

    const text = `Tem certeza de que deseja excluir o ${title} "${name}"? Esta ação não pode ser desfeita.`;

    return (
      <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="modal-content bg-white p-6 rounded shadow-lg w-1/3">
          <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
          <p>{text}</p>
          <div className="flex justify-end mt-4">
            <Button type="button" onClick={this.handleClose} className="mr-2">
              Cancelar
            </Button>
            <Button type="button" onClick={this.handleConfirm} variant="destructive">
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
