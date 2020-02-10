import React, { memo } from 'react';
import propTypes from 'prop-types';
import Row from './Row';

const FrameNav = ({ frames, selected, onSelect }) => {

    const boxes = frames.map(
        (frame, i) => <Box key={i} selected={selected === frame} onClick={() => onSelect(frame)}/>
    );

    return (
        <div className="frame-nav">
            <div className="section">
                <div className="header">
                    First
                </div>
                <Row>
                    { boxes[0] }
                </Row>
            </div>
            <div className="section">
                <div className="header">
                    Middle
                </div>
                <Row>
                    { boxes.slice(1, -1) }
                </Row>
            </div>
            <div className="section">
                <div className="header">
                    Last
                </div>
                <Row>
                    { boxes[boxes.length - 1] }
                </Row>
            </div>
        </div>
    );
}

FrameNav.displayName = 'FrameNav';

FrameNav.propTypes = {
    frames: propTypes.array,
    selected: propTypes.array,
    onSelect: propTypes.func,
}


const Box = memo(({ selected, onClick }) => (
    <button className={`box ${selected ? 'box-selected' : ''}`} onClick={onClick}/>
));

Box.displayName = 'Box';

Box.propTypes = {
    selected: propTypes.bool,
    onClick: propTypes.func,
}

export default memo(FrameNav);