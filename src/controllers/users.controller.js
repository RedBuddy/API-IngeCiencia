import User from '../database/models/Users';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const post_users = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash("123", 10);
        const newUser = await User.create({
            username: "Orlando",
            email: faker.internet.email(),
            password: hashedPassword,
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            orcid: faker.internet.url(),
            profile_img_path: faker.image.avatar(),
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_users = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const get_users_byid = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update_users = async (req, res) => {
    try {
        const [updated] = await User.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'User not found' });
        const updatedUser = await User.findByPk(req.params.id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const delete_users_byid = async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'User not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




