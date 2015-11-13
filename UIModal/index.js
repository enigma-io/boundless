/**
 * A blocking, focus-stealing container.
 * @class UIModal
 */

import UIDialog from '../UIDialog';
import UIView from '../UIView';
import cx from 'classnames';

class UIModal extends UIView {
    render() {
        return (
            <div {...this.props.attrs}
                 ref='wrapper'
                 className={cx({
                    'ui-modal-wrapper': true,
                    [this.props.className]: !!this.props.className,
                    [this.props.attrs.className]: !!this.props.attrs.className,
                 })}
                 id={this.props.id || this.props.attrs.id}
                 style={{...this.props.style, ...this.props.attrs.style}}>
                <div {...this.props.maskAttrs}
                     ref='mask'
                     className={cx({
                        'ui-modal-mask': true,
                        [this.props.maskAttrs.className]: !!this.props.maskAttrs.className,
                     })} />
                <UIDialog {...this.props}
                          attrs={this.props.modalAttrs}
                          ref='dialog'
                          id={undefined}
                          style={undefined}
                          className={cx({
                            'ui-modal': true,
                            [this.props.modalAttrs.className]: !!this.props.modalAttrs.className,
                          })} />
            </div>
        );
    }
}

UIModal.propTypes = {
    ...UIDialog.propTypes,
    attrs: React.PropTypes.object,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    maskAttrs: React.PropTypes.object,
    modalAttrs: React.PropTypes.object,
    style: React.PropTypes.object,
};

UIModal.defaultProps = {
    attrs: {},
    maskAttrs: {},
    modalAttrs: {},
};

export default UIModal;
