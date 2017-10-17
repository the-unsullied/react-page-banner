'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                @class BabyBanner
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                to set shim, make sure that <BabyBanner /> is at the top of your page.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var BabyBanner = function (_React$Component) {
  _inherits(BabyBanner, _React$Component);

  function BabyBanner() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BabyBanner);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BabyBanner.__proto__ || Object.getPrototypeOf(BabyBanner)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      closePageBannerTimer: null,
      isShowing: false,
      tabIndexCloseIcon: '-1'
    }, _this._open = function () {
      var _this$props = _this.props,
          duration = _this$props.duration,
          isStatic = _this$props.isStatic,
          tabIndexCloseIcon = _this$props.tabIndexCloseIcon;


      _this.setState({ isShowing: true });
      _this._toggleHeight(true);

      if (isStatic) {
        return;
      }

      _this.setState({
        tabIndexCloseIcon: tabIndexCloseIcon(true),
        closePageBannerTimer: setTimeout(_this._close, duration)
      });
    }, _this._toggleHeight = function (isShowing) {
      var pageBanner = _this.pageBanner;

      if (pageBanner) {
        var elementHeight = pageBanner.scrollHeight;
        var height = isShowing ? elementHeight : 0;

        pageBanner.style.height = height + 'px';
      }
    }, _this._slideOpen = function () {
      // for css animation, move to bottom of call stack
      var closePageBannerTimer = setTimeout(_this._open);
      _this.setState({ closePageBannerTimer: closePageBannerTimer });
    }, _this._close = function () {
      var _this$props2 = _this.props,
          afterClose = _this$props2.afterClose,
          bannerId = _this$props2.bannerId,
          onBannerClose = _this$props2.onBannerClose;


      _this.setState({ isShowing: false });
      _this._toggleHeight(false);

      clearTimeout(_this.state.closePageBannerTimer);
      _this.setState({ closePageBannerTimer: null });

      setTimeout(function () {
        if (typeof afterClose === 'function') {
          _this.setState({ tabIndexCloseIcon: '-1' });
          afterClose(bannerId);
        }

        if (typeof onBannerClose === 'function') {
          onBannerClose(bannerId);
        }
        // should match animation length
      }, 300);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BabyBanner, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._slideOpen();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var closePageBannerTimer = this.state.closePageBannerTimer;

      if (closePageBannerTimer) {
        clearTimeout(closePageBannerTimer);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var tabIndexCloseIcon = this.state.tabIndexCloseIcon;
      var _props = this.props,
          message = _props.message,
          type = _props.type,
          closeIconClass = _props.closeIconClass,
          ariaLabelCloseIcon = _props.ariaLabelCloseIcon,
          roleCloseIcon = _props.roleCloseIcon,
          onKeyUpCloseIcon = _props.onKeyUpCloseIcon,
          ariaLiveMessage = _props.ariaLiveMessage,
          roleMessage = _props.roleMessage,
          tabIndexBody = _props.tabIndexBody;

      var pageBannerClasses = (0, _classnames2.default)('page-banner', 'page-banner--' + type);

      if (!message) return null;

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
          _react2.default.createElement('span', {
            'aria-live': ariaLiveMessage,
            role: roleMessage,
            dangerouslySetInnerHTML: { __html: message }
          }),
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
  }]);

  return BabyBanner;
}(_react2.default.Component);

BabyBanner.displayName = 'BabyBanner';
BabyBanner.propTypes = {
  afterClose: _propTypes2.default.func,
  ariaLabelCloseIcon: _propTypes2.default.any,
  ariaLiveMessage: _propTypes2.default.string,
  bannerId: _propTypes2.default.number,
  closeIconClass: _propTypes2.default.string,
  duration: _propTypes2.default.number,
  message: _propTypes2.default.any,
  onBannerClose: _propTypes2.default.func,
  onKeyUpCloseIcon: _propTypes2.default.func,
  roleCloseIcon: _propTypes2.default.string,
  roleMessage: _propTypes2.default.string,
  isStatic: _propTypes2.default.bool,
  tabIndexBody: _propTypes2.default.string,
  tabIndexCloseIcon: _propTypes2.default.func,
  topOffset: _propTypes2.default.string,
  topPalmOffset: _propTypes2.default.string,
  type: _propTypes2.default.string
};
BabyBanner.defaultProps = {
  afterClose: function afterClose() {},
  ariaLabelCloseIcon: 'Close Icon',
  ariaLiveMessage: 'off',
  bannerId: 0,
  closeIconClass: 'icon-close',
  duration: 3000,
  message: '',
  onBannerClose: function onBannerClose() {},
  onKeyUpCloseIcon: function onKeyUpCloseIcon() {},
  roleCloseIcon: 'button',
  roleMessage: null,
  isStatic: false,
  tabIndexBody: '-1',
  tabIndexCloseIcon: function tabIndexCloseIcon() {
    return '-1';
  },
  topOffset: null,
  topPalmOffset: null,
  type: 'success'
};
exports.default = BabyBanner;
module.exports = exports['default'];
