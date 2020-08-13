import axios from 'axios';

// Universal fetch request using axios
export function universalFetch(setResponse, url) {
    console.log('Fetch started');
    setResponse({
        data: null,
        loading: true,
        error: null,
    });
    axios
        .get(url)
        .then((resp) => {
            console.log('Response received');
            console.log(resp.data.body);
            setResponse({
                data: resp.data.body,
                loading: false,
                error: null,
            });
        })
        .catch((err) => {
            console.log(`Fetch failed with error ${err.message}`);
            setResponse({
                data: null,
                loading: false,
                error: err,
            });
        });
};

export function appointmentListFetch(setResponse, url) {
    console.log('Fetch started');
    setResponse({
        data: null,
        loading: true,
        error: null,
    });
    axios
        .get(url)
        .then((resp) => {
            console.log('Response received');
            console.log(resp.dataspecialization_types);
            setResponse({
                data: resp.data.specialization_types,
                loading: false,
                error: null,
            });
        })
        .catch((err) => {
            console.log(`Fetch failed with error ${err.message}`);
            setResponse({
                data: null,
                loading: false,
                error: err,
            });
        });
}