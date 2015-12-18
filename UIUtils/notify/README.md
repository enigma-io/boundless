# UIUtils/notify
__Trigger native toasts in supporting browsers.__

This module is not a React component, but a utility. The "close" functionality of web notifications was removed in a platform spec update, so it's no longer possible to have a true lifecycle.

> Support for web notifications is [not universal](http://caniuse.com/#feat=notifications) (as of July 2015.)

---

`notify` works by providing an object with the following properties:

- __body__ `String`
  up to two lines are displayed in the notification (based on the current browser implementations)

- __header__ `String`
  the bolded title displayed at the top of the notification

- __icon__ `HTMLString`
  (optional) the URL of a picture or icon to be displayed with the notification (looks best if square)

- __onClick__ `Function`
  (optional) add arbitrary functionality when the notification is clicked

This will return a `Promise`. Resolution means the notification was created correctly (returns the `Notification`, and rejection will return a relevant error description string.

---

### Example Usage

```js
import {notify} from 'enigma-uikit';

// ...

notify({
    header: 'Amalia Violet',
    body: 'Hello darling, just checking in on you...',
    icon: 'amalia-avatar.jpg',
    onClick: function() {/* open the corresponding message */},
}).catch(/* malformed notification, or web notifications not supported/disabled */);
```
