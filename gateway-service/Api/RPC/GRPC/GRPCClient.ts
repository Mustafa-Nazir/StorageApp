import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

export default class GRPCClient {
    private static _instance:GRPCClient;
    public static get Instance():GRPCClient{
        if(this._instance == null) this._instance = new GRPCClient();
        return this._instance;
    };
    
    private readonly client: any;

    private readonly grpcObject: any;
    private readonly packageDef: protoLoader.PackageDefinition;

    constructor() {
        this.packageDef = protoLoader.loadSync(`${__dirname}/../Protobuf/Token.proto`);
        this.grpcObject = grpc.loadPackageDefinition(this.packageDef);

        this.client = new this.grpcObject.Token.TokenService(process.env.GRPC_SERVER, grpc.credentials.createInsecure())
    }

    public TokenControl(token: string):Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.TokenControl({ token }, (error: any, response: any) => {
                if(error) return reject(error);
                return resolve(response);
            })
        })
    }
}