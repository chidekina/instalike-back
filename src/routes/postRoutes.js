import express from "express";
import multer from "multer";
import { listPost, publishNewPost, imageUpload, updateNewPost } from "../controllers/postController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

const upload = multer({ dest:"./uploads" })
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
// Define as rotas para a aplicação
const routes = (app) => {
    // Middleware para processar requisições com corpo JSON
    app.use(express.json());
    app.use(cors(corsOptions));
    // Define uma rota GET para "/posts"
    //Rota para buscar todos os posts
    app.get("/posts", listPost);
    //Roata para criar um novo post
    app.post("/posts", publishNewPost);
    app.post("/upload", upload.single("image"), imageUpload)
    app.put("/upload/:id", updateNewPost)
};

export default routes;