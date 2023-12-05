## STEAM MARKET HISTORY EXTENDED
A web app to overhaul the Steam market history UI.
The Steam market UI has been nearly featureless for 10+ years now. This provides a clean UI overhaul with various additional features.

## FEATURES
Current:
- View all of your data
- Enhanced page navigation
- Search by item name, game, third party, and 'ID' (IDs are assigned in chronological order)
- Filter by transaction type

Planned:
- More options for filtering
- Statistics page
- Currency icon
- Method for a third-party user to supply data
- A hosted site

## PREVIEW
https://github.com/j1unt/Steam-Market-History-Extended/assets/68975535/c684e647-38ad-430e-bd5c-f1e619158fb5

## HOW TO RUN
Prereqs: python, react (and node.js), firefox or firefox fork (all browsers will be supported eventually)
1. Clone the repository and install requirements.txt
2. Run request_market_data.py to grab your data
3. Run data_pipeline.py to format your data
4. Run api.py and ```npm start``` in the /app folder to start the site

Built with:
Python
React
FastAPI
Uvicorn
