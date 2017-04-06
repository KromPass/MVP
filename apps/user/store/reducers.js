import config from '../../../config/config.js';

const configReducer = () => config;

export { configReducer as config };
export auth from '../../auth/auth.reducer.js';
export notification from '../../notification/notification.reducer.js';
export forms from '../../form/form.reducer.js';
export navigation from './navigation.reducer.js';

// const reducers = {
// 	config: () => config,
// 	auth: authReducer,
// 	forms: formReducer,
// 	notification: notificationReducer,
// 	navigation: navigationReducer,
// 	routing: routerReducer,
// };