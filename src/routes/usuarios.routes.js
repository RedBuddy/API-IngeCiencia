import { Router } from "express";
import { getusuarios, postusuarios, getusuariosbyid, deleteusuariosbyid, updateusuarios } from "../controllers/usuarios.controller"

const router = Router();

router.get('/usuarios', getusuarios);
router.post('/usuarios', postusuarios);
router.get('/usuarios/:Id', getusuariosbyid);
router.delete('/usuarios/:Id', deleteusuariosbyid);
router.put('/usuarios/:Id', updateusuarios);

export default router;