initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
      user.getIdToken().then(function(accessToken) {
        document.getElementById('sign-in').textContent = 'Sign out';
      });
    } else {
      // User is signed out.
      document.getElementById('sign-in').textContent = 'You are not signed in';
    }
  }, function(error) {
    console.log(error);
  });
  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
  }, function(error) {
    console.error('Sign Out Error', error);
  });
};

window.addEventListener('load', function() {
  initApp()
});
