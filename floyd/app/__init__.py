import markdown
import os
import shelve
import requests
import csv
import json
import numpy as np

# Import the framework
from flask import Flask, g, render_template, request, redirect, url_for, abort, Markup
from werkzeug.utils import secure_filename
from flask_restful import Resource, Api, reqparse

# Create an instance of Flask
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024
app.config['UPLOAD_EXTENSIONS'] = ['.csv', '.pdf']
app.config['UPLOAD_PATH'] = 'uploads'

# Create the API
api = Api(app)


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = shelve.open("devices.db")
    return db


@app.teardown_appcontext
def teardown_db(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route("/")
def index():
    """Present some documentation"""

    # Open the README file
    with open(os.path.dirname(app.root_path) + '/README.md', 'r') as markdown_file:

        # Read the content of the file
        content = markdown_file.read()

        # Convert to HTML
        return markdown.markdown(content)


@app.route('/validation', methods=['GET', 'POST'])
def validation():
    if request.method == 'POST':
        uploaded_file = request.files['file']
        filename = secure_filename(uploaded_file.filename)
        if filename != '':
            file_ext = os.path.splitext(filename)[1]
            if file_ext not in app.config['UPLOAD_EXTENSIONS']:
                abort(400)
            uploaded_file.save(os.path.join(
                app.config['UPLOAD_PATH'], filename))
        return redirect(url_for('validation'))
    with open('./uploads/motes.csv') as csv_file:
        data = csv.reader(csv_file, delimiter=',')
        first_line = True
        motes = []
        for row in data:
            if not first_line:
                motes.append({
                    "moteId": row[0],
                    "roomId": row[1],
                    "siteId": row[2],
                    "statusId": row[3]
                })
            else:
                first_line = False

    r = requests.get('http://api:3000/motes')
    r.raise_for_status()
    mongoJsonString = r.text
    mongoDict = json.loads(mongoJsonString)
    mongo = []
    for mote in mongoDict['motes']:
        mongo.append({
            "moteId": mote["moteId"],
            "roomId": mote["roomId"],
            "siteId": mote["siteId"],
            "statusId": mote["statusId"]
        })
    csv_array = np.array(motes)
    mongo_array = np.array(mongo)
    validation = np.array_equal(csv_array, mongo_array)
    valHtml = '<div class="ui large label left pointing green">Passed</div>' if validation else '<div class="ui large label left pointing red">Failed</div>'

    content = {
        'files': os.listdir(app.config['UPLOAD_PATH']),
        'csv': json.dumps(motes, sort_keys=True, indent=1),
        'mongo': json.dumps(mongo, sort_keys=True, indent=1),
        'validation': Markup(valHtml)
    }

    return render_template('validation.html', content=content)


@app.route('/motes', methods=['GET', 'POST'])
def motes():
    if request.method == 'POST':
        with open('./uploads/motes.csv') as csv_file:
            data = csv.reader(csv_file, delimiter=',')
            first_line = True
            motes = []
            for row in data:
                if not first_line:
                    motes.append({
                        "moteId": row[0],
                        "roomId": row[1],
                        "siteId": row[2],
                        "statusId": row[3]
                    })
                else:
                    first_line = False
        url = 'http://api:3000/motes'
        for mote in motes:
            r = requests.post(url, json=mote)
    return redirect(url_for('validation'))


class DeviceList(Resource):
    def get(self):
        shelf = get_db()
        keys = list(shelf.keys())

        devices = []

        for key in keys:
            devices.append(shelf[key])

        return {'message': 'Success', 'data': devices}, 200

    def post(self):
        parser = reqparse.RequestParser()

        parser.add_argument('identifier', required=True)
        parser.add_argument('name', required=True)
        parser.add_argument('device_type', required=True)
        parser.add_argument('controller_gateway', required=True)

        # Parse the arguments into an object
        args = parser.parse_args()

        shelf = get_db()
        shelf[args['identifier']] = args

        return {'message': 'Device registered', 'data': args}, 201


class Device(Resource):
    def get(self, identifier):
        shelf = get_db()

        # If the key does not exist in the data store, return a 404 error.
        if not (identifier in shelf):
            return {'message': 'Device not found', 'data': {}}, 404

        return {'message': 'Device found', 'data': shelf[identifier]}, 200

    def delete(self, identifier):
        shelf = get_db()

        # If the key does not exist in the data store, return a 404 error.
        if not (identifier in shelf):
            return {'message': 'Device not found', 'data': {}}, 404

        del shelf[identifier]
        return '', 204


api.add_resource(DeviceList, '/devices')
api.add_resource(Device, '/device/<string:identifier>')
