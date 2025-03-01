"use strict";

function clicked(){
    let emailInput = document.getElementById("email_address");
    let emailValue = emailInput.value;
    let nameInput = document.getElementById("real_name");
    let nameValue = nameInput.value;
    let pwordInput = document.getElementById("pword_entry");
    let pwordValue = pwordInput.value;
    let dobInput = document.getElementById("dob");
    let dobValue = dobInput.value;
    if(checkEmail(emailValue)===0 && checkName(nameValue)===0 && checkAge(dobValue)===0) {
        let valid = document.createElement("div");
        valid.classList.add("welcome");
        document.body.appendChild(valid);
        valid.appendChild( document.createTextNode( "Welcome!"));
    }
}

function checkEmail(email){
    let words = email.trim().split("@");
    if (words.length === 2 && words[0].length > 0 && words[1].length > 0){
        return 0;
    }
    else {
        let invalid = document.createElement("div");
        invalid.classList.add("alert");
        document.body.appendChild(invalid);
        invalid.appendChild( document.createTextNode( "Please enter a valid email"));
        return 1;
    }
}

function checkName(name){
    let words = name.trim().split(" ");
    if (words.length === 2 && words[0].length > 0 && words[1].length > 0){
        return 0;
    }
    else {
        let invalid = document.createElement("div");
        invalid.classList.add("alert");
        document.body.appendChild(invalid);
        invalid.appendChild( document.createTextNode( "Please enter both your first and last name"));
        return 1;
    }
}

function checkAge(bday){
    let birthDate = new Date(bday);
    let now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();
    let monthDiff = now.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())){
        age--;
    }
    if (age >= 13){
        return 0;
    }
    else{
        let invalid = document.createElement("div");
        invalid.classList.add("alert");
        document.body.appendChild(invalid);
        invalid.appendChild( document.createTextNode( "New users must 13 years of age or older"));
        return 1;
    }
}