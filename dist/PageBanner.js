'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./waypoints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var waypoint = void 0; /**
                        @class PageBanner
                        to set shim, make sure that <PageBanner /> is at the top of your page.
                        */
exports.default = _react2.default.createClass({

  propTypes: {
    message: _react2.default.PropTypes.any,
    type: _react2.default.PropTypes.string,
    duration: _react2.default.PropTypes.number,
    afterClose: _react2.default.PropTypes.func,
    topOffset: _react2.default.PropTypes.string,
    topPalmOffset: _react2.default.PropTypes.string,
    hideShim: _react2.default.PropTypes.bool,
    sticky: _react2.default.PropTypes.bool,
    closeIconClass: _react2.default.PropTypes.string,
    tabIndexCloseIcon: _react2.default.PropTypes.func,
    ariaLabelCloseIcon: _react2.default.PropTypes.any,
    roleCloseIcon: _react2.default.PropTypes.string,
    onKeyUpCloseIcon: _react2.default.PropTypes.func,
    ariaLiveMessage: _react2.default.PropTypes.string,
    ariaHidden: _react2.default.PropTypes.bool,
    roleMessage: _react2.default.PropTypes.string,
    triggerClose: _react2.default.PropTypes.number,
    triggerOpen: _react2.default.PropTypes.number,
    tabIndexBody: _react2.default.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      message: '',
      type: 'success',
      duration: 3000,
      afterClose: function afterClose() {},
      topOffset: null,
      topPalmOffset: null,
      hideShim: false,
      sticky: false,
      closeIconClass: '',
      tabIndexCloseIcon: function tabIndexCloseIcon() {
        return '-1';
      },
      ariaLabelCloseIcon: 'Close Icon',
      roleCloseIcon: 'button',
      onKeyUpCloseIcon: function onKeyUpCloseIcon() {},
      ariaLiveMessage: 'off',
      ariaHidden: true,
      roleMessage: null,
      triggerClose: 0,
      triggerOpen: 0,
      tabIndexBody: '-1'
    };
  },
  getInitialState: function getInitialState() {
    return {
      closePageBannerTimer: null,
      isShowing: false,
      isFixed: false,
      height: null,
      tabIndexCloseIcon: '-1',
      ariaHidden: this.props.ariaHidden
    };
  },
  componentDidMount: function componentDidMount() {
    // set the height of the banner to animate in and out correctly
    var el = this.pageBannerBody;
    var height = el.clientHeight;
    el.style.top = -height + 'px';

    this.setState({ height: height });

    waypoint = new Waypoint({
      element: this.pageBanner,
      handler: function (direction) {
        this._handleWaypoint(direction);
      }.bind(this)
    });
  },
  componentWillUnmount: function componentWillUnmount() {
    waypoint.destroy();
    var closePageBannerTimer = this.state.closePageBannerTimer;

    if (closePageBannerTimer) {
      clearTimeout(closePageBannerTimer);
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.triggerClose !== nextProps.triggerClose) {
      this._close();
    }
    if (this.props.triggerOpen !== nextProps.triggerOpen) {
      this._slideOpen();
    }
    if (this.props.ariaHidden !== nextProps.ariaHidden) {
      this.setState({ ariaHidden: nextProps.ariaHidden });
    }
  },
  _handleWaypoint: function _handleWaypoint(direction) {
    var isFixed = direction === 'down';
    this.setState({ isFixed: isFixed });
  },
  _open: function _open() {
    var _props = this.props,
        duration = _props.duration,
        hideShim = _props.hideShim,
        sticky = _props.sticky;

    this.setState({ isShowing: true });

    if (sticky) {
      return;
    }

    this.setState({
      tabIndexCloseIcon: this.props.tabIndexCloseIcon(true),
      closePageBannerTimer: setTimeout(this._close, duration),
      ariaHidden: false
    });
    if (hideShim) {
      return;
    }
    this.pageBannerShim.style.height = this.state.height + 'px';
  },
  _slideOpen: function _slideOpen() {
    // for css animation, move to bottom of call stack
    var closePageBannerTimer = setTimeout(this._open);
    this.setState({ closePageBannerTimer: closePageBannerTimer });
  },
  _close: function _close() {
    var _this = this;

    var hideShim = this.props.hideShim;

    this.setState({ isShowing: false });
    if (!hideShim) {
      this.pageBannerShim.style.height = '0px';
    }
    clearTimeout(this.state.closePageBannerTimer);
    this.setState({ closePageBannerTimer: null });

    setTimeout(function () {
      _this.setState({ ariaHidden: true });
      if (typeof _this.props.afterClose === 'function') {
        _this.setState({ tabIndexCloseIcon: '-1' });
        _this.props.afterClose();
      }
      // should match animation length
    }, 300);
  },
  render: function render() {
    var _this2 = this;

    var _state = this.state,
        isFixed = _state.isFixed,
        ariaHidden = _state.ariaHidden,
        isShowing = _state.isShowing,
        tabIndexCloseIcon = _state.tabIndexCloseIcon;
    var _props2 = this.props,
        message = _props2.message,
        type = _props2.type,
        hideShim = _props2.hideShim,
        closeIconClass = _props2.closeIconClass,
        ariaLabelCloseIcon = _props2.ariaLabelCloseIcon,
        roleCloseIcon = _props2.roleCloseIcon,
        onKeyUpCloseIcon = _props2.onKeyUpCloseIcon,
        ariaLiveMessage = _props2.ariaLiveMessage,
        roleMessage = _props2.roleMessage,
        tabIndexBody = _props2.tabIndexBody;


    var pageBannerClasses = (0, _classnames2.default)('page-banner', 'page-banner--' + type, {
      'page-banner--fixed': isFixed && isShowing
    });
    var pageBannerBodyClasses = (0, _classnames2.default)('page-banner__body', {
      'page-banner__body--showing': isShowing
    });

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        {
          ref: function ref(pageBanner) {
            _this2.pageBanner = pageBanner;
          },
          className: pageBannerClasses,
          'aria-hidden': ariaHidden,
          style: { height: isShowing ? 'auto' : 0 }
        },
        _react2.default.createElement(
          'div',
          {
            ref: function ref(bannerBody) {
              _this2.pageBannerBody = bannerBody;
            },
            tabIndex: tabIndexBody,
            className: pageBannerBodyClasses
          },
          _react2.default.createElement(
            'span',
            {
              'aria-live': ariaLiveMessage,
              role: roleMessage
            },
            message
          ),
          _react2.default.createElement(
            'div',
            { className: 'page-banner__close' },
            _react2.default.createElement('i', {
              className: 'page-banner__icon-close ' + closeIconClass,
              onClick: this._close,
              tabIndex: tabIndexCloseIcon,
              'aria-label': ariaLabelCloseIcon,
              role: roleCloseIcon,
              onKeyUp: onKeyUpCloseIcon
            })
          )
        )
      ),
      hideShim ? null : _react2.default.createElement('div', {
        ref: function ref(bannerShim) {
          _this2.pageBannerShim = bannerShim;
        },
        className: 'page-banner__shim'
      })
    );
  }
});
module.exports = exports['default'];
