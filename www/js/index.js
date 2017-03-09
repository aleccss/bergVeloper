/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var restaurants;
var users;
var app = {
    // Application Constructor
    initialize: function() {
        // TO-DO - check if there is internet and load data from local
        Model.getRestaurants().then(function(data){
          restaurants = data;
        });
        Model.getUsers().then(function(data){
          users = data;
        });
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
      //  var listeningElement = parentElement.querySelector('.listening');
      //  var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

var signUpPopup = document.getElementById("signUpPopup");
var signUpButton = document.getElementById("signUpButton");
var span = document.getElementsByClassName("close")[0];
var saveUser = document.getElementById("saveUserButton");

signUpButton.onclick = function() {
  signUpPopup.style.display = "block";
};

span.onclick = function() {
  signUpPopup.style.display = "none";
};

saveUser.onclick = function() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var phone = document.getElementById("phone").value;
  var lastId = 0;
  for(i in users){
    if(users[i].username === username){
      console.log("error");
      return;
    }
    lastId = parseInt(users[i]._id);
  }
  if(username !== "" && password !== "" && phone !== ""){
    var id = lastId + 1;
    var user = {
      '_id' : id.toString(),
      'username' : username,
      'password' : password,
      'phone' : phone,
      'bookings' : []
    }
    Model.saveUser(user);
  }
  console.log(username + "|" + password + "|" + phone);
};

signInButton.onclick = function() {
   var username = document.getElementById("loginUsername").value;
   var password = document.getElementById("loginPassword").value;
   for(i in users){
      if((users[i].username === username) && (users[i].password === password)){
         var session = Session().getInstance();
         session.username = users[i].username;
         session.bookings = users[i].bookings;
         console.log("success");
         return location.href='restaurantPage.html';
      }
   }
   console.log("invalidUser");
}

window.onclick = function(event) {
  if(event.target == signUpPopup) {
    signUpPopup.style.display = "none";
  }
}
