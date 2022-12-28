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

    // if you have reached the second to last input form
    if (currentTab >= x.length - 1) {
        setTotal()
    }

    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:

        document.querySelector('.modal-content').innerHTML = `
        <div class="modal-header">
            <h4 class="modal-title text-primary fs-5 flex-grow-1 text-center" id="exampleModalLabel">successfully requested escort</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <img src="./assets/img/thumb-up.png" alt="">`;
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


function setTotal(){
    let Total = 0;

    // caulation for transport expences
    let transportEspence = new Number(document.querySelector('input[name="transportation"]:checked').getAttribute('data-transport-price'));
    document.getElementById('transport-expence').innerText = transportEspence;


    // caulation for security expences
    let securityEspence = 0;
    if (document.querySelector('input[name="security"]:checked')){
           securityEspence = document.querySelector('input[name="security-yes-option"]:checked').getAttribute('data-security-price');
           securityEspence = new Number(securityEspence)
    }
    if (document.querySelector('input[name="armed"]').checked) {
        securityEspence += new Number(document.querySelector('input[name="armed"]').getAttribute('data-armed-price'))
    }
    document.getElementById('security-expence').innerText = securityEspence;


    // caulation for shirt expences
    let shirtEspence = 0;
    if (document.querySelector('input[name="queen-tshirt-size"]:checked')) {
        shirtEspence = new Number(document.querySelector('input[name="queen-tshirt-size"]:checked').getAttribute('data-qshirt-price'));
        document.getElementById('shirt-expence').innerText = shirtEspence
    }


    // caulation for excort expences
    let escortService = new Number(document.querySelector('input[name="escort-service"]:checked').getAttribute('data-escort-price'));
    document.getElementById('escort-service').innerText = escortService;

    Total = transportEspence + securityEspence + shirtEspence + escortService + 8;
    document.getElementById('total-expence').innerText = Total;

}

document.getElementById('escort-form').addEventListener('submit', (e)=>{
    e.preventDefault()
})