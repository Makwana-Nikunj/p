import { io } from "socket.io-client";
import apiClient from "../lib/apiClient.js";
import store from "../store/store.js";

class ChatService {
  socket = null;

  connectSocket() {
    // Don't reconnect if already connected
    if (this.socket?.connected) {
      return this.socket;
    }

    const state = store.getState();
    const userData = state.auth?.userData;
    const accessToken = state.auth?.accessToken;

    // Only connect if user is authenticated (either token or userData exists)
    if (!userData && !accessToken) {
      console.warn("⚠️ User not authenticated - socket connection deferred");
      return null;
    }

    if (!this.socket) {
      // The API base URL is http://localhost:3000/api, so socket connects to http://localhost:3000
      const socketUrl = apiClient.defaults.baseURL.replace('/api', '');

      this.socket = io(socketUrl, {
        auth: accessToken ? { accessToken } : {},
        withCredentials: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        transports: ['websocket', 'polling'],
      });

      this.socket.on("connect", () => {
        console.log("✅ Socket connected:", this.socket.id);
      });

      this.socket.on("connect_error", (error) => {
        console.error("❌ Socket connection error:", error.message);
      });

      this.socket.on("disconnect", (reason) => {
        console.warn("⚠️ Socket disconnected:", reason);
      });
    }
    return this.socket;
  }

  disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Reconnect with new token after login
  reconnect() {
    this.disconnectSocket();
    return this.connectSocket();
  }

  // 1️⃣ Create or get existing conversation
  async getOrCreateConversation(buyerId, buyerName, sellerId, sellerName, productId, productName) {
    try {
      const response = await apiClient.post('/chats', { productId });
      const chat = response.data?.data;
      if (!chat) return null;
      return {
        ...chat,
        $id: String(chat.id),
        buyerId: chat.buyer_id,
        sellerId: chat.seller_id,
        productId: chat.product_id,
        buyerName,
        sellerName,
        productName
      };
    } catch (e) { console.error(e); throw e; }
  }

  // 2️⃣ Get all conversations for user
  async getUserConversations(userId) {
    try {
      const response = await apiClient.get('/chats');
      const docs = response.data?.data || [];
      return {
        documents: docs.map(chat => ({
          ...chat,
          $id: String(chat.id),
          buyerId: chat.buyer_id,
          sellerId: chat.seller_id,
          productId: chat.product_id,
          // Defaulting since backend doesn't explicitly store these right now
          buyerName: chat.buyer_name || "Buyer",
          sellerName: chat.seller_name || "Seller",
          productName: chat.product_name || "Product",
          lastMessage: chat.last_message || "Click to chat",
          unreadCount: chat.unread_count || 0,
          $updatedAt: chat.updated_at || chat.created_at
        }))
      };
    } catch (e) { console.error(e); return { documents: [] }; }
  }

  // 3️⃣ Get messages for conversation
  async getMessages(conversationId) {
    try {
      const response = await apiClient.get(`/messages/${conversationId}`);
      const docs = response.data?.data || [];
      return {
        documents: docs.map(msg => ({
          ...msg,
          $id: String(msg.id),
          conversationId: String(msg.chat_id),
          senderId: String(msg.sender_id),
          text: msg.content,
          $createdAt: msg.created_at
        }))
      };
    } catch (e) { console.error(e); return { documents: [] }; }
  }

  // 4️⃣ Send message
  async sendMessage(conversationId, senderId, text) {
    const socket = this.connectSocket();

    if (!socket) {
      console.error("❌ Socket not connected - message not sent");
      return null;
    }

    return new Promise((resolve, reject) => {
      socket.emit("send_message", { chatId: conversationId, content: text }, (response) => {
        if (response?.success) {
          resolve({
            $id: response.messageId || Date.now().toString(),
            conversationId,
            senderId,
            text,
            $createdAt: new Date().toISOString()
          });
        } else {
          reject(new Error(response?.message || "Failed to send message"));
        }
      });
    });
  }

  // 5️⃣ Update last message + time
  async updateLastMessage(conversationId, lastMessage) {
    try {
      await apiClient.patch(`/chats/${conversationId}`, {
        last_message: lastMessage
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  // 6️⃣ Realtime subscription
  subscribeMessages(conversationId, callback) {
    const socket = this.connectSocket();

    if (!socket) {
      console.warn("⚠️ Socket not ready - message subscription deferred");
      return () => { }; // Return empty unsubscribe function
    }

    // Join the chat room to receive backend messages
    if (conversationId) {
      socket.emit("join_chat", conversationId);
    }

    const listener = (message) => {
      // Map to Appwrite-style payload that Chat.jsx expects
      callback({
        payload: {
          ...message,
          $id: String(message.id),
          conversationId: String(message.chat_id),
          senderId: String(message.sender_id),
          text: message.content,
          $createdAt: message.created_at
        }
      });
    };

    socket.on("receive_message", listener);

    return () => {
      socket.off("receive_message", listener);
    };
  }

  // 7️⃣ Delete conversation
  async deleteConversation(conversationId) {
    try {
      await apiClient.delete(`/chats/${conversationId}`);
      return true;
    } catch (e) { console.error(e); return false; }
  }

  // 8️⃣ Mark as read
  async markAsRead(conversationId, userId) {
    try {
      await apiClient.post(`/chats/${conversationId}/mark-read`, { userId });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

export default new ChatService();
