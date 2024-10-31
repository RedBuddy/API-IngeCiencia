import Resource from '../database/models/Resources';
import { faker } from '@faker-js/faker';

export const post_resources = async (req, res) => {
    try {
        const newResource = await Resource.create({
            id_author: req.body.id_author, // Asegúrate de que este ID existe en la tabla de usuarios
            resource_category: faker.helpers.arrayElement(['guias', 'talleres', 'convocatorias']),
            title: faker.commerce.productName(),
            description: faker.lorem.paragraph(),
            link: faker.internet.url(),
            pdf_path: faker.system.filePath(),
            publication_date: faker.date.past(),
        });
        res.status(201).json(newResource);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_resources = async (req, res) => {
    try {
        const resources = await Resource.findAll();
        res.status(200).json(resources);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_resources_byid = async (req, res) => {
    try {
        const resource = await Resource.findByPk(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });
        res.status(200).json(resource);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_resources = async (req, res) => {
    try {
        const [updated] = await Resource.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Resource not found' });
        const updatedResource = await Resource.findByPk(req.params.id);
        res.status(200).json(updatedResource);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_resources_byid = async (req, res) => {
    try {
        const deleted = await Resource.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Resource not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
