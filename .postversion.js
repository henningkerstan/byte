// Project: @henningkerstan/byte
// File: .postversion.js 
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
const { exec, execSync } = require("child_process")
const { exit } = require('process')


// determine current branch
let branch = execSync('git branch --show-current').toString()
branch = branch.replace(/(\r\n|\n|\r)/gm,'')


// check that we are indeed running from main branch
if (branch !== 'main'){
  console.log('Postversion must be run from main branch')
  exit(-1)
}

console.log('Pushing main to origin/main')
execSync('git push')

console.log('Pushing tags to origin')
execSync('git push --tags')

let nextBranch = 'after-'
nextBranch += packageJson.version
console.log('Creating new branch "' + nextBranch + '"')
execSync('git checkout -b ' + nextBranch)
execSync('git push --set-upstream origin ' + nextBranch)

console.log('All done - consider (re)linking with "npm link"')
