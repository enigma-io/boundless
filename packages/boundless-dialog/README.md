# Dialog
__A non-blocking, focus-stealing container.__

A dialog differs from a modal in that it does not come with a masking layer (to obscure the rest of the page) and the user can choose to shift focus away from the dialog contents via mouse click or a keyboard shortcut.

Specific areas (header, body, footer) are defined to provide easy conformance to the [WAI-ARIA spec](http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby) for `aria-labelledby` and `aria-describedby` (screen reader accessibility). Their use is optional, but encouraged.

---

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Render__ | `N/A` | focus on dialog
__Event__ | window `focus` | should be cancelled if moving inside -> outside dialog if `props.captureFocus` is `true`
__Keyboard__ | `Esc` | should trigger `props.onClose` if `closeOnEscKey === true`
__Mouse__ | `Click` outside of dialog | should trigger `props.onClose` if `closeOnOutsideClick === true`
