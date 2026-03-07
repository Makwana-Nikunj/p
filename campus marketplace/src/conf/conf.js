const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionProductsId: String(import.meta.env.VITE_APPWRITE_COLLECTION_PRODUCTS_ID),
    appwriteCollectionConversationsId: String(import.meta.env.VITE_APPWRITE_COLLECTION_CONVERSATIONS_ID),
    appwriteCollectionMessagesId: String(import.meta.env.VITE_APPWRITE_COLLECTION_MESSAGES_ID),
    appwriteCollectionFavoritesId: String(import.meta.env.VITE_APPWRITE_COLLECTION_FAVORITES_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf