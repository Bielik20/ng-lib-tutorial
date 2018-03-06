# NgLibTutorial

This project is inspired by [packagr tutorial](https://github.com/dherges/ng-packaged) and [angular-cli-lib-example](https://github.com/jasonaden/angular-cli-lib-example).

Through a lot of reverse engineering I have managed to extract essential things require to make it work.
In "Making library" section I have described set of steps (usually modifications to files)
that need to take place in order for project to work.
When creating you own library change `ng-test-lib` to whatever your library name is.


## Setting npm (optional)
Set npm default info about author:
```
npm set init.author.name "Damian Bielecki"
npm set init.author.email "bielik20@gmail.com"
npm set init.author.url ""
npm set init.license "MIT"
```


## Create Library
Create directory `ng-test-lib` and `package.json` file in it.

### `ng-test-lib/package.json`
Example `package.json`:
```json
{
  "name": "ng-test-lib",
  "description": "Demo package to learn how to create angular npm modules",
  "version": "1.0.0",
  "author": "Damian Bielecki",
  "license": "MIT",
  "keywords": [
    "angular"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/Bielik20/ng-lib-tutorial.git"
  },
  "homepage": "https://github.com/Bielik20/ng-lib-tutorial",
  "bugs": {
    "url": "https://github.com/Bielik20/ng-lib-tutorial/issues"
  },
  "peerDependencies": {
    "@angular/core": "^5.0.0",
    "@angular/common": "^5.0.0"
  },
  "ngPackage": {
    "$schema": "./node_modules/ng-packagr/ng-package.schema.json",
    "dest": "../dist/ng-test-lib",
    "lib": {
      "entryFile": "public_api.ts"
    }
  }
}
```
- `peerDependencies` are the dependencies that you expect consumer of your library to have.
- `ngPackage` is for `ng-packagr`
- Rest is standard npm stuff... repository, description, keywords etc.

### `ng-test-lib/src`
Here goes your library... modules, components, etc.

### `public_api.ts`
Export everything here you want to export as library.

### `index.ts`
To be able to use it in demo application.
```ts
export * from './public_api';
```


## Referencing library in demo application
Run `npm install ng-packagr -save-dev`

### `.angular-cli.json`
Sets build root of application to be distinct from library.
```json
"apps": [
  {
    "outDir": "dist/app",
  }
]
 ```

### `package.json`
Adds a script to build library. To execute run `npm run build:lib`
```json
"scripts": {
  "build:lib": "ng-packagr -p ng-test-lib/package.json",
},
```

### `tsconfig.json`
- Adds path to the library.
- **Left Side** is a name/alias to be used in the application to import library, it should be of the same name as given library in section "In ng-test-lib folder".
- **Right Side** is a path to that library.

```json
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "ng-test-lib": [ "ng-test-lib" ]
  }
},
```

### `src/tsconfig.app.json` and `src/tsconfig.spec.json`
Remove `baseUrl` from `compilerOptions` in those files.


# Publishing
To build and publish solution:
```
npm run build:lib
npm publish dist/ng-test-lib
```

If your attempt was only to study consider removing it from npm registry with this command:
```
npm -f unpublish dist/ng-test-lib
```
**Note it can only be done within 24h!**
