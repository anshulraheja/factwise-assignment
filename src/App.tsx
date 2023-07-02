import React, { useState } from "react";
import Accordion from "./components/Accordion";
import Modal from "./components/Modal";
import { Person } from "./utils/helpers";
import "./styles.css";
import {data} from './utils/data';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [list, setList] = useState(data);
  const [personToDelete, setPersonToDelete] = useState<Person | null>(null);

  const filteredData = list.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeletePerson = (person: Person) => {
    setPersonToDelete(person);
  };

  const handleConfirmDelete = (person: Person) => {
    const updatedList = list.filter((p) => p.id !== person.id);
    setList(updatedList);
    setPersonToDelete(null);
  };

  const closeModal = () => {
    setPersonToDelete(null);
  };
  
  

  return (
    <div className="app">
      <h1>Person List</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredData.length > 0 ? (
        filteredData.map((person) => (
          <Accordion
            key={person.id}
            person={person}
            handleDeletePerson={handleDeletePerson}
          />
        ))
      ) : (
        <p>No results found.</p>
      )}
      <Modal
        personToDelete={personToDelete}
        handleConfirmDelete={handleConfirmDelete}
        closeModal={closeModal}
      />
    </div>
  );
};

export default App;
