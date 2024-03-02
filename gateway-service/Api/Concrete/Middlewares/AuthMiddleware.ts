import axios from "axios"
import fs from "fs"

export const TokenControl = async (req: any, res: any, next: any) => {
    try {
        const path: string = req.path;
        const status = pathControl(path);
        if (status) return next();

        const authorization = req.header('Authorization');
        const token = getTokenFromHeader(authorization);

        const tokenLog = getTokenLog(token);
        const newHeader = "user-email";
        if (tokenLog != null) {
            req.headers[newHeader] = tokenLog.email;
            return next();
        }

        const result = await tokenControlRequest(authorization);
        if (!result.success) return res.status(401).send(result);

        addTokenLog({ token: token, ...result.data });
        req.headers[newHeader] = result.data.email;
        return next();


    } catch (error) {
        return res.status(500).send({ data: error, success: false });
    }
}

const tokenControlRequest = async (authorization: any) => {
    const url = process.env.USER_SERVICE + "/auth/tokenControl";
    const config = {
        headers: { "Authorization": authorization }
    }
    const data = await axios.get(url, config).then(res => res.data).catch(err => err.response.data);
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

const filePath = "./tokenLog.json";
interface ITokenLog { token: string, email: string, exp: number };

const getTokenLog = (token: string) => {
    try {
        const file = fs.readFileSync(filePath, "utf8");
        const data: ITokenLog[] = JSON.parse(file);

        const tokenObj = data?.find(obj => obj?.token == token) || null;
        if (tokenObj == null) return tokenObj;
        else if (!expControl(tokenObj.exp)) return tokenObj;

        const newData = data.filter(obj => obj.token != token);
        addTokenLogList(newData);
        return null
    } catch (error) {
    }
}

const addTokenLog = (tokenLog: ITokenLog) => {
    const file = fs.readFileSync(filePath, "utf8");
    const data: ITokenLog[] = JSON.parse(file);

    data.push(tokenLog);
    addTokenLogList(data);
}

const addTokenLogList = (data: ITokenLog[]) => {
    const dataToJson = JSON.stringify(data);
    fs.writeFileSync(filePath, dataToJson, "utf8");
}

const expControl = (exp: number): boolean => {
    const second = Date.now() / 1000;
    return exp < second;
}

const getTokenFromHeader = (header: string) => {
    return header.split(" ")[1];
}