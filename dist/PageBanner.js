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
  getDefaultProps: function getDefaultProps() {
    return {
      message: '',
      type: 'success',
      duration: 30000,
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
      ariaLabelMessage: null,
      ariaLiveMessage: 'off',
      roleMessage: null,
      triggerClose: 0
    };
  },

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
    ariaLabelMessage: _react2.default.PropTypes.string,
    ariaLiveMessage: _react2.default.PropTypes.string,
    roleMessage: _react2.default.PropTypes.string,
    triggerClose: _react2.default.PropTypes.number
  },

  getInitialState: function getInitialState() {
    return {
      closePageBannerTimer: null,
      isShowing: false,
      isFixed: false,
      height: null,
      showStripped: true,
      tabIndexCloseIcon: '-1'
    };
  },
  componentDidMount: function componentDidMount() {
    //set the height of the banner to animate in and out correctly
    var el = this.refs.pageBannerBody;
    var height = el.clientHeight;
    el.style.top = -height + 'px';

    this.setState({ height: height });

    waypoint = new Waypoint({
      element: this.refs.pageBanner,
      handler: function (direction) {
        this._handleWaypoint(direction);
      }.bind(this)
    });

    //for css animation, move to bottom of call stack
    var closePageBannerTimer = setTimeout(this._toggleIsShowing);
    this.setState({ closePageBannerTimer: closePageBannerTimer });
  },
  componentWillUnmount: function componentWillUnmount() {
    waypoint.destroy();
    var closePageBannerTimer = this.state.closePageBannerTimer;

    if (closePageBannerTimer) {
      clearTimeout(closePageBannerTimer);
    }
  },
  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    var _this = this;

    var isNowShowing = !this.state.isShowing && nextState.isShowing;
    if (isNowShowing) {
      // This is in order for the banner content to be read properly on iOS VoiceReader.
      // HTML needs to be stripped out of the message when it appears on screen, in order
      // to give VoiceReader something it can handle.
      this.setState({ showStripped: true });
      setTimeout(function () {
        _this.setState({ showStripped: false });
      }, 250);
    }
    if (this.state.isShowing !== nextState.isShowing) {
      var tabIndexCloseIcon = this.props.tabIndexCloseIcon(nextState.isShowing);
      this.setState({ tabIndexCloseIcon: tabIndexCloseIcon });
    }
    if (this.props.triggerClose !== nextProps.triggerClose) {
      this._close();
    }
  },
  _handleWaypoint: function _handleWaypoint(direction) {
    var isFixed = direction === 'down';
    this.setState({ isFixed: isFixed });
  },
  _toggleIsShowing: function _toggleIsShowing() {
    var isShowing = !this.state.isShowing;
    var _props = this.props;
    var duration = _props.duration;
    var hideShim = _props.hideShim;
    var sticky = _props.sticky;

    this.setState({ isShowing: isShowing });
    if (isShowing) {
      if (sticky) {
        return;
      }
      this.setState({ closePageBannerTimer: setTimeout(this._close, duration) });
      if (hideShim) {
        return;
      }
      this.refs.pageBannerShim.style.height = this.state.height + 'px';
    } else {
      if (hideShim) {
        return;
      }
      this.refs.pageBannerShim.style.height = '0px';
    }
  },
  _close: function _close() {
    var _this2 = this;

    var _props2 = this.props;
    var afterClose = _props2.afterClose;
    var duration = _props2.duration;

    this._toggleIsShowing();
    clearTimeout(this.state.closePageBannerTimer);

    setTimeout(function () {
      if (typeof _this2.props.afterClose === 'function') {
        _this2.props.afterClose();
      }
    }, duration);
  },
  stripHTML: function stripHTML(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;

    var strippedText = tmp.textContent || tmp.innerText || "";
    tmp.remove && tmp.remove();
    return strippedText;
  },
  render: function render() {
    var _state = this.state;
    var isFixed = _state.isFixed;
    var isShowing = _state.isShowing;
    var showStripped = _state.showStripped;
    var tabIndexCloseIcon = _state.tabIndexCloseIcon;
    var _props3 = this.props;
    var message = _props3.message;
    var type = _props3.type;
    var hideShim = _props3.hideShim;
    var closeIconClass = _props3.closeIconClass;
    var ariaLabelCloseIcon = _props3.ariaLabelCloseIcon;
    var roleCloseIcon = _props3.roleCloseIcon;
    var onKeyUpCloseIcon = _props3.onKeyUpCloseIcon;
    var ariaLabelMessage = _props3.ariaLabelMessage;
    var ariaLiveMessage = _props3.ariaLiveMessage;
    var roleMessage = _props3.roleMessage;

    var strippedMessage = this.stripHTML(message);
    var pageBannerClasses = (0, _classnames2.default)("page-banner", 'page-banner--' + type, {
      'page-banner--fixed': isFixed && isShowing
    });
    var pageBannerBodyClasses = (0, _classnames2.default)("page-banner__body", {
      'page-banner__body--showing': isShowing
    });

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { ref: 'pageBanner',
          className: pageBannerClasses,
          style: { height: isShowing ? 'auto' : 0 } },
        _react2.default.createElement(
          'div',
          { ref: 'pageBannerBody',
            className: pageBannerBodyClasses },
          _react2.default.createElement(
            'div',
            { className: 'page-banner__close' },
            _react2.default.createElement('i', { className: 'page-banner__icon-close ' + closeIconClass,
              onClick: this._close,
              tabIndex: tabIndexCloseIcon,
              'aria-label': ariaLabelCloseIcon,
              role: roleCloseIcon,
              onKeyUp: onKeyUpCloseIcon })
          ),
          _react2.default.createElement(
            'span',
            { 'aria-label': ariaLabelMessage || strippedMessage,
              'aria-live': showStripped ? 'off' : ariaLiveMessage,
              role: roleMessage },
            showStripped ? strippedMessage : message
          )
        )
      ),
      hideShim ? null : _react2.default.createElement('div', { ref: 'pageBannerShim', className: 'page-banner__shim' })
    );
  }
});
module.exports = exports['default'];
