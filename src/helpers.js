export function convertWholeDollarsToCents(dollars) {
  return dollars * 100;
}

export function convertCentsToWholeDollars(cents) {
  return cents / 100;
}

export function calculateProductTotals(items) {
  const totalAmount = items
    .map(item => item.amount)
    .reduce((total, currentAmount) => total + currentAmount);
  
  const totalPrice = items
    .map(item => item.price)
    .reduce((total, currentPrice) => total + currentPrice);

  return {
    amount: totalAmount,
    price: totalPrice
  }
}

export function pluralize(item) {
  return item === 1 ? '' : 's';
}