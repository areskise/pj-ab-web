import axios from 'axios';
import Cookies from 'universal-cookie';
import AuthAPI from './AuthAPI';

const cookies = new Cookies();
const access_token = cookies.get('access_token');

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
	async (config) => {
    // Do something before request is sent
	// Handle token here ...
	if (access_token) {
		config.headers['Authorization'] = 'Bearer ' + access_token.token;
	}
    	return config;
  	}, 
	  async (error) => {
    // Do something with request error
    	return Promise.reject(error);
  	});

// Add a response interceptor
axiosClient.interceptors.response.use(
	async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
		if (response && response.data) {
			if(response.data.ResponseResult.ErrorCode === 400 && response.data.ResponseResult.Message === 'jwt expired'){
				const data = {
					refreshToken: access_token.refreshToken
				}
				const res = await AuthAPI.refresh(data);
				
				console.log(res);
			};
			return response.data;
		}
    	return response;
  	}, 
	  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    	return Promise.reject(error);
  	}
);

export default axiosClient;