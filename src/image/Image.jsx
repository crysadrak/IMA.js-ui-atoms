import PropTypes from 'prop-types';
import React from 'react';
import HtmlImage from './HtmlImage';
import AmpImage from './AmpImage';

/**
 * Common image
 *
 * @namespace ima.ui.atom.image
 * @module ima.ui.atom
 */

export default class Image extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  render() {
    if (this.context.$Utils.$UIComponentHelper.isAmp()) {
      return <AmpImage {...this.props} />;
    } else {
      return <HtmlImage {...this.props} />;
    }
  }
}
