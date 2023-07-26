# @tokenomy/nodelib

Node modules collection for internal use. Please help to contribute if any methods would like to be here.

### Usage

```ts
import { encrypt } from "@tokenomy/nodelib/lib/crypto";
...

(async () => {
    try{
        const enc = await encrypt("secret", "hello world")
        console.log(enc)
    }catch(error) {
        console.error(error)
    }
})()
...
```

### Release

```bash
npm version <new-version>
```
