const sock=io()

function send(ms){
    console.log(ms);
    document.getElementById("Mess").innerHTML+= "<p>"+ms+"</p>";
};

function Submit(){
    const input= document.getElementById("Box");
    sock.send(input.value);
    input.value=''
};

sock.on(
    "message",
    (msg) => {
        send(msg);
});
