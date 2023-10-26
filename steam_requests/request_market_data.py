import browser_cookie3
import json
import logging
import requests


# Assuming the user is logged into the steam market in the browser, grab the steamSecureLogin cookie
# This approach circumvents handling logins here, and avoids using steam's authentication or another library
# Will probably be changed in the future
def get_steam_login_cookie():
    url = 'steamcommunity.com'
    bc = browser_cookie3.Firefox(domain_name=url)
    cookie_jar = bc.load()

    steam_login_key = ''
    for cookie in cookie_jar:
        if 'steamLoginSecure' in cookie.name:
            steam_login_key = cookie.value
            break
    if steam_login_key == '':
        print("Couldn't find login cookie")
    else:
        return steam_login_key

# Requests steam market history from the steam API with the specified login key
def get_market_history(steam_login_key: str):
    url = 'https://steamcommunity.com/market/myhistory/'
    cookie = {'steamLoginSecure': steam_login_key}
    params = {'start': 1, 'count': 100}
    try:
        response = requests.get(url, params=params, cookies=cookie)
    except Exception as e:
        logging.error(e)
    return response.json()

# Main code

# Grab steam login key
slk = get_steam_login_cookie()
# Grab market history
res = get_market_history(slk)
# Dump to json file
with open('./res.json', 'w') as f:
    json.dump(res, f, indent=4)