class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassedInMilliSeconds: 0
    }

    
    this.timer = null;

    // Need to bind to this object to use this in call back function.
    // If we don't bind the methods, the browser will complain about the this variable not having the properties we need.
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
  }


  // Because the start method is called whenever the user clicks the start button, we need to prevent the user from starting multiple intervals. We can add an if clause that checks whether a timer already exists. It simply checks if(!this.timer). If an interval already exists, it won't create another one.
  start() {
    if (!this.timer) {
      let startTime = Date.now();

      // We store the interval ID in this.timer so that we can use it in the stop method to stop the interval. The interval is executed every 250 milliseconds, or 4 times a second.
      this.timer = setInterval(() => {
        const stopTime = Date.now();
        const timePassedInMilliSeconds = stopTime - startTime + this.state.timePassedInMilliSeconds;

        this.setState({
          timePassedInMilliSeconds,
        });
        
        startTime = stopTime;
      }, 250); // Executed every 250 millisecond
    }
  }

  // The stop() method is very simple, it needs to clear the interval and set this.timer to null. It is run when the stop button is clicked.
  stop() {
    window.clearInterval(this.timer);
    this.timer = null;
  }

  // The reset() method simply calls the stop() method and reset this.state.timePassedInMilliSeconds to 0.
  reset() {
    this.stop();
    this.setState({
      timePassedInMilliSeconds: 0
    })
  }

  render() {
    return (
      <div>
        <h2 className="border px-3 py-4 rounded my-3 mx-auto text-center" style={{maxWidth: "300px"}}>
          {Math.floor(this.state.timePassedInMilliSeconds / 1000)} s
        </h2>
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-primary mr-2" onClick={this.start}>
            start
          </button>
          <button className="btn btn-outline-danger mr-2" onClick={this.stop}>
            stop
          </button>
          <button className="btn btn-outline-warning" onClick={this.reset}>
            reset
          </button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <StopWatch />,
  document.getElementById('root')
);