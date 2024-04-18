import bcrypt from "bcryptjs";

export default class HashingHelper{

    public static async CreatePasswordHash(password:string):Promise<string>{
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    public static async VerifyPasswordHash(password:string , hashedPassword:string):Promise<boolean>{
        const comparePassword = await bcrypt.compare(password,hashedPassword);
        return comparePassword == true;
    }
}