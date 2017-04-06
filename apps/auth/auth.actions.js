import axios from 'axios';
import { browserHistory } from 'react-router';
// import { history } from '../user/store/history.js';
import { push } from 'react-router-redux';
import { notifySuccess, notifyWarning, notifyFailure } from '../notification/notification.actions.js'

export const LOADING = 'LOADING';
export const SUCCESS = 'FAILURE';
export const FAILURE = 'FAILURE';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const RECOVERING_PASSWORD_LOADING = 'LOADING_RECOVERING_PASSWORD';
export const RECOVERING_PASSWORD_SUCCESS = 'RECOVERING_PASSWORD_SUCCESS';
export const RECOVERING_PASSWORD_FAILURE = 'RECOVERING_PASSWORD_FAILURE';
export const RECOVERING_PASSWORD = 'RECOVERING_PASSWORD';

export const signIn = async ({ email, password }) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: LOADING,
				value: true,
			});

			let result = await axios.post('/api/auth/signIn', { email, password });

			dispatch(setToken({ token: result.data }));
		}
		catch(error) {
			dispatch(notifyFailure(error.response.data));
		}
		finally {
			dispatch({
				type: LOADING,
				value: false,
			});
		}
	};
};

export const setToken = async ({ token }) => {
    return async (dispatch) => {
        dispatch({ type: SIGN_IN, value: token });
        dispatch(push('/home'));
    };
};

export const signOut = () => {
	return (dispatch) => {
		dispatch({
			type: SIGN_OUT,
		});

		dispatch(push('/auth'));
	};
};

export const recoveringPassword = (value) => {
	return { type: 'RECOVERING_PASSWORD', value };
};

export const recoverPassword = async ({ email }) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: RECOVERING_PASSWORD_LOADING,
				value: true,
			});

			let result = await axios.post('/p/api/recoverPassword', { email });

			dispatch(notifySuccess(result.data));

		}
		catch(error) {
			dispatch(notifyFailure(error.response.data));
		}
		finally {
			dispatch({
				type: RECOVERING_PASSWORD_LOADING,
				value: false,
			});
		}
	};
};