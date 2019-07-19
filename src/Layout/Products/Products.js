import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { fetchCakes } from '../../store/actions'; 
import Product from './Product/Product';
import Loader from '../Loader/Loader';
import './Products.css';


const Products = (props) => {

    useEffect(() => {
        props.fetchCakes();
        setCartIndicator();
    }, []);

    const displayProducts = () => {
        let cart;
        if (localStorage.order) {
            cart = JSON.parse(localStorage.order);
        }
        
        if (!cart) {
            localStorage.order = JSON.stringify([]);
        }

        if (props.cakes) {
        const products = props.cakes.map((_, i) => {
            //console.log(cart[i].dataNumber);
            return <Product 
                name={props.cakes[i].name} 
                price={props.cakes[i].price} 
                id={`item${i}`} 
                quantity="0" 
                dataNumber={i} 
                key={i} />            
        });
        //load from the Local Storage:
        for (let i = 0; i < cart.length; i++) {
            const dataNumber = cart[i].dataNumber;
            console.log(dataNumber);
            products[dataNumber] = <Product
                name={props.cakes[dataNumber].name} 
                price={props.cakes[dataNumber].price} 
                id={`item${dataNumber}`} 
                quantity={cart[i].quantity} 
                dataNumber={dataNumber} 
                key={dataNumber} />
        }
        return products;
    }
        else return <p>{props.errorDescription}</p>
    }

    const handleOrder = () => {
        const products = document.querySelector('.products');
        const titles = products.querySelectorAll('.item .title');
        const prices = products.querySelectorAll('.item .price');
        const quantities = products.querySelectorAll('.item input');
        const items = products.querySelectorAll('.item');

        
        //save to local storage:
        const cart = JSON.parse(localStorage.order);
        let j = 0;
        for (let i = 0; i < quantities.length; i++) {
            if (quantities[i].value != 0) {
                cart[j] = {title: titles[i].innerHTML, quantity: quantities[i].value, price: prices[i].innerHTML.slice(1, 5), dataNumber: items[i].getAttribute('data-number')};
                j++;
            }
        }
        
        localStorage.order = JSON.stringify(cart);
        console.log(cart);
        props.history.push('/cart');       
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


    if (props.loading) {
        return <Loader />;
    }
    return (
        <React.Fragment>
            <section className="products"> 
                {displayProducts()}                          
            </section>
            <div className="button-container">
                <button onClick={handleOrder}>Order</button>
            </div>
            </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        cakes: state.cakesReducer.cakes,
        errorDescription: state.cakesReducer.description.message
    }
}

export default connect(mapStateToProps, { fetchCakes })(Products);