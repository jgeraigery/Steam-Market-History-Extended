import browser_cookie3
import json
import logging
import requests
import time


# Assuming the user is logged into the steam market in the browser, grab the steamSecureLogin cookie
# This approach circumvents handling logins here, and avoids using steam's authentication or another library
# Will probably be changed in the future, since the server has to be running on the users computer
# It works for a local approach, but kind of negates the reason to use a backend server
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
    params = {'start': 0, 'count': 500}
    try:
        response = requests.get(url, params=params, cookies=cookie)
    except Exception as e:
        logging.error(e)
    res = response.json()
    # Get rest of data, based on total transaction count from the response
    total_count = res['total_count'] - 500
    print(total_count)
    final_loop_count = total_count % 500; 
    loops = int((total_count - final_loop_count) / 500)
    responses = {'page0': res['results_html']}
    for i in range(loops + 1):
        params = {'start:': 500 * i, 'count': 500}
        try:
            response = requests.get(url, params=params, cookies=cookie)
            time.sleep(5)
        except Exception as e:
            logging.error(e)
        responses['page' + str(i + 1)] = response.json()['results_html']
    return responses
    
# Main code

# Grab steam login key
slk = get_steam_login_cookie()
# Grab market history
res = get_market_history(slk)
# Dump to json file
with open('./res.json', 'w') as f:
    json.dump(res, f, indent=4)