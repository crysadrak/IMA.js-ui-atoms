import PropTypes from 'prop-types';
import React from 'react';

/**
 * Base headline
 *
 * @namespace ima.ui.atom.headline
 * @module ima.ui.atom
 */
export default class Headline extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  static get propTypes() {
    return {
      className: PropTypes.string,
      text: PropTypes.string,
      type: PropTypes.string,
      mode: PropTypes.string, // remove
      children: PropTypes.node
    };
  }

  static get defaultProps() {
    return {
      className: '',
      text: null,
      mode: null,
      type: 'h1',
      children: null
    };
  }

  render() {
    const helper = this.context.$Utils.$UIComponentHelper,
      { type: Type, mode, className, children, text } = this.props,
      computedClassName = helper.cssClasses(
        {
          ['atm-headline']: true,
          ['atm-' + mode]: mode, // remove
          ['atm-' + Type]: Type
        },
        className
      ),
      atomProps = helper.getRefinedProps({
        originalProps: this.props,
        removeProps: Headline.defaultProps,
        addProps: {
          className: computedClassName
        }
      });

    return helper.getAtomComponent({ Type, atomProps, children, text });
  }
}
