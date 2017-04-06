import { CLEAN } from './item.actions.js';

// disciplines: ['CrossFit', 'Crossfit Kids', 'Weightlifting', 'Gymnastics', 'Boxe', 'Judo', 'Salsa']

const defaultState = {
	menuEntries: [{
		name: 'users',
		entity: 'user',
	},{
		name: 'services',
		entity: 'service',
		children: [{
			name: 'CrossFit',
			entity: 'service',
			filters: { category: 'CrossFit' },
		},{
			name: 'CrossFit Kids',
			entity: 'service',
			filters: { category: 'CrossFit' },
		}],
	},{
		name: 'classes',
		entity: 'class',
		children: [{
			name: 'CrossFit',
			entity: 'class',
			filters: { service: 'CrossFit' },
		},{
			name: 'CrossFit Kids',
			entity: 'class',
			filters: { service: 'CrossFit' },
		}]
	},{
		name: 'articles',
		entity: 'article',
	},{
		name: 'events',
		entity: 'article',
		filters: { category: 'event' }
	}],
	configurationEntries: [{
		name: 'plans',
		entity: 'plan',
	},{
		name: 'settings',
		entity: 'setting',
	}],
	failure: null,
	entity: null,
	attributes: null,
};

const defaultEntryState = {
	name: null,
	entity: null,
	filters: [],
	icon: null,
};

const reducer = (previousState = defaultState, action) => {
	const state = _.cloneDeep(previousState);

	const { type, payload, key, value } = action;

	switch(type) {
		case CLEAN:
			return _.cloneDeep(defaultState);
		default:
			return previousState;
	}
};

export default reducer;