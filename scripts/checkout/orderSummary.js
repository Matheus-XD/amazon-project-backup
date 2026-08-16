import { cart, updateProductQuantity, deleteFromCart, updateDeliveryOption, updateCartQuantity } from "../../data/cart.js";
import {products} from "../../data/products.js"
import { deliveryOptions } from "../../data/delivery-options.js";
import { centsToDolar } from "../../utils/cents-to-dolar.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"

const today = dayjs()

export function renderOrderSummary(){
    let orderSummaryHTML = ''
    cart.forEach((cartItem)=>{
        let matchingItem;
        products.forEach((product)=>{
            if (cartItem.id === product.id) {
                matchingItem = product
            }
        })

        let deliveryDate = ''
        deliveryOptions.forEach((option)=>{
            if (cartItem.deliveryOptionId === option.id) {
                deliveryDate = today.add(option.daysToDelivery, 'days').format('dddd, MMMM D')
            }
        })

        orderSummaryHTML += `
        <div class="cart-item-container">
        <div class="delivery-date">
            Delivery date: ${deliveryDate}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src= ${matchingItem.image}>

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingItem.name}
            </div>
            <div class="product-price">
                $${centsToDolar(matchingItem.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label">${cartItem.qtd}</span>
                </span>
                <button class="update-quantity-button link-primary js-update-quantity-button"
                data-product-to-update-id = "${matchingItem.id}"
                >
                Update
                </button>
                <button class="delete-quantity-button link-primary js-delete-quantity-button"
                data-product-to-delete-id = "${matchingItem.id}">
                Delete
                </button>
            </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                
                ${renderDeliveryOptions(cartItem)}
            </div>
        </div>
        </div>
        `
    })

    function renderDeliveryOptions(cartItem){

        let deliveryOptionsHTML = ''
        deliveryOptions.forEach((option)=>{
            let isChecked;
            if (option.id === cartItem.deliveryOptionId) {
                isChecked = 'checked'
            } else {
                isChecked = ''
            }

            let shippingPrice;
            if (option.priceCents > 0) {
                shippingPrice = `$${centsToDolar(option.priceCents)}`
            } else {
                shippingPrice = 'FREE'
            }

            deliveryOptionsHTML += `
            <div class="delivery-option js-delivery-option" 
            data-delivery-option-id = "${option.id}"
            data-cart-item-id = "${cartItem.id}">
            
                <input type="radio" ${isChecked}
                class="delivery-option-input"
                name="delivery-option-${cartItem.id}">
                <div>
                <div class="delivery-option-date">
                    ${today.add(option.daysToDelivery, 'days').format('dddd, MMMM D')}
                </div>
                <div class="delivery-option-price">
                    ${shippingPrice} Shipping
                </div>
                </div>
            </div>
            `
        })
        return deliveryOptionsHTML
    }

    document.querySelector('.js-order-summary')
    .innerHTML = orderSummaryHTML

    document.querySelector('.js-return-to-home-link')
    .innerText = `${updateCartQuantity()} items`

    document.querySelectorAll('.js-update-quantity-button')
    .forEach((updateButton)=>{
        updateButton.addEventListener('click', ()=>{
            const productToUpdateId = updateButton.dataset.productToUpdateId
            updateProductQuantity(productToUpdateId)
            renderOrderSummary()
            renderPaymentSummary()       
        })
    })

    document.querySelectorAll('.js-delete-quantity-button')
    .forEach((deleteButton)=>{
        deleteButton.addEventListener('click', ()=>{
            const productToDeleteId = deleteButton.dataset.productToDeleteId
            deleteFromCart(productToDeleteId)
            renderOrderSummary()
            renderPaymentSummary()
        })
    })

    document.querySelectorAll('.js-delivery-option')
    .forEach((deliveryOption)=>{
        deliveryOption.addEventListener('click', ()=>{
            const newDeliveryOptionId = Number(deliveryOption.dataset.deliveryOptionId)
            const cartItemId = deliveryOption.dataset.cartItemId
            updateDeliveryOption(cartItemId, newDeliveryOptionId)
            renderOrderSummary()
            renderPaymentSummary()
        })
    })
    
}