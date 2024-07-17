# expand-env

This is a simple utility to expand environment variables in a string, heavily inspired by Golang's [os.Expand](https://pkg.go.dev/os#Expand).

Regex free, and no dependencies. If you need to expand environment variables in a string, this is the tool for you.

## Installation

```sh
npm install expand-env
```

## Usage

### expand

```ts
import { expand } from 'expand-env';

// Works with ${USER} and $USER
const expanded = expand('Hello, $USER!', { USER: 'world' });
console.log(expanded); // Hello, world!
```

### expandEnv

Alias for `expand` with `process.env` as the second argument.

```ts
import { expandEnv } from 'expand-env';

const expanded = expandEnv('Hello, $USER!');
console.log(expanded); // Hello, <your username>!
```

## Running tests

```sh
npm test
```

## License

[MIT](LICENSE)
