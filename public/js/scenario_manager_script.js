const boiler_plate_part_1 = "Im learning a new language and I'd like you to help me practice speaking the language. Lets do a practice conversation together. Lets pretend ";
const boiler_plate_part_2 = ' Your job is to help me out in this situation. We will go back and forth and role play. Please stay on topic. Then after the conversation ends (i.e. you have helped me accomplish this) or i tell you to "End the conversation now", please finish by sending a message that says "Conversation over." in english and include a json array of json objects of the mistakes I made during conversation in the format of [{"mistake":"[MISTAKE HERE"], "Correction":"[CORRECTION HERE]"}] When creating mistakes for me dont worry about things like punctuation and capitalization because those mistakes dont help me learn the words. You start the conversation. Do not say "let us begin" or anything. Just start it. And do not notate who is speaking. Just act like it is you. Have this conversation practice with me in following language and at the following language level: ';


function textFieldToArray(inputId) {
const inputValue = document.getElementById('key_words_field').value;
return inputValue
    .split(",")              // Split by comma
    .map(item => item.trim()) // Trim whitespace
    .filter(item => item);    // Remove empty strings
}


function uploadScenario() {


  //https://www.youtube.com/watch?v=ZH-PnY-JGBU
  //document.getElementById('upload').onclick = function() {
  console.log("In uploaded")

  //Setting the start and stop time
  //Checking for title
  if(document.getElementById("title_field").value.length == 0) {
    alert("Come on pal give your music a title before uploading");
    return; //stop the execution of function
  }
  //converting minutes and seconds into an integer for upload
  //Doing the time logic checks

  //Diabling the upload button while the file is uploading.
  document.getElementById("uploadBtn").innerText = "Uploading...";
  document.getElementById("uploadBtn").disabled = true;

  const result = textFieldToArray("myInput");

  //Uploading the file to storage

  //This is a built in firebase completion handler... we pass the uploading to the node code in after we get a signal


        //https://futurestud.io/tutorials/get-number-of-seconds-since-epoch-in-javascript
        //Getting the data in the proper format
        const secondsSinceEpoch = Math.round(Date.now() / 1000)
        //Setting the values for the database audioFile node
        var scenario_data = {

        category: document.getElementById("category_field").value,
        created_date: secondsSinceEpoch,
        description: document.getElementById("description_field").value,
        difficulty: document.getElementById("difficulty_field").value,
        prompt: boiler_plate_part_1+document.getElementById("prompt_field").value+boiler_plate_part_2,
        title: document.getElementById("title_field").value,
        keyWords: result
        //keyWords: jsonString
        };

        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('scenarios').push().key;
        console.log(" key created ");

    var scenario_data = {

        category: document.getElementById("category_field").value,
        created_date: secondsSinceEpoch,
        description: document.getElementById("description_field").value,
        difficulty: document.getElementById("difficulty_field").value,
        prompt: boiler_plate_part_1+document.getElementById("prompt_field").value+boiler_plate_part_2,
        title: document.getElementById("title_field").value,
        keyWords: result,
        id: newPostKey
        //keyWords: jsonString
    };
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/scenarios/' + newPostKey] = scenario_data;
        console.log(" post to node complete ");

        //Alerting the user that the song has been uploaded and refreshed the page
        setTimeout(function(){
            alert("Upload Complete");
            location.reload();
        }, 2000);
        return firebase.database().ref().update(updates);
        }


function uploadScenarioCategory() {
  //Diabling the upload button while the file is uploading.
  document.getElementById("uploadCategoryBtn").innerText = "Uploading...";
  document.getElementById("uploadCategoryBtn").disabled = true;

  //Setting the values for the database audioFile node
  var scenario_data = {
    category: document.getElementById("new_category_field").value,
    id: newPostKey
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('scenario_categories').push().key;
  console.log(" key created ");
  // Write the new post's data simultaneously in the posts list and the user's post list.
  // Adding the key as a column
  var scenario_data = {
    category: document.getElementById("new_category_field").value,
    id: newPostKey
  };
  var updates = {};
  updates['/scenario_categories/' + newPostKey] = scenario_data;
  console.log(" post to node complete ");

  //Alerting the user that the song has been uploaded and refreshed the page
  setTimeout(function(){
      alert("Upload Complete");
      location.reload();
  }, 2000);
  return firebase.database().ref().update(updates);
  }