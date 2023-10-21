from bs4 import BeautifulSoup
import json

# Definiton of data to be extracted
"""
    # Item info
    game: str
    name: str

    # General info
    gain_or_loss: str
    third_party_name: str
    listed_date: str
    purchase_date: str
    sale_price: float

    # Image info
    item_img: str
    third_party_img: str
"""

# TO DO in here:
# Grab image data
# Fix listing dates
# Grab things from JSON like inspect link and wear

def parse_html_data(html: str):
    transactions = []
    soup = BeautifulSoup(bytes(html, 'utf-8'), 'html.parser')
    rows = soup.find_all('div', class_='market_recent_listing_row')
    for row in rows:
        data = {}

        data['game'] = row.find('span', class_='market_listing_game_name').text
        data['name'] = row.find('span', class_='market_listing_item_name').text

        gain_or_loss = row.find('div', class_='market_listing_gainorloss').text
        data['gain_or_loss'] = '+' if '+' in gain_or_loss else '-'

        seller_name = row.find('div', class_='market_listing_whoactedwith_name_block')
        if seller_name != None:
            seller_name = seller_name.text.replace('\r', '').replace('\n', '').replace('\t', '').replace('Buyer:', '').replace('Seller:', '')
        data['third_party_name'] = seller_name

        listed_date = row.find('div', class_='market_listing_listed_date').text
        data['listed_date'] = listed_date.replace('\r', '').replace('\n', '').replace('\t', '')

        purchase_date = row.find('div', class_='market_listing_listed_date_combined').text
        if purchase_date.find('Listed: ') != -1 :
            continue
        data['purchase_date'] = purchase_date.replace('\r', '').replace('\n', '').replace('\t', '').replace('Purchased: ', '').replace('Sold: ', '')
        
        sale_price = row.find('span', class_='market_listing_price').text
        data['sale_price'] = sale_price.replace('\r', '').replace('\n', '').replace('\t', '').replace('$', '')
        transactions.append(data)
    return transactions


def parse_object_data(obj_data):
    pass

# MAIN CODE

f = open('./res.json')
data = json.load(f)
raw_html = data['results_html']
raw_json = data['assets']['730']['2']

html_data = parse_html_data(raw_html)
with open("market_data.txt", "w", encoding="utf-8") as f:
    f.write(str(html_data))
    f.close()
print(html_data)

parse_object_data(raw_json)
