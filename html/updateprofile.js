"use strict";

function submit(){
    let name = document.getElementById("name").value;
    let dob = document.getElementById("birthdate").value;
    let picfiles = document.getElementById("profilepic").files;
    if( picfiles.length === 0 ){
        alert("You must choose a file for your profile picture")
        return;
    }
    let fdata = new FormData();
    fdata.append("name", name );
    fdata.append("birthday", dob );
    fdata.append("pic", picfiles[0]);

    fetch( "/do_update", {
        method: "POST",
        body: fdata
    }).then( (resp) => {
        resp.json().then( (J) => {
            console.log("Server said:",J);
        }).catch( (err) => {
            console.log("JSON error:",err);
        })
    }).catch( (err) => {
        console.log("Error:",err);
    });
}

function updatethumb(){
    let picfiles = document.getElementById("profilepic").files;
    if(picfiles.length > 0 ){
        let u = URL.createObjectURL(picfiles[0]);
        let th = document.getElementById("thumbnail");
        th.onload = () => {
            URL.revokeObjectURL(u);
        };
        th.src = u;
    }
}