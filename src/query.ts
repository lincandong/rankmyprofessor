import { Professor } from "./models/professor";
import { Gpa } from "./models/gpa";
import { Op, DATE } from "sequelize";
import { daysAfterNow, formatDate } from "./util/date";
import Router from "./router";
import { Comments } from "./models/comments";
import { University } from "./models/university";

let _university = undefined//used for cookies


function queryProfessor(router: Router): Router {
    //request a specified professor's page
    router.get('/query/professor/:profId', async (ctx, next) => {
        try {
            const profId = parseInt(ctx.params.profId)
            await next()

            let professor: Professor | undefined
            let comments: Comments[] = []

            //wait for query professor info
            await Professor.findAll({
                where: {
                    id: profId
                }
            }).then(res => {
                if (res) professor = res[0]
            }).catch(err => {
                console.log(`[Error] at query a specified professor: ${err}`)
            })
            //wait for query comments
            await Comments.findAll({
                attributes: [
                    'content',
                    'date',
                    'score',
                ],
                where: {
                    profId: profId,
                }
            }).then(res => {
                comments = res
            }).catch(err => {
                console.log(`[Error] at query a specified professor: ${err}`)
            })

            if (professor) {
                const resType = {
                    id: professor.id,
                    name: professor.name,
                    university: professor.university,
                    college: professor.college,
                    score: professor.score,
                    callRate: professor.callRate,
                    comments: comments,
                }
                const res = JSON.stringify(resType, null, 4)
                ctx.response.body = res
                // ctx.response.body = `<h1>${res}</h1>`
                // console.log("Res:")
                // console.log(res)
            }

        }
        catch (err) {
            ctx.response.body = JSON.stringify({}, null, 4)
            console.log(`[Error] at querying specified professor: ${err}`)
        }
    })

    //search professors with unviersity and names
    router.post('/query/professor', async (ctx, next) => {
        try {
            const { name, university } = ctx.request.body
            await next()

            await Professor.findAll({
                attributes: [
                    'id',
                    'name',
                    'university',
                    'college',
                    'score',
                ],
                where: {
                    university: university,
                    name: {
                        [Op.startsWith]: name
                    }
                }
            }).then(res => {
                ctx.response.body = JSON.stringify(res, null, 4)
                console.log(`[Query] professor<${name}> of university<${university}>`)
            }).catch(err => {
                console.log(`[Error] at query professors: ${err}`)
            })

        }
        catch (err) {
            ctx.response.body = JSON.stringify({}, null, 4)
            console.log(`[Error] at parsing json: ${err}`)
        }
    })

    return router
}

function addComments(router: Router): Router {
    //comment on a professor
    router.post('/comment', async (ctx, next) => {
        try {
            const { profId, content, score, callOrNot } = ctx.request.body
            await next()
            const comment = new Comments({
                profId: profId,
                content: content,
                score: score,
                date: new Date(),
                callOrNot: callOrNot
            })
            comment.save()
                .then(() => {
                    console.log(`[Saved] comment<${comment}> has been saved.`)
                    ctx.response.body = JSON.stringify({ valid: true }, null, 4)
                })
                .catch(err => {
                    console.log(`[Error] at query a specified professor: ${err}`)
                    ctx.response.body = JSON.stringify({ valid: false }, null, 4)
                })
            ctx.response.body = {
                valid: true
            }
        }
        catch (err) {
            console.log(`[Error] at parsing json: ${err}`)
            ctx.response.body = {
                valid: false
            }
        }
    })
    return router
}

function querySchool(router: Router): Router {
    router.get('/query/province/:province', async (ctx, next) => {
        try {
            const province = ctx.params.province
            await next()

            await University.findAll({
                attributes: [
                    'name'
                ],
                where: {
                    province: province
                }
            }).then((res) => {
                console.log(`[Query] schools of province<${province}>`)
                ctx.response.body = JSON.stringify(res, null, 4)
            }).catch(err => {
                console.log(`[Error] at querying schools: ${err}`)
                ctx.response.body = JSON.stringify({}, null, 4)
            })
        } catch (err) {
            console.log(`[Error] at querying schools: ${err}`)
        }
    })
    return router
}

export {
    queryProfessor, addComments, querySchool
}
