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
    
def get_page(steam_login_key: str, start: int, count: int):
    url = 'https://steamcommunity.com/market/myhistory/'
    cookie = {'steamLoginSecure': steam_login_key}
    params = {'start': start, 'count': count}
    try:
        response = requests.get(url, params=params, cookies=cookie, timeout=10)
    except Exception as e:
        print('Request failed')
        logging.error(e)
    print('Response recieved')
    return response.json()

# Requests steam market history from the steam API with the specified login key
def get_market_history(steam_login_key: str):
    page0 = get_page(steam_login_key, 0, 500)
    # Get rest of data, based on total transaction count from the response
    remaining_pages = page0['total_count'] - 500
    final_page_size = remaining_pages % 500; 
    loops = int((remaining_pages - final_page_size) / 500)
    responses = {'json': None, 'page0': page0['results_html']}
    for i in range(loops):
        response = get_page(steam_login_key, (500 * (i + 1)), 500)
        responses['page' + str(i + 1)] = response['results_html']
    final_page = get_page(steam_login_key, (page0['total_count'] - final_page_size), final_page_size)
    responses['page' + str(loops + 1)] = final_page['results_html']
    responses['total_count'] = page0['total_count']
    return responses
    
# Main code

# Grab steam login key
slk = get_steam_login_cookie()
# Grab market history
res = get_market_history(slk)
# Dump to json file
with open('./res.json', 'w') as f:
    json.dump(res, f, indent=4)