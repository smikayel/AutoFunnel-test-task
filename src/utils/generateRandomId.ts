const generateRandomId = (length = 24) => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "cl";
  for (let i = 2; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default generateRandomId;
