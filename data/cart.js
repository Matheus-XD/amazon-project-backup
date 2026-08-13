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
        qtd: productQtd
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

function saveToLocalStorage(params) {
  localStorage.setItem('cart', JSON.stringify(cart))
  
}