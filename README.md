# Enigma Platform Team
### UIKit

**Intuitive, accessible solutions for common UI needs in React.**

UIKit is a problem-solving component pack, meant to provide implementations for common UI needs that would generally be considered annoying to implement yourself. Each component is designed with maximum extensibility in mind, with _at least_ basic screen-reader / ARIA support.

The library intentionally does not come with styles to remain lightweight, but see the `demo/` folder of each component for reference and inspiration when writing your own.

#### Usage

Each component is independently requireable / importable using the `UIKit/` namespace:

```jsx
import UIList from 'UIKit/UIList';
import React from 'react';
import ReactDOM from 'react-dom';

class MyUI extends React.Component {
    render() {
        return (
            <UIList items={['red', 'green', 'blue']} />
        );
    }
}

ReactDOM.render(<MyUI />, document.body);
```
