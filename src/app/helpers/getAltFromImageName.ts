export const getAltFromImageName = (filePath: string): string => {
  const fileName = filePath.split("/").pop(); 

  if (fileName) {
    const nameWithoutExtension = fileName.split("-")[0];
    
    const words = nameWithoutExtension
      .replace(/([a-z])([A-Z])/g, '$1 $2') 
      .split(/\s+/);

    const formattedName = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return formattedName;
  }

  return '';
};