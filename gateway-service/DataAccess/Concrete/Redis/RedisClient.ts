import { createClient } from "redis";

const RedisClient = createClient();

RedisClient.on("error",err => console.log("Redis Client Error",err));
RedisClient.on("connect",() => console.log("Redis Client Conneted"));

export const RedisConnect = async () => {
    await RedisClient.connect();
}

export default RedisClient;