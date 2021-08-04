// Project: @henningkerstan/byte
// File: Byte.ts 
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

/**
 * A class implementing a representation of a byte (octet).
 */
export class Byte {
  /** The internal representation (LSB0 bit ordering).
   *
   *  Internally, this class uses bitshifts for getting/setting single bits. For this, JavaScript transforms the operands (numbers) to 32bit signed integers, applies the operation and then returns the obtained number.
   */
  private int8 = 0

  /**
   * Compute unsigned integer value with least significant bit first.
   * @param begin Bit offset to be interpreted as LSB.
   * @param size Size in bits; default is all remaining bits (8 - begin); must be >= 0 and satisfy (begin + size) <= 8.
   */
  public readUIntLSB(begin = 0, size: number = 8 - begin): number {
    if (begin + size > 8) {
      throw new Error('Out of bounds (begin + size exceeds 8)')
    }

    let val = 0
    for (let i = begin; i < begin + size; i++) {
      val += this.getBit(i) << (i - begin)
    }
    return val
  }

  /**
   * Set unsigned integer value with least significant bit first.
   * @param begin Bit offset to be interpreted as LSB.
   * @param size Bit offset to be interpreted as MSB.
   */
  public writeUIntLSB(
    value: number,
    begin = 0,
    size: number = 8 - begin,
  ): void {
    if (value < 0) {
      throw new Error('Value out of bounds (< 0)')
    }

    if (size > 8) {
      throw new Error('Size may not exceed 8 bits')
    }

    if (begin + size > 8) {
      throw new Error('Out of bounds (begin + size exceeds 8)')
    }

    // determine max size
    const max = (1 << size) - 1

    if (value > max) {
      throw new Error('Out of bounds (> ' + max + ')')
    }

    for (let i = begin; i < begin + size; i++) {
      const bit = (value & (1 << (i - begin))) === 0 ? 0 : 1
      this.setBit(i, bit)
    }
  }

  /**
   * Compute unsigned integer value with most significant bit first.
   * @param begin Bit offset to be interpreted as MSB.
   * @param end Bit offset to be interpreted as LSB.
   */
  public readUIntMSB(begin = 0, size: number = 8 - begin): number {
    if (begin + size > 8) {
      throw new Error('Out of bounds (begin + size exceeds 8)')
    }

    // compute big endian representation
    let val = 0
    for (let i = begin; i < begin + size; i++) {
      val += this.getBit(i) << (begin + size - i)
    }

    return val
  }

  /**
   * Construct a byte based on given numeric value.
   * @param val Initial value (number will be interpreted as LSB0); default is 0.
   */
  constructor(val = 0) {
    this.int8 = val
  }

  /**
   * Get the bit at the supplied offset.
   * @param offset The position (integer from 0 to 7).
   */
  getBit(offset: number): number {
    return (this.int8 & (1 << offset)) === 0 ? 0 : 1
  }

  /**
   * Set the bit at the supplied offset.
   * @param offset The position (integer from 0 to 7).
   * @param value Either 0 or 1, default value is 1.
   */
  setBit(offset: number, value = 1): void {
    switch (value) {
      case 1:
        this.int8 = this.int8 | (1 << offset)
        break

      case 0:
        this.clearBit(offset)
        break

      default:
        throw new Error('bit value must be 0 or 1')
    }
  }

  /**
   * Clears the bit at the given offset (i.e. sets it to 0).
   * @param offset Bit to clear (i.e. to set to 0).
   */
  clearBit(offset: number): void {
    this.int8 = this.int8 & ~(1 << offset)
  }

  toString(): string {
    let s = 'Byte {\n'
    s += '  binary: '
    for (let i = 1; i <= 8; i++) {
      s += this.getBit(i - 1).toString()
      if (i % 2 === 0) {
        s += ' '
      }
    }

    s += '\n'
    s += '  uIntLSB(): ' + this.readUIntLSB().toString()
    s += ' (0x' + this.readUIntLSB().toString(16).toUpperCase() + ')'
    s += ', '
    s += '  uIntMSB(): ' + this.readUIntMSB().toString()
    s += ' (0x' + this.readUIntMSB().toString(16).toUpperCase() + ')\n'
    s += '}'

    return s
  }

  toBinaryString(): string {
    let s = ''
    for (let i = 1; i <= 8; i++) {
      s += this.getBit(i - 1).toString()
      if (i % 2 === 0) {
        s += ' '
      }
    }

    return s
  }
}
