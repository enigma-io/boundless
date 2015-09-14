### `UIKit/UIRadio`
#### An accessible radio form control.

UIRadio is implemented as a "controlled input", meaning it is a direct representation of the model data passed inside. User interaction will bubble changes in the form of `onSelected` that a controller view must intercept and apply against the data provider.

```jsx
return (
    <div>
        <p>¿Guarda automáticamente?</p>
        <UIRadio selected={true}
                 label='Sí'
                 labelAttributes={{ 'data-i18n': 'es-ES' }}
                 name='autosave'
                 value='1' />
        <UIRadio selected={false}
                 label='No'
                 labelAttributes={{ 'data-i18n': 'es-ES' }}
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
**Keyboard** | `[Enter, Space]` (not selected) | should trigger `onSelected`
**Mouse** | `click` (not selected) | should trigger `onSelected`

<br />
##### Available `props`
- any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-radio` node

- **className** `[String|Array<String>]`
  additional CSS class(es) to be added to the rendered `.ui-radio` node

- **id** `String`
  the string to be used for the rendered input HTML `id` and corresponding label `for` attributes; auto-generated if not provided

- **label** `Node`
  any React-renderable content, most commonly a simple string

- **labelAttributes** `Object`
    - **labelAttributes.\***
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-radio-label` node

- **name** `String`
  passthrough to the HTML `name` attribute on the `.ui-radio` node

- **onSelected** `Function`
  called when the element becomes selected; backing data must be updated to persist the state change

- **selected** `Boolean`
  determines the activation state of the radio control, see React ["controlled inputs"](https://facebook.github.io/react/docs/forms.html#controlled-components))

- **wrapperAttributes** `Object`
    - **wrapperAttributes.\***
      any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-radio-wrapper` node
