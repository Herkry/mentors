from flask import Flask, request, jsonify
import pandas as pd
from sqlalchemy import create_engine
import pymysql

# creating db connection
db_con_str = "mysql+pymysql://root:@127.0.0.1/mentors"
db_con = create_engine(db_con_str)

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def welcome():
	return 'Karibu to Flask'

@app.route('/test', methods=['GET', 'POST'])
def test():
	movies_df = pd.read_csv('C:/Users/thomw/OneDrive/Desktop/ICS/ICSY4S1/ICS Project II/Datacamp Recommendation Engine Course Content/movies.csv')
	movies_json_records = movies_df.to_json(orient ='records')
	return movies_json_records

@app.route('/test2', methods=['GET', 'POST'])
def test2():
	# args should be like localhost:5000/test2?key1=val1&key2=val2
	args = request.args
	no1 = args['key1']
	no2 = args['key2']
	return jsonify(dict(data=[no1, no2]))

@app.route('/test3', methods=['GET', 'POST'])
def test3():
	# selecting from database
	df = pd.read_sql("SELECT * FROM tests", con = db_con)
	return df.to_json(orient = "columns")

if __name__ == '__main__':
	app.run()