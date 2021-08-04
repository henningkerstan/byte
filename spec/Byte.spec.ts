// Project: @henningkerstan/byte
// File: Byte.test.ts
//
// Copyright 2020 Henning Kerstan
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

// class test for Byte class
import { Byte } from '../src/Byte'

describe('A Byte', () => {
  it('shall satisfy the invariant (new Byte(i)).uIntLSB() == i', () => {
    for (let i = 0; i < 255; i++) {
      const byte = new Byte(i)
      expect(byte.readUIntLSB()).toBe(i)
    }
  })

  it('shall satisfy "byte.writeUIntLSB(i) => byte.readUIntLSB() == i"', () => {
    const byte = new Byte(0)
    for (let i = 0; i < 255; i++) {
      byte.writeUIntLSB(i)
      expect(byte.readUIntLSB()).toBe(i)
    }
  })

  it('shall ...', () => {
    //
  })

  // // let byte = new Byte(123)
  // // console.log(byte.toString())

  // // console.log('uIntLSB(0, 3) = ' + byte.readUIntLSB(0, 4)) // 11
  // // console.log('uIntLSB(1, 3) = ' + byte.readUIntLSB(1, 3)) // 5

  // // console.log('uIntMSB(0, 3) = ' + byte.uIntMSB(0, 4)) // 13
  // // console.log('uIntMSB(1, 3) = ' + byte.uIntMSB(1, 3)) // 5

  // // byte = new Byte(0)
  // // byte.writeUIntLSB(10, 1, 4)
  // // console.log(byte.toString())

  // for (let size = 0; size < 9; size++) {
  //   const max = (1 << size) - 1

  //   console.log('Testing size: ' + size + ' bits; range: 0-' + max)

  //   for (let begin = 0; begin + size < 9; begin++) {
  //     byte = new Byte(0)
  //     console.log('  Beginning at offset ' + begin)

  //     for (let val = 0; val <= max; val++) {
  //       byte.writeUIntLSB(val, begin, size)
  //       const readValue = byte.readUIntLSB(begin, size)
  //       let msg = '    Wrote value ' + val
  //       msg += '; read value ' + readValue
  //       msg += '; binary: ' + byte.toBinaryString()
  //       msg += val == readValue ? ' OK' : ' FAIL'
  //       console.log(msg)
  //     }
  //   }
  // }
  // })
})
