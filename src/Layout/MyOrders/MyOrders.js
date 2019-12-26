import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMyOrders } from '../../store/actions/fetchMyOrders';
import Product from '../Products/Product/Product';
import Loader from '../Loader/Loader';
import './MyOrders.css';

const MyOrders = (props) => {

    useEffect(() => {
        props.fetchMyOrders(localStorage.token, localStorage.userId);
    }, []);

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

    const displayOrder = (order, date) => {
        if ( !props.loading && props.orders) {            

            const products = order.map((_, i) => {
                return <Product 
                    name={order[i].title} 
                    price={order[i].price} 
                    id={`item${i}`} 
                    quantity={order[i].quantity} 
                    dataNumber={order[i].dataNumber} 
                    key={i}
                    incRefFunc={incRefFunc}
                    decRefFunc={decRefFunc}
                    inputRefFunc={inputRefFunc} />            
            });

            return (
                <div className="order" key={Date.now() + Math.random()}>
                    <span className="date">{date}</span>
                    {products}
                </div>
            );     
        }
        else return <Loader />   
    }

    const displayAllOrders = () => {
        if ( !props.loading && props.orders) {            
            const orders = Object.values(props.orders);
            let dates = [];
            for (let i = 0; i < orders.length; i++) {
                dates[i] = orders[i].cakes[0].date;
            }
            const allOrders = [];
            for (let i = 0; i < orders.length; i++) {
                allOrders[i] = displayOrder(orders[i].cakes, dates[i]);
            }
            return allOrders;
        }
    }

    return (
        <React.Fragment>
            <h1>My Orders</h1>
            <div className="my-orders">
                <section className="products">
                    {displayAllOrders()}
                </section>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.myOrdersReducer.loading,
        orders: state.myOrdersReducer.orders
    }
}

export default connect(mapStateToProps, { fetchMyOrders })(MyOrders);