var currentTab = 0; // Current tab is set to be the first tab (0)
let percentUnitBar = 100 / document.getElementsByClassName('tab').length ;
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
        document.getElementById("nextBtn").setAttribute('type', 'submit')
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    progressIndicator(n);
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (!y[i].checkValidity()) {
            // add an "invalid" class to the field:
            y[i].className += " is-invalid";
            // and set the current valid status to false:
            valid = false;
        }else{
            // add an "invalid" class to the field:
            y[i].classList.remove('is-invalid');
        }
    }
    
    return valid; // return the valid status
}

function progressIndicator(n) {
    document.getElementById('progress-bar').style.width = new String(percentUnitBar * n) + '%';    
}


document.getElementById('escort-form').addEventListener('submit', (e)=>{
    e.preventDefault()
})