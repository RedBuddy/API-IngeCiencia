import { Router } from "express";
import { get_research_projects, post_research_projects, update_research_projects, delete_research_projects_byid, get_research_projects_byid } from "../controllers/research_projects.controller"

const router = Router();

router.get('/research_projects', get_research_projects);
router.post('/research_projects', post_research_projects);
router.put('/research_projects/:Id', update_research_projects);
router.delete('/research_projects/:Id', delete_research_projects_byid);
router.get('/research_projects/:Id', get_research_projects_byid);

export default router;