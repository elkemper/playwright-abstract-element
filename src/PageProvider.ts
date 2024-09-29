import { Page } from 'playwright';
import { getContext } from './ContextExtractor';

export class PlaywrightPageProvider {
  public static async getPage(): Promise<Page> {
    const context = await getContext();
    const pages = context.pages();
    if (pages.length === 0) {
      const page = context.newPage();
      return page;
    }
    return pages[0];
  }
}
