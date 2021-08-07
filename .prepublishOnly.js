// Project: @henningkerstan/byte
// File: .prepublishOnly.js 
// 
// Copyright 2021 Henning Kerstan
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const packageJson = require('./package.json')
const { exec, execSync } = require("child_process");
const { exit } = require('process');
const fs = require('fs')


console.log('Preparing to publish')

// run linter
console.log('Running linter/static code analysis')
execSync('npm run lint')

// run test
console.log('Running test scripts')
execSync('npm run test')

// run build
console.log('Building library')
execSync('npm run build')

// generate and commit documentation for the new version
console.log('Generating and staging documentation for version ' + packageJson.version)
execSync('npm run doc')
fs.writeFileSync('docs/.nojekyll', '')
execSync('git add -A docs/*')
