from pizzapi import *
import json

def main():

    label = []
    price = []
    data = {}

    address = Address('1202 n Chestnut St', 'Washington', '98926')
    store = address.closest_store()
    menu = store.get_menu()

    values = menu.variants.values()

    for v in values:
        label.append(v['Name'].encode('ascii', 'ignore').decode('ascii'))
        price.append(v['Price'])

    data['Items'] = label
    data['Prices'] = price

    with open('C:/Users/Connor/Desktop/programming/websiteV3/data.json', 'w') as outfile:
        json.dump(data, outfile)

main()

