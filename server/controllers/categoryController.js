import * as categoryService from "../services/categoryService.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getCategories(req.params.id);
        res.send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const addCategory = async (req, res) => {
    try {
        const category = await categoryService.addCategory(req.body);
        res.send("Category added successfully");
    } catch (error) {
        res.status(500).send("Error while adding category");
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { category, userId } = req.body;
        await categoryService.deleteCategory(category, userId);
        res.send("Category deleted successfully");
    } catch (error) {
        res.status(500).send("Error while deleting category");
    }
};
