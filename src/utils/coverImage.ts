/**
 * The create-Spolyz draft is persisted so an admin can come back to it, and a
 * File can't survive that trip. The cover is therefore kept as a data URL,
 * which doubles as the preview, and rebuilt into a File before publishing.
 */

/** Reads a picked file into a data URL that survives a reload. */
export const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

/** Rebuilds a File from a persisted data URL. */
export const fileFromDataUrl = async (dataUrl: string, name = "cover") => {
  const blob = await (await fetch(dataUrl)).blob();
  const extension = blob.type.split("/")[1] ?? "jpg";

  return new File([blob], `${name}.${extension}`, { type: blob.type });
};

/**
 * The cover to upload: the File picked this session, or the one rebuilt from
 * the draft the admin left behind.
 */
export const resolveCoverImage = async (draft: {
  cover_image: File | null;
  cover_preview: string;
}) => {
  if (draft.cover_image instanceof File) return draft.cover_image;

  if (draft.cover_preview?.startsWith("data:")) {
    return fileFromDataUrl(draft.cover_preview);
  }

  return null;
};
