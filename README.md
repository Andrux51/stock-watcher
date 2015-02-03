## MEANjs Stack Starter Kit

#### Description

A project built to have a good starting place for new MEAN stack projects. 

The goal is for this kit to be ready to run out of the box with a file/folder structure that makes development easy while also making a clean, compact deployment.

#### Steps to Get Started
1. Clone this repo into a new folder
  - Run `git clone https://github.com/Andrux51/meanjs-starter <new-folder>` from command line
2. Have npm installed globally on your machine (comes with node.js download)
3. Have the following packages installed globally: _express, nodemon, mocha, bower, grunt, karma, phantomjs_
  - `npm install -g express nodemon mocha bower grunt-cli karma-cli phantomjs`
4. Run `npm install` from command line to install the project's node.js dependencies
5. Run `bower install` from command line to install bower dependencies
  - If you receive the `bower command not found` message, run `npm config set prefix /usr/local`
6. Run `grunt watch` from command line to watch for changes and process LESS files and unit tests
7. Run `npm start` from command line to kick off the node.js server and watch for file changes
8. Run `npm test` from command line to run server unit tests and watch for file changes
9. __Open your browser and enjoy!__

#### Change the project to be your own!
* Delete the .git folder inside the project, then run `git init` to start a new repo for your project
* In the `package.json` file, change the name, description, contributors, and repository fields to be unique
* In the `client_src/` folder, find files named `meanjs` and variables within and change to the app name of your choice
* In the `Gruntfile.js` file, change the `meta.sysName` property to the app name that matches your file naming pattern

#### Deploy the project to a build server
##### Client-side
- The default grunt task is configured to load all necessary client files into a /public folder
  - simply run `grunt` and then copy the /public folder onto your remote server
  - This will process LESS, minify css and js files, and use filerev to break caching
