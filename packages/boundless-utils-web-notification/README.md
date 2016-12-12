# Boundless Web Notification
__Trigger native toasts in supporting browsers.__

> Support for web notifications is [available in all major browsers](http://caniuse.com/#feat=notifications), except IE 11 and lower (November 2016).

This module is not a React component, but a utility. The "close" functionality of web notifications was removed in a platform spec update, so it's no longer possible to have a true lifecycle

`UIUtils.notify(object)` works by providing an object with the following properties:

- __body__ `String`
  up to two lines are displayed in the notification (based on the current browser implementations)

- __header__ `String`
  the bolded title displayed at the top of the notification

- __icon__ `HTMLString`
  (optional) the URL of a picture or icon to be displayed with the notification (looks best if square)

- __onClick__ `Function`
  (optional) add arbitrary functionality when the notification is clicked

This will return a `Promise`. Resolution means the notification was created correctly (returns the `Notification`, and rejection will return a relevant error description string.
