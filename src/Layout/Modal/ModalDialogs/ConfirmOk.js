import React from 'react';
import { connect } from 'react-redux'; 
import { closeModal } from '../../../store/actions/index';
import { withRouter } from 'react-router-dom';

const ConfirmGoHome = (props) => {

    const handleButtonClick = () => {
        props.history.push('/');
        props.closeModal();
    }

    let content = (
        <div>
            <h2>{props.title}</h2>
            <p>{props.text}</p>
            <div>
                <button onClick={handleButtonClick}>OK</button>      
            </div>
        </div>
    );

    return (
        <div>
            {content}
        </div>       
    );
}

const mapStateToProps = (state) => {
    return {isModalOpen: state.modalReducer.isModalOpen}
}

export default withRouter(connect(mapStateToProps, {closeModal})(ConfirmGoHome));
