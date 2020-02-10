import React, { memo } from 'react';
import propTypes from 'prop-types';

const Title = ({ children }) => {
    return <h1>{children}</h1>;
}

Title.displayName = 'Title';

Title.propTypes = {
    children: propTypes.string,
}

export default memo(Title);