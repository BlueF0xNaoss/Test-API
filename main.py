#Ça c'est le seveur, comme tu peux le voir c'est très fonctionnel, et répétitif...
#J'ai ajouté la db, un seul tableau suffit pour l'instant, après on pourra complexifier si on veut une mémoire des discussions ou des salons
#Les mots de passe sont 'cryptés' via sha256, on ne peut en théorie pas inverser le process mais utiliser une seule méthode de chiffrement c'est l'exposition à des attaques en utilisant des tables de mot de passe
#Mais bon, zéro informations personnelles de collectée...

import flask as fl
import flask_socketio as fls
import sqlite3 as sql
from hashlib import sha256

Server= fl.Flask(__name__)
Socket= fls.SocketIO(Server)
Server.debug= True

###Route de redirection
#Ces routes s'expliquent d'elles-même, elles ne servent qu'à retourner des pages
@Server.route("/")
def Auth():
    return fl.render_template("Log.html")

@Server.route("/Chat")
def Chat():
    return fl.render_template("Chat.html")

@Server.route("/New account")
def Sign():
    return fl.render_template("Sign.html")



###Route de Fonction
#C'est plus ici que vont les requêtes d'informations, souvent ce sera une requête qui attends d'être traitées et qui agit en conséquence

#Treat c'est le coeur de la requête d'auth, il vérifie ou fait des ajouts dans la db lors du Sign-in ou du Log-in
@Server.route("/Treat",methods=['POST'])
def Treat():
    req= fl.request
    result= req.form

    Name= result["username"]
    Mdp= result["password"]
    Mdp= sha256(Mdp.encode()).hexdigest()

    action=result["action"]

    Réponse={"Connection":False,
             "Raison":"Aucune",
             "Chemin":"/"
             }

    with sql.connect("Data.db") as conn:
        cursor= sql.Cursor(conn)
        if action=="Log":
            cursor.execute("SELECT * FROM User WHERE username = ?",(Name,))
            fetch= cursor.fetchall()
            #Scénario 1 il est dans la base de données
            if fetch:
                #Alors soit il entre le bon mot de passe et accède au saint graal
                if fetch[0][2]==Mdp:
                    Connection="Permise"
                    Raison="Sans problème"
                    Chemin="/Chat"
                else:
                #Soit il se goure et retour à la case départ
                    Connection="Refusée"
                    Raison="Mot de passe incorrect"
                    Chemin=fl.url_for("Auth")
            else:
            #Scénario 2 il n'est pas dedans, du coup skip
                Connection="Refusée"
                Raison="Pseudo invalide"
                Chemin=fl.url_for("Auth")

        elif action=="Sign":
            try:
                cursor.execute("INSERT INTO User (username,hashed_password)  VALUES (?,?)",(Name,Mdp))
                Connection="Permise"
                Raison="Sans problème"
                Chemin="/Chat" #Si on veut après ici on peut rediriger vers un vrai welcoming

            except sql.IntegrityError:
                    Connection="Refusée"
                    Raison="Pseudo déjà utilisé"
                    Chemin=fl.url_for("Sign")



    Réponse["Connection"]=Connection
    Réponse["Raison"]=Raison
    Réponse["Chemin"]=Chemin

    return fl.jsonify(Réponse)

#Les signaux du serveur
@Socket.on("message")
def send(msg):
    Socket.emit("message",msg)

Socket.run(Server)