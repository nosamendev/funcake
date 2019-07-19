import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 
import { closeModal } from '../../store/actions/';
import './Modal.css';

const Modal = (props) => {

    const handleModal = () => {
        props.closeModal();
    }

    if (!props.isModalOpen) {
        return null;
    }
    
    return ReactDOM.createPortal(
        <div className="modal" onClick={handleModal}>
            <div className="buttons" onClick={(e) => e.stopPropagation()}>
                <span onClick={handleModal.bind(this)} className="close-button"></span>
                <div>{props.children}</div>
            </div>
        </div>,
        document.querySelector('#modal-container')
    );
}

const mapStateToProps = (state) => {
    return {
        isModalOpen: state.modalReducer.isModalOpen
    }
}

export default connect(mapStateToProps, { closeModal })(Modal);