import conf from "../conf/conf.js";
import { Client, Storage, Account } from "appwrite";

export class ProfileService {
    client = new Client();
    bucket;
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.bucket = new Storage(this.client);
        this.account = new Account(this.client);
    }

    // ---------------------------
    // UPLOAD PROFILE PHOTO
    // ---------------------------
    async uploadProfilePhoto(userId, file) {
        try {
            // Delete old photo if exists
            await this.deleteProfilePhoto(userId);

            return await this.bucket.createFile(
                conf.appwriteBucketId,
                `profile_${userId}`,   // File ID
                file                    // Correct file
            );
        } catch (error) {
            console.log("ProfileService :: uploadProfilePhoto :: error", error);
            return null;
        }
    }

    // ---------------------------
    // DELETE PROFILE PHOTO
    // ---------------------------
    async deleteProfilePhoto(userId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                `profile_${userId}`
            );
        } catch (error) {
            // Ignore if file doesn't exist
        }
    }

    // ---------------------------
    // GET PROFILE PHOTO URL
    // ---------------------------
    getProfilePhoto(userId) {
        try {
            return this.bucket.getFileView(
                conf.appwriteBucketId,
                `profile_${userId}`
            );
        } catch (error) {
            return null;
        }
    }

    // ---------------------------
    // UPDATE NAME
    // ---------------------------
    async updateName(name) {
        try {
            return await this.account.updateName(name);
        } catch (error) {
            console.log("ProfileService :: updateName :: error", error);
            return null;
        }
    }
}

const profileService = new ProfileService();
export default profileService;
