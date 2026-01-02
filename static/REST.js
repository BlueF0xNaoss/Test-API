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


