const MessageBubble = ({ isOwn, text, timestamp }) => {
  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <div className={`w-full flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
      <div
        className={`
          max-w-[75%] px-4 py-2.5 rounded-2xl text-sm wrap-break-word shadow-sm
          border border-subtle
          ${isOwn
            ? "bg-indigo-500/20 glass text-white rounded-br-md"
            : "bg-[#0C0C0C] glass text-gray-100 rounded-bl-md"
          }
          animate-pop
        `}
      >
        {text}
      </div>
      {timestamp && (
        <span className="text-xs text-gray-400 px-2 mt-1">
          {formatTime(timestamp)}
        </span>
      )}
    </div>
  );
};

export default MessageBubble;
