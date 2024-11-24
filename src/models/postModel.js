import 'dotenv/config';
import { ObjectId } from "mongodb";
import connectToDataBase from "../config/dbConfig.js";

const connection = await connectToDataBase(process.env.STRING_CONNECTION);

export async function getAllPosts() {
    // Obtém a conexão com o banco de dados "instabyte"
    const db = connection.db("instabyte");

    // Acessa a coleção "posts" dentro do banco de dados
    const collection = db.collection("posts");

    // Busca todos os documentos da coleção "posts" e os transforma em um array
    return collection.find().toArray();
}

export async function createPost(newPost) {
    // Obtém a conexão com o banco de dados "instabyte"
    const db = connection.db("instabyte");

    // Acessa a coleção "posts" dentro do banco de dados
    const collection = db.collection("posts");

    // Busca todos os documentos da coleção "posts" e os transforma em um array
    return collection.insertOne(newPost);
}

export async function updatePost(id, newPost) {
    const db = connection.db("instabyte");
    const collection = db.collection("posts");
    const objId = ObjectId.createFromHexString(id);
    return collection.updateOne({ _id: new ObjectId(objId) }, { $set: newPost });
}