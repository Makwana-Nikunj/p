import { Client, Databases, Query, ID } from "appwrite";
import conf from "../conf/conf";

class FavoriteService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  // Add to favorites
  async addFavorite(userId, productId) {
    try {
      // Check if already favorited
      const existing = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionFavoritesId,
        [
          Query.equal("userId", userId),
          Query.equal("productId", productId)
        ]
      );

      if (existing.documents.length > 0) {
        return existing.documents[0];
      }

      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionFavoritesId,
        ID.unique(),
        {
          userId,
          productId
        }
      );
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  }

  // Remove from favorites
  async removeFavorite(userId, productId) {
    try {
      const existing = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionFavoritesId,
        [
          Query.equal("userId", userId),
          Query.equal("productId", productId)
        ]
      );

      if (existing.documents.length > 0) {
        return await this.databases.deleteDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionFavoritesId,
          existing.documents[0].$id
        );
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
      throw error;
    }
  }

  // Get user favorites
  async getUserFavorites(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionFavoritesId,
        [
          Query.equal("userId", userId),
          Query.orderDesc("$createdAt")
        ]
      );
    } catch (error) {
      console.error("Error getting favorites:", error);
      throw error;
    }
  }

  // Check if product is favorited
  async isFavorited(userId, productId) {
    try {
      const result = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionFavoritesId,
        [
          Query.equal("userId", userId),
          Query.equal("productId", productId)
        ]
      );
      return result.documents.length > 0;
    } catch (error) {
      console.error("Error checking favorite:", error);
      return false;
    }
  }

  // Get favorite count for product
  async getFavoriteCount(productId) {
    try {
      const result = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionFavoritesId,
        [Query.equal("productId", productId)]
      );
      return result.total;
    } catch (error) {
      console.error("Error getting favorite count:", error);
      return 0;
    }
  }
}

export default new FavoriteService();
