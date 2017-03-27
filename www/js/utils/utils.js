var Utils = {
  State : function(initialState, handler){
  	var s = {};

  	function dispatch(action){
  		initialState = handler(initialState, action);
  		render(this);
  	}

  	function getState(){
  		return initialState;
  	}

  	s.dispatch = dispatch.bind(s);
  	s.getState = getState.bind(s);

  	return s;
  },
  handler : function(state, action){
  	var state = this.currentRestaurantHandler(state, action);
  	state = this.currentPageHandler(state,action);
  	return state;
  },
  currentRestaurantHandler : function(state, action){
  	if(action.Type === "changeRestaurant"){
  		return {
  			state,
  			CurrentRestaurant : action.Payload
  		};
  	}
  	return state;
  },
  currentPageHandler : function(state, action){
  	if(action.Type === "changePage"){
  		return {
  			state,
  			CurrentPage : action.Payload.CurrentPage
  		};
  	}
  	return state;
  },
  onBack : function(){
    var appState = Session.previousState;
    Session.appState = appState;
    render(appState);
  },
  addHours : function(date, h){
    var result = new Date(date);
    result.setTime(result.getTime() + (h*60*60*1000));
    return result;
  },
  substractHours : function(date, h){
    var result = new Date(date);
    result.setTime(result.getTime() - (h*60*60*1000));
    return result;
  },
  showAndHideError : function(id) {
    $("#"+id).show();
    setTimeout(function () {
       $("#" + id).hide();
     }, 2000);
  },
  goToLogin : function(){
    var data = [];
    data.push({CurrentPage : "login"});
    var appState = new Utils.State(data, window.handler);
    Session.appState = appState;
    window.render(appState);
  },
  goToAllPage : function(){
  	var data = Session.restaurants;
  	data[0].CurrentPage = "all";
  	var appState = new Utils.State(data, Utils.handler);
  	Session.previousState = appState;
  	Session.appState = appState;
  	window.render(appState);
  },
  showTutorialPage : function(){
    var data = [];
    data.push({CurrentPage : "slider"});
    var appState = new Utils.State(data, window.handler);
    Session.appState = appState;
    window.render(appState);
  },
  setLoggedUser : function(id){
    if(id === null){
      return;
    }
    Session.loggedUser = Session.users.find(function(item){
                                              return item._id === id});
  },
  formatDateTime : function(dateTime){
    var result = "";
    if(dateTime.indexOf(".") !== -1){
      result = dateTime.substr(0, dateTime.indexOf(".") - 3);
      result = result.replace("T", " ");
    } else {
      result = dateTime.replace("T", " ");
    }
    return result;
  },
  createAlert : function(id, type, text){
    return React.createElement("div", {className : "container alert alert-danger margin-top-10px", id:id, style : {display : "none", width : "90%", textAlign: "center", textTransform: "none"}},
               React.createElement("strong", null,type),text)
  }
};
