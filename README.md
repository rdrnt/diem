# Fastis

A library for working with Dates & Timestamps. Powered by [date-fns](https://date-fns.org/). Created for Human Collective, but now maintained by [@rdrnt](https://github.com/rdrnt).

## How To Use

1. `yarn add fastis` in your project

2. If you plan on using Timestamps, you will need to initialize Fastis with your firebase instance in your project:

```js
import firebase from 'firebase/app';
import 'firebase/firestore';
import { initialize } from 'fastis';

firebase.initializeApp();

initialize(firebase);
```

This is required because Timestamps are server dependant on your project.

3. You're set! `import { format } from 'fastis';`
