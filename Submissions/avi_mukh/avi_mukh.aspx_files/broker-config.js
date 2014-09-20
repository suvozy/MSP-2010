/*
Copyright (c) 2009, comScore Inc. All rights reserved.
version: 4.5.3
*/

COMSCORE.SiteRecruit.Broker.config = {
	version: "4.5.3",
		testMode: false,
	// cookie settings
	cookie:{
		name: 'spresearch',
		path: '/',
		domain:  'student-partners.com' ,
		duration: 90,
		rapidDuration: 0,
		expireDate: ''
	},

	eddListenerUrl: '',
	
	// optional prefix for pagemapping's pageconfig file
	prefixUrl: "",

		mapping:[
	// m=regex match, c=page config file (prefixed with configUrl), f=frequency
	{m: '//[\\w\\.-]+/', c: 'inv_c_Student-Partners.js', f: 0.5, p: 0 	}
]
};
COMSCORE.SiteRecruit.Broker.run();