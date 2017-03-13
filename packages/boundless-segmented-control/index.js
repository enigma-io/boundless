import {createElement, PropTypes, PureComponent} from 'react';
import cx from 'classnames';

import ArrowKeyNavigation from 'boundless-arrow-key-navigation';
import Button from 'boundless-button';
import omit from 'boundless-utils-omit-keys';

function findIndex(arr, test) {
    let found;

    for (let i = 0, len = arr.length; i < len; i += 1) {
        if (test(arr[i])) {
            found = i;
            break;
        }
    }

    return found;
}

/**
SegmentedControl has many potential uses, the most common being:

1. The controls for a tabbed view
2. A mode switch

Essentially, it behaves like a radio group without actually using input controls. Only one option can be selected at a time.

### Component Instance Methods

- `getSelectedOption()` retrieves the option that is selected
- `getSelectedOptionIndex()` retrieves the index of the option that is selected
- `selectOption(option)` allows for programmatic switching of the active SegmentedControl option
- `selectOptionByKey(key, value)` allows for programmatic switching of the active SegmentedControl option using a unique key
- `selectOptionIndex(index)` allows for programmatic switching of the active SegmentedControl option by index
 */
export default class SegmentedControl extends PureComponent {
    static propTypes = {
        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
         */
        '*': PropTypes.any,

        /**
         * sets the initial selected option on first mount
         */
        defaultOptionSelectedIndex: PropTypes.number,

        /**
         * called when a child element becomes selected with the option and option index
         */
        onOptionSelected: PropTypes.func,

        /**
         * provide a customized component type if desired, either a HTML element name or ReactComponent
         */
        optionComponent: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),

        /**
         * prop objects to be applied against the SegmentedControl buttons, accepts any valid React props
         *
         * #### Example
         *
         * ```jsx
         * options={[{
         *     children: 'Foo',
         *     className: 'foo',
         * }, {
         *     children: <span>Bar</span>,
         *     'data-id': 'bar',
         * }]}
         * ```
         */
        options: PropTypes.arrayOf(
            PropTypes.shape({
                /**
                 * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
                 */
                '*': PropTypes.any,
                children: PropTypes.node,
            })
        ).isRequired,
    }

    static defaultProps = {
        defaultOptionSelectedIndex: 0,
        onOptionSelected: () => {},
        optionComponent: 'button',
        options: [],
    }

    static internalKeys = Object.keys(SegmentedControl.defaultProps)

    state = {
        selectedIndex: null,
    }

    inferSelectedOptionIndex(props = this.props, state = this.state) {
        return findIndex(props.options, (option) => option.pressed) || state.selectedIndex;
    }

    componentWillMount() {
        this.setState({selectedIndex: this.inferSelectedOptionIndex() || this.props.defaultOptionSelectedIndex});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.options !== this.props.options) {
            this.setState({selectedIndex: this.inferSelectedOptionIndex(nextProps)});
        }
    }

    handleOptionSelection = (event) => {
        const index = Array.prototype.indexOf.call(event.target.parentElement.children, event.target);

        if (this.state.selectedIndex !== index) {
            this.setState({selectedIndex: index}, () => {
                this.props.onOptionSelected(this.props.options[this.state.selectedIndex], this.state.selectedIndex);
            });
        }
    }

    /**
     * @public
     */
    getSelectedOption = () => this.props.options[this.state.selectedIndex]

    /**
     * @public
     */
    getSelectedOptionIndex = () => this.state.selectedIndex

    /**
     * @public
     */
    selectOption = (option) => this.setState({selectedIndex: this.props.options.indexOf(option)})

    /**
     * @public
     */
    selectOptionByKey = (k, v) => this.setState({selectedIndex: findIndex(this.props.options, (option) => option[k] === v)})

    /**
     * @public
     */
    selectOptionIndex = (index) => this.setState({selectedIndex: index})

    render() {
        return (
            <ArrowKeyNavigation
                {...omit(this.props, SegmentedControl.internalKeys)}
                role='radiogroup'
                className={cx('b-segmented-control', this.props.className)}
                mode={ArrowKeyNavigation.mode.HORIZONTAL}>
                {this.props.options.map((props, index) => (
                    <Button
                        {...props}
                        key={props.key || index}
                        aria-checked={index === this.state.selectedIndex}
                        component={props.component || this.props.optionComponent}
                        className={cx('b-segmented-control-option', props.className, {
                            'b-segmented-control-option-selected': index === this.state.selectedIndex,
                        })}
                        onPressed={this.handleOptionSelection}
                        pressed={index === this.state.selectedIndex}
                        role='radio'>
                        {props.children}
                    </Button>
                ))}
            </ArrowKeyNavigation>
        );
    }
}
