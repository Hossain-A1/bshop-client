const getTotalAmount = (amount) => {
  return amount.reduce((acc, item) => acc + item.price * item.quantity, 0);
};
const getTotalItems = (amount) => {
  return amount.reduce((acc, item) => acc + item.quantity, 0);
};


const slugify = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[\s&']+/g, "-") // Convert spaces, "&", and apostrophes to "-"
    .replace(/[^a-z0-9-]/g, ""); // Remove special characters
};
export { getTotalAmount, getTotalItems,slugify };
