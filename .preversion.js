// Project: @henningkerstan/byte
// File: .preversion.js 
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

const { execSync } = require("child_process");
const { exit } = require('process');

console.log('Executing preversion tests.')

// determine current branch
let branch = execSync('git branch --show-current').toString()
branch = branch.replace(/(\r\n|\n|\r)/gm,'');
console.log('On git branch "' + branch + '"')

// check that we are not running from main branch
if (branch === 'main'){
  console.log('Cannot run from main branch')
  exit(-1)
}

// check that branch is clean 
console.log('Checking that branch is clean')
const gitStatus = execSync('git status --porcelain')
if(gitStatus.toString() !== ""){
  console.log('There are uncommitted changes in the current branch; please commit any changes prior to executing this script. Changes identified: ')
  console.log(gitStatus.toString())
  exit(-2)
}

// push to origin
console.log('Pushing to origin')
execSync('git push')

// merge main into current branch
console.log('Checking that merging from main does not lead to unclean branch')
execSync('git merge main --no-commit')
const mergeStatus = execSync('git status --porcelain')
if(mergeStatus.toString() !== ""){
  console.log('Merging from main has lead to changes; Changes identified: ')
  console.log(mergeStatus.toString())
  exit(-2)
}

// run linter
console.log('Running linter/static code analysis')
execSync('npm run lint')

// run test
console.log('Running test scripts')
execSync('npm run test')

// run build
console.log('Checking modules can be built')
execSync('npm run build')

// check that the previous commands did not lead to changes
console.log('Checking that previous steps did not lead to unclean branch')
const newGitStatus = execSync('git status --porcelain')
if(newGitStatus.toString() !== ""){
  console.log('The previous steps lead to uncommitted changes in the current branch; please commit these changes prior to executing this script again. Changes identified: ')
  console.log(newGitStatus.toString())
  exit(-3)
}

// run documentation
console.log('Checking documentation can be built')
execSync('npm run doc')
