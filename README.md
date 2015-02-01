## MEANjs Stack Starter Kit

#### Steps to Get Started

1. Have npm installed globally on your machine (comes with node.js download)
2. Run `npm install` from command line to install node.js dependencies
3. Have bower and grunt installed globally on your machine (`npm install -g bower grunt-cli`)
4. Run `bower install` from command line to install bower dependencies
6. For unit testing the client: be sure to have Karma installed globally on your machine (`npm install -g karma-cli`)
7. Run `grunt watch` from command line to watch for changes and process LESS files and unit tests
8. Have nodemon installed globally on your machine (`npm install -g nodemon`)
9. Run `npm start` from command line to kick off the node.js server and watch for file changes
10. For unit testing the server: be sure to have Mocha installed globally on your machine (`npm install -g mocha`)
11. Run `npm test` from command line to run server unit tests and watch for file changes

* __Open your browser and enjoy!__


#### Change the project to be your own!

* In the `public/index.html` file, change instances of `meanjs` or `meanjsApp` to the app name of your choice
* In the `client_src/` folder, find files named `meanjs` and variables within and change to the app name of your choice
* In the `Gruntfile.js` file, change the `meta.sysName` property to the app name that matches your file naming pattern

#### Deploy the project to a build server

* `grunt deploy` is configured to load all necessary client files into a /public folder
** simply run this command and then copy the /public folder onto your remote server
