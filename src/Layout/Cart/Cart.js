import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { saveOrder } from '../../store/actions/saveOrder';
import { openModal, closeModal } from '../../store/actions/index';
import { notRemovingProduct } from '../../store/actions/removeProduct';
import { loadCart, emptyCart } from '../../store/actions/cartStatus';
import Product from '../Products/Product/Product'; 
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import ConfirmOk from '../Modal/ModalDialogs/ConfirmOk';
import ConfirmErr from '../Modal/ModalDialogs/ConfirmErr';
import './Cart.css';

const Cart = (props) => {

    const [cartstate, setCartstate] = useState(() => {
        if (localStorage.order) {
            return JSON.parse(localStorage.order);
        }
    });

    let cart;
    if (localStorage.order) {
        cart = JSON.parse(localStorage.order);
    }
        
    if (!cart) {
        localStorage.order = JSON.stringify([]);
    }

    if (cart.length !== 0) {
        props.loadCart();
    }
    else {
        props.emptyCart();
    }

    const absoluteTotalRef = useCallback(node => {
        if (node) {
            let sum = 0;
            for (let i = 0; i < cart.length; i++) {
                sum = sum + cart[i].price * cart[i].quantity;
            }
            node.innerHTML = '$' + (sum).toFixed(2);
        }    
    });

    const incRefFunc = (node) => {
        if (node) {
            node.classList.add('hide');
        }
    }
    const decRefFunc = (node) => {
        if (node) {
            node.classList.add('hide');
        }
    }
    const inputRefFunc = (node) => {
        if (node) {
            node.setAttribute('disabled', 'disabled');
        }
    }

    const displayProducts = () => {
        if (cart.length !== 0) {           
            const products = cart.map((_, i) => {
                return <Product 
                name={cart[i].title} 
                price={cart[i].price} 
                quantity={cart[i].quantity} 
                id={`item${cart[i].dataNumber}`} 
                dataNumber={cart[i].dataNumber} 
                key={i}
                removeProduct={removeProduct}
                showMidTotalPrice={true} 
                incRefFunc={incRefFunc}
                decRefFunc={decRefFunc}
                inputRefFunc={inputRefFunc} />
            });
            return products;
        }     
    }

    const removeProduct = (dataNumber) => {
        const cartstateNew = cartstate.filter((item) => {
            return item.dataNumber != dataNumber
            }
        );
        setCartstate(cartstateNew);
        localStorage.order = JSON.stringify(cartstateNew);
        console.log('cartstateNew', cartstateNew);

        props.openModal();
        setTimeout(() => {props.closeModal(); props.notRemovingProduct();}, 500);
        
    }

    const buyNowHandler = (e) => {
        e.preventDefault();
        let cart = JSON.parse(localStorage.order);

        const order = {
            customer: localStorage.email,
            cakes: cart,
            userId: props.userId,
        }
        props.saveOrder(order, props.token);
        props.openModal();
        localStorage.order = JSON.stringify([]);     
    }

    const contentsProducts = (cart.length == 0) ? <p>There are no cakes selected yet.</p> : displayProducts();

    let contentsMsg = null;

    if (props.loading == true){
        contentsMsg = <Loader />;
    }
    else {
        if (!props.removing) {
            props.error ? contentsMsg = <ConfirmErr title="Error!" text="Your order couldn't be saved." /> :
            contentsMsg = <ConfirmOk text="Your Order has been saved." />;
        }
        else contentsMsg = <Loader />;
    }

   
    return (
        <div>
            <h1>Shopping cart</h1>
            <section className="products">
                {contentsProducts}                          
            </section>
            <div ref={absoluteTotalRef} className="absolute-total"></div>
            {props.isLoggedIn ? <button onClick={buyNowHandler}>Buy now</button> : <p className="login-msg">Please Login/Register to finish your order.</p>}
            <Modal>
                {contentsMsg}
                
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authReducer.userId !== null,
        error: state.saveOrderReducer.error,
        loading: state.saveOrderReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId,
        removing: state.removeProductReducer.removing
    }
}

export default connect(mapStateToProps, { saveOrder, openModal, closeModal, notRemovingProduct, loadCart, emptyCart })(Cart);