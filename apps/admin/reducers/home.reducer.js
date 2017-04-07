const homeState = {
};

const homeReducer = (previousState = homeState, action) => {
	const state = _.cloneDeep(previousState);

	let type = action.type;
	let payload = action.payload;

	switch(type) {
		default:
			return previousState;
			break;
	}
};

export default homeReducer;