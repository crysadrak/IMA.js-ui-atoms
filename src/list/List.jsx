import PropTypes from 'prop-types';
import React from 'react';

/**
 * Common list
 *
 * @namespace ima.ui.atom.list
 * @module ima.ui.atom
 */

export default class List extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  static get propTypes() {
    return {
      className: PropTypes.string,
      mode: PropTypes.string,
      type: PropTypes.string,
      children: PropTypes.node
    };
  }

  static get defaultProps() {
    return {
      className: '',
      mode: null,
      type: 'ul',
      children: null
    };
  }

  render() {
    const helper = this.context.$Utils.$UIComponentHelper,
      { type: Type, mode, className, children, text } = this.props,
      computedClassName = helper.cssClasses(
        {
          'atm-list': true,
          ['atm-list-' + mode]: mode,
          ['atm-list-' + Type]: Type
        },
        className
      ),
      atomProps = helper.getRefinedProps({
        originalProps: this.props,
        removeProps: List.defaultProps,
        addProps: {
          className: computedClassName
        }
      });

    return helper.getAtomComponent({ Type, atomProps, children, text });
  }
}
