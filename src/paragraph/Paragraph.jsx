import PropTypes from 'prop-types';
import React from 'react';

/**
 * Common paragraph
 *
 * @namespace ima.ui.atom.paragraph
 * @module ima.ui.atom
 */

export default class Paragraph extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  static get propTypes() {
    return {
      className: PropTypes.string,
      align: PropTypes.string,
      text: PropTypes.string,
      mode: PropTypes.string,
      children: PropTypes.node
    };
  }

  static get defaultProps() {
    return {
      className: '',
      align: null,
      text: null,
      mode: '',
      children: null
    };
  }

  render() {
    const helper = this.context.$Utils.$UIComponentHelper,
      Type = 'p',
      { mode, align, className, children, text } = this.props,
      computedClassName = helper.cssClasses(
        {
          'atm-paragraph': true,
          ['atm-paragraph-' + mode]: mode,
          ['atm-paragraph-align-' + align]: align
        },
        className
      ),
      atomProps = helper.getRefinedProps({
        originalProps: this.props,
        removeProps: Paragraph.defaultProps,
        addProps: {
          className: computedClassName
        }
      });

    return helper.getAtomComponent({ Type, atomProps, children, text });
  }
}
