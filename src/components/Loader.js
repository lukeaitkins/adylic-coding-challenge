import React, { memo } from 'react';

const Loader = () => (
    <div className="loader">Loading...</div>
);

Loader.displayName = "Loader";

export default memo(Loader);