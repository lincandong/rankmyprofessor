import * as koaRouter from "koa-router"
import { queryProfessor, addComments, querySchool } from "./query";

export default class Router extends koaRouter {
    constructor() {
        super()

        // //index
        // this.get('/', async (ctx, next) => {
        //     await next()
        //     ctx.response.redirect('http://sol-pic.com:8080/infoprof/#/')
        // })

        //query decorator
        queryProfessor(this)
        addComments(this)
        querySchool(this)
    }
}
