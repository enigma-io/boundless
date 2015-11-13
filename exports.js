/**
 * Used to create an ES5-compatible standalone build, and so it's possible to `require('enigma-uikit')``
 * and directly use a component like: `require('enigma-uikit').UIButton`
 */

global.React = global.React || require('react');
global.ReactDOM = global.ReactDOM || require('react-dom');

global.UIKit = {};

module.exports = {
    UIButton: (global.UIKit.UIButton = require('./UIButton')),
    UICheckbox: (global.UIKit.UICheckbox = require('./UICheckbox')),
    UICheckboxGroup: (global.UIKit.UICheckboxGroup = require('./UICheckboxGroup')),
    UIDialog: (global.UIKit.UIDialog = require('./UIDialog')),
    UIFittedText: (global.UIKit.UIFittedText = require('./UIFittedText')),
    UIImage: (global.UIKit.UIImage = require('./UIImage')),
    UIList: (global.UIKit.UIList = require('./UIList')),
    UIModal: (global.UIKit.UIModal = require('./UIModal')),
    UIPopover: (global.UIKit.UIPopover = require('./UIPopover')),
    UIProgress: (global.UIKit.UIProgress = require('./UIProgress')),
    UIProgressiveDisclosure: (global.UIKit.UIProgressiveDisclosure = require('./UIProgressiveDisclosure')),
    UIRadio: (global.UIKit.UIRadio = require('./UIRadio')),
    UITable: (global.UIKit.UITable = require('./UITable')),
    UITokenizedInput: (global.UIKit.UITokenizedInput = require('./UITokenizedInput')),
    UITypeaheadInput: (global.UIKit.UITypeaheadInput = require('./UITypeaheadInput')),
    UIView: (global.UIKit.UIView = require('./UIView')),
};
