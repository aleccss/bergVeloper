function Model(){
  this.name = "asd";
}

function myFunction(){
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

   getJSON('https://afternoon-island-10304.herokuapp.com/restaurants').then(function(data){
      alert('here is the json', data);
   }, function(status){
      alert('something went wrong');
   });
}