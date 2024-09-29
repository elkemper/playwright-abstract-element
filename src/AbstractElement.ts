/**
 * @license
 * Copyright (c) 2024 Vladislav Belous.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Locator } from 'playwright-core';
import { PlaywrightPageProvider } from './PageProvider';
import { expectElement } from './helpers/Assertions';

export type LocatorOptions = {
  hasNotText?: string | RegExp;
  hasText?: string | RegExp;
};

/**
 *  Selector for Abstract Element
 *  You can either specify just a string
 *  Or you can put an object that look like playwright internal selector that contains
 */
export type Selector = string | { selector: string; options?: LocatorOptions };

export default abstract class AbstractElement {
  protected abstract readonly selector: Selector;
  constructor(protected readonly parent?: AbstractElement) {}

  public async element(): Promise<Locator> {
    if (!this.selector) {
      throw new Error(`No selector specified for the element`);
    }
    if (this.parent) {
      return this.parent.find(this.selector);
    } else {
      if (typeof this.selector === 'string') {
        return (await PlaywrightPageProvider.getPage()).locator(this.selector);
      } else {
        return (await PlaywrightPageProvider.getPage()).locator(this.selector.selector, this.selector.options);
      }
    }
  }

  public async find(selector: Selector): Promise<Locator> {
    if (typeof selector === 'string') {
      return (await this.element()).locator(selector);
    } else {
      return (await this.element()).locator(selector.selector, selector.options);
    }
  }

  public async click(options?: Parameters<Locator['click']>[0]): Promise<void> {
    return (await this.element()).click(options);
  }

  public async press(key: string) {
    return (await this.element()).press(key);
  }

  public async type(text: string): Promise<void> {
    (await this.element()).focus();
    return (await PlaywrightPageProvider.getPage()).keyboard.type(text, { delay: 113 });
  }

  public async fill(text: string) {
    return (await this.element()).fill(text);
  }

  public get expect() {
    return expectElement(this);
  }
}
