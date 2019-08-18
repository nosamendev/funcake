import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMyOrders } from '../../store/actions/fetchMyOrders';
import Product from '../Products/Product/Product';
import Loader from '../Loader/Loader';
import withCartIndicator from '../../hoc/withCartIndicator';
import './MyOrders.css';

const MyOrders = (props) => {

    useEffect(() => {
        props.fetchMyOrders(localStorage.token, localStorage.userId);
    }, []);

    useEffect(() => {
        disableQuantityInputs();
        renderDates();
    });

    const displayOrder = (order) => {
        if ( !props.loading && props.orders) {            

            const products = order.map((_, i) => {
                return <Product 
                    name={order[i].title} 
                    price={order[i].price} 
                    id={`item${i}`} 
                    quantity={order[i].quantity} 
                    dataNumber={order[i].dataNumber} 
                    key={i} />            
            });

            return (
                <div className="order" key={Date.now() + Math.random()}>
                    <span className="date"></span>
                    {products}
                </div>
            );     
        }
        else return <Loader />   
    }

    const displayAllOrders = () => {
        if ( !props.loading && props.orders) {            
            const orders = Object.values(props.orders);
            console.log(orders);
            const allOrders = [];
            for (let i = 0; i < orders.length; i++) {
                allOrders[i] = displayOrder(orders[i].cakes);
            }
            return allOrders;
        }
    }

    const disableQuantityInputs = () => {
        const quantityInputs = document.querySelectorAll('.my-orders .products .item .quantity input');
        if (quantityInputs) {
            for (let i = 0; i < quantityInputs.length; i++) {
                quantityInputs[i].setAttribute("disabled", "disabled");
            }
        }
    }

    const renderDates = () => {
        if (props.orders) {
            const dates = document.querySelectorAll('.my-orders .order .date');
            const orders = Object.values(props.orders);
            for (let i = 0; i < dates.length; i++) {
                dates[i].innerHTML = orders[i].cakes[0].date;
            }
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

export default connect(mapStateToProps, { fetchMyOrders })(withCartIndicator(MyOrders));