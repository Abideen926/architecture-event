import type { MediaUploadSignature } from "./organizer-api";

export async function uploadToCloudinary(file: File, signature: MediaUploadSignature) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signature.apiKey);
  formData.append("timestamp", String(signature.timestamp));
  formData.append("signature", signature.signature);
  formData.append("folder", signature.folder);

  const response = await fetch(signature.uploadUrl, { method: "POST", body: formData });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Upload to Cloudinary failed");
  }

  return { publicId: data.public_id as string, url: data.secure_url as string };
}
