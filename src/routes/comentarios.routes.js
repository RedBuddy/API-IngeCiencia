import { Router } from "express";
import { getcomentarios, postcomentarios, getcomentariosbyid, deletecomentariosbyid, updatecomentarios } from "../controllers/comentarios.controller"

const router = Router();

router.get('/comentarios', getcomentarios);
// router.post('/comentarios', postcomentarios);
// router.get('/comentarios/:Id', getcomentariosbyid);
// router.delete('/comentarios/:Id', deletecomentariosbyid);
// router.put('/comentarios/:Id', updatecomentarios);

export default router;