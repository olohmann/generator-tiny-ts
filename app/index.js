'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var nameProcessor = require('../name-processor');
var generators = yeoman.generators;

module.exports = generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
        this.mkdirp = require('mkdirp');
    },

    constructor: function() {
        // arguments and options should be
        // defined in the constructor.
        generators.Base.apply(this, arguments);
        this.argument('appName', { type: String, required: false });
        this.argument('wwwRoot', { type: String, required: false });
    },

    welcome: function() {
        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the stunning '
                + chalk.red('tiny ts') +
                ' generator!'
            ));
    },

    prompting: function () {

        var done = this.async();

        var prompts = [{
            type: 'input',
            name: 'appName',
            message: 'What would you like to name the app?',
            default: this.appName || path.basename(process.cwd())
        },
        {
            type: 'input',
            name: 'wwwRoot',
            message: 'Which folder is the static content root of your app?',
            default: this.wwwRoot || 'wwwroot'
        }];

        this.prompt(prompts, function (answers) {
            this.appName = answers.appName || 'tiny-ts-app';
            this.wwwRoot = answers.wwwRoot || 'wwwroot';
            done();
        }.bind(this));
    },

    displayName: function() {
        this.log('Creating ' + this.appName + ' app based on tiny-ts.');
    },

    writing: {
        folders: function() {
            this.mkdirp('.settings');
            this.mkdirp(this.wwwRoot);
            this.mkdirp(this.wwwRoot + '/app');
            this.mkdirp(this.wwwRoot + '/styles');
            this.mkdirp(this.wwwRoot + '/typings');
            this.mkdirp(this.wwwRoot + '/vendor');
        },

        files: function () {
            var that = this;

            var ctx = {
                appName: nameProcessor.getCamelizedName(that.appName),
                appModuleName: nameProcessor.getModuleName(that.appName),
                appNameSlugified: nameProcessor.getSlugifiedName(that.appName),
                wwwRoot: that.wwwRoot
            };

            var copyCmds = [
                ['editorconfig','.editorconfig'],
                ['_tsconfig.json','tsconfig.json'],
                ['_tslint.json','tslint.json'],
                ['_README.md','README.md'],
                ['_package.json','package.json'],
                ['_bower.json','bower.json'],
                ['_tsd.json','tsd.json'],
                ['_gulpfile.js','gulpfile.js'],
                ['_gulp.config.js','gulp.config.js'],
                ['_.bowerrc','.bowerrc'],

                // VS Code Settings
                ['.settings/tasks.json.tmpl','./.settings/tasks.json'],
                ['wwwroot/_index.html', that.wwwRoot + '/index.html'],
                ['wwwroot/app/_app.ts.tmpl', that.wwwRoot + '/app/app.ts'],
                ['wwwroot/typings/_tsd.d.ts.tmpl', that.wwwRoot + '/typings/tsd.d.ts'],
                ['wwwroot/styles/_styles.css', that.wwwRoot + '/styles/styles.css']
            ];

            copyCmds.forEach(function(pair) {
                that.fs.copyTpl(
                    that.templatePath(pair[0]),
                    that.destinationPath(pair[1]),
                    ctx
                );
            });
        }
    },

    install: function() {
        var that = this;
        that.installDependencies(function() {
            that.log('Running ' + chalk.yellow.bold('tsd reinstall && tsd rebundle') +
                '. If this fails run the commands ' +
                'yourself. tsd must be installed via `npm install -g tsd@next`.');

            var tsdReinstall = that.spawnCommand('tsd', ['reinstall']);
            tsdReinstall.on('close', function(code) {
                var tsdRebundle = that.spawnCommand('tsd', ['rebundle']);
                tsdRebundle.on('close', function() {
                    that.log('Running gulp tsbuild...');
                    that.spawnCommand('gulp', ['tsbuild']);
                });
            });
        });
    }
});
