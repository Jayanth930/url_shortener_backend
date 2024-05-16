import pg from 'pg'
import { config } from 'dotenv'
import {v4 as uuid} from 'uuid'
import { getTimes } from '../utils.js'
config()
const {Client} = pg
const client = new Client({
    connectionString : process.env.DB_LINK ,
    ssl: {
       rejectUnauthorized : false
    },
})

client.connect().then(()=>console.log('connected to db')).catch(e=>console.log(`Error in connectin db ${e.message}`))

export const createSortendedUrl = async (hash,actual_url,expiresIn)=>{
    const { currentTime , expirationTime} = getTimes(expiresIn)
    try {
        const {rowCount} = await client.query(`insert into url_shortener values($1,$2,$3,$4,$5)`,[uuid(),hash,actual_url,currentTime,expirationTime])
        if(rowCount > 0 ) return `${process.env.BACKEND_URL}/${hash}`
        
    } catch (err) {
        console.log(`Error in creating shortendurl ${err.message}`)
    }
   
}

export const isValidHash = async (hash)=>{
    const {rows} = await client.query(`select hash from url_shortener`)
    for (let index = 0; index < rows.length; index++) {
        if(rows[index].hash === hash) return false;
    }
    return true;
}


export const getOriginalUrl = async (hash)=>{
    const { rows } = await client.query(`select actual_url , expiresat from url_shortener where hash=$1`,[hash])
    if( rows.length < 1 ) throw new Error("Pls provide correct Alias")
    const { actual_url , expiresat} = rows[0]
    if(expiresat < new Date()) throw new Error('Link is expired')
    return actual_url
}