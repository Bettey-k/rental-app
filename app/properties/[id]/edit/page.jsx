import React from "react";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializeObject } from "@/utils/convertToObject";
import PropertyEditForm from "@/components/propertyEditForm";
const PropertyEditPage = async ({ params }) => {
  await connectDB();
  const propertyDoc = await Property.findById(params.id).lean();
  const property = convertToSerializeObject(propertyDoc);
  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not found
      </h1>
    );
  }

  return (
    <section className="bg-blue-50">
      <div className="container mx-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8  mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
