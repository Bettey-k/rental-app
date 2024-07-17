import React from "react";
import InfoBox from "./InfoBox";
import Link from "next/link";
const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renter"
            backgroundColor="bg-gray-100"
            buttonInfo={{
              text: "Browse Properties",
              Link: "/properties",
              backgroundColor: "bg-black",
            }}
          ></InfoBox>
          <InfoBox
            heading="For Property Owners"
            backgroundColor="bg-blue-500"
            buttonInfo={{
              text: "Add Property",
              Link: "/properties/add",
              backgroundColor: "bg-black",
            }}
          ></InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
