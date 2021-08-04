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

// class test for Byte class
import { Byte } from '../src/Byte'

describe('A Byte', () => {
  it('shall satisfy the invariant "(new Byte(i)).readUIntLSB() == i" for all 0 <= i <=255', () => {
    for (let i = 0; i <= 255; i++) {
      const byte = new Byte(i)
      expect(byte.readUIntLSB()).toBe(i)
    }
  })

  it('shall satisfy "byte.writeUIntLSB(i) => byte.readUIntLSB() == i" for all 0 <= i <= 255', () => {
    const byte = new Byte(0)
    for (let i = 0; i <= 255; i++) {
      byte.writeUIntLSB(i)
      expect(byte.readUIntLSB()).toBe(i)
    }
  })

  it('shall satisfy byte.', () => {
    const byte = new Byte(0)
    for (let i = 0; i <= 255; i++) {
      byte.writeUIntLSB(i)
      expect(byte.toBinaryStringLSB()).toBe(
        byte.toBinaryStringMSB().split('').reverse().join(''),
      )
    }
  })

  it('shall satisfy some sanity tests', () => {
    const byte = new Byte(123)
    // in LSB: 11011110
    // in MSB: 01111011

    expect(byte.toBinaryStringLSB()).toBe('11011110')

    // expect(byte.readUIntLSB(0,3)).toBe(11)
  })
})
