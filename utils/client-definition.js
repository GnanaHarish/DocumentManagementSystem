import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";


const packagingDefinition = protoLoader.loadSync("../dms.proto");
const proto = grpc.loadPackageDefinition(packagingDefinition);

const serviceDefinition =
proto.documentmanagementsystem.DocumentManagementSystem;


  export default serviceDefinition;