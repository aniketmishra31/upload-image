import type { Request, Response } from "express";
import path from "path";
import multer from "multer";
import { getImages } from "../utils/getImages";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${path.join(__dirname, "uploads")}`)
    },
    filename: function (req, file, cb) {
        const uniqueFilename = Date.now() + '-' + file.originalname;
        cb(null, uniqueFilename)
    }
});

export const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        cb(null, true);
    }
});

export const handleUpload = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        if (!file)
            throw { message: "Upload a file", status: 400 };
        const fileType = file.mimetype.split("/")[0];
        if (fileType !== "image")
            throw { message: "Please upload an image", status: 400 };
        //call for unsplash images
        const images = await getImages();
        res
            .status(200)
            .json(images);

    } catch (err: any) {
        res
            .status(err.status || 500)
            .json({ message: err.message || err });
    }
}