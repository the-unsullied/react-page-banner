'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 @class BabyBanner
 to set shim, make sure that <BabyBanner /> is at the top of your page.
 */

exports.default = _react2.default.createClass({
  displayName: 'BabyBanner',

  propTypes: {
    afterClose: _react2.default.PropTypes.func,
    ariaLabelCloseIcon: _react2.default.PropTypes.any,
    ariaLiveMessage: _react2.default.PropTypes.string,
    bannerId: _react2.default.PropTypes.number,
    closeIconClass: _react2.default.PropTypes.string,
    duration: _react2.default.PropTypes.number,
    message: _react2.default.PropTypes.any,
    onBannerClose: _react2.default.PropTypes.func,
    onKeyUpCloseIcon: _react2.default.PropTypes.func,
    roleCloseIcon: _react2.default.PropTypes.string,
    roleMessage: _react2.default.PropTypes.string,
    sticky: _react2.default.PropTypes.bool,
    tabIndexBody: _react2.default.PropTypes.string,
    tabIndexCloseIcon: _react2.default.PropTypes.func,
    topOffset: _react2.default.PropTypes.string,
    topPalmOffset: _react2.default.PropTypes.string,
    type: _react2.default.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      afterClose: function afterClose() {},
      ariaLabelCloseIcon: 'Close Icon',
      ariaLiveMessage: 'off',
      bannerId: 0,
      closeIconClass: '',
      duration: 3000,
      message: '',
      onBannerClose: function onBannerClose() {},
      onKeyUpCloseIcon: function onKeyUpCloseIcon() {},
      roleCloseIcon: 'button',
      roleMessage: null,
      sticky: false,
      tabIndexBody: '-1',
      tabIndexCloseIcon: function tabIndexCloseIcon() {
        return '-1';
      },
      topOffset: null,
      topPalmOffset: null,
      type: 'success'
    };
  },
  getInitialState: function getInitialState() {
    return {
      closePageBannerTimer: null,
      isShowing: false,
      tabIndexCloseIcon: '-1'
    };
  },
  componentWillMount: function componentWillMount() {
    this._slideOpen();
  },
  componentWillUnmount: function componentWillUnmount() {
    var closePageBannerTimer = this.state.closePageBannerTimer;

    if (closePageBannerTimer) {
      clearTimeout(closePageBannerTimer);
    }
  },
  _open: function _open() {
    var _props = this.props,
        duration = _props.duration,
        sticky = _props.sticky,
        tabIndexCloseIcon = _props.tabIndexCloseIcon;


    this.setState({ isShowing: true });
    this._toggleHeight(true);

    if (sticky) {
      return;
    }

    this.setState({
      tabIndexCloseIcon: tabIndexCloseIcon(true),
      closePageBannerTimer: setTimeout(this._close, duration)
    });
  },
  _toggleHeight: function _toggleHeight(isShowing) {
    var pageBanner = this.pageBanner;

    if (pageBanner) {
      var elementHeight = pageBanner.scrollHeight;
      var height = isShowing ? elementHeight : 0;

      pageBanner.style.height = height + 'px';
    }
  },
  _slideOpen: function _slideOpen() {
    // for css animation, move to bottom of call stack
    var closePageBannerTimer = setTimeout(this._open);
    this.setState({ closePageBannerTimer: closePageBannerTimer });
  },
  _close: function _close() {
    var _this = this;

    var _props2 = this.props,
        afterClose = _props2.afterClose,
        bannerId = _props2.bannerId,
        onBannerClose = _props2.onBannerClose;


    this.setState({ isShowing: false });
    this._toggleHeight(false);

    clearTimeout(this.state.closePageBannerTimer);
    this.setState({ closePageBannerTimer: null });

    setTimeout(function () {
      if (typeof afterClose === 'function') {
        _this.setState({ tabIndexCloseIcon: '-1' });
        afterClose(bannerId);
      }
      onBannerClose(bannerId);
      // should match animation length
    }, 300);
  },
  render: function render() {
    var _this2 = this;

    var tabIndexCloseIcon = this.state.tabIndexCloseIcon;
    var _props3 = this.props,
        message = _props3.message,
        type = _props3.type,
        closeIconClass = _props3.closeIconClass,
        ariaLabelCloseIcon = _props3.ariaLabelCloseIcon,
        roleCloseIcon = _props3.roleCloseIcon,
        onKeyUpCloseIcon = _props3.onKeyUpCloseIcon,
        ariaLiveMessage = _props3.ariaLiveMessage,
        roleMessage = _props3.roleMessage,
        tabIndexBody = _props3.tabIndexBody;


    var pageBannerClasses = (0, _classnames2.default)('page-banner', 'page-banner--' + type);

    return _react2.default.createElement(
      'div',
      {
        className: pageBannerClasses,
        ref: function ref(pageBanner) {
          _this2.pageBanner = pageBanner;
        }
      },
      _react2.default.createElement(
        'div',
        {
          tabIndex: tabIndexBody,
          className: 'page-banner__body',
          ref: function ref(bannerBody) {
            _this2.pageBannerBody = bannerBody;
          }
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
    );
  }
});
module.exports = exports['default'];
