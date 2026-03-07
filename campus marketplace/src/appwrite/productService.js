import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class ProductService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // ---------------------------
    // CREATE PRODUCT
    // ---------------------------
    async createProduct({ 
        title, 
        price, 
        category, 
        condition, 
        location, 
        description, 
        imageId, 
        userId,
        sellerName,
        status = "active"        // ✅ NEW default
    }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionProductsId,
                ID.unique(),
                {
                    title,
                    price,
                    category,
                    condition,
                    location,
                    description,
                    imageId,
                    userId,
                    sellerName,
                    status,
                    createdAt: new Date().toISOString()
                }
            );
        } catch (error) {
            console.log("Appwrite Service :: createProduct :: error", error);
        }
    }

    // ---------------------------
    // UPDATE PRODUCT
    // ---------------------------
    async updateProduct(productId, updates) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionProductsId,
                productId,
                updates // includes status: "sold"
            );
        } catch (error) {
            console.log("Appwrite Service :: updateProduct :: error", error);
        }
    }

    // ---------------------------
    // DELETE PRODUCT
    // ---------------------------
    async deleteProduct(productId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionProductsId,
                productId
            );
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deleteProduct :: error", error);
            return false;
        }
    }

    // ---------------------------
    // GET SINGLE PRODUCT
    // ---------------------------
    async getProduct(productId) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionProductsId,
                productId
            );
        } catch (error) {
            console.log("Appwrite Service :: getProduct :: error", error);
            return false;
        }
    }

    // ---------------------------
    // GET ALL PRODUCTS
    // ---------------------------
    async getProducts(queries = [Query.orderDesc("$createdAt")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionProductsId,
                queries
            );
        } catch (error) {
            console.log("Appwrite Service :: getProducts :: error", error);
            return false;
        }
    }

    // ---------------------------
    // FILE UPLOAD
    // ---------------------------
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error", error);
            return false;
        }
    }

    // ---------------------------
    // DELETE FILE
    // ---------------------------
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error", error);
            return false;
        }
    }

    // ---------------------------
    // FILE PREVIEW URL
    // ---------------------------
    getFileView(fileId) {
        return this.bucket.getFileView(conf.appwriteBucketId, fileId);
    }

    // ---------------------------
    // INCREMENT VIEW COUNT
    // ---------------------------
    async incrementViews(productId) {
        try {
            const product = await this.getProduct(productId);
            if (product) {
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionProductsId,
                    productId,
                    {
                        views: (product.views || 0) + 1
                    }
                );
            }
        } catch (error) {
            console.log("Appwrite Service :: incrementViews :: error", error);
            return false;
        }
    }

    // ---------------------------
    // UPDATE FAVORITE COUNT
    // ---------------------------
    async updateFavoriteCount(productId, increment = true) {
        try {
            const product = await this.getProduct(productId);
            if (product) {
                const newCount = increment 
                    ? (product.favoriteCount || 0) + 1 
                    : Math.max(0, (product.favoriteCount || 0) - 1);
                
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionProductsId,
                    productId,
                    {
                        favoriteCount: newCount
                    }
                );
            }
        } catch (error) {
            console.log("Appwrite Service :: updateFavoriteCount :: error", error);
            return false;
        }
    }
}

const productService = new ProductService();
export default productService;
