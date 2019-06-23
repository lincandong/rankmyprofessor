import * as fs from "fs"
import { University } from "../models/university";
import { Professor } from "../models/professor";
import { init } from "../models/mysql";

const rootDir = __dirname + '/../../../data'
console.log(rootDir)

function readFilesInDir(path: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(path, async (err, files) => {
            if (err) reject(err)
            else resolve(files)
        })
    })
}

function readObjFromJson<T>(path: string): Promise<T> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, async (err, json) => {
            if (err) reject(err)
            else resolve(JSON.parse(json.toString()))
        })
    })
}

async function loadSchool(path: string, name: string) {
    readObjFromJson<{
        info: string
        school: string,
        province: string,
    }>(path + `\/${name}.json`)
        .then(async school => {

            const schoolItem = new University()
            schoolItem.name = school.school
            schoolItem.province = school.province
            await schoolItem.save({
                logging: false
            }).then(() => {
                console.log(`[Saved] university<${school}>`)
            })

            readFilesInDir(path)
                .then(colleges => {
                    for (const college of colleges) {
                        const collegePath = path + '/' + college
                        loadProfessors(collegePath)
                    }
                })
                .catch(err => {
                    console.log(`[Error] at loading colleges of ${name}: ${err}`)
                })
        })
        .catch(err => {
            console.log(`[Error] at loading school<${name}>: ${err}`)
        })
}

async function loadProfessors(path: string) {
    readFilesInDir(path)
        .then(async professors => {
            for (const name of professors) {
                const professorPath = path + '/' + name
                readObjFromJson<{
                    college: string,
                    name: string,
                    province: string,
                    university: string
                }>(professorPath + `\/${name}.json`)
                    .then(async professor => {
                        const professorItem = new Professor({
                            id: null,
                            name: professor.name,
                            university: professor.university,
                            college: professor.college,
                            score: 0.0,
                            studentNums: 0,
                            callRate: null
                        })
                        professorItem.save({
                            logging: false
                        }).then(() => {
                            console.log(`[Saved]: ${name}`)
                        })
                    })
                    .catch(err => {
                        console.log(`[Error] at loading professor of ${name}: ${err}`)
                    })
            }
        })
        .catch(err => {
            console.log(`[Error] at loading college<${path}>: ${err}`)
        })
}

export async function load() {
    await init()
    const provinces = await readFilesInDir(rootDir)

    //province
    for (const province of provinces) {
        const provincePath = rootDir + '/' + province
        if (province != "浙江") continue
        readFilesInDir(provincePath)
            .then(schools => {
                for (const school of schools) {
                    const schoolPath = provincePath + '/' + school
                    if (school != '浙江大学') continue
                    loadSchool(schoolPath, school)
                }
            })
            .catch(err => {
                console.log(`[Error] at loading province<${province}>: ${err}`)
            })
    }
}
