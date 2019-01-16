import PropTypes from 'prop-types';
import React from 'react';

/**
 * Common ListItem
 *
 * @namespace ima.ui.atom.list
 * @module ima.ui.atom
 */

export default class ListItem extends React.PureComponent {
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
      Type = 'li',
      { mode, className, children, text } = this.props,
      computedClassName = helper.cssClasses(
        {
          'atm-li': true,
          ['atm-li-' + mode]: mode
        },
        className
      ),
      atomProps = helper.getRefinedProps({
        originalProps: this.props,
        removeProps: ListItem.defaultProps,
        addProps: {
          className: computedClassName
        }
      });

    return helper.getAtomComponent({ Type, atomProps, children, text });
  }
}
