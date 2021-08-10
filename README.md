# byte
A TypeScript implementation of a byte (octet) allowing easy bit manipulations. 

## 1. Description 
This library provides a simple implementation of a byte (aka octet) in a TypeScript class. I developed this "library" (which consists of merely one TypeScript class) for two purposes:
- for use in my EnOcean-Core library and associated files, and
- to understand, test and (hopefully) streamline my development process for more complex projects. 

Hence: Feel free to use it, if it helps, but do not expect rocket science. :)


## 2. Installation
This library is available as a Node.js-module. You can thus use Node.js' package manager `npm` to install the latest production version from the [npm registry](https://npmjs.com) by executing

    npm i @henningkerstan/byte

in your Node.js project's repository. This library does not require/install any dependencies.


## 3. Usage
Since this library is written in TypeScript, you can use it both with TypeScript as well as with plain JavaScript. Below you can find short examples to get you started in both languages. 

The library also comes with an online [documentation](https://henningkerstan.github.io/byte/). A good starting point for further reading is the documentation of the [Byte](https://henningkerstan.github.io/byte/classes/Byte.html) class. Moreover, as this documentation is generated from source code comments using [TypeDoc](https://typedoc.org), a supported editor (like [Visual Studio Code](https://code.visualstudio.com/)) can provide on-the-fly information on functions, parameters, etc..

### 3.1 Importing the module
To use any of the functionality we need to import the module. 
```typescript
import { Byte } from "@henningkerstan/byte"
```

### 3.2 Examples
Here are some toy examples - you can also have a look at the [Jasmine spec (aka test script)](https://github.com/henningkerstan/byte/blob/main/spec/Byte.spec.ts) for more examples.
```typescript
const byte1 = Byte.allZero()
byte1.setBit(1, 3)
console.log(byte1.toStringLSB())

const byte2 = Byte.fromUInt8LSB(123)
console.log(byte2.toStringLSB())
console.log(byte2.toStringMSB())
```

## 4. Contributing
Contact the main author ([Henning Kerstan](https://henningkerstan.de)) if you want to contribute. More details will be available here soon.

Note that this project uses [semantic versioning](https://semver.org/).


## 5. License
Copyright 2021 [Henning Kerstan](https://henningkerstan.de)
SPDX-License-Identifier: Apache-2.0