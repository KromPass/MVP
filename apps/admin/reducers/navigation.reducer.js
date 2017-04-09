import { CLEAN } from './item.actions.js';

// disciplines: ['CrossFit', 'Crossfit Kids', 'Weightlifting', 'Gymnastics', 'Boxe', 'Judo', 'Salsa']

const defaultState = {
	menuEntries: [{
		name: 'users',
		entity: 'user',
        icon: 'people'
	},{
		name: 'services',
		entity: 'service',
        icon: 'fitnessCenter',
		children: [{
			name: 'CrossFit',
			entity: 'service',
            icon: 'fitnessCenter',
			filters: { category: 'CrossFit' },
		},{
			name: 'CrossFit Kids',
			entity: 'service',
            icon: 'fitnessCenter',
			filters: { category: 'CrossFit' },
		}],
	},{
		name: 'classes',
		entity: 'class',
        icon: 'schedule',
		children: [{
			name: 'CrossFit',
			entity: 'class',
            icon: 'schedule',
			filters: { service: 'CrossFit' },
		},{
			name: 'CrossFit Kids',
			entity: 'class',
            icon: 'schedule',
			filters: { service: 'CrossFit' },
		}]
	},{
		name: 'articles',
		entity: 'article',
        icon: 'edit',
	},{
		name: 'events',
		entity: 'article',
        icon: 'event',
		filters: { category: 'event' }
	}],
	configurationEntries: [{
		name: 'plans',
		entity: 'plan',
        icon: 'tag',
	},{
		name: 'settings',
		entity: 'setting',
        icon: 'settings',
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