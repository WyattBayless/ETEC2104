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
    checkEmail(emailValue);
    checkName(nameValue);
    checkAge(dobValue);
}

function checkEmail(email){
    let words = email.trim().split("@");
    if (words.length === 2 && words[0].length > 0 && words[1].length > 0){
        return;
    }
    else {
        alert("Must input a proper email address")
    }
}

function checkName(name){
    let words = name.trim().split(" ");
    if (words.length === 2 && words[0].length > 0 && words[1].length > 0){
        return;
    }
    else {
        alert("Must input both first and last name")
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
        return;
    }
    else{
        alert("Must be 13 years old or older");
    }
}