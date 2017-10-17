/**
 @class BabyBanner
 to set shim, make sure that <BabyBanner /> is at the top of your page.
 */

import PropTypes from 'prop-types';

import React from 'react';
import classnames from 'classnames';

class BabyBanner extends React.Component {
  static displayName = 'BabyBanner';

  static propTypes = {
    afterClose: PropTypes.func,
    ariaLabelCloseIcon: PropTypes.any,
    ariaLiveMessage: PropTypes.string,
    bannerId: PropTypes.number,
    closeIconClass: PropTypes.string,
    duration: PropTypes.number,
    message: PropTypes.any,
    onBannerClose: PropTypes.func,
    onKeyUpCloseIcon: PropTypes.func,
    roleCloseIcon: PropTypes.string,
    roleMessage: PropTypes.string,
    isStatic: PropTypes.bool,
    tabIndexBody: PropTypes.string,
    tabIndexCloseIcon: PropTypes.func,
    topOffset: PropTypes.string,
    topPalmOffset: PropTypes.string,
    type: PropTypes.string
  };

  static defaultProps = {
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

  state = {
    closePageBannerTimer: null,
    isShowing: false,
    tabIndexCloseIcon: '-1'
  };

  componentWillMount() {
    this._slideOpen();
  }

  componentWillUnmount() {
    const { closePageBannerTimer } = this.state;
    if (closePageBannerTimer) {
      clearTimeout(closePageBannerTimer);
    }
  }

  _open = () => {
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
  };

  _toggleHeight = (isShowing) => {
    const pageBanner = this.pageBanner;

    if (pageBanner) {
      const elementHeight = pageBanner.scrollHeight;
      const height = isShowing ? elementHeight : 0;

      pageBanner.style.height = `${height}px`;
    }
  };

  _slideOpen = () => {
    // for css animation, move to bottom of call stack
    const closePageBannerTimer = setTimeout(this._open);
    this.setState({ closePageBannerTimer });
  };

  _close = () => {
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
  };

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
}

export default BabyBanner;
