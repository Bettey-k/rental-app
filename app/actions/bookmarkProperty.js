"use server";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import connectDB from "@/config/database";

async function bookMarkProperty(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID required");
  }
  const { userId } = sessionUser;
  const user = await User.findById(userId);
  let isBookMarked = user.bookmarks.includes(propertyId);
  let message;
  if (isBookMarked) {
    // If already bookmarked, then remove
    user.bookmarks.pull(propertyId);
    message = "BookMark removed";
    isBookMarked = false; // Correct variable name
  } else {
    // If not bookmarked, then add
    user.bookmarks.push(propertyId);
    message = "Bookmark Added";
    isBookMarked = true; // Correct variable name
  }

  await user.save();
  revalidatePath("/properties/saved", "page");
  return {
    message,
    isBookMarked, // Return the correct variable
  };
}

export default bookMarkProperty;
