import { push } from 'react-router-redux';

export const authorize = (group, deniedRedirect) => {
	return target => {
		target.prototype.componentWillMount = function () {
			const state = this.context.store.getState();
			const dispatch = this.context.store.dispatch;
			if(!state.auth.token) {
				dispatch(push(deniedRedirect));
			}
		};
		return target;
	};
};