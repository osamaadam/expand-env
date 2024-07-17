# explode-env

This is a simple utility to expand environment variables in a string, heavily inspired by Golang's [os.Expand](https://pkg.go.dev/os#Expand).

Regex free, and no dependencies. If you need to expand environment variables in a string, this is the tool for you.

## Installation

```sh
npm install explode-env
```

## Usage

### explode

```ts
import { explode } from 'explode-env';

// Works with ${USER} and $USER
const expanded = explode('Hello, $USER!', { USER: 'world' });
console.log(expanded); // Hello, world!
```

### explodeEnv

Alias for `explode` with `process.env` as the second argument.

```ts
import { explodeEnv } from 'explode-env';

const expanded = explodeEnv('Hello, $USER!');
console.log(expanded); // Hello, <your username>!
```

## Running tests

```sh
npm test
```

## License

[MIT](LICENSE)
