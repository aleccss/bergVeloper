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
setUser : function(data){
   return this.setJSON('https://afternoon-island-10304.herokuapp.com/users', data).then(function(data){
      return data;
   }, function(status){
      result = { error : 'something went wrong' };
   });
},
};
