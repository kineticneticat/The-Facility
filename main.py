from flask import Flask, render_template, request

app = Flask("__main__")

@app.route("/")
def index():
    if not request.url_root.startswith("https://facility.kineticcat.dev"):
        return "nuh uh", 404
    return render_template("index.html")

cert = "./server.cert"
key = "./server.key"
app.run("0.0.0.0", port=443, ssl_context=(cert,key), debug=True)