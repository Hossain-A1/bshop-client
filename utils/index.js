const getTotalAmount = (amount) => {
  return amount.reduce((acc, item) => acc + item.price * item.quantity, 0);
};
const getTotalItems = (amount) => {
  return amount.reduce((acc, item) => acc + item.quantity, 0);
};

export { getTotalAmount, getTotalItems };
