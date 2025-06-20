
import React, { useState } from "react";
import Adminnav from "./Adminnav";

const AdminHome = () => {
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  const handleInstitutionSelect = (institution) => {
    setSelectedInstitution(institution);
  };

  return (
    <div className="pt-20 px-8">
      {/* Navigation Bar */}
      <Adminnav onInstitutionSelect={handleInstitutionSelect} />

      {/* Greeting or Institution Content */}
      {!selectedInstitution ? (
        <div className="text-center mt-10 text-2xl font-semibold text-[#001f3f]">
          👋 Welcome Admin! Please select an institution from the Home dropdown.
        </div>
      ) : (
        <div className="mt-10 text-xl">
          <h2 className="text-[#001f3f] font-bold mb-4">
            Institution Selected:{" "}
            {selectedInstitution.charAt(0).toUpperCase() + selectedInstitution.slice(1)}
          </h2>
          {/* Add your content for each institution here */}
          <p>This section can show data or actions related to the {selectedInstitution} department.</p>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
