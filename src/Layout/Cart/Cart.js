import React, { useEffect } from 'react';
import Product from '../Products/Product/Product'; 
import './Cart.css';

const Cart = (props) => {

    let cart;
    if (localStorage.order) {
        cart = JSON.parse(localStorage.order);
    }
        
    if (!cart) {
        localStorage.order = JSON.stringify([]);
    }
        
    console.log(cart);


    useEffect(() => {
        displayMidTotalPrices();
    }, []);

    useEffect(() => {
        renderPrices();
        calculateAbsoluteTotal(null, null);
        setCartIndicator();
    });

    const displayMidTotalPrices = () => {
        if (cart.join() != [].join()) { 
            for (let i = 0; i < cart.length; i++) {
                const totalPrice = document.querySelectorAll(`.products #item${cart[i].dataNumber} .total-price`)[0];
                totalPrice.className += " show";
                const total = totalPrice.querySelector('.total');
                total.innerHTML = "$" + (cart[i].quantity * cart[i].price).toFixed(2);
            }
        }
    }

    const displayProducts = () => {
        if (cart.join() != [].join()) {           
            const products = cart.map((_, i) => {
                return <Product 
                name={cart[i].title} 
                price={cart[i].price} 
                quantity={cart[i].quantity} 
                id={`item${cart[i].dataNumber}`} 
                dataNumber={cart[i].dataNumber} 
                key={i}
                removeProduct={removeProduct} />
            });
            return products;
        }     
    }

    const removeProduct = (dataNumber) => {
        let cart = JSON.parse(localStorage.order);
        const cartNew = cart.filter((item) => {
                return item.dataNumber != dataNumber
            }
        );
        localStorage.order = JSON.stringify(cartNew);
        //remove from DOM:
        const products = document.querySelector('.products');
        const itemToRemove = document.querySelector(`.products #item${dataNumber}`);
        console.log(itemToRemove);
        products.removeChild(itemToRemove);
        cart = JSON.parse(localStorage.order);
        calculateAbsoluteTotal(null, null);
        setCartIndicator();        
    }
    
    const renderPrices = () => {
        let cart = JSON.parse(localStorage.order);
        
        const products = document.querySelector('.products');
        if (products) {
            const totals = products.querySelectorAll('.item .total-price .total');
            const inputs = products.querySelectorAll('.item .quantity input');
            const incs = products.querySelectorAll('.item .quantity .inc');
            const decs = products.querySelectorAll('.item .quantity .dec');
            
            let value = 0;

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].addEventListener("change", (e) => changeQuantity(e, 'input'));
                incs[i].addEventListener("click", (e) => changeQuantity(e, 'inc'));
                decs[i].addEventListener("click", (e) => changeQuantity(e, 'dec'));
            }
            
            const changeQuantity = (e, type) => {
                let changedQuantity, id, quantity;

                switch (type) {
                    case 'input':
                        id = e.target.id.slice(8);
                        changedQuantity = e.target.value;
                        calculateAbsoluteTotal(changedQuantity, id);
                        break;

                    case 'inc':
                        id = e.target.id.slice(3);
                        quantity = products.querySelector(`#quantity${id}`);
                        if (quantity.value < 20) {
                            changedQuantity = +quantity.value + 1;
                            calculateAbsoluteTotal(changedQuantity, id);
                        } 
                        break;

                    case 'dec':
                        id = e.target.id.slice(3);
                        quantity = products.querySelector(`#quantity${id}`);
                        if (quantity.value > 0) {
                            changedQuantity = +quantity.value - 1;
                            calculateAbsoluteTotal(changedQuantity, id);
                        }
                        break;
                }       
            }    
        }
    }

    const calculateAbsoluteTotal = (changedQuantity, id) => {
        const absoluteTotalNode = document.querySelector('.absolute-total');
        const cart = JSON.parse(localStorage.order);
        
        if (changedQuantity != null) {
            let i = -1;
            do {
                i++;
            }
            while (cart[i].dataNumber !== id);

            cart[i].quantity = changedQuantity;
            localStorage.order = JSON.stringify(cart);
        }
          
        let absoluteTotal = 0;                   
        for (let i = 0; i < cart.length; i++) {
            absoluteTotal += Number(cart[i].quantity) * Number(cart[i].price);
        }
        absoluteTotalNode.innerHTML = 'Total: $' + Number(absoluteTotal).toFixed(2);    
    }

    const setCartIndicator = () => {
        let cart;
        if (localStorage.order) {
            cart = JSON.parse(localStorage.order);
        }
        console.log('cart=', cart);
        const cartIndicator = document.querySelector('nav .cart');
        if (cart.join() == [].join()) {
            
            cartIndicator.classList.remove('full');
        }
        else {
            console.log('full');
            cartIndicator.classList.add('full');
        }
    }

    const contents = (cart.join() == [].join()) ? <p>There are no cakes selected yet.</p> : displayProducts();
    
    return (
        <div>
            <h1>Shopping cart</h1>
            <section className="products">
                {contents}                          
            </section>
            <div className="absolute-total">
                
            </div>
        </div>
    );
}

export default Cart;