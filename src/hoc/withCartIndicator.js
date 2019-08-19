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
            const cartIndicator = document.querySelectorAll('nav .cart');
            if (cart.length == 0) {
                for (let i = 0; i <= 1; i++) {
                    cartIndicator[i].classList.remove('full');
                }
                
            }
            else {
                //cartIndicator.classList.add('full');
                for (let i = 0; i <= 1; i++) {
                    cartIndicator[i].classList.add('full');
                }
            }
        }
 
        return <Component {...props} />        
    }
}

export default withCartIndicator;