"use server";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function checkBookmarkStatus(propertyId){

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      throw new Error("User ID required");
    }
    const { userId } = sessionUser;
    const user = await User.findById(userId);
  let isBookMarked = user.bookmarks.includes(propertyId);
  return {isBookMarked}

}
export default  checkBookmarkStatus