var request = require('request');
var secret = require('./secrets');
var fs = require('fs');
var inputData = process.argv.slice(2);


console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {     //main function
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
      //Authorization: 'token ' + secret.GITHUB_TOKEN
    }
  };

function downloadImageByURL(url, filePath) {           //second function
  request.get(url)
  .on('error', function(err) {
    throw err;
  })
  .pipe(fs.createWriteStream(filePath));               
}

request(options, function(err, res, body) {
  var ObjData = JSON.parse(body)  // parsing JSON string to object
  cb(err, ObjData);   //passes the object to the callback function

  ObjData.forEach(function(elem) { 
    downloadImageByURL(elem.avatar_url, 'avatars/' + elem.login + '.jpg');
    console.log(elem.avatar_url);
  });
});
}

getRepoContributors(inputData[0], inputData[1], function(err, result) {
  if(!inputData[0] && !inputData[1]) {
    console.log("Please enter the repository owner and repository name");
  }
  console.log("Result:", result);
});  










