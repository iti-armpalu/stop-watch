var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StopWatch = function (_React$Component) {
  _inherits(StopWatch, _React$Component);

  function StopWatch(props) {
    _classCallCheck(this, StopWatch);

    var _this = _possibleConstructorReturn(this, (StopWatch.__proto__ || Object.getPrototypeOf(StopWatch)).call(this, props));

    _this.state = {
      timePassedInMilliSeconds: 0
    };

    _this.timer = null;

    // Need to bind to this object to use this in call back function.
    // If we don't bind the methods, the browser will complain about the this variable not having the properties we need.
    _this.start = _this.start.bind(_this);
    _this.stop = _this.stop.bind(_this);
    _this.reset = _this.reset.bind(_this);
    return _this;
  }

  // Because the start method is called whenever the user clicks the start button, we need to prevent the user from starting multiple intervals. We can add an if clause that checks whether a timer already exists. It simply checks if(!this.timer). If an interval already exists, it won't create another one.


  _createClass(StopWatch, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      if (!this.timer) {
        var startTime = Date.now();

        // We store the interval ID in this.timer so that we can use it in the stop method to stop the interval. The interval is executed every 250 milliseconds, or 4 times a second.
        this.timer = setInterval(function () {
          var stopTime = Date.now();
          var timePassedInMilliSeconds = stopTime - startTime + _this2.state.timePassedInMilliSeconds;

          _this2.setState({
            timePassedInMilliSeconds: timePassedInMilliSeconds
          });

          startTime = stopTime;
        }, 250); // Executed every 250 millisecond
      }
    }

    // The stop() method is very simple, it needs to clear the interval and set this.timer to null. It is run when the stop button is clicked.

  }, {
    key: "stop",
    value: function stop() {
      window.clearInterval(this.timer);
      this.timer = null;
    }

    // The reset() method simply calls the stop() method and reset this.state.timePassedInMilliSeconds to 0.

  }, {
    key: "reset",
    value: function reset() {
      this.stop();
      this.setState({
        timePassedInMilliSeconds: 0
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          { className: "border px-3 py-4 rounded my-3 mx-auto text-center", style: { maxWidth: "300px" } },
          Math.floor(this.state.timePassedInMilliSeconds / 1000),
          " s"
        ),
        React.createElement(
          "div",
          { className: "d-flex justify-content-center" },
          React.createElement(
            "button",
            { className: "btn btn-outline-primary mr-2", onClick: this.start },
            "start"
          ),
          React.createElement(
            "button",
            { className: "btn btn-outline-danger mr-2", onClick: this.stop },
            "stop"
          ),
          React.createElement(
            "button",
            { className: "btn btn-outline-warning", onClick: this.reset },
            "reset"
          )
        )
      );
    }
  }]);

  return StopWatch;
}(React.Component);

ReactDOM.render(React.createElement(StopWatch, null), document.getElementById('root'));