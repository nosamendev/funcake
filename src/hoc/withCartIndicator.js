import React, { useEffect } from 'react';

const withCartIndicator = (Component) => {
    return (props) => {

        useEffect(() => {
            setCartIndicator();
        });

        const setCartIndicator = () => {
            let cart;
            if (localStorage.order) {
                cart = JSON.parse(localStorage.order);
            }
            console.log('cart=', cart);
            const cartIndicator = document.querySelector('nav .cart');
            if (cart.length == 0) {
                
                cartIndicator.classList.remove('full');
            }
            else {
                console.log('full');
                cartIndicator.classList.add('full');
            }
        }
 
        return <Component {...props} />        
    }
}

export default withCartIndicator;