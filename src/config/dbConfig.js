import { MongoClient } from "mongodb";

export default async function connectToDataBase(stringConnection) {
    let mongoClient;

    try {
        // Cria uma nova instância do MongoClient, passando a string de conexão como argumento
        mongoClient = new MongoClient(stringConnection);
        console.log('Conectando ao cluster do banco de dados...');
    
        // Tenta estabelecer a conexão com o banco de dados
        await mongoClient.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');
    
        // Retorna a instância conectada do MongoClient
        return mongoClient;
    } catch (error) {
        // Caso ocorra um erro durante a tentativa de conexão, exibe uma mensagem de erro no console
        console.error('Falha na conexão com o banco.', error);
    
        // Finaliza o processo imediatamente com código de erro (0 = sucesso, 1 ou outro = erro)
        process.exit();
}}