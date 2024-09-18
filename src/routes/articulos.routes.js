import { Router } from "express";
import { getarticulos, postarticulos, getarticulosbyid, deletearticulosbyid, updatearticulos } from "../controllers/articulos.controller"

const router = Router();

router.get('/articulos', getarticulos);
// router.post('/articulos', postarticulos);
// router.get('/articulos/:Id', getarticulosbyid);
// router.delete('/articulos/:Id', deletearticulosbyid);
// router.put('/articulos/:Id', updatearticulos);

export default router;