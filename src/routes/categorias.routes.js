import { Router } from "express";
import { getcategorias, postcategorias, getcategoriasbyid, deletecategoriasbyid, updatecategorias } from "../controllers/categorias.controller"

const router = Router();

router.get('/categorias', getcategorias);
// router.post('/categorias', postcategorias);
// router.get('/categorias/:Id', getcategoriasbyid);
// router.delete('/categorias/:Id', deletecategoriasbyid);
// router.put('/categorias/:Id', updatecategorias);

export default router;