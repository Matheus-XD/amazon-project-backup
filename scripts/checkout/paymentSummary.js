import { cart, updateCartQuantity } from "../../data/cart.js"
import { deliveryOptions } from "../../data/delivery-options.js";
import { centsToDolar } from "../../utils/cents-to-dolar.js";

export function renderPaymentSummary() {
    let cartItemsPrice = 0;
    let cartItemsShippingPrice = 0;
    let totalBeforeTax = 0;
    let estimatedTax = 0;
    let totalAfterTax = 0;

    cart.forEach((cartItem)=>{
      cartItemsPrice += cartItem.priceCents * cartItem.qtd;
      deliveryOptions.forEach((option)=>{
        if (option.id === cartItem.deliveryOptionId) {
          cartItemsShippingPrice += option.priceCents
        }
      })
    })

    totalBeforeTax = cartItemsPrice + cartItemsShippingPrice
    estimatedTax = totalBeforeTax * 0.1
    totalAfterTax = totalBeforeTax + estimatedTax

    console.log();
    



  let paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${updateCartQuantity()}):</div>
      <div class="payment-summary-money">$${centsToDolar(cartItemsPrice)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${centsToDolar(cartItemsShippingPrice)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${centsToDolar(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${centsToDolar(estimatedTax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${centsToDolar(totalAfterTax)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `

  document.querySelector('.js-payment-summary')
  .innerHTML = paymentSummaryHTML

}