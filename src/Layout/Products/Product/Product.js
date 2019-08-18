import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from '../../Loader/Loader';
import Modal from '../../Modal/Modal';
import { openModal, closeModal } from '../../../store/actions';
import { removingProduct, notRemovingProduct } from '../../../store/actions/removeProduct';


const Product = (props) => {

    const [quantity, setQuantity] = useState(Number(props.quantity));

    var item; 
    useEffect(() => {
        item = document.querySelector(`.products #item${props.dataNumber}`);
        calculateTotal(); 
        selectProduct();      
    });

    const handleIncrease = () => {
        const note = item.querySelector('.note');

        if (quantity < 20) {
            setQuantity(quantity + 1);
            note.classList.remove("error");          
        }
    }

    const handleDecrease = () => {
        const note = item.querySelector('.note');
        
        if (quantity > 0) {
            setQuantity(quantity - 1);            
            note.classList.remove("error");        
        }                 
    }

    const validateQuantity = (value) => {
        const note = item.querySelector('.note');
 
        if ((value >= 0) && (value <= 20)) {
            note.classList.remove("error");
            setQuantity(Number(value));
        }
        else {
            note.classList.add("error"); 
        }
    }

    const calculateTotal = () => {
        if (item) {
            const total = item.querySelector('.total-price .total');
            total.innerHTML = '$' + (quantity * props.price).toFixed(2);
        }                
    }

    const removeProduct = () => {
        props.removeProduct(props.dataNumber);

        props.removingProduct();
        props.openModal();
        setTimeout(() => {props.closeModal(); props.notRemovingProduct()}, 500);
    }

    const selectProduct = () => {
        if (item) {
            if (quantity > 0 && quantity <= 20) {
                item.classList.add('marked');
            }
            else {
                item.classList.remove('marked');
            }
        }
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
            <div className="item" data-number={props.dataNumber} id={props.id}>
                <span className="title">{props.name}</span>
                <span className="preview"></span>

                <span className="note">From 0 to 20</span>    	
                <span className="quantity">	
                    <input id={`quantity${props.dataNumber}`} type="text" pattern="[0-9]*" value={quantity} 
                        onChange={(e) => {validateQuantity(e.target.value);}} onBlur={(e) => validateQuantity(e.target.value)} />
                    <span className="inc" id={`inc${props.dataNumber}`} onClick={handleIncrease}> + </span>
                    <span className="dec" id={`dec${props.dataNumber}`} onClick={handleDecrease}> - </span>
                </span>
                <span className="price">${props.price}<span>/pc</span></span>
                <div className="total-price">
                    <span className="total"></span>
                    <span className="delete" onClick={removeProduct}></span>
                </div>
            </div>
            {/*
            <Modal>
                <Loader />
            </Modal>
            */}
        </React.Fragment>        
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.cakesReducer.loading
    }
}

export default connect(mapStateToProps, { openModal, closeModal, removingProduct, notRemovingProduct })(Product);