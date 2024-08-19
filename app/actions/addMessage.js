"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import Email from "next-auth/providers/email";

async function addMessage(previousState, formData) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required", { status: 401 });
  }
  const { userId } = sessionUser;
  const recipient = formData.get("recipient");
  // Debugging logs
  console.log("Sender ID:", userId);
  console.log("Recipient ID:", recipient);
  if (userId === recipient) {
    return { error: "you can not send amessage to ur self" };
  }
  const newMessage = new Message({
    sender: userId,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  });
  await newMessage.save();
  return { submitted: true };
}

export default addMessage;
