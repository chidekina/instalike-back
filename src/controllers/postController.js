import fs from "fs";
import { getAllPosts, createPost, updatePost } from "../models/postModel.js";
import generateText from "../services/geminiService.js";

export async function listPost (req, res) {
    // Obtém todos os posts usando a função `getAllPosts`
    const posts = await getAllPosts();

    // Envia os posts como resposta em formato JSON com o status HTTP 200 (OK)
    res.status(200).json(posts);
}

export async function publishNewPost (req, res) {
    const newPost = req.body;
    
    try {
        const postCreatead = await createPost(newPost);
        const updatedImage = `uploads/${postCreatead.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImage);
        res.status(200).json(postCreatead);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "Erro":"Falha na requisição." })
    }
}

export async function imageUpload (req, res) {
    const newPost = req.body;
    
    try {
        const postCreatead = await createPost(newPost);
        res.status(200).json(postCreatead);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "Erro":"Falha na requisição." })
    }
}

export async function updateNewPost (req, res) {
    const id = req.params.id;
    const urlImage = `http://localhost:3000/uploads/${id}.png`;

    try {
        const imageBuffer = fs.readFileSync(`./uploads/${id}.png`);
        const description = await generateText(imageBuffer);

        const post = {
            imgUrl: urlImage,
            description: description,
            alt: req.body.alt
        }

        const createdPost = await updatePost(id, post);
        res.status(200).json(createdPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "Erro":"Falha na requisição." })
    }
}
