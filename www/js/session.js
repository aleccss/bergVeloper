var Session = (function(){
	
	var instance;
	
	function createInstance() {
		var session = new Session();
		return session;
	}
	
	function init() {
		this.username = "";
		this.bookings = [{ restaurantId : "", date : "", tableId : ""}];
		this.localData = {};
	};
	
	function setUsername(username) {
		this.username = username;
	};
	
	function getUsername() { 
		return this.username;
	};
	
	function setBookings(bookings) {
		this.bookings = bookings;
	};
	
	function getBookings() { 
		return this.bookings;
	};
	
	function setLocalData(localData) {
		this.localData = localData;
	};
	
	function getLocalData() { 
		return this.localData;
	};
	
	return {
		getInstance: function () {
			if (!instance) {
				instance = createInstance();				
			}
			return instance;
		}
	}
});