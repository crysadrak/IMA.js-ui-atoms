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
			id:  PropTypes.string,
			className:  PropTypes.string,
			text: PropTypes.string,
			type: PropTypes.string,
			mode: PropTypes.string,
			"data-e2e": PropTypes.string
		};
	}

	static get defaultProps() {
		return {
			id: null,
			className: '',
			text: null,
			mode: null,
			type: 'h1',
			"data-e2e": null
		};
	}

	render() {
		let headline = null;
		let { Type, id, mode, text, className, children } = this.props;
		let helper = this.context.$Utils.$UIComponentHelper;
		let computedClassName = helper.cssClasses({
			['atm-headline']: true,
			['atm-' + mode]: mode,
			['atm-' + Type]: Type
		}, className);

		if (children) {
			headline = (
				<Type
						id = { id }
						className = { computedClassName }
						{...helper.getDataProps(this.props)}>
					{ children }
				</Type>
			);
		} else {
			headline = (
				<Type
						id = { id }
						className = { computedClassName }
						{...helper.getDataProps(this.props)}
						dangerouslySetInnerHTML = { { __html: text } }/>
			);
		}

		return headline;
	}
 }
