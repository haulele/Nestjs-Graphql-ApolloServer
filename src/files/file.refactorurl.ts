export function pathURL(filePath: string, size?: string): string {
    const extension = filePath.split('.').pop();
  
  // Get the file name without the extension
    const fileName = filePath.split('.').slice(0, -1).join('.');
    const newfileName = fileName.substring(fileName.lastIndexOf('/') + 1);
    if (size) {
      return `${newfileName}${size}.${extension}`;
    }
    return `${newfileName}.${extension}`;
  }