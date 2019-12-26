import React, { useState, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import Loader from '../../Loader/Loader';
import { openModal, closeModal, emptyCart } from '../../../store/actions';
import { removingProduct, notRemovingProduct } from '../../../store/actions/removeProduct';


export const Product = (props) => {

    const [quantity, setQuantity] = useState(Number(props.quantity));

    const itemRef = useCallback(node => {
        if (node) {
            if (quantity > 0 && quantity <= 20) {
                node.classList.add('marked');
            }
            else {
                node.classList.remove('marked');
            }
        }    
    });

    const totalRef = useCallback(node => {
        if (node) {
            node.innerHTML = '$' + (quantity * props.price).toFixed(2);
        }
    });

    const incRef = useCallback (node => {
        if (node) {
            props.incRefFunc(node);
        }
    });

    const decRef = useCallback (node => {
        if (node) {
            props.decRefFunc(node);
        }
    });

    const inputRef = useCallback (node => {
        if (node) {
            props.inputRefFunc(node);
        }
    });

    const noteRef = useRef(null);

    const showHideNote = () => {
        if (noteRef.current.classList.contains("show")) {
            noteRef.current.classList.remove("show");
        }
        else {
            noteRef.current.classList.add("show");
        }    
    }

    const handleIncrease = () => {
        if (quantity < 20) {
            setQuantity(quantity + 1); 
            handleQuantities(quantity + 1);    
        }    
    }

    const handleDecrease = () => {      
        if (quantity > 0) {
            setQuantity(quantity - 1);  
            handleQuantities(quantity - 1);                
        }                 
    }

    const validateQuantity = (value) => {   
        if ((value >= 0) && (value <= 20)) {
            setQuantity(Number(value));
            handleQuantities(Number(value));
        }
        if (value > 20) {
            setQuantity(20);
            handleQuantities(20);
        }
        if ((value < 0) || isNaN(quantity)) {
            setQuantity(0);
            handleQuantities(0);
        }   
    }

    const removeProduct = () => {
        props.removeProduct(props.dataNumber);

        props.removingProduct();
        props.openModal();

        const cart = JSON.parse(localStorage.order)
        if (cart.length === 0) {
            props.emptyCart();
        }

        setTimeout(() => {props.closeModal(); props.notRemovingProduct()}, 500);
    }

    const handleQuantities = (quant) => {
        props.handleQuantities(props.dataNumber, quant);
    }

    if (props.loading) {
        return (
            <div className="item">
                <Loader />
            </div>
        );   
    }

    return (
        <React.Fragment>
            <div ref={itemRef} className="item" data-number={props.dataNumber} id={props.id}>
                <span className="title">{props.name}</span>
                <span className="preview"></span>

                <span ref={noteRef} className="note">From 0 to 20</span>    	
                <span className="quantity">	
                    <input ref={inputRef} id={`quantity${props.dataNumber}`} type="text" pattern="[0-9]*" value={quantity} 
                        onFocus={showHideNote}
                        onChange={(e) => {validateQuantity(e.target.value);}} onBlur={showHideNote} />
                    <span ref={incRef} className="inc" id={`inc${props.dataNumber}`} onClick={handleIncrease}> + </span>
                    <span ref={decRef} className="dec" id={`dec${props.dataNumber}`} onClick={handleDecrease}> - </span>
                </span>
                <span className="price">${props.price}<span>/pc</span></span>
                <div className={props.showMidTotalPrice ? "total-price show" : "total-price"}>
                    <span ref={totalRef} className="total"></span>
                    <span className="delete" onClick={removeProduct}></span>
                </div>
            </div>
        </React.Fragment>        
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.cakesReducer.loading
    }
}

export default connect(mapStateToProps, { openModal, closeModal, removingProduct, notRemovingProduct, emptyCart })(Product);