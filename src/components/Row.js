import React, { memo } from 'react';
import propTypes from 'prop-types';

const Row = ({ children }) => {
    return <div className="row">{children}</div>;
}

Row.displayName = 'Row';

Row.propTypes = {
    children: propTypes.node,
}

export default memo(Row);