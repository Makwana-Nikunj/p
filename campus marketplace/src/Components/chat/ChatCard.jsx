import profileService from "../../appwrite/profileService";
import { FiTrash2 } from "react-icons/fi";

const ChatCard = ({ conversation, userId, onClick, products, onDelete }) => {
  const otherUserId = conversation.buyerId === userId ? conversation.sellerId : conversation.buyerId;
  
  // Get the other person's name
  let displayName = otherUserId;
  
  // Try to get name from conversation (if it was stored)
  if (userId === conversation.buyerId && conversation.sellerName) {
    displayName = conversation.sellerName;
  } else if (userId === conversation.sellerId && conversation.buyerName) {
    displayName = conversation.buyerName;
  } else {
    // Fallback: get seller name from products
    const product = products.find((p) => p.$id === conversation.productId);
    if (userId === conversation.buyerId && product) {
      displayName = product.sellerName || otherUserId;
    }
  }

  // Determine role badge
  const isSeller = userId === conversation.sellerId;
  const roleBadge = isSeller ? "Buyer" : "Seller";

  // Get profile photo
  const profilePhoto = profileService.getProfilePhoto(otherUserId) || 
    "https://img.freepik.com/free-icon/user_318-159711.jpg";

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center border-b border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition-colors group relative"
    >
      <div className="flex gap-3 flex-1 min-w-0">
        <div className="relative shrink-0">
          <img
            src={profilePhoto}
            alt={displayName}
            className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-gray-900 truncate">{displayName}</p>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium shrink-0">
              {roleBadge}
            </span>
          </div>
          <p className="text-sm text-gray-600 truncate mb-0.5">
            {conversation.lastMessage || "No messages yet"}
          </p>
          <p className="text-xs text-gray-500 truncate">
            Re: {conversation.productName}
          </p>
        </div>
      </div>

      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-red-50 rounded-lg hover:scale-110 shrink-0"
        title="Delete conversation"
        aria-label="Delete conversation"
      >
        <FiTrash2 className="w-4 h-4 text-red-600" />
      </button>
    </div>
  );
};

export default ChatCard;
