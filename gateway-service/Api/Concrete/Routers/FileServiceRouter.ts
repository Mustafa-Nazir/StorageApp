import express from "express";
import httpProxy  from "http-proxy";


const router = express.Router();
const apiProxy = httpProxy.createProxyServer();
const urlPath = "/file";

router.all(`${urlPath}/*`,(req:any,res:any) => {
    req.url = req.url.replace(urlPath, '');
    apiProxy.web(req,res,{target:process.env.FILE_SERVICE})
});

export default router;