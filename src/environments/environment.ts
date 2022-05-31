// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://localhost:3000/api/v1',
  firebase: {
    projectId: 'data-base-38d79',
    appId: '1:384693318678:web:fd6659279ac7fa02c13137',
    databaseURL: 'https://data-base-38d79.firebaseio.com',
    storageBucket: 'data-base-38d79.appspot.com',
    locationId: 'southamerica-east1',
    apiKey: 'AIzaSyDr2oAwjytf8LMZMg6T9pJOxvKn0-RTXpc',
    authDomain: 'data-base-38d79.firebaseapp.com',
    messagingSenderId: '384693318678',
    measurementId: 'G-5SQZZKY2YR',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
