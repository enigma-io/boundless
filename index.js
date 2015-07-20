import UIButtonDemo from './UIButton/demo';
import UICheckboxDemo from './UICheckbox/demo';
import UICheckboxGroupDemo from './UICheckboxGroup/demo';
import UIImageDemo from './UIImage/demo';
import UIListDemo from './UIList/demo';
import UIProgressDemo from './UIProgress/demo';
import UITextDemo from './UIText/demo';
import UITypeaheadDemo from './UITypeahead/demo';
import React from 'react';

React.render(<UIButtonDemo />, document.getElementById('ui-button'));
React.render(<UICheckboxDemo />, document.getElementById('ui-checkbox'));
React.render(<UICheckboxGroupDemo />, document.getElementById('ui-checkbox-group'));
React.render(<UIImageDemo />, document.getElementById('ui-image'));
React.render(<UIListDemo />, document.getElementById('ui-list'));
React.render(<UIProgressDemo />, document.getElementById('ui-progress'));
React.render(<UITextDemo />, document.getElementById('ui-text'));
React.render(<UITypeaheadDemo />, document.getElementById('ui-typeahead'));
