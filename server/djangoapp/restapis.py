# Uncomment the imports below before you add the function code
import requests
import inspect
import json
import os
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv(
    'backend_url', default="http://localhost:3030")

sentiment_analyzer_url = os.getenv(
    'sentiment_analyzer_url',
    default="http://localhost:5050/")

searchcars_url = os.getenv(
    'searchcars_url',
    default="http://localhost:3050/")


def get_request(endpoint, **kwargs):
    params = ""
    if (kwargs):
        for key, value in kwargs.items():
            params = params + key + "=" + value + "&"

    request_url = backend_url + endpoint + "?" + params

    print(f"GET from {request_url}")
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url)
        
         # Check if the response is not empty and is a valid JSON
        if response.text:
            return response.json()
        else:
            print("Empty response received")
            return None
    except json.JSONDecodeError:
        print("Response is not a valid JSON")
    except Exception as err:
        current_function_name = inspect.currentframe().f_code.co_name
        print(f"Unexpected error in {current_function_name}")
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")


def analyze_review_sentiments(text):
    request_url = sentiment_analyzer_url + "analyze/" + text
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url)
        return response.json()
    except Exception as err:
        current_function_name = inspect.currentframe().f_code.co_name
        print(f"Unexpected error in {current_function_name}")
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")


def post_review(data_dict):
    request_url = backend_url + "/insert_review"
    try:
        response = requests.post(request_url, json=data_dict)
        return response.json()
    except Exception as err:
        current_function_name = inspect.currentframe().f_code.co_name
        print(f"Unexpected error in {current_function_name}")
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")


def searchcars_request(endpoint, **kwargs):
    params = ""
    if (kwargs):
        for key, value in kwargs.items():
            params = params + key + "=" + value + "&"

    request_url = searchcars_url + endpoint + "?" + params

    print(f"GET from {request_url}")
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url)
        return response.json()
    except Exception as err:
        current_function_name = inspect.currentframe().f_code.co_name
        print(f"Unexpected error in {current_function_name}")
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")
