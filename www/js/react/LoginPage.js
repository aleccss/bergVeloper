class LoginPage extends React.Component{
	render() {
		return React.createElement("div", null,
			React.createElement("div", {className : "container"},
			  React.createElement("div", {className : "row", style : {height : "60px"}}),
				React.createElement("div", {className : "row"},
				  React.createElement("div", {className : "col-xs-12"},
					  React.createElement("img", {className : "logo", src : "img/logo.jpg"})
					)
				),
				React.createElement("div", {className : "row", style : {height : "40px"}})
			),
			React.createElement("div", {className : "container input-group"},
				React.createElement("div", {className : "row"},
					React.createElement("div", {className : "col-xs-2"}),
					React.createElement("div", {className : "col-xs-8"},
						React.createElement("input", { className : "form-control",
																					 type : "text",
																				 	 id : "loginUsername",
																				   placeholder : "Username",
																				 	 style : {position : "initial"}})
						),
					React.createElement("div", {className : "col-xs-2"})
				),
				React.createElement("div", {className : "row margin-top-10px"},
					React.createElement("div", {className : "col-xs-2"}),
					React.createElement("div", {className : "col-xs-8"},
						React.createElement("input", { className : "form-control",
																					 type : "password",
																				 	 id : "loginPassword",
																				   placeholder : "Password",
																				 	 style : {position : "initial"}})
						),
					React.createElement("div", {className : "col-xs-2"})
				),
				React.createElement("div", {className : "row margin-top-10px"},
					React.createElement("div", {className : "col-xs-1"}),
					React.createElement("div", {className : "col-xs-5"},
						React.createElement("button", { className : "btn signUpButton",
																					  onClick : () => registerClick()}, "Register"),
						React.createElement("div", { className : "modal",
																				 id : "signUpPopup"},
							React.createElement("div", { className : "modal-content input-group"},
								React.createElement("span", { className : "close",
																							onClick : () => spanClick()}, "x"),
								React.createElement("p", { className : "myClass"}, "SignUp Information"),
								React.createElement("input", { className : "form-control",
																							 name : "user",
																							 type : "text",
																						 	 id : "username",
																						   placeholder : "username",
																						 	 style : {margin : "5px"}}),
							  React.createElement("input", { className : "form-control",
							 	 														   name : "password",
							 															   type : "password",
							 															   id : "password",
							 															   placeholder : "password",
							 															   style : {margin : "5px"}}),
							  React.createElement("input", { className : "form-control",
	 																					   name : "phone",
	 																					 	 type : "number",
	 																					   id : "phone",
	 																					   placeholder : "phone",
	 																					   style : {margin : "5px"}}),
							  React.createElement("button", { className : "btn saveUser",
																								type : "button",
																							  onClick : () => saveUser()}, "Save")
						  )
						)
					),
					React.createElement("div", {className : "col-xs-5"},
						React.createElement("button", { className : "btn signInButton",
																						type : "button",
																						onClick : () => signInClick()}, "Sign In")
				  ),
					React.createElement("div", {className : "col-xs-1"})
			),
			React.createElement("div", {className : "row"},
				React.createElement("div", {className : "col-xs-3"}),
				React.createElement("div", {className : "col-xs-6"},
					React.createElement("a", { className : "btn btn-default notNowButton",
																					onClick : () => goToAllPage()}, "Not now")
			  ),
				React.createElement("div", {className : "col-xs-3"})
			),
			React.createElement("div", {className : "row", style : { height : "40px"}})
		 ),
		 React.createElement("div", {className : "container"},
		   React.createElement("div", {className : "col-xs-2"}),
			 React.createElement("div", {className : "col-xs-4"},
			   React.createElement("img", { className : "fgButtons",
				 															id : "FbButton",
																			src : "img/icons/facebook.png"})
		   ),
			 React.createElement("div", {className : "col-xs-4"},
			 	 React.createElement("img", { className : "fgButtons",
																		  id : "GoogleButton",
																		  src : "img/icons/googlePlus.png"})
		   ),
			 React.createElement("div", {className : "col-xs-2"})
	 	 )
		);
	}
}

/** ---===== CODE =====--- **/

function goToAllPage(){
	var data = Session.restaurants;
	data[0].CurrentPage = "all";
	var appState = new Utils.State(data, Utils.handler);
	Session.previousState = Session.appState;
	Session.appState = appState;
	window.render(appState);
}

window.onclick = function(event) {
	var signUpPopup = document.getElementById("signUpPopup");
  if(event.target == signUpPopup) {
    signUpPopup.style.display = "none";
  }
}

function registerClick() {
	var signUpPopup = document.getElementById("signUpPopup");
	signUpPopup.style.display = "block";
}

function spanClick() {
	var signUpPopup = document.getElementById("signUpPopup");
  signUpPopup.style.display = "none";
};

function saveUser() {
	users = Session.users;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var phone = document.getElementById("phone").value;
  if(username !== "" && password !== "" && phone !== ""){
		var lastId = parseInt(users[users.length-1]._id);
    var id = lastId + 1;
    var user = {
      '_id' : id.toString(),
      'username' : username,
      'password' : password,
      'phone' : phone,
      'bookings' : []
    }
    Model.saveUser(user);
		users.push(user);
  }
  console.log(username + "|" + password + "|" + phone);
};

function signInClick() {
	 users = Session.users;
	 var username = document.getElementById("loginUsername").value;
   var password = document.getElementById("loginPassword").value;
	 if(username !== "" && password !== ""){
		 var loginUser = null;
		 for(i in users){
			 if((users[i].username === username) && (users[i].password === password)){
				 loginUser = users[i];
				 break;
			 }
		 }
	   if(loginUser){
			 Session.loggedUser = loginUser;
			 console.log("success");
			 goToAllPage();
		 }else{
	     console.log("invalidUser");
	 	 }
   } else {
		 console.log("empty user or pass");
	 }
}
