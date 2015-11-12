### `UIKit/UIRadio`
#### An accessible radio form control.

UIRadio is implemented as a "controlled input", meaning it is a direct representation of the model data passed inside. User interaction will bubble changes in the form of `onSelected` that a controller view must intercept and apply against the data provider.

```jsx
return (
    <div>
        <p>¿Guarda automáticamente?</p>
        <UIRadio selected={true}
                 label='Sí'
                 labelAttributes={{'data-i18n': 'es-ES'}}
                 name='autosave'
                 value='1' />
        <UIRadio selected={false}
                 label='No'
                 labelAttributes={{'data-i18n': 'es-ES'}}
                 name='autosave'
                 value='0' />
    </div>
);
```
Renders:
```html
<div>
    <p data-i18n="es-ES">¿Guarda automáticamente?</p>
    <div class="ui-radio-wrapper">
        <input id="{uniqueId}" name="autosave" type="radio" value='1' aria-checked="true" class="ui-radio ui-radio-selected" checked />
        <label for="{uniqueId}" data-i18n="es-ES">Sí</label>
    </div>
    <div class="ui-radio-wrapper">
        <input id="{uniqueId}" name="autosave" type="radio" value='0' aria-checked="false" class="ui-radio" />
        <label for="{uniqueId}" data-i18n="es-ES">No</label>
    </div>
</div>
```

Styling of the element is provided via the CSS hooks:

- `.ui-radio`
- `.ui-radio-label`
- `.ui-radio-selected`
- `.ui-radio-wrapper`

<br />
##### Expected Interactions

Type | Context | Expectation
---- | ------- | -----------
__Keyboard__ | `[Enter, Space]` (not selected) | should trigger `onSelected`
__Mouse__ | `click` (not selected) | should trigger `onSelected`

<br />
##### Available `props`
- __attrs__ `Object`
    - __attrs.*__
    any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-radio-wrapper` node

- __className__ `String`
  additional CSS class(es) to be added to the rendered `.ui-radio-wrapper` node

- __id__ `String`
  a valid HTML `id` to be passed-though to the `.ui-radio-wrapper` node

- __inputAttrs__ `Object`
    - __inputAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-radio` node

- __label__ `Node`
  any React-renderable content, most commonly a simple string

- __labelAttrs__ `Object`
    - __labelAttrs.*__
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-radio-label` node

- __name__ `String`
  passthrough to the HTML `name` attribute on the `.ui-radio` node

- __onSelected__ `Function`
  called when the element becomes selected; backing data must be updated to persist the state change

- __selected__ `Boolean`
  determines the activation state of the radio control, see React ["controlled inputs"](https://facebook.github.io/react/docs/forms.html#controlled-components))

- __style__ `Object`
  inline styles to be applied to the `.ui-radio-wrapper` node; see [React Inline Styles](https://facebook.github.io/react/tips/inline-styles.html) for reference

- __value__ `String`
  passthrough to the HTML `value` attribute on the `.ui-radio` node
