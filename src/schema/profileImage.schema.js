import * as z from "zod";
const MAX_UPLOAD_SIZE = 4 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",

];

export const profileImageSchema = z.object({
    photo: z
        .instanceof(FileList)
        .refine((files) => files[0].size <= MAX_UPLOAD_SIZE, {
            message: "Image size must be less than 4MB",
        })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
            message: "Only JPG, PNG, or JPEG images are allowed",
        }),
});
