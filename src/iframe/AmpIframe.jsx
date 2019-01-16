import PropTypes from 'prop-types';
import React from 'react';

// @server-side class AmpIframe extends __VARIABLE__ {__CLEAR__}\nexports.default = AmpIframe;

/**
 * Amp iframe
 *
 * @namespace ima.ui.atom.iframe
 * @module ima.ui.atom
 */
export default class AmpIframe extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  static get propTypes() {
    return {
      scrolling: PropTypes.string,
      wrapperClassName: PropTypes.string,
      className: PropTypes.string,
      noloading: PropTypes.bool,
      allowFullScreen: PropTypes.bool,
      resizable: PropTypes.bool,
      children: PropTypes.node
    };
  }

  static get defaultProps() {
    return {
      scrolling: 'no',
      wrapperClassName: '',
      className: '',
      noloading: false,
      allowFullScreen: false,
      resizable: false,
      children: null
    };
  }

  render() {
    const helper = this.context.$Utils.$UIComponentHelper,
      atomProps = helper.getRefinedProps({
        originalProps: this.props,
        removeProps: AmpIframe.defaultProps,
        addProps: {
          class: helper.cssClasses(
            this.props.wrapperClassName,
            this.props.className
          ),
          allowFullScreen: this.props.allowFullScreen ? '' : null,
          resizable: this.props.resizable ? '' : null
        }
      }),
      children = this.props.children || <div placeholder="" />;

    return <amp-iframe {...atomProps}>{children}</amp-iframe>;
  }
}
