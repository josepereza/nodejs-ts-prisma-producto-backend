import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getProducts=async(req:Request, res:Response)=>{
    const productos = await prisma.producto.findMany()
    
    
    res.json(productos)

}

export const getProduct=async(req:Request, res:Response)=>{
    const id= parseInt(req.params.id);
    
    const producto = await prisma.producto.findFirst({
        where: { id }
    })
    
    
    res.json(producto)

}

export const delProduct=async(req:Request, res:Response)=>{
    const id= parseInt(req.params.id);
    
    const producto = await prisma.producto.delete({
        where: { id }
    })
    
    
    res.json(producto)

}

export const updateProduct = async (req: Request, res: Response) => {
    const { body } = req;
    const  id  =parseInt(req.params.id);

    try {

        const product = await prisma.producto.findFirst({
            where:{id}
        });

    if(product) {
        await prisma.producto.update({

            where: { id },
        
            data: body,
        
          })
        res.json({
            msg: 'El producto fue actualziado con exito'
        })

    } else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    }
        
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }

    
}

export const postProduct = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await prisma.producto.create({
            data:body
        });
         
        res.json({
            msg: `El producto fue agregado con exito!`
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }
}
