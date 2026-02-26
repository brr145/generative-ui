const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export type ProcessedFile = {
  name: string;
  type: string;
  size: number;
  dataUrl?: string;
  textContent?: string;
};

export function validateFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) {
    return `File "${file.name}" exceeds 10MB limit`;
  }
  const allowed = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "text/csv",
    "text/plain",
    "application/json",
  ];
  if (!allowed.includes(file.type)) {
    return `File type "${file.type}" is not supported. Supported: images, PDF, CSV, text, JSON`;
  }
  return null;
}

export async function processFile(file: File): Promise<ProcessedFile> {
  const error = validateFile(file);
  if (error) throw new Error(error);

  if (file.type.startsWith("image/") || file.type === "application/pdf") {
    const dataUrl = await fileToDataUrl(file);
    return { name: file.name, type: file.type, size: file.size, dataUrl };
  }

  // Text-based files: CSV, plain text, JSON
  const textContent = await file.text();
  return { name: file.name, type: file.type, size: file.size, textContent };
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
