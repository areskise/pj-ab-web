import axios from 'axios';
import Cookies from 'universal-cookie';

const axiosClient = axios.create({
	baseURL: 'http://118.69.111.40:8001/api/v1',
	headers: {
		'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
	},
	withCredentials: true,
});

// axiosClient.interceptors.request.use(async (config) => {
// 	// Handle token here ...
// 	const cookies = new Cookies();
// 	const token = cookies.get('token');
// 	if (token) {
// 		config.headers['Authorization'] = 'Bearer ' + token;
// 	}
// 	return config;
// });

// Add a request interceptor
axiosClient.interceptors.request.use(
	function (config) {
    // Do something before request is sent
    	return config;
  	}, 
	function (error) {
    // Do something with request error
    	return Promise.reject(error);
  	});

// Add a response interceptor
axiosClient.interceptors.response.use(
	function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
		if (response && response.data) {
			return response.data;
		}
    	return response;
  	}, 
	function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    	return Promise.reject(error);
  	}
);

export default axiosClient;