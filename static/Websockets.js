/*Ce script ici c'est celui des Websockets il sert d'abord à l'échange d'informations en temps réels entre clients et serveur.
    J'ai spécifié la version ,dans le fichier sock.js et sa map, vu que c'est la seule qui marchait mon navigateur et que j'avais besoin de ça en offline...
    Je dois vraiment commenter ce code?
*/
const sock=io()

sock.on(
    "message",
    (msg) => {
        Actualise_les_messages(msg);
});

function Envoi(){
    const input= document.getElementById("Box");
    sock.send(input.value);
    input.value=''
};

function Actualise_les_messages(ms){
    console.log(ms);
    document.getElementById("Mess").innerHTML+= "<p>"+ms+"</p>";
};
