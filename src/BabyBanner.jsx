/**
 @class PageBanner
 to set shim, make sure that <PageBanner /> is at the top of your page.
 */

import React from 'react';
import classnames from 'classnames';

export default React.createClass({
  displayName: 'BabyBanner',

  propTypes: {
    afterClose: React.PropTypes.func,
    ariaLabelCloseIcon: React.PropTypes.any,
    ariaLiveMessage: React.PropTypes.string,
    closeIconClass: React.PropTypes.string,
    duration: React.PropTypes.number,
    message: React.PropTypes.any,
    onKeyUpCloseIcon: React.PropTypes.func,
    roleCloseIcon: React.PropTypes.string,
    roleMessage: React.PropTypes.string,
    sticky: React.PropTypes.bool,
    tabIndexBody: React.PropTypes.string,
    tabIndexCloseIcon: React.PropTypes.func,
    topOffset: React.PropTypes.string,
    topPalmOffset: React.PropTypes.string,
    type: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      afterClose: () => {
      },
      ariaLabelCloseIcon: 'Close Icon',
      ariaLiveMessage: 'off',
      closeIconClass: '',
      duration: 3000,
      message: '',
      onKeyUpCloseIcon: () => {
      },
      roleCloseIcon: 'button',
      roleMessage: null,
      sticky: false,
      tabIndexBody: '-1',
      tabIndexCloseIcon: () => '-1',
      topOffset: null,
      topPalmOffset: null,
      type: 'success'
    };
  },

  getInitialState() {
    return {
      closePageBannerTimer: null,
      isShowing: false,
      isFixed: false,
      height: null,
      tabIndexCloseIcon: '-1'
    };
  },

  componentWillMount() {
    this._slideOpen();
  },

  componentWillUnmount() {
    const {closePageBannerTimer} = this.state;
    if (closePageBannerTimer) {
      clearTimeout(closePageBannerTimer);
    }
  },

  _open() {
    const {duration, sticky} = this.props;
    this.setState({isShowing: true});
    this._toggleHeight(true);

    if (sticky) {
      return;
    }

    this.setState({
      tabIndexCloseIcon: this.props.tabIndexCloseIcon(true),
      closePageBannerTimer: setTimeout(this._close, duration)
    });
  },

  _toggleHeight(isShowing) {
    const el = this.pageBanner;
    const elementHeight = el.scrollHeight;
    const height = isShowing ? elementHeight : 0;

    el.style.height = `${(height)}px`;
    this.setState({height});
  },

  _slideOpen() {
    // for css animation, move to bottom of call stack
    const closePageBannerTimer = setTimeout(this._open);
    this.setState({closePageBannerTimer});
  },

  _close() {
    const {afterClose, bannerId, onBannerClose} = this.props;

    this.setState({isShowing: false});
    this._toggleHeight(false);

    clearTimeout(this.state.closePageBannerTimer);
    this.setState({closePageBannerTimer: null});

    setTimeout(() => {
      if (typeof afterClose === 'function') {
        this.setState({tabIndexCloseIcon: '-1'});
        afterClose(bannerId);
      }
      onBannerClose(bannerId);
      // should match animation length
    }, 300);
  },

  render() {
    const {tabIndexCloseIcon} = this.state;
    const {
      message,
      type,
      closeIconClass,
      ariaLabelCloseIcon,
      roleCloseIcon,
      onKeyUpCloseIcon,
      ariaLiveMessage,
      roleMessage,
      tabIndexBody
    } = this.props;

    const pageBannerClasses = classnames('page-banner', `page-banner--${type}`);

    return (
      <div
        className={pageBannerClasses}
        ref={pageBanner => {
          this.pageBanner = pageBanner;
        }}
      >
        <div
          tabIndex={tabIndexBody}
          className='page-banner__body'
          ref={bannerBody => {
            this.pageBannerBody = bannerBody;
          }}
        >
          <span
            aria-live={ariaLiveMessage}
            role={roleMessage}
          >
            { message }
          </span>
          <div className='page-banner__close'>
            <i
              className={`page-banner__icon-close ${closeIconClass}`}
              onClick={this._close}
              tabIndex={tabIndexCloseIcon}
              aria-label={ariaLabelCloseIcon}
              role={roleCloseIcon}
              onKeyUp={onKeyUpCloseIcon}
            />
          </div>
        </div>
      </div>);
  }
});
