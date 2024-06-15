import CategoryModel from "../database/models/category.js";

export const getCategories = async (userId) => {
    return await CategoryModel.find({ userId });
};

export const addCategory = async (categoryData) => {
    const category = new CategoryModel(categoryData);
    return await category.save();
};

export const deleteCategory = async (category, userId) => {
    return await CategoryModel.deleteOne({ category, userId });
};
