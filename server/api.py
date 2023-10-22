from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import uvicorn
import os
import csv
import json

app = FastAPI()

# CORS for routing
origins = [
    "http://localhost",
    "https://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

# Starts server
# Reload active!
if __name__ == "__main__":
    uvicorn.run("api:app", port=8000, log_level="info", reload="True")