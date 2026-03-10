import { Router } from "express";
import {
    getUserChats,
    createChat,
    deleteChat
} from "../controllers/chats.controllers.js";

const router = Router();

router.route("/chats")
    .get(getUserChats)
    .post(createChat);

router.route("/chats/:chatId").delete(deleteChat);

export default router;