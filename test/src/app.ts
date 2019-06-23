import * as koa from "koa"
import * as bodyparser from "koa-bodyparser"
import Router from "./router"
import cors = require("koa2-cors")
const ks = require('koa-static')

export default class App {
    private app: koa
    private router = new Router()
    constructor(public readonly port: number) {
        this.app = new koa()

        this.app.use(cors({
            origin: (ctx: any) => {
                //    if (ctx.url === '*') {
                return "*" // 允许来自所有域名请求
                //        }
                //        return 'http://sol-pic.com:8081'
            },
            exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
            maxAge: 5,
            credentials: true,
            allowMethods: ['GET', 'POST', 'DELETE'],
            allowHeaders: ['Content-Type', 'Authorization', 'Accept']
        }))

        this.app.use(async (ctx, next) => {
            await next()
            console.log(`[${port}] is processing request: ${ctx.request.method} ${ctx.request.url} ...\n`)
        })

        console.log(__dirname)
        this.app.use(ks(__dirname + '/../../dist'))

        this.app.use(bodyparser())
        this.app.use(this.router.routes())
        this.app.listen(port)
        console.log(`Http server started at port ${port}`)
    }
}
