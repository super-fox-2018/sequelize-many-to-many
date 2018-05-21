exports.beautifyString = (string) => {
  string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
  string = string.replace(/\b(\w{2}$|\w)/g, (match) => match.toUpperCase());
  return string;
}