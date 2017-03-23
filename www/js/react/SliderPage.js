class Slider extends React.Component{
  render(){
    return React.createElement("div", null,
        React.createElement("div", { className : "swipe", id : "sliderSwipe"},
          React.createElement("div", {className : "swipe-wrap"},
            React.createElement("div", null,
              React.createElement("img", { src : "img/restaurant1.png"})
            ),
            React.createElement("div", null,
              React.createElement("img", { src : "img/restaurant2.png"})
            ),
            React.createElement("div", null,
              React.createElement("img", { src : "img/restaurant3.png"})
            ),
            React.createElement("div", null,
              React.createElement("img", { src : "img/restaurant4.png"})
            ),
            React.createElement("div", null,
              React.createElement("img", { src : "img/restaurant5.png"})
            )
          )
        ),
        React.createElement("div", { style : { textAlign : "center", paddingTop : "20px"}},
          React.createElement("button", { onClick : () => window.sliderSwipe.prev()}, "prev"),
          React.createElement("button", { onClick : () => window.sliderSwipe.next()}, "next")
        )
      );
  };
}
