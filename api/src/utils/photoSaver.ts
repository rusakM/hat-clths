import { Request } from "express";
import multer, { memoryStorage } from "multer";
import sharp, { AvailableFormatInfo } from "sharp";
import AppError from "./appError";

const multerStorage = memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: any
): void => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Wgrany plik jest nieprawidłowy, spróbuj ponownie.", 404));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export function uploadPhoto(fieldName: any) {
  return upload.single(fieldName);
}

export async function resizePhoto(
  file: any,
  name: string,
  width: number,
  height: number,
  dest: string,
  ext: AvailableFormatInfo
) {
  file.filename = `${name}-${Date.now()}.${ext}`;
  await sharp(file.buffer)
    .resize(width, height)
    .toFormat(ext, {
      quality: 85,
    })
    .toFile(`${dest}/${file.filename}`);
}
