import PropTypes from 'prop-types';
import React from 'react';
import Sizer from '../sizer/Sizer';

const EXTENDED_PADDING = 300;

/**
 * HTML video player.
 *
 * @namespace ima.ui.atom.video
 * @module ima.ui.atom
 */

export default class HtmlVideo extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  static get propTypes() {
    return {
      width: PropTypes.number,
      height: PropTypes.number,
      layout: PropTypes.string,
      autoplay: PropTypes.bool,
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
      layout: null,
      autoplay: null,
      wrapperClassName: '',
      className: '',
      noloading: false,
      children: null
    };
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      noloading: props.noloading || false
    };

    this._mounted = false;
    this._visibleInViewport = false;

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
      this.utils.$Settings.plugin.imaUiAtoms.useIntersectionObserver.videos ===
        false
    );
  }

  get renderNoScript() {
    return !(
      this.utils.$Settings &&
      this.utils.$Settings.plugin &&
      this.utils.$Settings.plugin.imaUiAtoms &&
      this.utils.$Settings.plugin.imaUiAtoms.disableNoScript &&
      this.utils.$Settings.plugin.imaUiAtoms.disableNoScript.videos === true
    );
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
          'atm-video': true,
          'atm-overflow': true,
          'atm-placeholder': !this.state.noloading,
          'atm-responsive': isResponsive,
          'atm-fill': this.props.layout === 'fill'
        },
        this.props.wrapperClassName
      ),
      computedTargetClassName = helper.cssClasses(
        {
          'atm-fill': true,
          'atm-loaded': this.state.noloading && this._visibleInViewport
        },
        this.props.className
      ),
      sizer = isResponsive ? (
        <Sizer
          width={this.props.width}
          height={this.props.height}
          placeholder={!this.state.noloading}
        />
      ) : null,
      atomProps = helper.getRefinedProps({
        originalProps: this.props,
        removeProps: HtmlVideo.defaultProps,
        addProps: {
          className: computedTargetClassName,
          autoPlay: this.props.autoplay
        }
      }),
      atom = this.state.noloading ? (
        <video {...atomProps}>
          <div placeholder="" />
          {this.props.children}
        </video>
      ) : null,
      noScript = this.renderNoScript ? (
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<video
            poster="${this.props.alt || ''}"
            controls
            class="${helper.cssClasses('atm-fill atm-loaded')}"
            ${helper.serializeObjectToNoScript(atomProps)}></video>`
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

  componentDidMount() {
    this._mounted = true;

    if (this.state.noloading === false) {
      this._registerToCheckingVisibility();
    }
  }

  componentWillUnmount() {
    this._mounted = false;
    this._unregisterToCheckingVisibility();
  }

  onVisibilityWriter(visibility, observer) {
    if (this._visibleInViewport === false && visibility > 0) {
      observer && observer.disconnect();
      this._visibleInViewport = true;
      this._unregisterToCheckingVisibility();
      this._preLoadPosterImage();
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
      Math.round(
        $UIComponentHelper.componentPositions.getWindowViewportRect().height / 2
      ),
      EXTENDED_PADDING
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

  _preLoadPosterImage() {
    if (!this.props.poster) {
      this.setState({
        noloading: true
      });
      return;
    }

    const componentInstance = this;
    const image = new Image();
    image.onload = onLoadingCompleted;
    image.onerror = onLoadingCompleted;
    image.src = this.props.poster;

    function onLoadingCompleted() {
      if (componentInstance._mounted) {
        componentInstance.setState({
          noloading: true
        });
      }
    }
  }
}
