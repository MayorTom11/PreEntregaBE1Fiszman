import { Router } from "express";
import { ProductManager } from "../ProductManager.js"

const router = Router()
const productService = new ProductManager("../Primera Entrega BE/src/productos.json")

router.get("/",async(req,res)=>{
    try {
        const limit = req.query.limit
        const getProducts = await productService.getProducts()
        const slice1 = getProducts.slice(0,limit)
        limit == undefined ? res.json(getProducts) : res.json(slice1)
    } catch (error) {
        res.json(error.message)
    }
})

router.get("/:productId",async(req,res)=>{
    try {
        const productId = parseInt(req.params.productId)
        const getProductById = await productService.getProductById(productId)
        getProductById ? res.json(getProductById) : res.json("El producto buscado no fue encontrado")
    } catch (error) {
        res.json(error.message)
    }
})

router.post("/",async(req,res)=>{
    try {
        const newProduct = req.body
        await productService.addProduct(newProduct)
        res.json({message:"Producto Agregado"})
    } catch (error) {
        res.json(error.message)
    }
})

router.put("/:productId",async(req,res)=>{
    try {
        const updateProduct = req.body
        const productId = parseInt(req.params.productId)
        await productService.updateProduct(productId, updateProduct)
        res.json({message:"Producto modificado"})
    } catch (error) {
        res.json(error.message)
    }
})

router.delete("/:productId",async(req,res)=>{
    try {
        const productId = parseInt(req.params.productId)
        await productService.deleteProduct(productId)
        res.json({message:"Producto eliminado"})
    } catch (error) {
        res.json(error.message)
    }
})

export {router as productsRouter}