import { Router } from "express";
import { CartManager } from "../CartManager.js";

const router = Router()
const cartService = new CartManager("../Primera Entrega BE/src/carritos.json")

router.get("/",async(req,res)=>{
    try {
        const limit = req.query.limit
        const getCarts = await cartService.getCarts()
        const slice1 = getCarts.slice(0,limit)
        limit == undefined ? res.json(getCarts) : res.json(slice1)
    } catch (error) {
        res.json(error.message)
    }
})
router.post("/",async(req,res)=>{
    try {
        const newCart = req.body
        await cartService.addCart(newCart)
        res.json({message:"Carrito Agregado"})
    } catch (error) {
        res.json(error.message)
    }
})

export {router as cartsRouter}