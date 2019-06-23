 import App from "./app";

 try {

     const app = new App(8081)
 } catch (err) {
     console.log(`[Main]:${err}`)
 }

//import {load} from "./loader/loadDB"
//load()
