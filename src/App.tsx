import React, { useState } from "react";
import Accordion from "./components/Accordion";
import Modal from "./components/Modal";
import { Person } from "./utils/helpers";
import "./styles.css";

const data: Person[] = [
  {
    id: 1,
    name: "John Doe",
    DOB: "1990-01-01",
    gender: "male",
    country: "India",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur sapien nec risus vulputate, sit amet sollicitudin lacus aliquet. Suspendisse lobortis feugiat lobortis. Nam vel varius nunc. Suspendisse in mi turpis. Suspendisse elementum imperdiet elit",
  },
  {
    id: 2,
    name: "Alice",
    DOB: "1991-01-01",
    gender: "male",
    country: "India",
    description:
      "Vestibulum congue mattis enim, sit amet convallis lectus faucibus sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at nulla sapien. Sed eget est a justo dignissim efficitur. Proin pretium rhoncus molestie. Sed feugiat",
  },
  {
    id: 3,
    name: "Annie J",
    DOB: "1992-01-01",
    gender: "female",
    country: "USA",
    description:
      "Integer vel ultrices ex. Sed vel nulla neque. Sed accumsan lacinia risus congue mollis. Duis vitae consectetur nisl, nec ornare mi. Sed non pulvinar urna, a varius turpis.",
  },
];
const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [list, setList] = useState(data);
  const [expandedAccordionId, setExpandedAccordionId] = useState<number | null>(
    null
  );
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

  const toggleAccordion = (accordionId: number) => {
    setExpandedAccordionId((prevId) =>
      prevId === accordionId ? null : accordionId
    );
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
            isExpanded={expandedAccordionId === person.id}
            toggleAccordion={toggleAccordion}
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
