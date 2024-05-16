import createApp from "./services/createApp.js"
async function main(){

   const app = await createApp()

}

main().then().catch(e=>console.log(`Error occured : ${err.message}`)).finally()