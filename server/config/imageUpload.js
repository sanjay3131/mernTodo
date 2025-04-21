import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "todos", // Change this to your preferred Cloudinary folder
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const uploadImage = multer({ storage });

export { uploadImage };
