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
import { explode } from "explode-env";

// Works with ${USER} and $USER
const expanded = explode("Hello, $USER!", { USER: "world" });
console.log(expanded); // Hello, world!
```

### explodeEnv

Alias for `explode` with `process.env` as the second argument.

```ts
import { explodeEnv } from "explode-env";

const expanded = explodeEnv("Hello, $USER!");
console.log(expanded); // Hello, <your username>!
```

### Options

You can pass an options object as the third argument to `explode` and second argument to `explodeEnv`.

#### ignoreUnsetVars

If `true`, variables that are not set in the mapping will not be expanded.

```ts
import { explode } from "explode-env";

const expanded = explode(
  "Hello, $USER!, and $OTHERS!",
  { OTHERS: "User X, User Y" },
  {
    ignoreUnsetVars: true,
  }
);

console.log(expanded); // Hello, $USER!, and User X, User Y!
```

#### ignoreDefaultExpansion

If `true`, default expansion in the form of `${var:-default}` or `${var:=default}` will not be expanded.

> Note: This will NOT work with $var:-default or $var:=default.
> For reference: <https://pubs.opengroup.org/onlinepubs/009695399/utilities/xcu_chap02.html#tag_02_06_02>

```ts
import { explode } from "explode-env";

const expanded = explode(
  "Hello, ${WORLD:=World}! Welcome ${WORLD}!"
  {},
  {
    ignoreDefaultExpansion: false,
  }
);

console.log(expanded); // Hello, World! Welcome World!
```

```ts
import { explode } from "explode-env";

const expanded = explode(
  "Hello, ${WORLD:=World}! Welcome ${WORLD}!"
  {},
  {
    ignoreDefaultExpansion: true,
  }
);

console.log(expanded); // Hello, ! Welcome !
```

## Running tests

```sh
npm test
```

## Publishing a new version

```sh
npm version <major|minor|patch>
git push --tags
```

Then, GitHub Actions will take care of the rest.

## License

[MIT](LICENSE)
