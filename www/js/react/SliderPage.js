class Slider extends React.Component{
  render(){
    return React.createElement("div", null,
        React.createElement("div", { className : "swipe", id : "sliderSwipe"},
          React.createElement("div", {className : "swipe-wrap"},
            React.createElement("div", null,
              React.createElement("img", { src : "img/walkthrough/s1.png", style : { width : "100%"}})
            ),
            React.createElement("div", null,
              React.createElement("img", { src : "img/walkthrough/s2.png", style : { width : "100%"}})
            ),
            React.createElement("div", null,
              React.createElement("img", { src : "img/walkthrough/s3.png", style : { width : "100%"}})
            ),
            React.createElement("div", null,
              React.createElement("img", { src : "img/walkthrough/s4.png", style : { width : "100%"}})
            ),
            React.createElement("div", null,
              React.createElement("img", { src : "img/walkthrough/s5.png", style : { width : "100%"}})
            ),
            React.createElement("div", null)
          )
        ),
        React.createElement("div", { className : "row", style : { textAlign : "center", padding : "5px", width : "100%"}},
          React.createElement("span", { id : "goLeft", className: "glyphicon glyphicon-chevron-left back-glyphicon hidden", style  : {float : "left", marginLeft : "30px"}, onClick: () => window.sliderSwipe.prev()}),
          React.createElement("button", { className : "signInButton skipTutorialBtn", onClick: () => onSkipSlider()}, "Skip Tutorial"),
          React.createElement("span", { className: "glyphicon glyphicon-chevron-right back-glyphicon", style  : {float : "right"}, onClick: () => window.sliderSwipe.next()})
        )
      );
  };
}

function onSkipSlider(){
  Utils.goToLogin();
}
