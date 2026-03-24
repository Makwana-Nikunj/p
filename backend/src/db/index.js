import postgres from "postgres";

let sql;

const connectToDatabase = async () => {
    try {
        sql = postgres(process.env.DATABASE_URL, { ssl: 'require', max: 5, prepare: true });

        // ===============================
        // USERS TABLE
        // ===============================
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL unique,
                password text NOT NULL,
                role VARCHAR(255) NOT NULL DEFAULT 'user',
                avatar text,
                avatar_public_id text,
                refresh_token text,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

            )
        `;
        // ===============================
        // PRODUCTS TABLE
        // ===============================
        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                category VARCHAR(255) NOT NULL,
                condition VARCHAR(255) NOT NULL,
                location VARCHAR(255),
                description TEXT,
                status VARCHAR(255) NOT NULL,
                user_id INTEGER REFERENCES users(id),
                image_url TEXT,
                image_public_id TEXT,

                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        // ===============================
        // CHATS TABLE (1-1 CHAT)
        // ===============================
        await sql`
        CREATE TABLE IF NOT EXISTS chats (
            id SERIAL PRIMARY KEY,
            user1_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            user2_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;

        // ===============================
        // MESSAGES TABLE
        // ===============================
        await sql`
        CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL,
            chat_id INTEGER REFERENCES chats(id) ON DELETE CASCADE,
            sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            is_read BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;
        // ===============================
        // FAVORITES TABLE
        // ===============================
        await sql`
        CREATE TABLE IF NOT EXISTS favorites (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;

        console.log("✅ Successfully connected to the database.");
    } catch (error) {
        console.error("❌ Error connecting to the database:", error);
    }
};

export { connectToDatabase, sql };