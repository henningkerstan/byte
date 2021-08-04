// Project: @henningkerstan/byte
// File: .version.js 
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


console.log('Executing tasks to bump new version')

// determine current branch
let branch = execSync('git branch --show-current').toString()
branch = branch.replace(/(\r\n|\n|\r)/gm,'');


// check that we are not running from main branch
if (branch === 'main'){
  console.log('Cannot run from main branch')
  exit(-1)
}

// add new package.json
console.log('Staging and stashing updated "package.json" file')
execSync('git add package.json')
execSync('git stash')


// checkout main
console.log('Checking out main branch')
execSync('git checkout main')


// merge into main but do not commit (will be done automatically by npm)
console.log('Merging into main branch')
execSync('git merge --no-ff --no-commit ' + branch)

console.log('Apply stashed "package.json"')
execSync('git stash apply')


// generate and commit documentation for the new version
console.log('Generating and staging documentation')
execSync('npm run doc')
execSync('git add -A docs/*')
