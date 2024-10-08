import BaseController from "./BaseController.js";
import Category from "../models/Category.js";

import Product from "../models/Variant.js";
// create class product with CRUD

export default class CategoryController extends BaseController {
  constructor() {
    super(Category);
  }

  async delete(req, res) {
    console.log("================================");
    // find category
    const category = await Category.findById(req.params.id);
    // check if category exists
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // update isDeleted field to true
    category.isDeleted = true;

    // update product with category to categoryName "Danh mục chờ"
    const products = await Product.find({ categoryName: category.name });

    products.forEach(async (product) => {
      product.categoryName = "Danh mục chờ";
      await product.save();
    });

    // save updated category
    await category.save();

    // let rowDeleted = await this.model.findByIdAndDelete(req.params.id);
    // console.log(rowDeleted, "row deleted");
    return res.status(200).json(category);
  }
}
