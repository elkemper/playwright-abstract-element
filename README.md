# Playwright Abstract Element

An abstract base class for creating structured and reusable page elements in Playwright tests using TypeScript.

## Overview

`playwright-abstract-element` provides an `AbstractElement` class that simplifies the creation of page objects and element models for Playwright testing.  
It allows you to build hierarchical representations of your web application's UI components, promoting code reuse and maintainability.

## Features

- **Reusable Elements**: Create reusable element classes for common UI components.
- **Hierarchical Structure**: Build a hierarchy of elements to mirror the structure of your application.
- **TypeScript Support**: Fully typed with TypeScript for enhanced code safety and IntelliSense.
- **Simplified Assertions**: Integrates with Playwright's `expect` API for easy assertions.

## Installation

Install via Git Repository.  
Currently, the package is available via Git. You can install it directly from the repository.



```bash
yarn add git+ssh://git@github.com:elkemper/playwright-abstract-element.git
# or using npm
npm install git+ssh://git@github.com:elkemper/playwright-abstract-element.git

```
### Using playwright-abstract-element
The playwright-abstract-element package allows you to create reusable and hierarchical representations of page elements. Here's how to use it:

#### Import the AbstractElement

```typescript
import AbstractElement from 'playwright-abstract-element';
```
#### Create Page Elements

```typescript
export default class LabeledButton extends AbstractElement {
  protected override readonly selector: Selector;
  constructor(label: string, parent?: AbstractElement) {
    super(parent);
    this.selector = { selector: 'button', options: { hasText: label } };
  }
}
```
#### Interact with Elements in Tests

```typescript
const okButton = new LabeledButton('Ok');
await okButton.expect.toBeVisible();
await okButton.click();
```

#### Assertions
Use the expect property to perform assertions directly on your custom elements.

```typescript
await searchInput.expect.toBeVisible();
await searchInput.expect.toHaveAttribute('placeholder', 'Search...');
```
### API Reference
#### AbstractElement Class
##### Constructor
```typescript
constructor(parent?: AbstractElement)
```
* **parent**: Optional parent AbstractElement instance for hierarchical elements.  
  
##### Properties
* **selector**: The selector used to locate the element. **Must be overridden** in subclasses.
##### Methods 
 - **element()**: Retrieves the Playwright Locator for the element.
 - **find(selector: Selector)**: Finds a child element based on the provided selector.
 - **click(options?)**: Clicks the element.
 - **type(text: string)**: Types the provided text into the element.
 - **fill(text: string)**: Fills the element with the provided text.
 - **press(key: string)**: Presses a key on the element.
 - **expect**: Provides access to Playwright's assertion methods for the element.
#### Selector Type
##### A Selector can be:

- A string representing a CSS or XPath selector.
- An object with:
  *  selector: The selector string.
  * options: Optional LocatorOptions such as hasText or hasNotText.
##### LocatorOptions Type
Options for refining the locator:

* hasText: Filter elements that have the specified text.
* hasNotText: Filter elements that do not have the specified text.
#### Integration with Playwright
Ensure that your tests are set up to use Playwright and that @playwright/test is installed as a dependency.

## Contributing
Contributions are welcome! Please open issues and submit pull requests for new features or bug fixes.

## License
This project is licensed under the MIT License.

## Support
If you encounter any issues or have questions, please open an issue on the GitHub repository.