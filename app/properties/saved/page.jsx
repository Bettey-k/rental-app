import React from "react";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

const SavedProperties = async () => {
  try {
    await connectDB(); // Ensure database connection

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      console.error("User not found or session invalid");
      return <p>Error: User not found.</p>;
    }

    const { userId } = sessionUser;

    // Fetch the user and populate bookmarks
    const user = await User.findById(userId).populate("bookmarks");

    if (!user || !user.bookmarks || user.bookmarks.length === 0) {
      console.log("No bookmarks found for this user");
      return <p>No Saved Properties</p>;
    }

    const { bookmarks } = user;

    return (
      <section className="px-4 py-6">
        <div className="container lg:container m-auto px-4 py-6">
          <h1 className="text-2xl mb-4">Saved Properties</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching saved properties:", error);
    return <p>Error fetching saved properties. Please try again later.</p>;
  }
};

export default SavedProperties;
