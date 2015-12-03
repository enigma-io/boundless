# UINotification
__Trigger native toasts in supporting browsers.__

When this module is loaded, the user will be automatically asked to enable desktop notifications. If they decline, then the `onDismiss` callback will be immediately called on every usage.

Support for this feature is [not universal](http://caniuse.com/#feat=notifications) (as of July 2015.)

---

### Example Usage

```js
import {UINotification} from 'enigma-uikit';

// ...

render() {
    return (
        <UINotification header='My Dialog'
                        body='Testing 123'
                        icon='foo.jpg'
                        onClick={handleClick}
                        onDismiss={handleDismiss} />
    );
}
```
> ___This is a virtual component and does not render HTML.___

---

### Expected Interactions

When the virtual component is unmounted, if the notification is still visible, it will be programmatically dismissed.

---

### Available `props`

- __body__ `String`
  up to two lines are displayed in the notification (based on the current browser implementations)

- __expiry__ `Number`
  automatically dismiss the notification after this many milliseconds if the user has not already

- __header__ `String`
  the bolded title displayed at the top of the notification

- __onClick__ `Function`
  add arbitrary functionality when the notification is clicked

- __onDismiss__ `Function`
  called after a notification is closed in some way (usually a click, manual or programmatic close); implement this to update the data-backing and unmount the virtual component
