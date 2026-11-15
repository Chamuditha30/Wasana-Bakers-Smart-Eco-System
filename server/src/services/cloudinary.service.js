import cloudinary from "../config/cloudinary.js";

//upload image
const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "wasana-products",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    //send image buffer to Cloudinary
    uploadStream.end(file.buffer);
  });
};

//upload multiple images
export const uploadImages = async (files) => {
  const uploadedImages = [];

  try {
    for (const file of files) {
      const image = await uploadImage(file);
      uploadedImages.push(image);
    }

    return uploadedImages;
  } catch (error) {
    //clean up images uploaded before the failure
    await deleteImages(uploadedImages).catch(console.error);

    throw error;
  }
};

//delete multiple images
export const deleteImages = async (images) => {
  const results = await Promise.all(
    images.map((image) => cloudinary.uploader.destroy(image.publicId)),
  );

  return results;
};
