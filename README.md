# byte
A TypeScript implementation of a byte (octet) allowing easy bit manipulation. I 
developed this mainly for use in my EnOcean-Core library and associated files.

## 1. Description 
This library provides a simple implementation of a byte (aka octet) in a TypeScript class.

## 2. Installation
This library is available as a Node.js-module. You can thus use Node.js' package manager `npm` to install the latest production version from the [npm registry](https://npmjs.com) by executing

    npm install @henningkerstan/byte

in your Node.js project's repository. This library does not require/install any dependencies.

## 3. Usage
Since this library is written in TypeScript, you can use it both with TypeScript as well as with plain JavaScript. Below you can find short examples to get you started in both languages. 

The library also comes with an online [documentation](docs/index.html). A good starting point for further reading is the documentation of the Byte class. Moreover, as this documentation is generated from source code comments using [TypeDoc](https://typedoc.org), a supported editor (like [Visual Studio Code](https://code.visualstudio.com/)) can provide on-the-fly information on functions, parameters, etc..

### 3.1 Importing the module
To use any of the functionality we need to import the module. 
```typescript
import * as EnOcean from "enocean-core"
```

### 3.2 Working with bytes


## 5. License
Copyright 2021 [Henning Kerstan](https://henningkerstan.de)

Licensed under the Apache License, Version 2.0 (the "License"); 
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
