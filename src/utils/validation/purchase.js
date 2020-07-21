module.exports = function validPurchase(purchase) {
  return purchase.stripeConfirmation && purchase.intflaskConfirmation;
};
