import { Locator, expect as playwrightExpect } from 'playwright/test';
import AbstractElement from '../AbstractElement';

type PWLocatorExpect = ReturnType<typeof playwrightExpect<Locator>>;

type AsyncExpect = {
  [K in keyof PWLocatorExpect]: PWLocatorExpect[K] extends (...args: infer A) => any ? (...args: A) => Promise<any> : never;
};

export function expectElement(element: AbstractElement): AsyncExpect {
  return new Proxy<AsyncExpect>({} as AsyncExpect, {
    get(target, prop: keyof PWLocatorExpect) {
      return async (...args: any[]) => {
        const locator = await element.element();
        const expectInstance = playwrightExpect(locator);
        const method = expectInstance[prop];
        if (typeof method === 'function') {
          return method.apply(expectInstance, args);
        } else {
          return method;
        }
      };
    },
  });
}
