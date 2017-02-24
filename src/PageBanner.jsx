/**
@class PageBanner
to set shim, make sure that <PageBanner /> is at the top of your page.
*/
import React from 'react';
import classnames from 'classnames';
import './waypoints';

let waypoint;

export default React.createClass({
  getDefaultProps: function() {
    return {
      message: '',
      type: 'success',
      duration: 3000,
      afterClose: () => {},
      topOffset: null,
      topPalmOffset: null,
      hideShim: false,
      sticky: false,
      closeIconClass: '',
      tabIndexCloseIcon: () => '-1',
      ariaLabelCloseIcon: 'Close Icon',
      roleCloseIcon: 'button',
      onKeyUpCloseIcon: () => {},
      ariaLabelMessage: null,
      ariaLiveMessage: 'off',
      roleMessage: null,
      triggerClose: 0
    };
  },

  propTypes: {
    message: React.PropTypes.any,
    type: React.PropTypes.string,
    duration: React.PropTypes.number,
    afterClose: React.PropTypes.func,
    topOffset: React.PropTypes.string,
    topPalmOffset: React.PropTypes.string,
    hideShim: React.PropTypes.bool,
    sticky: React.PropTypes.bool,
    closeIconClass: React.PropTypes.string,
    tabIndexCloseIcon: React.PropTypes.func,
    ariaLabelCloseIcon: React.PropTypes.any,
    roleCloseIcon: React.PropTypes.string,
    onKeyUpCloseIcon: React.PropTypes.func,
    ariaLabelMessage: React.PropTypes.string,
    ariaLiveMessage: React.PropTypes.string,
    roleMessage: React.PropTypes.string,
    triggerClose: React.PropTypes.number
  },

  getInitialState() {
    return {
      closePageBannerTimer: null,
      isShowing: false,
      isFixed: false,
      height: null,
      showStripped: true,
      tabIndexCloseIcon: '-1'
    }
  },

  componentDidMount() {
    //set the height of the banner to animate in and out correctly
    const el = this.refs.pageBannerBody;
    var height = el.clientHeight;
    el.style.top = `${-(height)}px`;

    this.setState({ height });


    waypoint = new Waypoint({
      element: this.refs.pageBanner,
      handler: function(direction) {
        this._handleWaypoint(direction);
      }.bind(this)
    });

    //for css animation, move to bottom of call stack
    const closePageBannerTimer = setTimeout(this._toggleIsShowing);
    this.setState({ closePageBannerTimer });
  },

  componentWillUnmount() {
    waypoint.destroy();
    const {  closePageBannerTimer } = this.state;
    if(closePageBannerTimer) {
      clearTimeout(closePageBannerTimer);
    }
  },

  componentWillUpdate(nextProps, nextState) {
    const isNowShowing = !this.state.isShowing && nextState.isShowing;
    if(isNowShowing) {
      // This is in order for the banner content to be read properly on iOS VoiceReader.
      // HTML needs to be stripped out of the message when it appears on screen, in order
      // to give VoiceReader something it can handle.
      this.setState({ showStripped: true });
      setTimeout(() => {
        this.setState({ showStripped: false });
      }, 250)
    }
    if(this.state.isShowing !== nextState.isShowing) {
      if(!nextState.isShowing) {
        return this.setState({ tabIndexCloseIcon: '-1' });
      }
      const tabIndexCloseIcon = this.props.tabIndexCloseIcon(nextState.isShowing);
      this.setState({ tabIndexCloseIcon });
    }
    if(this.props.triggerClose !== nextProps.triggerClose) {
      this._close();
    }
  },

  _handleWaypoint(direction) {
    const isFixed = direction === 'down';
    this.setState({ isFixed });
  },

  _toggleIsShowing() {
    const isShowing = !this.state.isShowing;
    const { duration, hideShim, sticky } = this.props;
    this.setState({ isShowing });
    if(isShowing) {
      if(sticky) {
        return;
      }
      this.setState({closePageBannerTimer: setTimeout(this._close, duration)});
      if(hideShim) { return; }
      this.refs.pageBannerShim.style.height = `${this.state.height}px`;
    } else {
      if(hideShim) { return; }
      this.refs.pageBannerShim.style.height = `0px`;
    }
  },

  _close() {
    const { afterClose, duration } = this.props;
    this._toggleIsShowing();
    clearTimeout(this.state.closePageBannerTimer);

    setTimeout(() => {
      if(typeof this.props.afterClose === 'function') {
        this.props.afterClose();
      }
    }, duration);
  },

  stripHTML(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;

    const strippedText = tmp.textContent || tmp.innerText || "";
    tmp.remove && tmp.remove();
    return strippedText;
  },

  render() {
    const { isFixed, isShowing, showStripped, tabIndexCloseIcon } = this.state;
    const {
      message,
      type,
      hideShim,
      closeIconClass,
      ariaLabelCloseIcon,
      roleCloseIcon,
      onKeyUpCloseIcon,
      ariaLabelMessage,
      ariaLiveMessage,
      roleMessage
    } = this.props;
    const strippedMessage = this.stripHTML(message);
    const pageBannerClasses = classnames("page-banner",`page-banner--${type}`, {
      'page-banner--fixed': isFixed && isShowing
    });
    const pageBannerBodyClasses = classnames("page-banner__body", {
      'page-banner__body--showing': isShowing
    });

    return <div>
      <div ref="pageBanner"
        className={pageBannerClasses}
        style={{height: isShowing ? 'auto': 0}}>
        <div ref="pageBannerBody"
          className={pageBannerBodyClasses}>
          <span aria-label={ariaLabelMessage || strippedMessage}
                aria-live={showStripped ? 'off' : ariaLiveMessage}
                role={roleMessage}>
            { showStripped ? strippedMessage : message }
          </span>
          <div className="page-banner__close">
            <i className={`page-banner__icon-close ${closeIconClass}`}
               onClick={this._close}
               tabIndex={tabIndexCloseIcon}
               aria-label={ariaLabelCloseIcon}
               role={roleCloseIcon}
               onKeyUp={onKeyUpCloseIcon} />
          </div>
        </div>
      </div>
      { hideShim ? null : <div ref="pageBannerShim" className="page-banner__shim"></div> }
    </div>
  }
});
