/**
 * Used to create an ES5-compatible standalone build, and so it's possible to `require('enigma-uikit')``
 * and directly use a component like: `require('enigma-uikit').UIButton`
 */

export {default as UIArrowKeyNavigation} from './UIArrowKeyNavigation';
export {default as UIButton} from './UIButton';
export {default as UICheckbox} from './UICheckbox';
export {default as UICheckboxGroup} from './UICheckboxGroup';
export {default as UIDialog} from './UIDialog';
export {default as UIFittedText} from './UIFittedText';
export {default as UIImage} from './UIImage';
export {default as UIModal} from './UIModal';
export {default as UIPagination} from './UIPagination';
export {default as UIPopover} from './UIPopover';
export {default as UIPortal} from './UIPortal';
export {default as UIProgress} from './UIProgress';
export {default as UIProgressiveDisclosure} from './UIProgressiveDisclosure';
export {default as UIRadio} from './UIRadio';
export {default as UISegmentedControl} from './UISegmentedControl';
export {default as UITokenizedInput} from './UITokenizedInput';
export {default as UITextualInput} from './UITextualInput';
export {default as UITypeaheadInput} from './UITypeaheadInput';
export {default as UITooltip} from './UITooltip';

import extractChildProps from './UIUtils/extractChildProps';
import notify from './UIUtils/notify';
import transformProperty from './UIUtils/transformProperty';
import uuid from './UIUtils/uuid';

export const UIUtils = {extractChildProps, notify, transformProperty, uuid};
