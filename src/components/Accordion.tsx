import React, { useState, useEffect } from "react";
import { FiPlus, FiMinus, FiEdit2, FiTrash } from "react-icons/fi";
import { Person, calculateAge } from "../utils/helpers";

type AccordionProps = {
  person: Person;
  toggleAccordion: (accordionId: number) => void;
  handleDeletePerson: (person: Person) => void;
  isExpanded: boolean;
};

const Accordion: React.FC<AccordionProps> = ({
  person,
  handleDeletePerson,
  isExpanded,
  toggleAccordion,
}) => {
  const { id, name, DOB, gender, country, description } = person;

  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDOB, setEditedDOB] = useState(DOB);
  const [editedAge, setEditedAge] = useState<any>(calculateAge(DOB));
  const [editedGender, setEditedGender] = useState(gender);
  const [editedCountry, setEditedCountry] = useState(country);
  const [editedDescription, setEditedDescription] = useState(description);

  useEffect(() => {
    setIsOpen(isExpanded);
  }, [isExpanded]);

  const handleAccordionClick = () => {
    setIsOpen(!isOpen);
    toggleAccordion(person.id);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    if (
      editedName.trim() === "" ||
      editedCountry.trim() === "" ||
      isNaN(parseInt(editedAge))
    ) {
      alert("Please fill in all the fields correctly.");
      return;
    }
    setEditedName(editedName.trim());
    setEditedCountry(editedCountry.trim());
    setEditedAge(editedAge);
    setEditedDescription(editedDescription.trim());
    setIsEditMode(false);
  };

  const handleCancelClick = () => {
    setEditedName(name);
    setEditedDOB(DOB);
    setEditedGender(gender);
    setEditedCountry(country);
    setEditedDescription(description);
    setIsEditMode(false);
  };

  return (
    <div className={`accordion ${isOpen ? "open" : ""}`}>
      <div className="accordion-header">
        <input
          className={`user-name ${isEditMode ? "editable" : ""}`}
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          disabled={!isEditMode}
        />
        <div onClick={handleAccordionClick} className="accordian-toggle-btn">
          {isOpen ? <FiMinus /> : <FiPlus />}
        </div>
      </div>
      {isOpen && (
        <div className="accordion-content">
          <div className="card">
            <div className="card-body">
              <div className="card-user-details">
                <span>
                  <label>Age</label>
                  <input
                    className={isEditMode ? "editable" : "input-details"}
                    type="text"
                    value={editedAge}
                    onChange={(e) => setEditedAge(e.target.value)}
                    readOnly={!isEditMode}
                  />
                </span>

                <span>
                  <label>Gender</label>
                  <select
                    className={isEditMode ? "editable" : "input-details"}
                    value={editedGender}
                    onChange={(e) => setEditedGender(e.target.value)}
                    disabled={!isEditMode}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="prefer-not-to-say">Prefer Not to Say</option>
                  </select>
                </span>
                <span>
                  <label>Country</label>
                  <input
                    className={isEditMode ? "editable" : "input-details"}
                    type="text"
                    value={editedCountry}
                    onChange={(e) => setEditedCountry(e.target.value)}
                    disabled={!isEditMode}
                  />
                </span>
              </div>
              <div className="description">
                <label>Description:</label>
                <textarea
                  className={
                    isEditMode ? "editable-text-area" : "default-text-area"
                  }
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  disabled={!isEditMode}
                />
              </div>
            </div>
            <div className="card-actions">
              {isEditMode ? (
                <>
                  <button className="save-btn" onClick={handleSaveClick}>
                    Save
                  </button>
                  <button className="cancel-btn" onClick={handleCancelClick}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="edit-btn" onClick={handleEditClick}>
                  <FiEdit2 />
                </button>
              )}
              {!isEditMode && (
                <button
                  className="delete-btn"
                  onClick={() => handleDeletePerson(person)}
                >
                  <FiTrash />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
