import PropTypes from 'prop-types';
import React from 'react';
import AmpVideo from './AmpVideo';
import HtmlVideo from './HtmlVideo';

/**
 * Video player.
 *
 * @namespace ima.ui.atom.video
 * @module ima.ui.atom
 */

export default class Video extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  render() {
    if (this.context.$Utils.$UIComponentHelper.isAmp()) {
      return <AmpVideo {...this.props} />;
    } else {
      return <HtmlVideo {...this.props} />;
    }
  }
}
