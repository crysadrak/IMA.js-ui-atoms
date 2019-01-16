import PropTypes from 'prop-types';
import React from 'react';

/**
 * Common link
 *
 * @namespace ima.ui.atom.link
 * @module ima.ui.atom
 */

export default class Link extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  static get propTypes() {
    return {
      text: PropTypes.string,
      mode: PropTypes.string,
      className: PropTypes.string,
      children: PropTypes.node
    };
  }

  static get defaultProps() {
    return {
      text: null,
      mode: null,
      className: '',
      children: null
    };
  }

  render() {
    const helper = this.context.$Utils.$UIComponentHelper,
      Type = 'a',
      { mode, className, children, text } = this.props,
      computedClassName = helper.cssClasses(
        {
          'atm-link': true,
          ['atm-link-' + mode]: mode
        },
        className
      ),
      atomProps = helper.getRefinedProps({
        originalProps: this.props,
        removeProps: Link.defaultProps,
        addProps: {
          className: computedClassName
        }
      });

    return helper.getAtomComponent({ Type, atomProps, children, text });
  }
}
