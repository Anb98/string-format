# @anb98/string-format

A TypeScript utility for formatting strings according to a template pattern, with support for custom placeholders and template preservation.

## Installation

Using npm:

```bash
npm install @anb98/string-format
```

Using yarn:

```bash
yarn add @anb98/string-format
```

Using pnpm:

```bash
pnpm add @anb98/string-format
```

## Features

- Format strings using customizable templates
- Support for custom placeholder characters
- Option to preserve template characters
- TypeScript support with full type definitions
- Zero dependencies
- Lightweight and performant

## Usage

```typescript
import { formatString } from "@anb98/string-format";

// Basic usage
const result = formatString({
  template: "+x (xxx) xxx-xxxx",
  value: "17134719686",
});
console.log(result); // Output: '+1 (713) 471-9686'

// With custom placeholder
const customResult = formatString({
  template: "##-##-##",
  value: "123456",
  placeholder: "#",
});
console.log(customResult); // Output: '12-34-56'

// Preserving template format
const preservedResult = formatString({
  template: "+1 (xxx) xxx-xxxx",
  value: "+1 (713) 47",
  preserveTemplate: true,
});
console.log(preservedResult); // Output: '+1 (713) 47'
```

## API Reference

### `formatString(options: FormatOptions): string`

Formats a string according to a template pattern.

#### Options

```typescript
type FormatOptions = {
  template: string; // The template pattern
  value: string; // The value to format
  placeholder?: string; // Custom placeholder character (default: 'x')
  preserveTemplate?: boolean; // Whether to preserve template characters (default: false)
};
```

#### Parameters

- `template` (required): The template string containing placeholders to be replaced.
- `value` (required): The string value to insert into the template.
- `placeholder` (optional): The character to use as a placeholder. Defaults to 'x'.
- `preserveTemplate` (optional): Whether to preserve existing template characters in the value. Defaults to false.

## Common Use Cases

- Phone number formatting
- Social security numbers
- Credit card numbers
- Serial numbers
- Reference codes
- Any string that needs to follow a specific pattern

## TypeScript Support

The package includes TypeScript type definitions. You can import the types as follows:

```typescript
import type { FormatOptions } from "@anb98/string-format";
```

## License

ISC

## Support

If you find a bug or would like to request a feature, please create an issue in the GitHub repository.

## Changelog

### 1.0.0

- Initial release
- Basic string formatting functionality
- Custom placeholder support
- Template preservation option
- TypeScript support

### 1.1.0

- Added `removeNonDigits` property
