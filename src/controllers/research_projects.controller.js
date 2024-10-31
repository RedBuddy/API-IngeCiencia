import ResearchProjects from '../database/models/ResearchProjects';
import { faker } from '@faker-js/faker';

export const post_research_projects = async (req, res) => {
    try {
        const newProject = await ResearchProjects.create({
            title: faker.lorem.sentence(),
            details: faker.lorem.paragraphs(),
            vacancies: faker.datatype.number({ min: 1, max: 10 }),
            preview_path: faker.image.imageUrl(),
            status: faker.helpers.arrayElement(['active', 'inactive']),
        });
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_research_projects = async (req, res) => {
    try {
        const projects = await ResearchProjects.findAll();
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_research_projects_byid = async (req, res) => {
    try {
        const project = await ResearchProjects.findByPk(req.params.id);
        if (!project) return res.status(404).json({ message: 'Research project not found' });
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_research_projects = async (req, res) => {
    try {
        const [updated] = await ResearchProjects.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Research project not found' });
        const updatedProject = await ResearchProjects.findByPk(req.params.id);
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_research_projects_byid = async (req, res) => {
    try {
        const deleted = await ResearchProjects.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Research project not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
