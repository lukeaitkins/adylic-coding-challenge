import React, { memo } from 'react';
import propTypes from 'prop-types';

const Table = ({ headers, data }) => (
    <div className="data-table">
        <table>
            <thead>
                <tr>
                    { headers.map((header, i) => <th key={i}>{header}</th>) }
                </tr>
            </thead>
            <tbody>
                { data.map((row, i) => (
                    <tr key={i}>
                    { 
                        row.map((datum, j) => (
                            <td key={j}>{datum}</td>
                        )) 
                    }
                    </tr>
                )) }
            </tbody>
        </table>
    </div>
);

Table.propTypes = {
    header: propTypes.array,
    data: propTypes.array
}

Table.displayName = 'Table';

export default memo(Table);