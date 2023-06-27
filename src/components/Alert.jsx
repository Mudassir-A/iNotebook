import React from "react";

const Alert = () => {
	return (
		<>
			<div
				className="alert alert-primary alert-dismissible fade show"
				role="alert"
			>
				A simple primary alert—check it out!
				<button
					type="button"
					className="btn-close"
					data-bs-dismiss="alert"
					aria-label="Close"
				></button>
			</div>
		</>
	);
};

export default Alert;
