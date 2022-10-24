if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", ready)
} else {
	ready()
}


// when the doc opens the buttons will be ready to work. 
function ready() {
	const removeBtns = document.getElementsByClassName("btn-danger");
	for (let i= 0; i<removeBtns.length; i++) {
	    const btn = removeBtns[i]
	    btn.addEventListener("click", removeItem)
	} 

	const itemNumbers = document.getElementsByClassName("cart-quantity-input");
	for (let i= 0; i<itemNumbers.length; i++) {
		const input = itemNumbers[i]
		input.addEventListener("change", countPrice)
	}

	// add to cart button as well
	const addBtns = document.getElementsByClassName("shop-item-button");
	for (let i= 0; i<addBtns.length; i++) {
		const button = addBtns[i]
		button.addEventListener("click", selectProduct)
	}

	document.getElementsByClassName("btn-purchase")[0].addEventListener("click", buyProducts)
}

//the function to remove the whole row from the cart 
function removeItem(e) {
	const clickedBtn = e.target
	clickedBtn.parentElement.parentElement.remove();
	updateTotal()
}

//the function to make sure the input value is 1 or more than 1.
function countPrice(e) {
	const input = e.target
	if(isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateTotal()
}

function selectProduct(e) {
	const button = e.target
	const addedProduct = button.parentElement.parentElement 
	const productName = addedProduct.getElementsByClassName('shop-item-title')[0].innerText;
	const productCost = addedProduct.getElementsByClassName('shop-item-price')[0].innerText;
	const productImage = addedProduct.getElementsByClassName('shop-item-image')[0].src;
	
	addProductToCart(productName, productCost, productImage);
	updateTotal()
}

function buyProducts() {
	alert("Thank you for choosing us!")
	const cartItems = document.getElementsByClassName("cart-items")[0]
	while(cartItems.hasChildNodes()) {
		cartItems.removeChild(cartItems.firstChild)
	}
	updateTotal()
}




function addProductToCart(productName, productCost, productImage) {
	const newRow = document.createElement("div");
	newRow.classList.add("cart-row");
	const cartItems = document.getElementsByClassName("cart-items")[0]
	const itemNames = cartItems.getElementsByClassName("cart-item-title")
	
	for (let i= 0; i<itemNames.length; i++) {
		if(itemNames[i].innerText == productName) {
			alert("This product is already in your cart.")
			return
		}
	}
	const newAddedItem = `<div class="cart-item cart-column">
	                        <img class="cart-item-image" src="${productImage}" width="100" height="100">
	                        <span class="cart-item-title">${productName}</span>
                    	</div>
                    	<span class="cart-price cart-column">${productCost}</span>
                    	<div class="cart-quantity cart-column">
	                        <input class="cart-quantity-input" type="number" value="1">
	                        <button class="btn btn-danger" type="button">REMOVE</button>
                    	</div>`
    newRow.innerHTML = newAddedItem;
	cartItems.append(newRow);
	const newRemoveBtn = newRow.getElementsByClassName("btn-danger")[0]
	newRemoveBtn.addEventListener('click', removeItem);

	const newInputElement = newRow.getElementsByClassName("cart-quantity-input")[0]
	newInputElement.addEventListener('change', countPrice);
}



function updateTotal() {

	// To chose the cartRow specifically, it is necessary to define it step by step 
	// so that it should not be mixed with other elements of the same class.

	const chosenProduct = document.getElementsByClassName("cart-items")[0];
	const cartRows = chosenProduct.getElementsByClassName("cart-row")
	// use let for totalPrice so that it could show the increment or the decrement. 
	let totalPrice = 0;
	for(let i=0; i< cartRows.length; i++) {
		const cartRow = cartRows[i];
		const productPrice = cartRow.getElementsByClassName("cart-price")[0];
		const productQuantity = cartRow.getElementsByClassName("cart-quantity-input")[0];
		
		// turn the price into an integer without the sign.
		const priceValue = productPrice.innerText.replace('$', '');
		parseFloat(priceValue);

		const quantityValue = productQuantity.value;
		// console.log(parseFloat(priceValue));
		// console.log(quantityValue);
		totalPrice += (priceValue * quantityValue);
		// console.log(totalPrice);
	};
		totalPrice = Math.round(totalPrice * 100) / 100; 
		const cartTotal = document.getElementsByClassName("cart-total-price")[0];
		cartTotal.innerText = `$ ${totalPrice}`;
}



//clicking the like button

function changeColor1() {
	document.getElementById("like1").style.background='red';	 	
} 


function changeColor2() {
	document.getElementById("like2").style.background='red';	 	
} 

function changeColor3() {
	document.getElementById("like3").style.background='red';	 	
} 

function changeColor4() {
	document.getElementById("like4").style.background='red';	 	
} 

function changeColor5() {
	document.getElementById("like5").style.background='red';	 	
} 

function changeColor6() {
	document.getElementById("like6").style.background='red';	 	
} 
