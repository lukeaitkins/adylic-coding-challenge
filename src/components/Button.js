import React, { memo } from 'react';
import propTypes from 'prop-types';

const Button = ({ children, onClick }) => {
    return <button className="button-rounded" onClick={onClick}>{children}</button>;
}

Button.displayName = 'Button';

Button.propTypes = {
    children: propTypes.string,
    onClick: propTypes.func,
}

export default memo(Button);