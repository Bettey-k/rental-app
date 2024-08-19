"use server";
import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { revalidatePath } from "next/cache";

async function getUnreadMessageCount(messageId) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID required");
  }
  const { userId } = sessionUser;
  const count = await Message.countDocuments({
    recipient: userId,
    raed: false,
  });
  return { count };
}
export default getUnreadMessageCount;
