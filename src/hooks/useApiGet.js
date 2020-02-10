import { mockFetch } from '../back-end/server';
import { useEffect, useReducer } from 'react';
import { formatObjectCamelCase } from '../logic/snakeToCamel';

const actions = {
    fetching: () => ({ type: 'FETCHING' }),
    loaded: data => ({ type: 'LOADED', data }),
    error: error => ({ type: 'ERROR', error }),
}

const initialState = {
    loading: true,
    data: null,
    error: null,
}

const useApiGet = (endpoint) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type){
            case 'FETCHING':
                return {
                    ...state,
                    loading: true,
                };
            case 'LOADED':
                return {
                    ...state,
                    loading: false,
                    error: null,
                    data: action.data,
                };
            case 'ERROR':
                return {
                    ...state,
                    loading: false,
                    error: action.error,
                    data: null,
                };
            default:
                return state;
        }
    }, initialState);

    const refetch = () => {
        async function fetchData() {
            try {
                dispatch(actions.fetching());
                const res = await mockFetch(endpoint);
                dispatch(actions.loaded(formatObjectCamelCase(res.body)));
            } catch (err) {
                console.error(err);
                dispatch(actions.error(err));
            }
        }
        if(endpoint) fetchData();
    };

    useEffect(refetch, [endpoint]);

    return { ...state, refetch };
}

useApiGet.displayName = "useApiGet";

export default useApiGet;