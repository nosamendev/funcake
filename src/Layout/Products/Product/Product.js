import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../Loader/Loader';

const Product = (props) => {

    if (props.loading) {
        return (
            <div className="item">
                <Loader />
            </div>
        );
       
    }

    return (
        <div className="item">
			<span className="title">{props.name}</span>
            <span className="preview"></span>
                	
            <span className="quantity">	
				<input type="text" value="0" />
				<span className="inc">+</span>
				<span className="dec">-</span>
            </span>
            <span className="price">${props.price}<span>/pc</span></span>
		</div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.cakesReducer.loading
    }
}

export default connect(mapStateToProps, null)(Product);