import { BrowserType, ConnectOptions, chromium } from 'playwright';
import { BrowserContext, Browser } from 'playwright-core';

declare global {
  var _playwrightInstance: {
    _connection: {
      _objects: Map<string, BrowserContext | Browser | BrowserType | ConnectOptions>;
    };
    chromium: BrowserType<{}>;
    firefox: BrowserType<{}>;
  };
}

const getBrowserContext = () => Array.from(global._playwrightInstance._connection._objects).find(v => v[0].includes('browser-context'));

async function getContext(): Promise<BrowserContext> {
  if (!getBrowserContext()) {
    const preBrowser = await chromium.launch();
    const context = await preBrowser.newContext();
    return context;
  }
  return getBrowserContext()[1] as BrowserContext;
}
export { getContext };
