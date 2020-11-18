from flask import Flask, render_template, redirect, jsonify
#from flask_pymongo import PyMongo
#import pymongo
# import nfldatapull
from bson.json_util import dumps
import pandas as pd
import psycopg2
import matplotlib.pyplot as plt
from flask import send_from_directory


conn = psycopg2.connect(
    host="db-inst-on-aws.cve4fghw24yv.us-east-2.rds.amazonaws.com",
    database="nfl-final-project",
    user="root",
    # password variable used for connection 
    password="password")
offense = pd.read_sql('Select * FROM public."offense"', conn)
defense = pd.read_sql('Select * FROM public."defense"', conn)
misc = pd.read_sql('Select * FROM public."misc"', conn)
offense_db=offense.to_dict('records')
defense_db=defense.to_dict('records')
misc_db=misc.to_dict('records')
app = Flask(__name__)

@app.route("/")
def home():
    # Find one record of data from the mongo database
    off_list = list(offense_db)

    def_list = list(defense_db)

    misc_list = list(misc_db)
    
    # Return template and data
    return render_template("index.html", off_db=off_list, def_db=def_list, misc_db=misc_list)

@app.route("/plots")
def plots():
    # Find one record of data from the mongo database
    off_list = list(offense_db)

    def_list = list(defense_db)

    misc_list = list(misc_db)
    # Return template and data
    return render_template("plots.html", off_db=off_list, def_db=def_list, misc_db=misc_list)

@app.route("/greensock")
def greensock():
    # Find one record of data from the mongo database
    off_list = list(offense_db)

    def_list = list(defense_db)

    misc_list = list(misc_db)
    # Return template and data
    return render_template("greensock.html", off_db=off_list, def_db=def_list, misc_db=misc_list)
@app.route('/about', methods=['GET', 'POST'])
def open():    
    return send_from_directory(directory='templates',
                           filename='model.pdf',
                           mimetype='application/pdf')
@app.route('/model1', methods=['GET', 'POST'])
def model1():    
    return send_from_directory(directory='templates',
                           filename='nfl_neural.h5')

@app.route('/model2', methods=['GET', 'POST'])
def model2():    
    return send_from_directory(directory='templates',
                           filename='randomforest.sav')

@app.route('/data', methods=['GET', 'POST'])
def data():    
    return send_from_directory(directory='templates',
                               filename='data.7z')

if __name__ == "__main__":
    app.run(debug=True)
# "C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" --dbpath="c:\data\db"
# "C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"