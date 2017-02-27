var Model = {
  getRestaurants : function(){
    var getJSON = function(url){
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
   };

   return getJSON('https://afternoon-island-10304.herokuapp.com/restaurants').then(function(data){
      return data;
   }, function(status){
      result = { error : 'something went wrong' };
   });

  }
};
