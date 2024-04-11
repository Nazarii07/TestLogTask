import React, { useState } from "react";
import "./accordion.css";

const Accordion = ({ children, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <button className="accordion-header" onClick={toggleAccordion}>
        {index + 1}: More info
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default Accordion;
