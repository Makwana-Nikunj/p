const MessageBubble = ({ isOwn, text, timestamp }) => {
  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      // Show time if today
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 48) {
      // Show "Yesterday" if yesterday
      return 'Yesterday';
    } else {
      // Show date if older
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className={`w-full flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm wrap-break-word shadow-sm ${
          isOwn
            ? "bg-black text-white dark:bg-gray-700 rounded-br-md"
            : "bg-white text-gray-900 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 rounded-bl-md"
        }`}
      >
        {text}
      </div>
      {timestamp && (
        <span className="text-xs text-gray-500 dark:text-gray-400 px-2 mt-1">
          {formatTime(timestamp)}
        </span>
      )}
    </div>
  );
};

export default MessageBubble;
