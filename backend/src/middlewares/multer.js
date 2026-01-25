import multer from "multer";
import path from "path";
import fs from "fs";

/* ===================== ENSURE UPLOAD DIRS ===================== */
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const baseUploadPath =
  process.env.NODE_ENV === "production"
    ? "uploads/eCom"
    : "uploads/localECom";

const categoryUploadPath = path.join(baseUploadPath, "categories");
const productUploadPath = path.join(baseUploadPath, "products");

ensureDir(categoryUploadPath);
ensureDir(productUploadPath);

/* ===================== FILENAME FORMAT ===================== */
const filenameFormatter = (file) => {
  const name = file.originalname
    .split(".")[0]
    .replace(/\s+/g, "-")
    .toLowerCase();

  return `${Date.now()}_${name}${path.extname(file.originalname)}`;
};

/* ===================== CATEGORY STORAGE ===================== */
const categoryStorage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, categoryUploadPath);
  },
  filename: (_, file, cb) => {
    cb(null, filenameFormatter(file));
  },
});

/* ===================== PRODUCT STORAGE ===================== */
const productStorage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, productUploadPath);
  },
  filename: (_, file, cb) => {
    cb(null, filenameFormatter(file));
  },
});

/* ===================== MULTER EXPORTS ===================== */
export const uploadCategoryImage = multer({
  storage: categoryStorage,
});

export const uploadProductImage = multer({
  storage: productStorage,
});
