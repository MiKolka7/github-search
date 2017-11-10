export default {
    repositories: {
        searchResult: {
        	totalCount: 0,
        	list: []
		},
		searchParams: {
        	page: 1,
			sort: ''
		},
		isFetching: false
	},
    user: {
        authData: {}
	},
    app: {
    	network: {
    		online: true
		}
	}
};
