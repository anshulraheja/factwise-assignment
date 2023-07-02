import React, { useState } from "react";
import { FiPlus, FiMinus, FiEdit2, FiTrash } from "react-icons/fi";
import "./styles.css";

interface Person {
  id: number;
  name: string;
  DOB: string;
  gender: string;
  country: string;
  description: string;
}

const data: Person[] = [
  {
    id: 1,
    name: "John Doee",
    DOB: "1990-01-01",
    gender: "male",
    country: "India",
    description:
      "Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum",
  },
  {
    id: 2,
    name: "Aman Doe",
    DOB: "1991-01-01",
    gender: "male",
    country: "India",
    description: "Lorem ipsum",
  },
  {
    id: 3,
    name: "Jane Doe",
    DOB: "1992-01-01",
    gender: "female",
    country: "USA",
    description: "Lorem ipsum",
  },
  // Add more people to the data array
];

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }
  return age;
};

const Accordion: React.FC<any> = ({
  id,
  name,
  DOB,
  gender,
  country,
  description,
  handleDeletePerson,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDOB, setEditedDOB] = useState(DOB);
  const [editedAge, setEditedAge] = useState<any>(calculateAge(DOB));
  const [editedGender, setEditedGender] = useState(gender);
  const [editedCountry, setEditedCountry] = useState(country);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleAccordionClick = () => {
    setIsOpen(!isOpen);
    setIsEditMode(false);
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
      <div className="accordion-header" onClick={handleAccordionClick}>
        <input
          className={`user-name ${isEditMode ? "editable" : ""}`}
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          disabled={!isEditMode}
        />
        {isOpen ? <FiMinus /> : <FiPlus />}
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
                  onClick={() => handleDeletePerson(id)}
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

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [list, setList] = useState(data);

  console.log(list);
  const filteredData = list.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeletePerson = (id: number) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete this user?")) {
      setList((prevList) => prevList.filter((person) => person.id !== id));
    }
  };

  return (
    <div className="app">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="accordion-list">
        {filteredData.map((person) => (
          <Accordion
            key={person.id} // Use the id as the key prop
            {...person}
            handleDeletePerson={handleDeletePerson}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
