document.addEventListener('DOMContentLoaded', function () {
    const products = document.querySelectorAll('.product');

    products.forEach((product, index) => {
        let images;
        switch (index) {
            case 0: // Product 1
                images = [
                    'images/BB3_1.jpg',
                    'images/Vairaumati.jpg', // Second image for Product 1
                    'images/BB3_1.jpg', // Third image for Product 1
                ];
                break;
            case 1: // Product 3
                images = [
                    'images/BB4_1.jpg',
                    'images/lasieste.jpg', // Second image for Product 3
                    'images/BB4_1.jpg', // Third image for Product 3
                ];
                break;
            case 2: // Product 4
                images = [
                    'images/BB6_1.jpg',
                    'images/teaa.jpg', // Second image for Product 4
                    'images/BB6_1.jpg', // Third image for Product 4
                ];
                break;
            default: // Other products
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

