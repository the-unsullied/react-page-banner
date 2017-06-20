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
      ariaLiveMessage: 'off',
      ariaHidden: true,
      roleMessage: null,
      triggerClose: 0,
      triggerOpen: 0,
      tabIndexBody: '-1'
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
    ariaLiveMessage: React.PropTypes.string,
    ariaHidden: React.PropTypes.bool,
    roleMessage: React.PropTypes.string,
    triggerClose: React.PropTypes.number,
    triggerOpen: React.PropTypes.number,
    tabIndexBody: React.PropTypes.string
  },

  getInitialState() {
    return {
      closePageBannerTimer: null,
      isShowing: false,
      isFixed: false,
      height: null,
      tabIndexCloseIcon: '-1',
      ariaHidden: this.props.ariaHidden
    };
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
  },

  componentWillUnmount() {
    waypoint.destroy();
    const {  closePageBannerTimer } = this.state;
    if(closePageBannerTimer) {
      clearTimeout(closePageBannerTimer);
    }
  },

  componentWillReceiveProps(nextProps) {
    if(this.props.triggerClose !== nextProps.triggerClose) {
      this._close();
    }
    if(this.props.triggerOpen !== nextProps.triggerOpen) {
      this._slideOpen();
    }
    if(this.props.ariaHidden !== nextProps.ariaHidden) {
      this.setState({ ariaHidden: nextProps.ariaHidden });
    }
  },

  _handleWaypoint(direction) {
    const isFixed = direction === 'down';
    this.setState({ isFixed });
  },

  _open() {
    const { duration, hideShim, sticky } = this.props;
    this.setState({ isShowing: true });
    if(sticky) {
      return;
    }

    this.setState({
      tabIndexCloseIcon: this.props.tabIndexCloseIcon(true),
      closePageBannerTimer: setTimeout(this._close, duration),
      ariaHidden: false
    });
    if(hideShim) { return; }
    this.refs.pageBannerShim.style.height = `${this.state.height}px`;
  },

  _slideOpen() {
    //for css animation, move to bottom of call stack
    const closePageBannerTimer = setTimeout(this._open);
    this.setState({ closePageBannerTimer });
  },

  _close() {
    const { hideShim, sticky, afterClose, duration } = this.props;
    this.setState({ isShowing: false });
    if(!hideShim) {
      this.refs.pageBannerShim.style.height = `0px`;
    }
    clearTimeout(this.state.closePageBannerTimer);
    this.setState({ closePageBannerTimer: null });

    setTimeout(() => {
      this.setState({ ariaHidden: true });
      if(typeof this.props.afterClose === 'function') {
        this.setState({ tabIndexCloseIcon: '-1' });
        this.props.afterClose();
      }
      // should match animation length
    }, 300);
  },

  render() {
    const { isFixed, ariaHidden, isShowing, tabIndexCloseIcon } = this.state;
    const {
      message,
      type,
      hideShim,
      closeIconClass,
      ariaLabelCloseIcon,
      roleCloseIcon,
      onKeyUpCloseIcon,
      ariaLiveMessage,
      roleMessage,
      tabIndexBody
    } = this.props;
    const pageBannerClasses = classnames("page-banner",`page-banner--${type}`, {
      'page-banner--fixed': isFixed && isShowing
    });
    const pageBannerBodyClasses = classnames("page-banner__body", {
      'page-banner__body--showing': isShowing
    });

    return <div>
      <div ref="pageBanner"
        className={pageBannerClasses}
        aria-hidden={ariaHidden}
        style={{height: isShowing ? 'auto': 0}}>
        <div ref="pageBannerBody"
          tabIndex={tabIndexBody}
          className={pageBannerBodyClasses}>
          <span aria-live={ariaLiveMessage}
                role={roleMessage}>
            { message }
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
