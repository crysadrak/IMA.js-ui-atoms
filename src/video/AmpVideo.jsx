import PropTypes from 'prop-types';
import React from 'react';

// @server-side class AmpVideo extends __VARIABLE__ {__CLEAR__}\nexports.default = AmpVideo;

/**
 * Amp video player.
 *
 * @namespace ima.ui.atom.video
 * @module ima.ui.atom
 */
export default class AmpVideo extends React.PureComponent {
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
      children: PropTypes.node
    };
  }

  static get defaultProps() {
    return {
      scrolling: 'no',
      wrapperClassName: '',
      className: '',
      noloading: false,
      children: null
    };
  }

  render() {
    const helper = this.context.$Utils.$UIComponentHelper,
      atomProps = helper.getRefinedProps({
        originalProps: this.props,
        removeProps: AmpVideo.defaultProps,
        addProps: {
          class: helper.cssClasses(
            this.props.wrapperClassName,
            this.props.className
          )
        }
      }),
      children = this.props.children || <div placeholder="" />;

    return <amp-video {...atomProps}>{children}</amp-video>;
  }
}
