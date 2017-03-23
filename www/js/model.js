var Model = {
  getJSON : function(url){
    return new Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();
      xhr.open('get', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if(status == 200) {
         resolve(xhr.response);
        } else {
         reject(status);
        }
      };
      xhr.send();
    });
 },
 setJSON : function(url, data){
   return new Promise(function(resolve, reject){
     var xhr = new XMLHttpRequest();
     xhr.open('post', url, true);
     xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
     xhr.onload = function() {
       var status = xhr.status;
       if(status == 200) {
         resolve(xhr.response);
       } else {
         reject(status);
       }
     };
     xhr.send(JSON.stringify(data));
  })
},

getRestaurants : function(){
 return this.getJSON('https://afternoon-island-10304.herokuapp.com/restaurants').then(function(data){
    return data;
 }, function(status){
    result = { error : 'something went wrong' };
 });
},
getUsers : function(){
  return this.getJSON('https://afternoon-island-10304.herokuapp.com/users').then(function(data){
    return data;
  }, function(status){
    result = { error : 'something went wrong' };
  });
},
saveUser : function(data){
   return this.setJSON('https://afternoon-island-10304.herokuapp.com/users', data).then(function(data){
      return data;
   }, function(status){
      result = { error : 'something went wrong' };
   });
},
getBookings : function(){
  return this.getJSON('https://afternoon-island-10304.herokuapp.com/bookings').then(function(data){
    return data;
  }, function(status){
    result = { error : 'something went wrong' };
  });
},
addBooking : function(data){
   return this.setJSON('https://afternoon-island-10304.herokuapp.com/bookings', data).then(function(data){
      return data;
   }, function(status){
      result = { error : 'something went wrong' };
   });
},

processBooking : function(booking){
  bookings = Session.bookings;
  var lastId = parseInt(bookings[bookings.length-1]._id);
  var id = lastId + 1;
  booking._id = id.toString();
  this.addBooking(booking);
	bookings.push(booking);
  var user = Session.loggedUser;
  user.bookings.push(booking);
}
};
