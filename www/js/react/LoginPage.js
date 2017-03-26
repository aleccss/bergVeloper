class LoginPage extends React.Component{
	render() {
		return React.createElement("div", null,
			React.createElement("div", {className : "signInTop container"},
			  React.createElement("div", {className : "row", style : {height : "60px"}}),
				React.createElement("div", {className : "row"},
				  React.createElement("div", {className : "col-xs-12"},
					  React.createElement("img", {className : "logo", src : "img/logo.png"})
					)
				),
				React.createElement("div", {className : "row", style : {height : "40px"}})
			),
			React.createElement("div", {className : "signInContainer container input-group"},
			  React.createElement("div", {className : "row", style : {height : "40px"}}),
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
					React.createElement("div", {className : "col-xs-2"}),
					React.createElement("div", {className : "col-xs-8"},
						React.createElement("button", { className : "btn signInButton",
																						type : "button",
																						onClick : () => signInClick()}, "Sign In")
				  ),
					React.createElement("div", {className : "col-xs-2"})
			),
			React.createElement("div", {className : "row margin-top-20px"},
			  React.createElement("div", {className : "col-xs-2"}),
				React.createElement("div", {className : "col-xs-8"},
					React.createElement("a", { className : "signUpButton",
																					onClick : () => registerClick()}, "Register"),
					React.createElement("div", { className : "modal",
																			 id : "signUpPopup"},
						React.createElement("div", { className : "modal-content input-group"},
							React.createElement("span", { className : "glyphicon glyphicon-remove register-exit",
																						onClick : () => spanClick()}),
							React.createElement("p", { className : "register-info"}, "Register info"),
							React.createElement("input", { className : "form-control",
																						 name : "user",
																						 type : "text",
																						 id : "username",
																						 placeholder : "username",
																						 style : {margin : "10px 0px"}}),
							React.createElement("input", { className : "form-control margin-bottom-10px",
																						 name : "password",
																						 type : "password",
																						 id : "password",
																						 placeholder : "password",
																						 style : {marginBottom : "10px"}}),
							React.createElement("input", { className : "form-control margin-bottom-20px",
																						 name : "phone",
																						 type : "number",
																						 id : "phone",
																						 placeholder : "phone",
																						 style : {marginBottom : "20px"}}),
							React.createElement("button", { className : "btn saveUser signInButton",
																							type : "button",
																							onClick : () => saveUser()}, "Register")
						)
					)
				),
				React.createElement("div", {className : "col-xs-2"})
			),
			React.createElement("div", {className : "row", style : { marginTop : "95px"}},
				React.createElement("div", {className : "col-xs-2"}),
				React.createElement("div", {className : "col-xs-8"},
					React.createElement("a", { className : "notNowButton",
																					onClick : () => Utils.goToAllPage()}, "Skip")
			  ),
				React.createElement("div", {className : "col-xs-2"})
			),
			React.createElement("div", {className : "row", style : { height : "20px"}})
		 ),
		//  React.createElement("div", {className : "container"},
		//    React.createElement("div", {className : "col-xs-2"}),
		// 	 React.createElement("div", {className : "col-xs-4"},
		// 	   React.createElement("img", { className : "fgButtons",
		// 		 															id : "FbButton",
		// 																	src : "img/icons/facebook.png"})
		//    ),
		// 	 React.createElement("div", {className : "col-xs-4"},
		// 	 	 React.createElement("img", { className : "fgButtons",
		// 																  id : "GoogleButton",
		// 																  src : "img/icons/googlePlus.png"})
		//    ),
		// 	 React.createElement("div", {className : "col-xs-2"})
		 //  ),
		 React.createElement("div", {className : "container alert alert-danger margin-top-10px", id:"errorLogin", style : {display : "none", width : "90%", textAlign: "center", textTransform: "none"}},
	 		 React.createElement("strong", null, "ERROR! "),
			 "Invalid username or password."
		 ),
		 React.createElement("div", {className : "container alert alert-danger margin-top-10px", id:"emptyLogin", style : {display : "none", width : "90%", textAlign: "center", textTransform: "none"}},
	 		 React.createElement("strong", null, "ERROR! "),
			 "Empty username or password."
		 )
		);
	}
}
/** ---===== CODE =====--- **/
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
};

function signInClick() {
	 users = Session.users;
	 var username = document.getElementById("loginUsername").value;
   var password = document.getElementById("loginPassword").value;
	 if(username !== "" && password !== ""){
		 var loginUser = null;
		 users.map(function(user){
			 if((user.username === username) && (user.password === password)){
				 loginUser = user;
			 }
		 })
	   if(loginUser){
			 Session.bookings.forEach(function(item){
				 if(item.userId === loginUser._id){
					 loginUser.bookings.push(item);
				 }
			 });
			 window.localStorage.setItem("loggedUser", loginUser._id);
			 Utils.setLoggedUser(window.localStorage.getItem("loggedUser"));
			 Utils.goToAllPage();
		 }else{
	     Utils.showAndHideError("errorLogin");
	 	 }
   } else {
		 	Utils.showAndHideError("emptyLogin");
	 }
}
