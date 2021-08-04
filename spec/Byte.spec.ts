// Project: @henningkerstan/byte
// File: Byte.spec.ts
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

// specification/tests for the Byte class
import { Byte } from '../src/Byte'

describe('A Byte', () => {
  it('shall satisfy the invariant "(Byte.fromUInt8LSB(i)).readUIntLSB() == i" for all 0 <= i <=255', () => {
    for (let i = 0; i <= 255; i++) {
      const byte = Byte.fromUInt8LSB(i)
      expect(byte.readUIntLSB()).toBe(i)
    }
  })

  it('shall satisfy "byte.writeUIntLSB(i) => byte.readUIntLSB() == i" for all 0 <= i <= 255', () => {
    const byte = Byte.allZero()
    for (let i = 0; i <= 255; i++) {
      byte.writeUIntLSB(i)
      expect(byte.readUIntLSB()).toBe(i)
    }
  })

  it("shall satisfy byte.toStringLSB() == byte.toStringMSB().split('').reverse().join('')", () => {
    const byte = Byte.allZero()
    for (let i = 0; i <= 255; i++) {
      byte.writeUIntLSB(i)
      expect(byte.toStringLSB()).toBe(
        byte.toStringMSB().split('').reverse().join(''),
      )
    }
  })

  it('shall satisfy some sanity checks', () => {
    const byte = Byte.fromUInt8LSB(123)
    // in LSB: 11011110
    // in MSB: 01111011

    expect(byte.toStringLSB()).toBe('11011110')

    // TODO: add more tests here
    // expect(byte.readUIntLSB(0,3)).toBe(11)
  })
})
