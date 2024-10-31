export const randomIdGenerator = () => {
  const idLength = 6;
  const str = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890";

  let id = "";
  for (let i = 0; i < idLength; i++) {
    const randomPosition = Math.floor(Math.random() * str.length);
    id += str[randomPosition];
  }
  return id;
};
