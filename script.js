document.addEventListener('DOMContentLoaded', function () {
    const products = document.querySelectorAll('.product');

    products.forEach((product, index) => {
        let images;
        switch (index) {
            case 0: // Product 1 (Vanuatu)
                images = [
                    'images/Vanuatu_1.jpg',
                    'images/Vanuatu_5.jpg', // Second image for Product 1
                    'images/Vanuatu_3.jpg', // Third image for Product 1
                ];
                break;
            case 1: // Product 2 (Tehura)
                images = [
                    'images/Tehura_1.jpg',
                    'images/Tehura_4.jpg', // Second image for Product 2
                    'images/Tehura_3.jpg', // Third image for Product 2
                ];
                break;
            case 2: // Product 3 (Bora)
                images = [
                    'images/Bora_1.jpg',
                    'images/Bora_4.jpg', // Second image for Product 3
                    'images/Bora_2.jpg', // Third image for Product 3
                ];
                break;
            case 3: // Product 4 (Nadi)
                images = [
                    'images/Nadi_1.jpg',
                    'images/Nadi_4.jpg', // Second image for Product 4
                    'images/Nadi_2.jpg', // Third image for Product 4
                ];
                break;
            case 4: // Product 5 (Vairaumati)
                images = [
                    'images/Nivano_1.jpg',
                    'images/Nivano_5.jpg', // Second image for Product 5
                    'images/Nivano_3.jpg', // Third image for Product 5
                ];
                break;
            case 5: // Product 6 (Ribauchet)
                images = [
                    'images/Hana_1.jpg',
                    'images/Hana_5.jpg', // Second image for Product 6
                    'images/Hana_3.jpg', // Third image for Product 6
                ];
                break;
            case 6: // Product 7 (Hana)
                images = [
                    'images/Moorea_1.jpg',
                    'images/Moorea_2.jpg', // Second image for Product 7
                    'images/.jpg', // Third image for Product 7
                ];
                break;
            case 7: // Product 8 (Moorea)
                images = [
                    'images/Manua_1.jpg',
                    'images/Manua_4.jpg', // Second image for Product 8
                    'images/Manua_2.jpg', // Third image for Product 8
                ];
                break;
            case 8: // Product 9 (Manua)
                images = [
                    'images/Manua_1.jpg',
                    'images/Manua_4.jpg', // Second image for Product 9
                    'images/Manua_2.jpg', // Third image for Product 9
                ];
                break;
            default: // Other products (if any)
                images = [
                    product.querySelector('img').src,
                    'images/default2.jpg', // Replace with your default second image
                    'images/default3.jpg', // Replace with your default third image
                ];
        }

        let currentImageIndex = 0;

        const arrowLeft = product.querySelector('.arrow-left');
        const arrowRight = product.querySelector('.arrow-right');
        const productImage = product.querySelector('img');

        const changeImage = (newIndex) => {
            // Fade out the current image
            productImage.style.opacity = 0;

            // Wait for the transition to complete, then change the image
            setTimeout(() => {
                productImage.src = images[newIndex];
                // Fade in the new image
                productImage.style.opacity = 1;
            }, 300); // Match this delay with the CSS transition duration
        };

        arrowLeft.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            changeImage(currentImageIndex);
        });

        arrowRight.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            changeImage(currentImageIndex);
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const cartCount = document.querySelector('.nav-links-right .cart-count');

    // Retrieve cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Update the cart count display
    if (itemCount > 0) {
        cartCount.textContent = itemCount;
        cartCount.style.display = 'inline-block';
    }

    addToCartBtn.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the link from navigating

        // Add the animation class
        addToCartBtn.classList.add('clicked');

        // Dynamically fetch product details from the page
        const productName = document.querySelector('.product-page-details h1').textContent;
        const productPrice = parseFloat(document.querySelector('.product-page-details .price').textContent.replace('$', ''));
        const productImage = document.querySelector('.product-images img').src;
        const productUrl = document.getElementById('product-url').value; // Get the product URL from the hidden input field

        // Add item to cart
        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1,
            url: productUrl, // <-- No leading slash
        };
        // Check if the product is already in the cart
        const existingItem = cartItems.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push(product);
        }

        // Update local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Update the cart count
        itemCount++;
        cartCount.textContent = itemCount;
        cartCount.style.display = 'inline-block';

        // Reset the button after the animation
        setTimeout(() => {
            addToCartBtn.classList.remove('clicked');
        }, 500);
    }); // <-- Closing brace for addToCartBtn.addEventListener
}); // <-- Closing brace for DOMContentLoaded

