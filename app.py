from flask import Flask, request
from sqlalchemy import create_engine
import pymysql
import pandas as pd
import numpy as np

# sklearn
from sklearn.feature_extraction.text import TfidfVectorizer
# # cosine_similarity measure
from sklearn.metrics.pairwise import cosine_similarity

# texts
import re

# NLTK
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords

db_con_str = "mysql+pymysql://root:@127.0.0.1/mentors"
db_con = create_engine(db_con_str)

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def welcome():
	return 'Karibu to Flask'

@app.route('/student/personalized/recommendations', methods=['GET', 'POST'])
def getMentorRecomms():
	return "A student's personalized mentor recommendations"

@app.route('/student/single/mentor/recommendations', methods=['GET', 'POST'])
def getSingleMentorRecomms():
	# return "Recommendations of mentors similar to a single mentor selected"

	# get mentor id of mentor whose similar mentors we're going to get
	args = request.args
	ment_id = args["ment_id"]
	# selecting all mentors from database and putting the data in a df_train
	df_train = pd.read_sql("SELECT * FROM mentors", con = db_con) 

	# create extra column of resume summary which will be processed for analysis
	df_train["CleanSummary"] = df_train["ment_resume_summary"]

	# # cleaning the resume summary
	# # # # # #
	# Removing end-of-line, tabulation and carriage 
	# return. Turning into lower case

	# """ text lowercase
	#     removes \n
	#     removes \t
	#     removes \r """
	df_train["CleanSummary"] = df_train["CleanSummary"].str.lower()
	df_train["CleanSummary"] = df_train["CleanSummary"].apply(lambda x: x.replace("\n", " "))
	df_train["CleanSummary"] = df_train["CleanSummary"].apply(lambda x: x.replace("\r", " "))
	df_train["CleanSummary"] = df_train["CleanSummary"].apply(lambda x: x.replace("\t", " "))
	#

	# Removing emails
	# """ This function removes email adresses
	#     inputs:
	#      - text """
	df_train["CleanSummary"] = df_train["CleanSummary"].apply(lambda x: re.sub(r"""(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])""", " ", x))
	#

	# Removing Hyperlinks
	# """ This function removes hyperlinks from texts
	#     inputs:
	#      - text """
	df_train["CleanSummary"] = df_train["CleanSummary"].apply(lambda x: re.sub(r"http\S+", " ", x))
	#

	# Removing numbers
	# """ This function removes numbers from a text
	#     inputs:
	#      - text """
	df_train["CleanSummary"] = df_train["CleanSummary"].apply(lambda x: re.sub(r"\d+", " ", x))
	#

	# Encode unknown characters
	# """ This function removes numbers from a text
	#     inputs:
	#      - text """
	df_train["CleanSummary"] = df_train["CleanSummary"].apply(lambda x: re.sub(r"\d+", " ", x))
	#

	# Removing punctuations and special characters
	# """ This function removes punctuation and accented characters from texts in a dataframe 
	#     To be appplied to languages that have no accents, ex: english 
	# """
	df_train["CleanSummary"] = df_train["CleanSummary"].apply(lambda x: re.sub(r'[^\w\s]', ' ', x))
	#

	# Removing stop words. Here, the list is from nltk stopwords library- ref to function below
	df_train["CleanSummary"] = df_train["CleanSummary"].apply(lambda x: remove_stop_words(x))
	#

	# Removing one and two letters words, removing unnecessary spaces, droping empty lines
	# """ This function
	#  1) removes remaining one-letter words and two letters words
	#  2) replaces multiple spaces by one single space
	#  3) drop empty lines """
	df_train["CleanSummary"] = df_train["CleanSummary"].apply(lambda x: re.sub(r'\b\w{1,2}\b', " ", x))
	df_train["CleanSummary"] = df_train["CleanSummary"].apply(lambda x: re.sub(r"[ \t]{2,}", " ", x))
	df_train["CleanSummary"] = df_train["CleanSummary"].apply(lambda x: x if len(x) != 1 else '')
	df_train["CleanSummary"] = df_train["CleanSummary"].apply(lambda x: np.nan if x == '' else x)
	df_train = df_train.dropna(subset=["CleanSummary"], axis=0).reset_index(drop=True).copy()
	#

	# # tfidf
	# # # # # #
	df_tfidf = df_train[["ment_id", "CleanSummary"]]

	# Instantiate the vectorizer object to 
	# the vectorizer variable
	vectorizer = TfidfVectorizer(max_df = 0.7, min_df = 2)

	# Fit and transform the resume summary column
	vectorized_data = vectorizer.fit_transform(df_tfidf['CleanSummary'])

	# Create Dataframe from TF-IDFarray
	df_tfidf2 = pd.DataFrame(vectorized_data.toarray(), columns=vectorizer.get_feature_names())

	# Assign the mentor ids to the index and inspect
	df_tfidf2.index = df_tfidf['ment_id']

	# Create the array of cosine similarity values
	cosine_similarity_array = cosine_similarity(df_tfidf2)

	# Wrap the array in a pandas DataFrame
	cosine_similarity_df = pd.DataFrame(cosine_similarity_array, index=df_tfidf2.index, columns=df_tfidf2.index)

	# Find the values for a particular record (using the ment_id)
	cosine_similarity_series = cosine_similarity_df.loc[int(ment_id)]

	# Sort these values highest to lowest
	ordered_similarities = cosine_similarity_series.sort_values(ascending=False)

	# returning the details of the recommended mentors
	df_ment_ids = pd.DataFrame()
	df_ment_ids["ment_id"] = ordered_similarities.index
	df_ment_ids = df_ment_ids.head(20)
	list_ment_ids = df_ment_ids["ment_id"].values.tolist()

	df_final = df_train[df_train.ment_id.isin(list_ment_ids)]
	df_final['ment_id_sorted'] = pd.Categorical(df_final['ment_id'], categories=list_ment_ids, ordered=True)
	df_final.sort_values('ment_id_sorted', inplace=True)
	df_final.reset_index(inplace=True)
	df_final.drop('ment_id_sorted', axis='columns', inplace=True)

	# convert df_train to json and send data to web backend
	mentor_recomms_json = df_final.to_json(orient = "records")

	return mentor_recomms_json

# Removing stop words. Here, the list is from nltk stopwords library
def remove_stop_words(text, stopwords=set(stopwords.words('english'))):
	""" This function removes stop words from a text
	    inputs:
	     - stopword list
	     - text """

	# prepare new text
	text_splitted = text.split(" ")
	text_new = list()

	# stop words updated
	#stopwords = stopwords.union({"amp", "grocery store", "covid", "supermarket", "people", "grocery", "store", "price", "time", "consumer"})

	# loop
	for word in text_splitted:
	    if word not in stopwords:
	        text_new.append(word)
	return " ".join(text_new)

def clean_stopwords(df, label):
	""" This function removes stopwords """
	df[label] = df[label].apply(lambda x: remove_stop_words(x))
	return df

if __name__ == '__main__':
	app.run()