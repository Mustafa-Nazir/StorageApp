import multer from "multer"

export const MulterUploadSingle = multer({storage:multer.memoryStorage()}).single("file");