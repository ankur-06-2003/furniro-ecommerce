import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";

dotenv.config();

const storage = new Storage({
  projectId: process.env.CLOUDINARY_CLOUD_NAME,
});

const bucket = storage.bucket(process.env.CLOUDINARY_API_KEY);

export default bucket;
