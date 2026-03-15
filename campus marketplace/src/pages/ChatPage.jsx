import React, { useEffect, useState, useRef } from "react";
import { FiSearch, FiArrowLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
import ChatCard from '../Components/chat/ChatCard';
import MessageBubble from '../Components/chat/MessageBubble';
import chatService from '../services/chatService';
import profileService from '../services/profileService';

const Chat = () => {
  const user = useSelector((state) => state.auth.userData);
  const products = useSelector((state) => state.products.products);

  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  // Load conversations for the logged-in user
  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        setLoading(true);
        const res = await chatService.getUserConversations(user.$id);
        setConversations(res.documents);
      } catch (error) {
        console.error("Failed to load conversations:", error);
        alert("Failed to load conversations. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  // Open a conversation and load its messages
  const openChat = async (conv) => {
    setActiveConversation(conv);
    setLoadingMessages(true);
    setMessages([]);

    try {
      const res = await chatService.getMessages(conv.$id);
      setMessages(res.documents);

      // Mark conversation as read
      if (conv.unreadCount > 0) {
        await chatService.markAsRead(conv.$id, user.$id);
        setConversations((prev) =>
          prev.map((c) =>
            c.$id === conv.$id ? { ...c, unreadCount: 0 } : c
          )
        );
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
      alert("Failed to load messages. Please try again.");
    } finally {
      setLoadingMessages(false);
    }
  };

  // Send a message in the active conversation
  const sendMessage = async () => {
    if (!activeConversation) return;
    if (!input.trim() || sendingMessage) return;

    try {
      setSendingMessage(true);

      const newMsg = await chatService.sendMessage(
        activeConversation.$id,
        user.$id,
        input
      );

      if (!newMsg) {
        throw new Error("Failed to send message (socket disconnected).");
      }

      await chatService.updateLastMessage(activeConversation.$id, input);

      setMessages((prev) => [...prev, newMsg]);
      setConversations((prev) =>
        prev.map((c) =>
          c.$id === activeConversation.$id
            ? { ...c, lastMessage: input, $updatedAt: new Date().toISOString() }
            : c
        )
      );
      setInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setSendingMessage(false);
    }
  };

  // Delete a conversation
  const deleteConversation = async (convId) => {
    if (!window.confirm("Are you sure you want to delete this conversation?")) {
      return;
    }

    try {
      await chatService.deleteConversation(convId);
      setConversations((prev) => prev.filter((c) => c.$id !== convId));

      if (activeConversation?.$id === convId) {
        setActiveConversation(null);
        setMessages([]);
      }

      alert("Conversation deleted successfully");
    } catch (error) {
      console.error("Failed to delete conversation:", error);
      alert("Failed to delete conversation. Please try again.");
    }
  };

  // Realtime updates for the active conversation
  useEffect(() => {
    if (!activeConversation || !user) return;

    try {
      const unsub = chatService.subscribeMessages(activeConversation.$id, (event) => {
        const msg = event.payload;

        if (msg.conversationId !== activeConversation.$id) return;
        if (msg.senderId === user.$id) return; // avoid duplicate for our own messages

        setMessages((prev) => [...prev, msg]);
      });

      return () => {
        try {
          if (typeof unsub === "function") {
            unsub();
          } else if (unsub && typeof unsub.unsubscribe === "function") {
            unsub.unsubscribe();
          }
        } catch (err) {
          console.error("Failed to unsubscribe from messages:", err);
        }
      };
    } catch (error) {
      console.error("Failed to subscribe to messages:", error);
    }
  }, [activeConversation, user]);

  // Auto-scroll when messages change
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // Focus input when conversation opens
  useEffect(() => {
    if (activeConversation && !loadingMessages) {
      inputRef.current?.focus();
    }
  }, [activeConversation, loadingMessages]);

  // Filter conversations by search query
  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const otherPersonName =
      conv.buyerId === user.$id ? conv.sellerName : conv.buyerName;

    return (
      otherPersonName?.toLowerCase().includes(query) ||
      conv.productName?.toLowerCase().includes(query) ||
      conv.lastMessage?.toLowerCase().includes(query)
    );
  });

  const getOtherParticipantName = (conv) => {
    if (!conv) return "";

    if (conv.buyerId === user.$id) {
      return conv.sellerName || "Seller";
    }

    return conv.buyerName || "Buyer";
  };

  const getProductName = (conv) => {
    if (!conv) return "";
    if (conv.productName) return conv.productName;

    const prod = products.find((p) => p.$id === conv.productId);
    return prod?.title || "Product";
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 py-2 md:py-6 px-2 md:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-[32%_68%]" style={{ height: '75vh' }}>
          {/* Conversations list */}
          <div className={`border-r border-gray-200 flex flex-col ${activeConversation ? 'hidden md:flex' : 'flex'}`} style={{ height: '100%', overflow: 'hidden' }}>
            {/* Sticky search header */}
            <div className="bg-white z-10 p-3 md:p-4 border-b border-gray-200 shrink-0">
              <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2">
                <FiSearch className="text-gray-500" />
                <input
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Search conversations"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Scrollable conversation list */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                minHeight: 0,
                maxHeight: '100%'
              }}
            >
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
                </div>
              ) : filteredConversations.length > 0 ? (
                filteredConversations.map((c) => (
                  <ChatCard
                    key={c.$id}
                    conversation={c}
                    userId={user.$id}
                    onClick={() => openChat(c)}
                    products={products}
                    onDelete={() => deleteConversation(c.$id)}
                  />
                ))
              ) : conversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <svg
                    className="w-16 h-16 text-gray-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <p className="text-gray-600 font-medium mb-2">No conversations yet</p>
                  <p className="text-sm text-gray-500">
                    Start chatting by clicking "Message Seller" on any product
                  </p>
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">No conversations found</div>
              )}
            </div>
          </div>

          {/* Chat window */}
          <div className={`flex flex-col ${!activeConversation ? 'hidden md:flex' : 'flex'}`} style={{ height: '100%', overflow: 'hidden' }}>
            {activeConversation ? (
              <>
                {/* Prominent Header with User Info */}
                <div className="bg-white border-b-2 border-gray-300 shadow-md shrink-0">
                  {/* User Info Row */}
                  <div className="flex items-center gap-4 p-4 md:p-5 bg-gradient-to-r from-gray-50 to-white">
                    <button
                      className="md:hidden text-gray-700 shrink-0 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                      onClick={() => setActiveConversation(null)}
                    >
                      <FiArrowLeft size={22} />
                    </button>

                    <img
                      src={
                        profileService.getProfilePhoto(
                          activeConversation.buyerId === user.$id
                            ? activeConversation.sellerId
                            : activeConversation.buyerId
                        ) || "https://img.freepik.com/free-icon/user_318-159711.jpg"
                      }
                      alt="Profile"
                      className="w-14 h-14 rounded-full border-2 border-gray-300 object-cover shrink-0 shadow-sm"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 text-lg mb-1 truncate">
                        {getOtherParticipantName(activeConversation)}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          {activeConversation.buyerId === user.$id ? "Seller" : "Buyer"}
                        </span>
                        <span className="text-xs text-gray-500">• Chatting about:</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Name Bar */}
                  <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 px-4 md:px-5 py-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-indigo-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span className="text-sm font-bold text-indigo-900 truncate">
                        {getProductName(activeConversation)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div
                  className="p-4 md:p-5 space-y-3 bg-gradient-to-b from-gray-50 to-gray-100"
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    minHeight: 0,
                    maxHeight: '100%'
                  }}
                >
                  {loadingMessages ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
                    </div>
                  ) : messages.length > 0 ? (
                    <>
                      {messages.map((msg, index) => {
                        if (!msg) return null; // Protect against null messages
                        const prevMsg = index > 0 ? messages[index - 1] : null;
                        const showTimestamp = !prevMsg ||
                          (new Date(msg.$createdAt) - new Date(prevMsg.$createdAt)) > 300000; // 5 min

                        return (
                          <div key={msg.$id || index}>
                            <MessageBubble
                              text={msg.text || ""}
                              isOwn={msg.senderId === user?.$id}
                              timestamp={showTimestamp ? msg.$createdAt : null}
                              imageId={msg.imageId}
                            />
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                      No messages yet. Start the conversation!
                    </div>
                  )}
                </div>

                {/* Composer */}
                <div className="p-3 md:p-4 border-t border-gray-200 flex gap-2 md:gap-3 shrink-0">
                  <input
                    ref={inputRef}
                    className="flex-1 border border-gray-300 rounded-lg px-3 md:px-4 py-2 text-sm md:text-base outline-none focus:border-black transition-colors"
                    placeholder="Type a message…"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey && !sendingMessage) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    disabled={sendingMessage}
                  />

                  <button
                    className="bg-black text-white px-4 md:px-6 py-2 rounded-lg text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors font-medium shrink-0"
                    onClick={sendMessage}
                    disabled={sendingMessage || !input.trim()}
                  >
                    {sendingMessage ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span className="hidden md:inline">Sending</span>
                      </span>
                    ) : "Send"}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 text-gray-600">
                <svg
                  className="w-20 h-20 text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <p className="text-lg font-medium mb-2">Select a conversation</p>
                <p className="text-sm text-gray-500">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
