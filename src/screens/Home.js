import React, { useMemo, useState, useEffect, useCallback } from 'react';
import * as decode from 'unescape';

import useApiGet from '../hooks/useApiGet';

import Table from '../components/Table';
import Title from '../components/Title';
import Row from '../components/Row';
import WaitTillLoaded from '../components/WaitTillLoaded';
import FrameNav from '../components/FrameNav';
import Button from '../components/Button';
import Modal from '../components/Modal';

const Home = () => {
    const variantApi = useApiGet("/variant");
    const columnsApi = useApiGet("/columns");

    const tableData = useVariantTableData(variantApi, columnsApi);

    const [frames, setFrames] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (tableData.errors.reduce((has401, e) => e.message === '401' || has401, false)) {
            setModalVisible(true);
        }
    }, [tableData.errors]);

    useEffect(() => {
        if(tableData.data){
            setFrames([tableData.data[0], ...frames.slice(1)]);
        }
    }, [tableData.data]);


    return (
        <>
            <Title>Frames</Title>
                {
                    tableData.data && <Row>
                        <FrameNav
                            frames={tableData.data}
                            selected={frames[0]}
                            onSelect={val => setFrames([val])} />
                        <Button onClick={() => setFrames(tableData.data)}>Copy Frames</Button>
                    </Row>
                }
            <WaitTillLoaded
                data={tableData}
                error={tableData.errors.length > 0 && tableData.errors[0]}
                loading={tableData.loading}>
                    { () => <Table headers={tableData.headers} data={frames} /> }
            </WaitTillLoaded>
            <Modal show={modalVisible} onClose={() => setModalVisible(false)}>
                You are not authorized
            </Modal>
        </>
    );
};

Home.displayName = 'Home';

const useVariantTableData = (variantApi, columnsApi) => {
    const [headers, data] = useMemo(() => {
        if (!variantApi.data || !columnsApi.data){
            return [];
        }

        // Filter hidden and take keyName
        const cols = columnsApi.data.filter(v => !v.isHidden).map(v => v.keyName);

        // Add space before capitals, remove $ and trim whitespace
        const headers = cols.map(v => v.replace(/[A-Z]/g, c => ` ${c}`).slice(1).trim());

        // Pull first, middle and last from API response to array
        const frames = (
            ({ first, middle, last }) => (
                [
                    first.content,
                    ...middle.map(val => val.content),
                    last.content,
                ]
            )
        )(variantApi.data.creativeList[0].workingData.frames);

        // Pick and order data according to columns above
        const data = frames.map(frame => 
            cols.map(col => {
                return decode(((frame[col] || '').toString()))
            })
        );

        return [headers, data];

    }, [variantApi.data, columnsApi.data]);

    // Filter for errors that exist
    const errors = useMemo(() => (
        [variantApi.error, columnsApi.error].filter(val => val)
    ), [variantApi.error, columnsApi.error]);

    const loading = variantApi.loading || columnsApi.loading;

    return { headers, data, errors, loading };
}

useVariantTableData.displayName = "useVariantTableData";

export default Home;