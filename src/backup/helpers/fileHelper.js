export function convertFileToDataURL(file) {
  return new Promise(resolve => {
    const reader  = new FileReader();

    reader.onloadend = function () {
      resolve(reader.result);
    }

    reader.onerror = function () {
      resolve(null);
    }
  
    reader.readAsDataURL(file);
  });
}