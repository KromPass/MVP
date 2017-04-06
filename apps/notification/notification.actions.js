export const SUCCESS = 'NOTIFICATION_SUCCESS';
export const WARNING = 'NOTIFICATION_WARNING';
export const FAILURE = 'NOTIFICATION_FAILURE';
export const DENOTIFY = 'DENOTIFY';

export const notifySuccess = (value) => {
	return { type: SUCCESS, value };
};

export const notifyWarning = (value) => {
	return { type: WARNING, value };
};

export const notifyFailure = (value) => {
	return { type: FAILURE, value };
};

export const denotify = () => {
	return { type: DENOTIFY };
};