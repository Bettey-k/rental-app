"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";
import MarkMessageAsRead from "@/app/actions/markMessageAsRead";

const MessageCard = ({ message }) => {
  const { setUnreadCount } = useGlobalContext();

  const [isRead, setIsRead] = useState(message.read);
  const [isDelete, setIsDelete] = useState(false);
  const handleReadClick = async () => {
    try {
      const read = await MarkMessageAsRead(message._id);
      setIsRead(read);
      setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1)); // update unread count
      toast.success(`Marked as ${read ? "Read" : "New"}`);
    } catch (error) {
      toast.error("Failed to update message status.");
    }
  };

  const handleDeleteClick = async () => {
    await deleteMessage(message._id);

    setIsDelete(true);
    setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1)); // update unread count

    toast.success("Message Deleted successfully");
  };

  if (isDelete) {
    return <p>Deleted Message</p>;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white py-1 px-2 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <div className="mt-4 flex gap-x-3">
        <button
          onClick={handleReadClick}
          className="bg-blue-500 text-white py-1 px-3 rounded-md"
        >
          {isRead ? "Mark as New" : "Mark as Read"}
        </button>{" "}
        &nbsp;
        <button
          onClick={handleDeleteClick}
          className="bg-red-500 text-white py-1 px-3 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MessageCard;
