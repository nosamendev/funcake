import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchCakes, loadCart } from '../../store/actions'; 
import Product from './Product/Product';
import Loader from '../Loader/Loader';
import './Products.css';

const Products = (props) => {

    useEffect(() => {
        props.fetchCakes();
    }, []);

    let cart;
    if (localStorage.order) {
        cart = JSON.parse(localStorage.order);
    }
        
    if (!cart) {
        localStorage.order = JSON.stringify([]);
        cart = [];
    }

    //load from local storage:
    let len = 0;
    if (props.cakes) {
        len = props.cakes.length;
    }
    const [quantities, setQuantities] = useState(() => {       
            let arr = Array(len).fill(0);
            if (cart.length == 0) {
                return arr;
            }
            else {
                for (let i = 0; i < cart.length; i++) {
                    arr[cart[i].dataNumber] = cart[i].quantity};
                }
                return arr;
            }    
    );

    const handleQuantities = (dataNumber, quantity) => {
        setQuantities(state => ({...state, [dataNumber]:quantity}));
    }

    const incRefFunc = (node) => {
        if (node) {
            node.classList.remove('hide');
        }
    }

    const decRefFunc = (node) => {
        if (node) {
            node.classList.remove('hide');
        }
    }

    const inputRefFunc = (node) => {
        if (node) {
            node.removeAttribute('disabled');
        }
    }

    const displayProducts = () => {
        if (props.cakes) {
            const products = props.cakes.map((_, i) => {
                return <Product 
                    name={props.cakes[i].name} 
                    price={props.cakes[i].price} 
                    id={`item${i}`} 
                    quantity="0" 
                    dataNumber={i} 
                    key={i}
                    handleQuantities={handleQuantities}
                    showMidTotalPrice={false}
                    incRefFunc={incRefFunc}
                    decRefFunc={decRefFunc}
                    inputRefFunc={inputRefFunc} />            
            });
            //load from the Local Storage:
            for (let i = 0; i < cart.length; i++) {
                const dataNumber = cart[i].dataNumber;
                
                products[dataNumber] = <Product
                    name={props.cakes[dataNumber].name} 
                    price={props.cakes[dataNumber].price} 
                    id={`item${dataNumber}`} 
                    quantity={cart[i].quantity} 
                    dataNumber={dataNumber} 
                    key={dataNumber}
                    handleQuantities={handleQuantities}
                    showMidTotalPrice={false}
                    incRefFunc={incRefFunc}
                    decRefFunc={decRefFunc}
                    inputRefFunc={inputRefFunc} />
            }
            return products;
        }
        else return <p>{props.errorDescription}</p>
    }

    
    const handleOrder = () => {

        let titles = [];
        let prices = [];
        for (let i = 0; i < props.cakes.length; i++) {
            titles[i] = props.cakes[i].name;
            prices[i] = props.cakes[i].price;
        }

        const date = new Date().toJSON().slice(0, 10);

        const quantitiesArr = Object.values(quantities);
        
        //save to local storage:
        let cart = [];
        localStorage.order = JSON.stringify([]);
        let j = 0;
        for (let i = 0; i < quantitiesArr.length; i++) {
            if (quantitiesArr[i] != 0) {
                cart[j] = {title: titles[i], quantity: quantitiesArr[i], price: prices[i], dataNumber: i, date: date};
                j++;
            }
        }
        console.log(cart);
        localStorage.order = JSON.stringify(cart);
        if (cart.length !== 0) {
            props.loadCart();
        }
        
        props.history.push('/cart');   
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

export default connect(mapStateToProps, { fetchCakes, loadCart })(Products);