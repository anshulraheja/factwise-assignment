import React from "react";
import { Person } from "../utils/helpers";

interface ModalProps {
  personToDelete: Person | null;
  handleConfirmDelete: (person: Person) => void;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({
  personToDelete,
  handleConfirmDelete,
  closeModal,
}) => {
  if (!personToDelete) return null;

  const { name } = personToDelete;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete {name}?</p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="delete-btn"
            onClick={() => handleConfirmDelete(personToDelete)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
