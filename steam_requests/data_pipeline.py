from bs4 import BeautifulSoup
import json

# Definiton of data to be extracted
"""
    id: int (unique, not a field)

    # Item info
    game: str
    name: str

    # General info
    gain_or_loss: str
    third_party_name: str
    third_party_img: str (link)
    listed_date: str
    purchase_date: str
    sale_price: float

    # Image info
    item_img: str
    third_party_img: str
"""
FIELDS = ['game', 'name', 'gain_or_loss', 'third_party_name', 'third_party_img', 'listed_date', 'purchase_date', 'sale_price']

# TO DO in here:
# Grab image data
# Fix listing dates
# Grab things from JSON like inspect link and wear

def parse_html_data(html: str, identifier: int):
    transactions = []
    soup = BeautifulSoup(bytes(html, 'utf-8'), 'html.parser')
    rows = soup.find_all('div', class_='market_recent_listing_row')
    for row in rows:
        data = {}
        data['id'] = identifier
        identifier += 1

        data['game'] = row.find('span', class_='market_listing_game_name').text
        data['name'] = row.find('span', class_='market_listing_item_name').text

        gain_or_loss = row.find('div', class_='market_listing_gainorloss').text
        gol_value = ''
        if '+' in gain_or_loss:
            gol_value = '+'
        elif '-' in gain_or_loss:
            gol_value = '-'
        data['gain_or_loss'] = gol_value

        seller_name = row.find('div', class_='market_listing_whoactedwith_name_block')
        if seller_name != None:
            seller_name = seller_name.text.replace('\r', '').replace('\n', '').replace('\t', '').replace('Buyer:', '').replace('Seller:', '')
        else:
            seller_name = 'Listing created'
        data['third_party_name'] = seller_name

        seller_img_span = row.find('span', class_='market_listing_owner_avatar')
        seller_img = ''
        if seller_img_span != None:
            seller_img = seller_img_span.img['src']
        data['third_party_img'] = seller_img

        listed_date = row.find_all('div', class_='market_listing_listed_date')
        data['listed_date'] = listed_date[0].text.replace('\r', '').replace('\n', '').replace('\t', '')
        data['purchase_date'] = listed_date[1].text.replace('\r', '').replace('\n', '').replace('\t', '')
        
        sale_price = row.find('span', class_='market_listing_price').text
        data['sale_price'] = sale_price.replace('\r', '').replace('\n', '').replace('\t', '').replace('$', '')
        transactions.append(data)
    return transactions

# MAIN CODE

f = open('./res.json')
data = json.load(f)

raw_html = []
page = 'page0'
page_num = 1
while page in data:
    raw_html.append(data[page])
    page = 'page' + str(page_num)
    page_num += 1

transactions = []
identifier = 0
for p in raw_html:
    transaction_list = parse_html_data(p, identifier)
    identifier += 500
    for t in transaction_list:
        transactions.append(t)

final_data = {}
final_data['transaction_list'] = transactions
final_data['count'] = data['total_count']
final_data['fields'] = FIELDS
final_data['fieldCount'] = str(len(FIELDS))

with open("market_data.json", "w", encoding="utf-8") as f:
    json.dump(final_data, f, indent=4)
    f.close()
