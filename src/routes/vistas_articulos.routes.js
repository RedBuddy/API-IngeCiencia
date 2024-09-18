import { Router } from "express";
import { getvistas_articulos, postvistas_articulos, getvistas_articulosbyid, deletevistas_articulosbyid, updatevistas_articulos } from "../controllers/vistas_articulos.controller"

const router = Router();

router.get('/vistas_articulos', getvistas_articulos);
// router.post('/vistas_articulos', postvistas_articulos);
// router.get('/vistas_articulos/:Id', getvistas_articulosbyid);
// router.delete('/vistas_articulos/:Id', deletevistas_articulosbyid);
// router.put('/vistas_articulos/:Id', updatevistas_articulos);

export default router;