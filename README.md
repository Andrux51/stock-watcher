## MEANjs Stack Starter Kit

##### Steps to Get Started

1. Have npm installed globally on your machine (comes with node.js download)
2. Run `npm install` from command line to install node.js dependencies
3. Have bower and grunt installed globally on your machine (`npm install -g bower grunt-cli`)
4. Run `bower install` from command line to install bower dependencies
5. Run `grunt` from command line (default grunt task)
6. For unit testing the client: have Karma installed globally on your machine (`npm install -g karma-cli`)
7. Run `grunt watch` from command line to watch for changes to client_src files and unit tests
8. Run `npm start` from command line to kick off the node.js server (or `node server.js`)
9. __Open your browser and enjoy!__

* Make sure `grunt watch` is always running or you may find that your view doesn't update like you expect!


##### Change the project to be your own!

* In the `public/index.html` file, change instances of `meanjs` or `meanjsApp` to the app name of your choice
* In the `client_src/` folder, find files named `meanjs` and variables within and change to the app name of your choice
* In the `Gruntfile.js` file, change the `meta.sysName` property to the app name that matches your file naming pattern