import PropTypes from 'prop-types';
import React from 'react';
import HtmlIframe from './HtmlIframe';
import AmpIframe from './AmpIframe';

/**
 * Common iframe
 *
 * @namespace ima.ui.atom.iframe
 * @module ima.ui.atom
 */
export default class Iframe extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  render() {
    if (this.context.$Utils.$UIComponentHelper.isAmp()) {
      return <AmpIframe {...this.props} />;
    } else {
      return <HtmlIframe {...this.props} />;
    }
  }
}
