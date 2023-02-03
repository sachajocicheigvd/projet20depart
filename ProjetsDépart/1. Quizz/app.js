"use strict"
let sub = document.querySelector(".subbutton")
let aide = document.querySelector(".section h2")
let rep1 = document.querySelector("#true1")
let rep2= document.querySelector("#true2")
let rep3=document.querySelector("#true3")
let rep4= document.querySelector("#true4")
let rep5=document.querySelector("#true5")
let tblvar=[rep1,rep2,rep3,rep4,rep5]


sub.addEventListener("click",(e)=>{
    e.preventDefault();
    verifrep();

})

function verifrep(){

    let juste = 0;

    for (let i = 0; i <=4 ; i++) {
        if (tblvar[i].checked==true){
            console.log(tblvar[i].parentElement.parentElement.parentElement.style.backgroundColor="green")
            juste++;
        }
        else
        {
            console.log(tblvar[i].parentElement.parentElement.parentElement.style.backgroundColor="red")

        }

    }

    if (juste == 5){

        document.querySelector("#questonnaire > div.sectionVal > h2").textContent="Bravo tout est juste"

    }

    else{
        document.querySelector("#questonnaire > div.sectionVal > h2").textContent=`vous avez fait ${5-juste} faux`
        document.querySelector("#questonnaire").classList.add("echec")



    }

}