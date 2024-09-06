import IRPCServer from "../IRPCServer";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import IAuthService from "../../../Business/Abstract/IAuthService";
import { inject, injectable } from "tsyringe";

@injectable()
export default class GRPCServer implements IRPCServer {
    private readonly packageDef: protoLoader.PackageDefinition;
    private readonly grpcObject: any;
    private readonly server: grpc.Server;

    private readonly _authService: IAuthService;

    constructor(@inject("IAuthService") authService: IAuthService) {
        this._authService = authService;

        this.packageDef = protoLoader.loadSync(`${__dirname}/../Protobuf/Token.proto`);
        this.grpcObject = grpc.loadPackageDefinition(this.packageDef);
        this.server = new grpc.Server();

        this.addService();
    }

    private tokenControl(call: any, callback: any) {
        return callback(null, this._authService.TokenControl(call.request.token))
    }

    private addService() {
        this.server.addService(this.grpcObject.Token.TokenService.service, {
            TokenControl: (call: any, callback: any) => this.tokenControl(call, callback)
        })
    }

    public Start(): void {
        this.server.bindAsync(process.env.GRPC_SERVER as string, grpc.ServerCredentials.createInsecure(), (error: any, port: any) => {
            if (error) console.log("gRPC server error:", error);
            console.log(`gRPC server is runing ${port}`)
        })
    }

}