import { Router } from "express";
import { getrecursos, postrecursos, getrecursosbyid, deleterecursosbyid, updaterecursos } from "../controllers/recursos.controller"

const router = Router();

router.get('/recursos', getrecursos);
// router.post('/recursos', postrecursos);
// router.get('/recursos/:Id', getrecursosbyid);
// router.delete('/recursos/:Id', deleterecursosbyid);
// router.put('/recursos/:Id', updaterecursos);

export default router;