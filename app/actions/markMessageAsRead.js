"use server";
import { getSessionUser } from "@/utils/getSessionUser";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { revalidatePath } from "next/cache";

async function MarkMessageAsRead(messageId) {
  await connectDB(); // Ensure the database is connected

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID required");
  }

  const { userId } = sessionUser;
  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error("Message not found");
  }

  // Verify ownership
  if (message.recipient.toString() !== userId) {
    throw new Error("You are not authorized to mark this message as read");
  }

  // Toggle the read status
  message.read = !message.read;
  await message.save();

  // Revalidate the cache for the messages page
  revalidatePath("/messages");

  // Return the updated read status
  return message.read;
}

export default MarkMessageAsRead;
