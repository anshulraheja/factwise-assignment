import React, { useState } from "react";
import { FiPlus, FiMinus, FiEdit2, FiTrash } from "react-icons/fi";
import "./styles.css";

interface Person {
  name: string;
  DOB: string;
  gender: string;
  country: string;
  description: string;
}

const data: Person[] = [
  {
    name: "John Doe",
    DOB: "1990-01-01",
    gender: "male",
    country: "India",
    description:
      "Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum"
  },
  {
    name: "aman Doe",
    DOB: "1991-01-01",
    gender: "male",
    country: "India",
    description: "Lorem ipsum"
  },
  {
    name: "John Doe",
    DOB: "1992-01-01",
    gender: "female",
    country: "usa",
    description: "Lorem ipsum"
  }

  // Add more people to the data array
];

const Accordion: React.FC<Person> = ({
  name,
  DOB,
  gender,
  country,
  description
}) => {
  const [list, setList] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDOB, setEditedDOB] = useState(DOB);
  const [editedGender, setEditedGender] = useState(gender);
  const [editedCountry, setEditedCountry] = useState(country);
  const [editedDescription, setEditedDescription] = useState(description);

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    // Check if the birth date has already occurred this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

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
      isNaN(Number(editedCountry)) === false ||
      isNaN(Number(calculateAge(editedDOB))) === true
    ) {
      alert("Please fill in all the fields correctly.");
      return;
    }

    // Save the changes and exit edit mode
    setEditedName(editedName.trim());
    setEditedCountry(editedCountry.trim());
    setEditedDescription(editedDescription.trim());
    setIsEditMode(false);
  };

  const handleCancelClick = () => {
    // Revert the changes and exit edit mode
    setEditedName(name);
    setEditedDOB(DOB);
    setEditedGender(gender);
    setEditedCountry(country);
    setEditedDescription(description);
    setIsEditMode(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // Delete the user
      // Implement your own logic to remove the person from the data array
      console.log("User deleted");
    }
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
                    value={calculateAge(editedDOB)}
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
              <button className="delete-btn" onClick={handleDeleteClick}>
                <FiTrash />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {filteredData.map((person, index) => (
          <Accordion key={index} {...person} />
        ))}
      </div>
    </div>
  );
};

export default App;

//close accordina  when somethenig else is open
