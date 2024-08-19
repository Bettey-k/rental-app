import connectDB from "@/config/database";
import Message from "@/models/Message";
import Property from "@/models/Property";
import { convertToSerializeObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import MessageCard from "@/components/messageCard";
const MessagePage = async () => {
  await connectDB(); // Add `await` here to ensure DB connection
  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;

  const readMessage = await Message.findOne({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessage = await Message.findOne({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  // Ensure that `readMessage` and `unreadMessage` are treated as arrays
  const messages = [];
  if (unreadMessage) messages.push(unreadMessage);
  if (readMessage) messages.push(readMessage);

  // Serialize the messages
  const serializedMessages = messages.map((messageDoc) => {
    const message = convertToSerializeObject(messageDoc);
    message.sender = convertToSerializeObject(messageDoc.sender);
    message.property = convertToSerializeObject(messageDoc.property);
    return message;
  });

  return (
    <section className="bg-blue-50">
      <div className="container mx-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Message</h1>
          <div className="space-y-4">
            {serializedMessages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              serializedMessages.map((message) => (
                <MessageCard key={message._id} message={message}/>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagePage;
