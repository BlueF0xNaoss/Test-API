/* Ce script est lié */

async function wait_for_ans(id,action){
    event.preventDefault();
    Form=document.getElementById(id);
    Data=new FormData(Form)
    Data.append("action",action)

    await fetch("/Treat",
        {
        method:'POST',
        body:Data
        })

        .then(response=>{
            if (response.ok){
                return response.json()
            }
            else{
                return {
                    "Connection":"Refusée",
                    "Raison":"Problème du serveur",
                    "Chemin":"/"
                }
            }
        })
        
        .then(data=> {
            if (data["Connection"]==="Permise"){
                localStorage.setItem("username",Data.get("username"))
                window.location.href=data["Chemin"];
            }
            else{
                alert("Connection refusée car "+data["Raison"]);
                window.location.href=data["Chemin"];
            }
        })
        .catch(error=>{
            console.log("error"+error);
        });
    };

async function GetInfo(){
    event.preventDefault();
    console.log(localStorage)
    Data={
        "username":localStorage.getItem("username")
    }
    console.log(Data)
    await fetch("/aboutme",
        {
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(Data)
        })

        .then(response=>{
            if (response.ok){
                console.log(response.json())
            }
            else{
                return {
                    "Connection":"Refusée",
                    "Raison":"Problème du serveur",
                }
            }
        })

        .catch(error=>{
            console.log("error"+error);
        });
    };