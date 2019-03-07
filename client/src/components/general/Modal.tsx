import React from 'react';
import ReactDOM from 'react-dom';

declare global {
	interface ParentNode {
		querySelector<E extends Element = Element>(selectors: string): E;
	}
}

const Modal = (props: any) => {
	return ReactDOM.createPortal(
		<div onClick={props.dismiss} className="ui dimmer modals visible active">
			<div
				onClick={e => e.stopPropagation()} // disable history go back
				className="ui standard modal visible active"
			>
				{props.children}
			</div>
		</div>,
		document.querySelector('#modal')
	);
};

export default Modal;
