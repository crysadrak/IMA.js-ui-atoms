import PropTypes from 'prop-types';
import React from 'react';
import Sizer from '../sizer/Sizer';

const MIN_EXTENDED_PADDING = 500;

/**
 * Html classic iframe
 *
 * @namespace ima.ui.atom.iframe
 * @module ima.ui.atom
 */

export default class HtmlIframe extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  static get propTypes() {
    return {
      width: PropTypes.number,
      height: PropTypes.number,
      marginWidth: PropTypes.number,
      marginHeight: PropTypes.number,
      layout: PropTypes.string,
      scrolling: PropTypes.string,
      wrapperClassName: PropTypes.string,
      className: PropTypes.string,
      noloading: PropTypes.bool,
      children: PropTypes.node
    };
  }

  static get defaultProps() {
    return {
      width: null,
      height: null,
      marginWidth: null,
      marginHeight: null,
      layout: null,
      scrolling: 'no',
      wrapperClassName: '',
      className: '',
      noloading: false,
      children: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      visibleInViewport:
        nextProps.noloading || prevState.visibleInViewport || false
    };
  }

  constructor(props, context) {
    super(props, context);

    this.state = {};

    this._registeredVisibilityId = null;

    this._onVisibilityWriter = this.onVisibilityWriter.bind(this);

    this._rootElement = React.createRef();
  }

  get utils() {
    return this.context.$Utils || this.props.$Utils;
  }

  get useIntersectionObserver() {
    return !(
      this.utils.$Settings &&
      this.utils.$Settings.plugin &&
      this.utils.$Settings.plugin.imaUiAtoms &&
      this.utils.$Settings.plugin.imaUiAtoms.useIntersectionObserver &&
      this.utils.$Settings.plugin.imaUiAtoms.useIntersectionObserver.iframes ===
        false
    );
  }

  get renderNoScript() {
    return !(
      this.utils.$Settings &&
      this.utils.$Settings.plugin &&
      this.utils.$Settings.plugin.imaUiAtoms &&
      this.utils.$Settings.plugin.imaUiAtoms.disableNoScript &&
      this.utils.$Settings.plugin.imaUiAtoms.disableNoScript.iframes === true
    );
  }

  componentDidMount() {
    if (this.state.visibleInViewport === false) {
      this._registerToCheckingVisibility();
    }
  }

  componentWillUnmount() {
    this._unregisterToCheckingVisibility();
  }

  render() {
    const helper = this.utils.$UIComponentHelper,
      isResponsive = this.props.layout === 'responsive',
      wrapperStyle = isResponsive
        ? {}
        : {
            width: this.props.width || 'auto',
            height: this.props.height || 'auto'
          },
      computedWrapperClassName = helper.cssClasses(
        {
          'atm-iframe': true,
          'atm-overflow': true,
          'atm-placeholder': !this.state.visibleInViewport,
          'atm-responsive': isResponsive,
          'atm-fill': this.props.layout === 'fill'
        },
        this.props.wrapperClassName
      ),
      computedTargetClassName = helper.cssClasses(
        {
          'atm-fill': true
        },
        this.props.className
      ),
      sizer = isResponsive ? (
        <Sizer
          width={this.props.width}
          height={this.props.height}
          placeholder={true}
        />
      ) : null,
      atomProps = helper.getRefinedProps({
        originalProps: this.props,
        removeProps: HtmlIframe.defaultProps,
        addProps: {
          className: computedTargetClassName,
          scrolling: this.props.scrolling ? this.props.scrolling : 'no',
          marginWidth: Number.isInteger(this.props.marginWidth) ? this.props.marginWidth : null,
          marginHeight: Number.isInteger(this.props.marginHeight) ? this.props.marginHeight : null
        }
      }),
      atom = this.state.visibleInViewport ? <iframe {...atomProps} /> : null,
      noScript = this.renderNoScript ? (
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe
            class="${helper.cssClasses('atm-fill atm-loaded')}"
            ${helper.serializeObjectToNoScript(atomProps)}></iframe>`
          }}
        />
      ) : null;

    return (
      <div
        ref={this._rootElement}
        className={computedWrapperClassName}
        style={wrapperStyle}
      >
        {sizer}
        {atom}
        {noScript}
      </div>
    );
  }

  onVisibilityWriter(visibility, observer) {
    if (visibility > 0) {
      observer && observer.disconnect();
      this._unregisterToCheckingVisibility();

      if (this.state.visibleInViewport === false) {
        this.setState({ visibleInViewport: true });
      }
    }
  }

  _unregisterToCheckingVisibility() {
    if (this._registeredVisibilityId) {
      this.utils.$UIComponentHelper.visibility.unregister(
        this._registeredVisibilityId
      );
      this._registeredVisibilityId = null;
    }
  }

  _registerToCheckingVisibility() {
    const { $UIComponentHelper } = this.utils;
    const extendedPadding = Math.max(
      $UIComponentHelper.componentPositions.getWindowViewportRect().height / 2,
      MIN_EXTENDED_PADDING
    );

    this._registeredVisibilityId = $UIComponentHelper.visibility.register(
      $UIComponentHelper.getVisibilityReader(this._rootElement.current, {
        useIntersectionObserver: this.useIntersectionObserver,
        extendedPadding,
        width: this.props.width,
        height: this.props.height
      }),
      $UIComponentHelper.wrapVisibilityWriter(this._onVisibilityWriter)
    );
  }
}