document.addEventListener('DOMContentLoaded', function () {
    const cartItemsList = document.getElementById('cart-items-list');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    // Retrieve cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Display cart items
    function displayCartItems() {
        cartItemsList.innerHTML = ''; // Clear the list
        let subtotal = 0;
    
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
    
            cartItem.innerHTML = `
                <a href="${item.url}" class="cart-item-link">
                    <img src="${item.image}" alt="${item.name}">
                </a>
                <div class="cart-item-details">
                    <a href="${item.url}" class="cart-item-link">
                        <h3>${item.name}</h3>
                    </a>
                    <p>Prix: $${item.price}</p>
                    <div class="quantity-selector">
                        <span>Quantité: </span>
                        <select onchange="updateQuantity(${index}, this.value)">
                            ${Array.from({ length: 10 }, (_, i) => `
                                <option value="${i + 1}" ${item.quantity === i + 1 ? 'selected' : ''}>${i + 1}</option>
                            `).join('')}
                        </select>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-btn" onclick="removeItem(${index})">&#10005;</button>
                </div>
            `;
    
            cartItemsList.appendChild(cartItem);
            subtotal += item.price * item.quantity;
        });
    
        // Update subtotal and total
        subtotalElement.textContent = `$${subtotal}`;
        totalElement.textContent = `$${subtotal}`; // Delivery is free
    
        // Update cart count in the nav bar
        const cartCount = document.querySelector('.nav-links-right .cart-count');
        const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = itemCount;
        cartCount.style.display = itemCount > 0 ? 'inline-block' : 'none';
    }

    // Remove item from cart
    window.removeItem = function (index) {
        cartItems.splice(index, 1); // Remove the item
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update local storage
        displayCartItems(); // Refresh the cart display
    };

    // Update item quantity
    window.updateQuantity = function (index, quantity) {
        cartItems[index].quantity = parseInt(quantity); // Update quantity
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update local storage
        displayCartItems(); // Refresh the cart display
    };

    // Initial display
    displayCartItems();
});

// Get the modal and buttons
const modal = document.getElementById('cart-modal');
const addToCartBtn = document.getElementById('add-to-cart-btn');
const closeModal = document.querySelector('.close-modal');
const modalCartItems = document.getElementById('modal-cart-items');
const modalSubtotal = document.getElementById('modal-subtotal');
const modalTotal = document.getElementById('modal-total');

// Function to open the modal
function openModal() {
    modal.style.display = 'flex';
    updateModalCart();
}

// Function to close the modal
function closeModalHandler() {
    modal.style.display = 'none';
}

// Event listeners
addToCartBtn.addEventListener('click', function (e) {
    e.preventDefault();
    openModal();
});

closeModal.addEventListener('click', closeModalHandler);

// Close modal when clicking outside the modal content
window.addEventListener('click', function (e) {
    if (e.target === modal) {
        closeModalHandler();
    }
});

// Function to update the modal cart content
function updateModalCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    modalCartItems.innerHTML = ''; // Clear existing items

    let subtotal = 0;

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('modal-cart-item');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="modal-item-image">
            <div class="modal-item-details">
                <h3>${item.name}</h3>
                <p>Prix: $${item.price}</p>
                <p>Quantité: ${item.quantity}</p>
            </div>
        `;

        modalCartItems.appendChild(cartItem);
        subtotal += item.price * item.quantity;
    });

    // Update subtotal and total
    modalSubtotal.textContent = `$${subtotal}`;
    modalTotal.textContent = `$${subtotal}`; // Assuming delivery is free
}