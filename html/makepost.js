"use strict";

function submit(){
    let picfiles = document.getElementById("profilepic").files;
    let reader = new FileReader();
    reader.onload = function(event) {
        let arrayBuffer = event.target.result;
        let fileString = arrayBufferToBase64(arrayBuffer);
        localStorage.setItem("picfiles",fileString);
    }
    reader.readAsArrayBuffer(picfiles[0]);
    let titlestr = document.getElementById("title_string").value;
    localStorage.setItem("titlestr",titlestr);
    if( picfiles.length === 0 ){
        alert("You must choose a file for your profile picture")
        return;
    }
    let fdata = new FormData();
    fdata.append("pic", picfiles[0]);
    fdata.append("title",titlestr);

    fetch( "/update_post", {
        method: "POST",
        body: fdata
    }).then( (resp) => {
        resp.json().then( (J) => {
            console.log("Server said:",J);
        }).catch( (err) => {
            console.log("JSON error:",err);
        });
        resp.text().then( (txt) => {
            console.log("Server said:",txt);
        }).catch( (err) => {
            console.log("Error getting title:",err);
        });
        resp.bytes().then( (img) => {
            console.log("Server said:",img);
        }).catch( (err) => {
            console.log("Error getting image:",err);
        });
        })

    document.location = "http://localhost:8080/";
}

function updatethumb(){
    let picfiles = document.getElementById("profilepic").files;
    if(picfiles.length > 0 ){
        let u = URL.createObjectURL(picfiles[0]);
        console.log(u);
        let th = document.getElementById("thumbnail");
        th.onload = () => {
            URL.revokeObjectURL(u);
        };
        th.src = u;
    }
}

function updatePost(){
    let picfiles = localStorage.getItem("picfiles");
    let newArrayBuffer = base64ToArrayBuffer(picfiles);
    let picfilesView = new DataView(newArrayBuffer);
    let end_file = new Blob([picfilesView], { type: "image/png" }); //right now it only accepts png images
    let title = localStorage.getItem("titlestr");
    if(picfiles.length > 0 ){
        let u = URL.createObjectURL(end_file);
        let im = document.getElementById("postimg");
        let t = document.getElementById("title");
        im.onload = () => {
            URL.revokeObjectURL(u);
        };
        im.src = u;
        t.textContent = title;
    }
}

// localStorage gets cleared when the home.html triggers onunload
// so everytime it gets refreshed, closed, etc.
function updateStorage(){
    localStorage.clear();
}

// The following two functions were from AI. 
// Prompt was: How do I convert Base64 string to
// an ArrayBuffer, and then back to a Base64 string?
// I had done research and gathered that that was what I needed
// to do next, so I just asked AI to save myself the time.
// I feel like I may have overcomplicated the whole process of 
// sending an image over the server from one html to another tbh

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}