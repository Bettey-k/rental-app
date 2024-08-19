"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  // Connect to the database
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID required");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);
  if (!property) throw new Error("Property not found");

  // Verify if the current user is the owner of the property
  const isOwner =
    property.userId && property.userId.toString() === userId.toString();
  const isAuthorized =
    property.owner && property.owner.toString() === userId.toString();

  // If neither condition is true, the user is unauthorized
  if (!isOwner && !isAuthorized) {
    throw new Error("Unauthorized");
  }

  // Extract public IDs from image URLs
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".")[0];
  });

  // Delete images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("propertyPulse/" + publicId);
    }
  }

  // Delete the property from the database
  await property.deleteOne();

  // Revalidate the necessary paths to reflect the deletion
  await revalidatePath("/", "layout");
}

export default deleteProperty;
