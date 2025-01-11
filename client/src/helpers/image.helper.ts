export const readAndCompressImageFile = (file: File, maxWidth = 600, maxHeight = 400, quality = 1): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onerror = reject;
    reader.onload = (event) => {
      compressImage(event.target?.result as string, maxWidth, maxHeight, quality)
        .then(resolve)
        .catch(reject);
    };
  });
};

export const compressImage = (src: string, maxWidth = 600, maxHeight = 400, quality = 1): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;

    img.onerror = reject;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        } else {
          width = (maxHeight / height) * width;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob!);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject();
        
      }, "jpg", quality);
    };
  });
};
