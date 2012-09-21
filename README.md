# Simple Node Website

This repository contains the source code for a basic website that shows off [Express][Express], [Jade][Jade], [Mongoose][Mongoose] with a [MongoDB][MongoDB] backend on [MongoLab][MongoLab].  It also shows off [Bootstrap][Bootstrap], [jQuery][jQuery], and [Datatables][Datatables] as well. This is a work in process at the moment but it can provide a good basic start for someone just starting out.  Use 'Test' as the user and password.


## Tools that I used to develop this code

### Editors

[SublimeText2][SublimeText2] - I have been using this editor for about 6 months now and it grows on you but lately I have been using the new version of Textmate on the Mac because I like the syntax highlighting and especially how it renders this markdown I'm currently working on.  :)

[TextMate2][TextMate2] - I orignally paid for this for the bundles but now the latest source has been put out on github.  Make sure you install the jade bundle.

[Cloud9][Cloud9] - I have played around with this as a chrome app and out in the cloud and it's pretty nice since it has integration with azure, github, and bitbucket but I'm still partial to the two editors above.

[WebMatrix2][WebMatrix2] - This is an excellent editor to use if you've been using Visual Studio for a while.  It has some nice express/jade templates and it's syntax highlighting is very nice.  Microsoft is definitely investing in Node and this is one area that you can see it.


### Debugging / Rapid Development

[Node-Inspector][Node-Inspector] - This is a requirement whenever I build a new machine that I'll be doing Node development on.  I basically start my node app using nodemon --debug app.js, start node-inspector and then browse to http://0.0.0.0:8080/debug?port=5858 and I'm debugging into my Node code.  Combining this with the Chrome development tools and you can really debug code quickly.  It's nice just looking at javascript everywhere.  No context switching between languages(as you would do in every other situation)

[Nodemon][Nodemon] - This tool basically monitors the directory(and subdirectories) for file changes and re-launches the node server so you aren't constantly going back and forth between the editor and command line(stopping and starting node).  This is also on that list of required items I install on new Node development machines 


### Testing

[Mocha][Mocha] - I have played around with this framework and it works pretty well but I am far from being an expert.  This is on my list of items to spend more time on.

[Browserling][Browserling] - This is a node friendly company that provides you with the ability to test your website with multiple browsers and versions.  I've been lucky to direct my users to use Safari or Chrome but I could see where this could be very useful.


### Cloud deployments

[Nodejitsu][Nodejitsu] - This is a node cloud solution that provides the most simple way to deploy your node website.  Just install the npm module(npm -g install jitsu) and cd to your applications directory and type 'jitsu deploy'.

[Azure][Azure] - Part of Microsoft's Azure solution includes hosting node websites.  To use their deployment tool, go into the azure portal and create a website and turn on the git repository.  The next step is to add the git remote to my local git project and deploy it via 'git push azure master'.  This copies your master branch into the azure git repository and then deploys the code including the required npm modules in your package.json to the azure website you created.


### Windows deployments

[iisnode][iisnode] - I haven't had time to play around iisnode but it seems to be the recommended way of hosting node in Windows.  I need to spend a little more time understanding iisnode.

[nssm][nssm] - This is a writeup on how to run node as a service in windows.  The only gotcha here would be if your node service crashed.  I don't know if it can auto-restart.


### Ubuntu deployments

[Upstart and Monit][Upstart and Monit] - This is how I have all my personal node websites deployed.  Once setup, The only thing needed to deploy code changes is 'stop nodesite', 'git pull' and 'start nodesite'.  Monit can actually monitor the state of the wesbsite and restart the website if it sees that its down.

### Mongo Tools

[MongoVue][MongoVue] - This is the best tool I've used for MongoDB.  It allows you to drop and create collections, databases, and documents as well as run queries and view indexes.  It is a requirement for me for doing MongoDB stuff.


### Node references

[NodeUp][NodeUp] - Weekly podcast of the goings on in the Node.js world

Twitter Peeps to follow: Node in general - @izs, @substack, @mikeal,  Express / Jade - @tjholowaychuk,  Mongoose - @aaronheckmann

Recommended Books: The Node Beginner Book - http://www.nodebeginner.org,  Hands On Node by Pedro Teixera,  Node In Action by Mike Cantelon, TJ Holowaychuk and Nathan Rajlich

[NodeTuts][NodeTuts] - Nice node videos.  A little dated but still useful.

[NPM Search][NPM Search] - Search for npm modules.

### Gotchas

The package.json file - This file contains all npm module and node engine version information.  It is very important to lock down the versions you are using and not use "latest".  I have done this in my current example(which is not good) but changes occur daily on npm modules and you don't want to QA with one set of modules and accidentally deploy with another set of modules.  Definitely set the version information before QAing.



[Express]: http://expressjs.com/
[Jade]:	http://jade-lang.com/
[Mongoose]:	http://mongoosejs.com/
[MongoDB]: http://www.mongodb.org/
[MongoLab]: http://www.mongolab.com/
[Bootstrap]: http://twitter.github.com/bootstrap/
[jQuery]: http://jquery.com/
[Datatables]: http://datatables.net/

[SublimeText2]: http://www.sublimetext.com/2
[TextMate2]: https://github.com/textmate/textmate
[Cloud9]: https://c9.io/
[WebMatrix2]: http://www.microsoft.com/web/webmatrix/

[Node-Inspector]: https://github.com/dannycoates/node-inspector
[Nodemon]: https://github.com/remy/nodemon

[Mocha]: http://visionmedia.github.com/mocha/
[Browserling]: https://browserling.com/

[Nodejitsu]: http://nodejitsu.com/
[Azure]: https://www.windowsazure.com/en-us/develop/nodejs/

[iisnode]: https://github.com/tjanczuk/iisnode
[nssm]: http://blog.tatham.oddie.com.au/2011/03/16/node-js-on-windows/

[Upstart and Monit]: http://howtonode.org/deploying-node-upstart-monit

[MongoVue]: http://www.mongovue.com/

[NodeUp]: http://nodeup.com
[NodeTuts]: http://nodetuts.com/
[NPM Search]: https://npmjs.org/