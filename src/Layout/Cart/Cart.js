import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveOrder } from '../../store/actions/saveOrder';
import { openModal, closeModal } from '../../store/actions/index';
import { notRemovingProduct } from '../../store/actions/removeProduct';
import Product from '../Products/Product/Product'; 
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import ConfirmOk from '../Modal/ModalDialogs/ConfirmOk';
import ConfirmErr from '../Modal/ModalDialogs/ConfirmErr';
import withCartIndicator from '../../hoc/withCartIndicator';
import './Cart.css';

const Cart = (props) => {

    const [cartstate, setCartstate] = useState(() => {
        if (localStorage.order) {
            return JSON.parse(localStorage.order);
        }
    });

    const [absoluteTotalState, setAbsoluteTotalState] = useState(0);

    useEffect(() => {
        displayMidTotalPrices();
    }, []);

    useEffect(() => {
        renderPrices();
        calculateAbsoluteTotal(null, null);
    });

    let cart;
    if (localStorage.order) {
        cart = JSON.parse(localStorage.order);
    }
        
    if (!cart) {
        localStorage.order = JSON.stringify([]);
    }

    const displayMidTotalPrices = () => {
        if (cart.length !== 0) { 
            for (let i = 0; i < cart.length; i++) {
                const totalPrice = document.querySelectorAll(`.products #item${cart[i].dataNumber} .total-price`)[0];
                totalPrice.className += " show";
                const total = totalPrice.querySelector('.total');
                total.innerHTML = "$" + (cart[i].quantity * cart[i].price).toFixed(2);
            }
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
                removeProduct={removeProduct} />
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

        calculateAbsoluteTotal(null, null);

        props.openModal();
        setTimeout(() => {props.closeModal();props.notRemovingProduct();}, 500);
        
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
        setAbsoluteTotalState(Number(absoluteTotal).toFixed(2));
    }

    const buyNowHandler = (e) => {
        e.preventDefault();
        let cart = JSON.parse(localStorage.order);

        const order = {
            customer: localStorage.email,
            cakes: cart,
            userId: props.userId,
        }
        if (Number(absoluteTotalState) !== 0.00) {
            console.log(Number(absoluteTotalState) !== 0.00);
            props.saveOrder(order, props.token);
            props.openModal();
            localStorage.order = JSON.stringify([]);
        }
        else {
            props.openModal();
        }
        
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

    if (Number(absoluteTotalState) === 0.00) {
        contentsMsg = <ConfirmErr title="Error!" text="Your order couldn't be saved as 0 is not a valid quantity." />
    }
   
    return (
        <div>
            <h1>Shopping cart</h1>
            <section className="products">
                {contentsProducts}                          
            </section>
            <div className="absolute-total"></div>
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

export default connect(mapStateToProps, { saveOrder, openModal, closeModal, notRemovingProduct })(withCartIndicator(Cart));