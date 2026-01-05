async function GetInfo(){
    //event.preventDefault();
    Data={
        "username":localStorage.getItem("username")
    }
    query=new URLSearchParams({"username":localStorage.getItem("username")})
    await fetch("/aboutme/fetch?"+query.toString(),
        {
        method:'GET',
        headers:{
            "Content-Type": "application/json"
        }
        })

        .then(response=>{
            return response.json()
        })

        .then(data=>{
            for (var key in data){
                if (data[key]===null){localStorage.setItem(key,"<mark>Pas trouvé, désolé</mark>")
                    }
                else{
                    localStorage.setItem(key,data[key])
                }
            }
            
        }
)
        
        .catch(error=>{
            console.log("error"+error);
        });
};

async function SetInfo(){
    event.preventDefault();
    Form=document.getElementById("ID");
    Data=new FormData(Form)
    Data.append("old_username",localStorage.getItem('username'))

    await fetch("/aboutme/set",
        {
        method:'POST',
        body:Data
        })

        .then(response=>{
                return response.json()
        })

        .then(data=>{
            for (var key in data){
                if (data[key]===null){localStorage.setItem(key,"<mark>Pas trouvé, désolé</mark>")
                    }
                else{
                    localStorage.setItem(key,data[key])
                }
            }
            alert("Identification finie")
            
        }
)
        
        .catch(error=>{
            console.log("error"+error);
        });
};



function updateProfile(){
    GetInfo()
    Me=localStorage
    Pseudo=document.getElementById("Username");
    Bio=document.getElementById("Bio");
    Pseudo.innerHTML="<strong>Pseudo</strong></br>\n"+Me['username'];
    Bio.innerHTML="<strong>Bio</strong></br>"+Me['bio'];
}

updateProfile()
