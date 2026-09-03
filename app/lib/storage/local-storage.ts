import fs from "fs/promises";
import path from "path";

const STORAGE_ROOT = path.join(
  process.cwd(),
  "storage",
  "documents"
);

export async function ensureStorageDirectory(
  userId: string
) {
  const userDirectory = path.join(
    STORAGE_ROOT,
    userId
  );

  await fs.mkdir(userDirectory, {
    recursive: true,
  });

  return userDirectory;
}

export async function saveFile(
  userId: string,
  fileName: string,
  buffer: Buffer
) {
  const userDirectory =
    await ensureStorageDirectory(userId);

  const filePath = path.join(
    userDirectory,
    fileName
  );

  await fs.writeFile(filePath, buffer);

  return filePath;
}

export async function readStoredFile(
  filePath: string
) {
  return fs.readFile(filePath);
}

export async function deleteStoredFile(
  filePath: string
) {
  try {
    await fs.unlink(filePath);
  } catch {
    // File may already be deleted.
  }
}

export function getStorageRoot() {
  return STORAGE_ROOT;
}