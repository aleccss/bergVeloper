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
            ),
            React.createElement("div", null,
              React.createElement("img", { src : "img/restaurant6.png"})
            ),
            React.createElement("div", null)
          )
        ),
        React.createElement("div", { style : { textAlign : "center", paddingTop : "20px"}},
          React.createElement("span", { id : "goLeft", className: "glyphicon glyphicon-chevron-left back-glyphicon hidden", style  : {float : "left"}, onClick: () => window.sliderSwipe.prev()}),
          React.createElement("span", { className: "glyphicon glyphicon-chevron-right back-glyphicon", style  : {float : "right"}, onClick: () => window.sliderSwipe.next()})
        )
      );
  };
}
