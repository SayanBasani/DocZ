import { UploadApiResponse } from "cloudinary";
import cloudinary from "@/lib/cloudinary";

export async function uploadAvatar(
    file: Buffer,
    userId: string
): Promise<UploadApiResponse> {

    return new Promise((resolve, reject) => {

        cloudinary.uploader.upload_stream(
            {
                folder: "trader-pro/avatars",
                public_id: userId,
                overwrite: true,
                resource_type: "image",
                transformation: [
                    {
                        width: 400,
                        height: 400,
                        crop: "fill",
                        gravity: "face",
                    },
                    {
                        quality: "auto",
                    },
                    {
                        fetch_format: "auto",
                    },
                ],
            },
            (error, result) => {

                if (error || !result) {
                    reject(error);
                    return;
                }

                resolve(result);

            }
        ).end(file);

    });

}

export async function deleteAvatar(publicId: string) {

    await cloudinary.uploader.destroy(publicId);

}