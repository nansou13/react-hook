import { useEffect, useState } from 'react'
import axios from 'axios';

const { CancelToken } = axios;

const useAxios = (url, config = {}, withCredentials = false) => {
    axios.defaults.withCredentials = false;

    const [state, setState] = useState({
        response: false,
        error: false,
        isLoading: true
    })

    const source = CancelToken.source();

    const fetchData = () => {
        setState({ isLoading: true, error: false });
        axios(url, {
            ...config,
            cancelToken: source.token
        })
        .then(response => {
            setState({response, isLoading: false})
        })
        .catch(error => {
            if(axios.isCancel(error)){
                console.log('Call canceled', error.message || '')
            }else{
                setState({error, response: false, isLoading: false})
            }
        })
    }

    useEffect(() => {
        fetchData()
        return () => {
            source.cancel('clean useEffect...');
        }; 
    }, [url])

    const { response, error, isLoading } = state;

    function setData(newData) {
        const newResponse = { ...response, data: newData };
        setState({ ...state, response: newResponse });
    }

    return { response, error, isLoading, setData, fetchData };

}

export default useAxios