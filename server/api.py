from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import uvicorn
import json

app = FastAPI()

# CORS for routing
origins = [
    'http://localhost',
    'https://localhost',
    'http://localhost:3000',
    'http://localhost:3000/',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/')
def read_root():
    return {'Hello': 'World'}

@app.get('/get_market_data/')
def get_market_data(amount):

    f = open('./market_data.json', 'r', encoding='utf-8')
    data = json.load(f)
    transaction_list = data['transaction_list']

    if amount not in ['10', '50', '100', '200', '300', '400', '500', 'All']:
        amount = 10
    elif amount == 'All':
        amount = data['count']
    amount = int(amount)

    new_list = []
    for i, t in enumerate(transaction_list):
        if i > amount - 1: 
            break
        new_list.append(t)
    data['transaction_list'] = new_list
    data['count'] = amount

    return data

# Starts server
# Reload active!
if __name__ == '__main__':
    uvicorn.run('api:app', port=8000, log_level='info', reload='True')