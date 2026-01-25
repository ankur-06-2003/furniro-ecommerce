import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import Order from "../models/order.model.js";
import bucket from "../config/cloudinary.js"; // GCS bucket (same import path)

/* ===================== ADD PRODUCT ===================== */
export const addProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      features,
      price,
      discountPrice,
      stock,
    } = req.body;

    if (!title || !price || !category) {
      return res.status(400).json({
        message: "Title, price, and category are required",
      });
    }

    const matchedCategory = await Category.findOne({ _id: category });

    if (!matchedCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    let imageURLs = [];
    let cloudinaryIDs = [];

    if (req.files?.length) {
      for (const file of req.files) {
        const destination = `products/${Date.now()}-${file.originalname}`;

        await bucket.upload(file.path, {
          destination,
          metadata: {
            contentType: file.mimetype,
          },
        });

        imageURLs.push(
          `https://storage.googleapis.com/${bucket.name}/${destination}`,
        );
        cloudinaryIDs.push(destination); // GCS object name
      }
    }

    matchedCategory.productCount += 1;
    await matchedCategory.save();

    await Product.create({
      title,
      description,
      categoryID: matchedCategory._id,
      features,
      price,
      discountPrice,
      stock,
      imageURLs,
      cloudinaryIDs,
    });

    return res.status(201).json({
      message: "Product added successfully",
    });
  } catch (err) {
    next(err);
  }
};

/* ===================== GET PRODUCTS ===================== */
export const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sortBy,
      currentPage = 1,
      limit = 12,
    } = req.query;

    const filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (category) {
      const matchedCategory = await Category.findOne({ name: category });
      if (matchedCategory) {
        filter.categoryID = matchedCategory._id;
      }
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sort = {};
    if (sortBy === "default") sort = { createdAt: -1 };
    else if (sortBy === "price_low_high") sort = { price: 1 };
    else if (sortBy === "price_high_low") sort = { price: -1 };

    const skip = (currentPage - 1) * limit;

    const [products, totalProducts] = await Promise.all([
      Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .select("-cloudinaryIDs"),
      Product.countDocuments(filter),
    ]);

    res.json({ products, totalProducts });
  } catch (err) {
    next(err);
  }
};

/* ===================== BEST SELLERS ===================== */
export const getBestSellers = async (_, res, next) => {
  try {
    const bestSellers =
      (await Order.aggregate([
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.productID",
            totalSold: { $sum: "$items.quantity" },
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
      ])) || [];

    return res.status(200).json({ bestSellers });
  } catch (err) {
    next(err);
  }
};

/* ===================== SINGLE PRODUCT ===================== */
export const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).select(
      "-cloudinaryIDs",
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

/* ===================== UPDATE PRODUCT ===================== */
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const { title, description, category, price, discountPrice, stock } =
      req.body;

    if (category) {
      const matchedCategory = await Category.findOne({ name: category.trim() });
      if (matchedCategory) {
        product.categoryID = matchedCategory._id;
      }
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discountPrice = discountPrice || product.discountPrice;
    product.stock = stock || product.stock;

    if (req.files?.length) {
      // delete old images
      for (const id of product.cloudinaryIDs) {
        await bucket.file(id).delete().catch(() => {});
      }

      product.imageURLs = [];
      product.cloudinaryIDs = [];

      for (const file of req.files) {
        const destination = `products/${Date.now()}-${file.originalname}`;

        await bucket.upload(file.path, {
          destination,
          metadata: {
            contentType: file.mimetype,
          },
        });

        product.imageURLs.push(
          `https://storage.googleapis.com/${bucket.name}/${destination}`,
        );
        product.cloudinaryIDs.push(destination);
      }
    }

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

/* ===================== DELETE PRODUCT ===================== */
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Delete images from GCS
    for (const id of product.cloudinaryIDs) {
      await bucket.file(id).delete().catch(() => {});
    }

    await product.deleteOne();

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
