class LoginPage extends React.Component{
	render() {
		return (
			<div>
			<div className="container">
				<div className="row" style={{ height : "60px"}}>
				</div>
			<div className="row">
				<div className="col-md-12">
					<img src="img/logo.jpg" className="logo"/>
				</div>
			</div>
			<div className="row" style={{height : "40px"}}>
			</div>
		</div>
		<div className="container input-group">
			<div className="row">
				<div className="col-xs-2"></div>
				<div className="col-xs-8"  style={{margin:"5px"}}>
					<input id="loginUsername" className="form-control" placeholder="Username"></input>
				</div>
				<div className="col-xs-2"></div>
			</div>
			<div className="row">
				<div className="col-xs-2"></div>
				<div className="col-xs-8" style={{margin:"5px"}}>
					<input id="loginPassword" className="form-control" type="password" placeholder="Password" style={{position:"initial"}}></input>
				</div>
				<div className="col-xs-2"></div>
			</div>
			<div className="row" style={{margin: "10px"}}>
				<div className="col-xs-1"></div>
				<div className="col-xs-5">
					<button type="button" className="btn signUpButton" >Register</button>
					<div id="signUpPopup" className="modal">
							<div className="modal-content input-group">
								<span className="close">&times;</span>
								<p className="myClass">SignUp Information</p>
								<input type="text" className="form-control" name="user" id="username" placeholder="username" style={{margin:"5px"}}></input>
								<input type="password" className="form-control" name="password" id="password" placeholder="password" style={{margin:"5px"}}></input>
								<input type="text" className="form-control" name="phone" id="phone" placeholder="phone" style={{margin:"5px"}}></input>
								<button type="button" className="btn" className="saveUser">Save</button>
							</div>
					</div>

				</div>
				<div className="col-xs-5">
					<button type="button" className="btn signInButton" onClick={() => signInClick()} >Sign In</button>
				</div>
				<div className="col-xs-1"></div>
			</div>
			<div className="row">
				<div className="col-xs-3"></div>
				<div className="col-xs-6">
					<a className="label label-default" className="notNowButton" onClick={() => goToAllPage()}>Not now</a>
				</div>
				<div className="col-xs-3"></div>
			</div>
			<div className="row" style={{height : "40px"}}></div>
		</div>
		<div className="container">
			 <div className="row">
				 <div className="col-xs-2"></div>
				 <div className="col-xs-4">
					 <img id="FbButton" className="fgButtons" src="img/icons/facebook.png" ></img>
				 </div>
				 <div className="col-xs-4">
					 <img id="GoogleButton" className="fgButtons"src="img/icons/googlePlus.png" ></img>
				 </div>
				 <div className="col-xs-2"></div>
			</div>
		</div>
		</div>
	);}
}
