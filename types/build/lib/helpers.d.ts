declare const PackError: (message: string) => void;
declare const getFilesRecursively: (directory: string, filePaths?: string[]) => string[];
export { getFilesRecursively, PackError };
