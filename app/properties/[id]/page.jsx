"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import PropertyDetails from "@/components/PropertyDetails";
import { FaArrowLeft } from "react-icons/fa";
import PropertyImages from "@/components/PropertyImages";
import PropertyContactForm from "@/components/PropertyContactForm";
import ShareButton from "@/components/ShareButton";
import PropertyEditForm from "@/components/propertyEditForm";
import Spinner from "@/components/Spinner";
import BookMark from "@/components/BookMark";
const PropertyPage = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;

      try {
        const propertyData = await fetchProperty(id);
        setProperty(propertyData);
      } catch (error) {
        console.error("Error fetching property:", error);
        setProperty(null); // Ensure property is null on error
      } finally {
        setLoading(false);
      }
    };
    if (property === null) {
      fetchPropertyData();
    }
  }, [id]);

  if (loading) {
    return <h1 className="text-center text-2xl font-bold mt-10">LOADING...</h1>;
  }

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        PROPERTY NOT FOUND
      </h1>
    );
  }
  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" />
                Back to Properties
              </Link>
            </div>
          </section>

          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />

                <aside className="space-y-4">
                  <BookMark property={property} />
                  <ShareButton property={property} />
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
