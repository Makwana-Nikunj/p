import { Client, Databases, Realtime, Query, ID } from "appwrite";
import conf from "../conf/conf";

class ChatService {
  client = new Client();
  databases;
  realtime;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.realtime = new Realtime(this.client);
  }

  // 1️⃣ Create or get existing conversation
  async getOrCreateConversation(buyerId, buyerName, sellerId, sellerName, productId, productName) {
    const existing = await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionConversationsId,
      [
        Query.equal("buyerId", buyerId),
        Query.equal("sellerId", sellerId),
        Query.equal("productId", productId)
      ]
    );

    if (existing.documents.length > 0) {
      return existing.documents[0];
    }

    return await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionConversationsId,
      ID.unique(),
      {
        buyerId,
        buyerName,
        sellerId,
        sellerName,
        productId,
        productName,
        lastMessage: "",
        lastMessageTime: new Date().toISOString()
      }
    );
  }

  // 2️⃣ Get all conversations for user
  async getUserConversations(userId) {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionConversationsId,
      [
        Query.or([
          Query.equal("buyerId", userId),
          Query.equal("sellerId", userId)
        ]),
        Query.orderDesc("lastMessageTime")
      ]
    );
  }

  // 3️⃣ Get messages for conversation
  async getMessages(conversationId) {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionMessagesId,
      [
        Query.equal("conversationId", conversationId),
        Query.orderAsc("$createdAt")
      ]
    );
  }

  // 4️⃣ Send message
  async sendMessage(conversationId, senderId, text) {
    return await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionMessagesId,
      ID.unique(),
      { 
        conversationId, 
        senderId, 
        text
      }
    );
  }

  // 5️⃣ Update last message + time
  async updateLastMessage(conversationId, text) {
    return await this.databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionConversationsId,
      conversationId,
      {
        lastMessage: text,
        lastMessageTime: new Date().toISOString()
      }
    );
  }

  // 6️⃣ Realtime subscription
  subscribeMessages(callback) {
    return this.realtime.subscribe(
      `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionMessagesId}.documents`,
      callback
    );
  }

  // 7️⃣ Delete conversation
  async deleteConversation(conversationId) {
    return await this.databases.deleteDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionConversationsId,
      conversationId
    );
  }
}

export default new ChatService();
