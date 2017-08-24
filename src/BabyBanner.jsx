/**
 @class BabyBanner
 to set shim, make sure that <BabyBanner /> is at the top of your page.
 */

import React from 'react';
import classnames from 'classnames';

export default React.createClass({
  displayName: 'BabyBanner',

  propTypes: {
    afterClose: React.PropTypes.func,
    ariaLabelCloseIcon: React.PropTypes.any,
    ariaLiveMessage: React.PropTypes.string,
    bannerId: React.PropTypes.number,
    closeIconClass: React.PropTypes.string,
    duration: React.PropTypes.number,
    message: React.PropTypes.any,
    onBannerClose: React.PropTypes.func,
    onKeyUpCloseIcon: React.PropTypes.func,
    roleCloseIcon: React.PropTypes.string,
    roleMessage: React.PropTypes.string,
    isStatic: React.PropTypes.bool,
    tabIndexBody: React.PropTypes.string,
    tabIndexCloseIcon: React.PropTypes.func,
    topOffset: React.PropTypes.string,
    topPalmOffset: React.PropTypes.string,
    type: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      afterClose: () => {},
      ariaLabelCloseIcon: 'Close Icon',
      ariaLiveMessage: 'off',
      bannerId: 0,
      closeIconClass: 'icon-close',
      duration: 3000,
      message: '',
      onBannerClose: () => {},
      onKeyUpCloseIcon: () => {},
      roleCloseIcon: 'button',
      roleMessage: null,
      isStatic: false,
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
      tabIndexCloseIcon: '-1'
    };
  },

  componentWillMount() {
    this._slideOpen();
  },

  componentWillUnmount() {
    const { closePageBannerTimer } = this.state;
    if (closePageBannerTimer) {
      clearTimeout(closePageBannerTimer);
    }
  },

  _open() {
    const { duration, isStatic, tabIndexCloseIcon } = this.props;

    this.setState({ isShowing: true });
    this._toggleHeight(true);

    if (isStatic) {
      return;
    }

    this.setState({
      tabIndexCloseIcon: tabIndexCloseIcon(true),
      closePageBannerTimer: setTimeout(this._close, duration)
    });
  },

  _toggleHeight(isShowing) {
    const pageBanner = this.pageBanner;

    if (pageBanner) {
      const elementHeight = pageBanner.scrollHeight;
      const height = isShowing ? elementHeight : 0;

      pageBanner.style.height = `${height}px`;
    }
  },

  _slideOpen() {
    // for css animation, move to bottom of call stack
    const closePageBannerTimer = setTimeout(this._open);
    this.setState({ closePageBannerTimer });
  },

  _close() {
    const { afterClose, bannerId, onBannerClose } = this.props;

    this.setState({ isShowing: false });
    this._toggleHeight(false);

    clearTimeout(this.state.closePageBannerTimer);
    this.setState({ closePageBannerTimer: null });

    setTimeout(() => {
      if (typeof afterClose === 'function') {
        this.setState({ tabIndexCloseIcon: '-1' });
        afterClose(bannerId);
      }

      if (typeof onBannerClose === 'function') {
        onBannerClose(bannerId);
      }
      // should match animation length
    }, 300);
  },

  render() {
    const { tabIndexCloseIcon } = this.state;
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

    if (!message) return null;

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
            dangerouslySetInnerHTML={{ __html: message }}
          />
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
