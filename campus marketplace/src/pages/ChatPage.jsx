import React, { useEffect, useState, useRef } from "react";
import { FiSearch, FiArrowLeft, FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import chatService from '../services/chatService';

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

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString('en-IN', { weekday: 'short' });
    }
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

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
        throw new Error("Failed to send message");
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
    } finally {
      setSendingMessage(false);
    }
  };

  // Realtime updates for the active conversation
  useEffect(() => {
    if (!activeConversation || !user) return;

    try {
      const unsub = chatService.subscribeMessages(activeConversation.$id, (event) => {
        const msg = event.payload;

        if (msg.conversationId !== activeConversation.$id) return;
        if (msg.senderId === user.$id) return;

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

  const getProductPrice = (conv) => {
    const prod = products.find((p) => p.$id === conv.productId);
    return prod?.price ? `₹${parseFloat(prod.price).toLocaleString('en-IN')}` : '';
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 dark:bg-gray-950 py-4 px-2 md:px-4">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-[280px_1fr]" style={{ height: '75vh' }}>
          {/* Conversations list - 280px fixed */}
          <div className={`border-r border-gray-200 dark:border-gray-800 flex flex-col ${activeConversation ? 'hidden md:flex' : 'flex'}`} style={{ height: '100%', overflow: 'hidden' }}>
            {/* Header */}
            <div className="bg-[#0c0c0c] z-10 p-4 border-b border-gray-800 shrink-0">
              <h2 className="text-white font-semibold text-lg mb-3">Messages</h2>
              <div className="flex items-center gap-2 bg-gray-900 rounded-lg px-3 py-2">
                <FiSearch className="text-gray-400" />
                <input
                  className="w-full bg-transparent text-sm outline-none text-white placeholder-gray-500"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Scrollable conversation list */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="space-y-3 p-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="p-3 border-b border-gray-100 dark:border-gray-800">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-800 flex items-center justify-center text-sm font-semibold shrink-0 animate-pulse"></div>
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => {
                  const isActive = activeConversation?.$id === conv.$id;
                  const otherName = getOtherParticipantName(conv);
                  const isSeller = conv.buyerId === user.$id;
                  const hasUnread = conv.unreadCount > 0;

                  return (
                    <div
                      key={conv.$id}
                      onClick={() => openChat(conv)}
                      className={`
                        p-3 cursor-pointer border-b border-gray-100 dark:border-gray-800 transition-colors
                        ${isActive ? 'bg-gray-100 dark:bg-gray-900' : 'hover:bg-gray-50 dark:hover:bg-gray-900/50'}
                      `}
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar with initials */}
                        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-800 flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-gray-400 shrink-0">
                          {getInitials(otherName)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                              {otherName}
                            </span>
                            <span className="text-xs text-gray-400 shrink-0">
                              {formatTime(conv.$updatedAt)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isSeller ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'}`}>
                              {isSeller ? 'Seller' : 'Buyer'}
                            </span>
                            {hasUnread && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                            )}
                          </div>

                          <p className="text-xs text-gray-500 dark:text-gray-500 truncate mb-0.5">
                            {conv.lastMessage || 'No messages yet'}
                          </p>

                          <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                            Re: {getProductName(conv)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : conversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">No conversations yet</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
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
                {/* Header with avatar + name + "Active now" + product context */}
                <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shrink-0">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <button
                        className="md:hidden text-gray-700 dark:text-gray-300 shrink-0 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
                        onClick={() => setActiveConversation(null)}
                      >
                        <FiArrowLeft size={20} />
                      </button>

                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-sm font-semibold text-white shrink-0">
                        {getInitials(getOtherParticipantName(activeConversation))}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {getOtherParticipantName(activeConversation)}
                        </p>
                        <p className="text-xs text-green-500">● Active now</p>
                      </div>
                    </div>

                    {/* Product context pill */}
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded-lg">
                      <span className="text-lg">📦</span>
                      <div className="text-left">
                        <p className="text-xs font-medium text-gray-900 dark:text-white truncate max-w-[150px]">
                          {getProductName(activeConversation)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {getProductPrice(activeConversation)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div
                  className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-950"
                >
                  {loadingMessages ? (
                    <div className="space-y-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                          <div className={`h-12 ${i % 2 === 0 ? 'w-1/2' : 'w-1/3'} bg-gray-300 dark:bg-gray-800 rounded-2xl animate-pulse`}></div>
                        </div>
                      ))}
                    </div>
                  ) : messages.length > 0 ? (
                    <>
                      {messages.map((msg, index) => {
                        if (!msg) return null;
                        const isOwn = msg.senderId === user?.$id;

                        return (
                          <div
                            key={msg.$id || index}
                            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`
                                max-w-[70%] px-4 py-2.5 rounded-2xl text-sm
                                ${isOwn
                                  ? 'bg-[#111] text-white rounded-br-md'
                                  : 'bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-bl-md'
                                }
                              `}
                            >
                              <p>{msg.text || ""}</p>
                              {msg.$createdAt && (
                                <p className={`text-xs mt-1 ${isOwn ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {formatTime(msg.$createdAt)}
                                </p>
                              )}
                            </div>
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

                {/* Input bar */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-800 flex gap-3 bg-white dark:bg-gray-900 shrink-0">
                  <input
                    ref={inputRef}
                    className="flex-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-full px-4 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors"
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
                    className="bg-[#111] text-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 transition-colors shrink-0"
                    onClick={sendMessage}
                    disabled={sendingMessage || !input.trim()}
                  >
                    <FiSend size={18} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 text-gray-600 dark:text-gray-400">
                <svg
                  className="w-20 h-20 text-gray-400 dark:text-gray-600 mb-4"
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
                <p className="text-lg font-medium mb-2 dark:text-white">Select a conversation</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
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