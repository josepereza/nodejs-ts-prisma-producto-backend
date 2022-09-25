import { Router } from 'express';
import { PrismaClient } from '@prisma/client'
import {getProducts,getProduct, delProduct, updateProduct, postProduct } from '../controllers/producto'


const prisma = new PrismaClient()
const router=Router();

router.get('/', getProducts)
router.get('/:id', getProduct)
router.delete('/:id', delProduct)
router.put('/:id', updateProduct)
router.post('/', postProduct)
export default router;