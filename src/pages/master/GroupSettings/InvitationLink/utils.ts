export const generateCode = (id: number) => {
  const characters = "ABCDEFGHIJ";
  const codeLength = 6
  const firstPart = id.toString().split('').map(char => characters[Number(char)]).slice(0, 3).join('');
  const secondPart = Date.now().toString().slice(firstPart.length - codeLength);
  return `${firstPart}${secondPart}`;
}