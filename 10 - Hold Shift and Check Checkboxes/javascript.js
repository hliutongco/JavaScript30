const checkboxes = document.querySelectorAll('input[type=checkbox]');
let recentlyCheckedBox = null;
let shiftIsPressed = false;

function selectAll(event, index) {
  if (recentlyCheckedBox !== null) {
    //if recentlyCheckedBox is higher up than the current checkbox
    //then we check each box above the current checkbox
    //and below the recentlyCheckedBox
    if(recentlyCheckedBox < index) {
      while (recentlyCheckedBox < index) {
        checkboxes[index].checked = true;
        index--;
      }
    }
    //if recentlyCheckedBox is lower than the current checkbox
    //then we check each box below the current checkbox
    //and above the recentlyCheckedBox
    else if(recentlyCheckedBox > index) {
      while (recentlyCheckedBox > index) {
        checkboxes[index].checked = true;
        index++;
      }
    }
  }
  else {
    //populates the recentlyCheckedBox if not already populated
    //this handles the edge case where the user
    //keeps Shift pressed down all the time
    recentlyCheckedBox = index;
  }
};

//NOTE: here is an alternate way to write the selectAll() function:
// it uses the inBetween variable to check boxes
// whenever it is inbetween the currently checked box and recentlyCheckedBox

// function selectAll(event, index) {
//   let inBetween = false;
//   if (recentlyCheckedBox !== null) {
//     checkboxes.forEach(checkbox =>
//       if (checkbox === this || checkbox === checkboxes[recentlyCheckedBox]) {
//         inBetween = !inBetween;
//       }
//       if (inBetween) {
//         checkbox.checked = true;
//       }
//     )
//   }
// }

checkboxes.forEach(function(checkbox, index) {
    checkbox.addEventListener('change', function(event){
      boxIsChecked = event.path[0].checked;
      //this checks whether the Shift key is pressed
      //NOTE: we can also use event.shiftKey to achieve the same
      //also checks if checkbox is checked
      if(shiftIsPressed && boxIsChecked){
        selectAll(event, index);
      }
      else if (!shiftIsPressed && boxIsChecked) {
        //grabs the index of the most recently checked box
        recentlyCheckedBox = index;
      };
  });
});

//the below event listeners check whether the keydown event is the Shift key
//NOTE: we can also use event.shiftKey to achieve the same
document.addEventListener('keydown', function(event){
  if (event.key==="Shift") {
    shiftIsPressed = true;
  }
});
document.addEventListener('keyup', function(event){
  if (event.key==="Shift") {
    shiftIsPressed = false;
  }
});
