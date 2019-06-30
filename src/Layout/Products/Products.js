import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchCakes } from '../../store/actions'; 
import Product from './Product/Product';
import Loader from '../Loader/Loader';
import './Products.css';


const Products = (props) => {

    useEffect(() => {
        props.fetchCakes();
    }, []);


    const displayProducts = () => {
        if (props.cakes) {
            const products = props.cakes.map((_, i) => {
                return <Product name={props.cakes[i].name} price={props.cakes[i].price} />
            });
            return products;
        }
        else return <p>{props.errorDescription}</p>
    }



    if (props.loading) {
        return <Loader />;
    }
    return (
        <section className="products">
            
            {displayProducts()}
        </section>
    );
}

const mapStateToProps = (state) => {
    return {
        cakes: state.cakesReducer.cakes,
        errorDescription: state.cakesReducer.description.message
    }
}

export default connect(mapStateToProps, { fetchCakes })(Products);