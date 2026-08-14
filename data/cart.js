

export let cart = JSON.parse(localStorage.getItem('cart')) || []

export function addToCart(productId, productQtd){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(cartItem.id === productId){
      matchingItem = cartItem
    }
  })
  if (matchingItem) {
    matchingItem.qtd += productQtd
  } else {
    cart.push(
      {
        id: productId,
        qtd: productQtd,
        deliveryOptionId: '2'
      }
    )
  }

  saveToLocalStorage()
  console.log(cart); 
}

export function updateCartQuantity(){
  let cartQuantity = 0
  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.qtd
  })
  return cartQuantity
}

export function updateProductQuantity(productToUpdateId) {
  cart.forEach((cartItem)=>{
    if (cartItem.id === productToUpdateId) {
      cartItem.qtd ++
      console.log(cart);
      saveToLocalStorage()
    }
  })
}

export function deleteFromCart(productToDeleteId){
  let newCart = []
  cart.forEach((cartItem)=>{
    if (cartItem.id !== productToDeleteId) {
      newCart.push(cartItem)
    }
  })
  cart = newCart
  console.log(cart);
  saveToLocalStorage()
} 

export function updateDeliveryOption(cartItemId, newDeliveryOptionId){
  cart.forEach((cartItem)=>{
    if (cartItem.id === cartItemId) {
      cartItem.deliveryOptionId = newDeliveryOptionId
    }
  })
  saveToLocalStorage()
  
}

function saveToLocalStorage(params) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

