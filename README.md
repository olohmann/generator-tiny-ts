# generator-tiny-ts [![Build Status](https://secure.travis-ci.org/olohmann/generator-tiny-ts.png?branch=master)](https://travis-ci.org/olohmann/generator-tiny-ts)

> A tiny [Yeoman](http://yeoman.io) generator for [TypeScript](http://www.typescriptlang.org/) client projects.

## Getting Started

### Features

The template generator creates a complete TypeScript project setup. Including a gulpfile that is able to maintain a standard `tsconfig.json` file for maxiumum editor compatibilty. There is no gulpfile TypeScript compiler magic involved! The gulp build task simply calls your installed TypeScript compiler which automatically picks up the setup in the tsconfig.json file.

### Installation

```bash
npm install -g tsd
npm install -g typescript@1.5.0-beta
npm install -g bower
npm install -g yo
npm install -g generator-tiny-ts
```

You need to install tsd, bower and typescript as globals since the tiny-ts generator toolchain relies on it.

### Scaffold an App
```bash
mkdir app
cd app
yo tiny-ts
```

### Gulp Tasks

The gulpfile has a built-in help page that lists all the tasks and provides a short description:

```bash
gulp help
```

### Getting To Know Yeoman

Read the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT © [Oliver Lohmann](http://www.oliver-lohmann.me/)
