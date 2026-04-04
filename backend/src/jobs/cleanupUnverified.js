import cron from "node-cron";
import { sql } from "../db/index.js";

export const startCleanupJob = () => {
    cron.schedule("0 * * * *", async () => {
        try {
            const deleted = await sql`
                DELETE FROM users
                WHERE is_verified = false
                AND verification_token_expiry < NOW()
                RETURNING id
            `;
            if (deleted.length > 0) {
                console.log(`[Cleanup] Deleted ${deleted.length} unverified expired account(s)`);
            }
        } catch (error) {
            console.error("[Cleanup] Error:", error.message);
        }
    });
};
