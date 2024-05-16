import express from 'express'
import { isValidUrl } from '../utils.js'
import { createSortendedUrl , isValidHash , getOriginalUrl } from '../db/query.js'
const router = express.Router()


router.post('/app/create',async (req,res)=>{
    const {hash , actual_url} = req.body
    const {expiresIn} = req.query
    if(isValidUrl(actual_url)){
        if(await isValidHash(hash)){
            const short_url = await createSortendedUrl(hash , actual_url,expiresIn)
            res.status(200).json({ short_url })
            return
        }
        res.status(200).json({ message : 'hash Already exists , Pls choose another' })
        return  
    }

    res.status(400).json({message : "Url is invalid"})
    return
})


router.get('/:hash',async (req,res)=>{
    const { hash } = req.params
    try {
        const originalUrl = await getOriginalUrl(hash)
        res.redirect(originalUrl)
    } catch (err) {
        res.status(400).json({ message : err.message})    
    }
    
})



export default router