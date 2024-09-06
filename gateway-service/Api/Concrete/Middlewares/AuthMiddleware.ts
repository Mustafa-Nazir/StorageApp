import RedisClient from "../../../DataAccess/Concrete/Redis/RedisClient";
import GRPCClient from "../../RPC/GRPC/GRPCClient";

export const TokenControl = async (req: any, res: any, next: any) => {
    try {
        const path: string = req.path;
        const status = pathControl(path);
        if (status) return next();

        const authorization = req.header('Authorization');
        const token = getTokenFromHeader(authorization);

        const tokenLog = await getTokenLog(token);
        const newHeader = "user-email";
        if (tokenLog != null) {
            req.headers[newHeader] = tokenLog.email;
            return next();
        }

        const result = await tokenControlRequest(token);
        if (!result.success) return res.status(401).send(result);
        
        await addTokenLog({ token: token, ...result.data });
        req.headers[newHeader] = result.data.email;
        return next();


    } catch (error) {
        return res.status(500).send({ data: error, success: false });
    }
}

const tokenControlRequest = async (token: any) => {
    const data = await GRPCClient.Instance.TokenControl(token);
    return data;
}

const pathControl = (path: string): boolean => {
    const allowedPaths: string[] = [
        "/user/auth/login",
        "/user/auth/register"
    ];

    const formattedPath = path.split("/").slice(0, 4).join("/");
    return allowedPaths.includes(formattedPath);
}

interface ITokenLog { token: string, email: string, exp: number };

const getTokenLog = async (token: string) => {
    const exist = await RedisClient.exists(token);
    if(!exist) return null;

    const tokenObj = await RedisClient.hGetAll(token)
    return {...tokenObj};
}

const addTokenLog = async (tokenLog: ITokenLog) => {
    const exp = Math.trunc(tokenLog.exp - (Date.now() / 1000));

    await RedisClient.hSet(tokenLog.token,"email",tokenLog.email);
    await RedisClient.expire(tokenLog.token,exp);
}

const getTokenFromHeader = (header: string) => {
    return header.split(" ")[1];
}