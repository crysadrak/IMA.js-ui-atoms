import PropTypes from 'prop-types';
import React from 'react';

/**
 * Common sizer
 *
 * @namespace ima.ui.atom.sizer
 * @module ima.ui.atom
 */
export default class Sizer extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  static get propTypes() {
    return {
      width: PropTypes.number,
      height: PropTypes.number,
      placeholder: PropTypes.bool,
      style: PropTypes.string,
      className: PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      width: 0,
      height: 0,
      placeholder: false,
      style: null,
      className: ''
    };
  }

  render() {
    const helper = this.context.$Utils.$UIComponentHelper,
      sizerStyle = this.props.style || {
        paddingTop: (this.props.height / this.props.width) * 100 + '%'
      },
      componentClassName = helper.cssClasses(
        {
          'atm-sizer': true,
          'atm-placeholder': this.props.placeholder
        },
        this.props.className
      );

    return (
      <div
        className={componentClassName}
        style={sizerStyle}
      />
    );
  }
}
