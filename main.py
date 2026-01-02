import flask as fl
import flask_socketio as fls

Server= fl.Flask(__name__)
Socket= fls.SocketIO(Server)
Server.debug=1

@Server.route("/")
def One():
    return fl.render_template("Page1.html")

@Server.route("/Auth")
def Two():
    return fl.render_template("Page2.html")

@Server.route("/Treat")
def Treat():
    return fl.jsonify(fl.request.args)

@Socket.on("message")
def send(msg):
    print("Emit mess")
    Socket.emit("message",msg)

Socket.run(Server)