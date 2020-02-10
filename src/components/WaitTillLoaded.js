import React, { memo } from 'react';
import propTypes from 'prop-types';

import Loader from './Loader';

const WaitTillLoaded = memo(({ data, loading, error, children }) => {
    if (loading) return <Loader/>;
    if (error) return error.toString();
    return children(data);
});

WaitTillLoaded.propTypes = {
    data: propTypes.any,
    loading: propTypes.bool,
    error: propTypes.any,
    children: propTypes.func,
}

WaitTillLoaded.displayName = 'WaitTillLoaded';
export default WaitTillLoaded;