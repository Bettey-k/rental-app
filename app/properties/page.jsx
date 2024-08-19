"use client";

import React, { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";
const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getProperties = async () => {
      const fetchedProperties = await fetchProperties();
      fetchedProperties.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProperties(fetchedProperties);
    };

    getProperties();
  }, []);

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
