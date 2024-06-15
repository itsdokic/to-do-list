import * as categoryService from "../services/categoryService.js";

export const addCategory = async (req, res) => {
    try {
        const category = await categoryService.addCategory(req.body);
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { category, userId } = req.body;
        await categoryService.deleteCategory(category, userId);
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getCategories(req.params.id);
        res.send(categories);
    } catch (error) {
        res.status(500).send({ error });
    }
};
