import bucket from "../config/cloudinary.js";
import Category from "../models/category.model.js";

export const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category with this name already exists",
      });
    }

    let imageURL = null;
    let cloudinaryID = null;

    // File uploaded via multer (disk or memory)
    if (req.file) {
      const destination = `categories/${Date.now()}-${req.file.originalname}`;

      await bucket.upload(req.file.path, {
        destination,
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      imageURL = `https://storage.googleapis.com/${bucket.name}/${destination}`;
      cloudinaryID = destination; // GCS object name
    }

    await Category.create({ name, imageURL, cloudinaryID });

    return res.status(201).json({
      message: "Category added successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (_, res, next) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      categories,
    });
  } catch (err) {
    next(err);
  }
};

export const editCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const { name } = req.body;
    category.name = name || category.name;

    if (req.file) {
      // Delete old image if exists
      if (category.cloudinaryID) {
        await bucket.file(category.cloudinaryID).delete().catch(() => {});
      }

      const destination = `categories/${Date.now()}-${req.file.originalname}`;

      await bucket.upload(req.file.path, {
        destination,
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      category.imageURL = `https://storage.googleapis.com/${bucket.name}/${destination}`;
      category.cloudinaryID = destination;
    }

    await category.save();

    return res.status(200).json({
      message: "Category updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // Delete image from GCS
    if (category.cloudinaryID) {
      await bucket.file(category.cloudinaryID).delete().catch(() => {});
    }

    await category.deleteOne();

    return res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
