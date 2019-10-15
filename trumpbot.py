import time
import tweepy
import tkinter
from tweepy.auth import OAuthHandler
import csv

consumer_key = 'tQYtMEH8pwNLNUZdMR3w9jq9e'
consumer_secret = 'HycjOJgNZ8Brxi9eNovUGUElNm1xmfrgcqV6Z2Rmk6NzHVLSKU'
access_token = '1086121816706281472-ZuffhSLdI1zqg7l4GS5nxXvY9bvadB'
access_token_secret = '3hiQuqoDDT03CdjfTQ0arRU18I9ixpgHUWuYXtqbQYmhN'

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)


def replace_all(text, dic):
    for i, j in dic.items():
        text = text.replace(i, j)
    return text


tweet_dic = {"BORDER": "FUN PLACE", "WALL": "FUN ZONE", "Fake": "SUPER DUPER TRUE", "funny": "MEGA LOL",
             "Washington": "RESPECTABLE WASHINGTON", "dishonest": "SUPER DUPER TRUE", "\\xe2\\x80\\x99s": "",
              "&amp;": '', "\\xe2\\x80\\x9d": "", '\\xe2\\x80\\x9c': '', "'|": '', "\\xe2\\x80\\x99": "'", 'Fake News': 'a teletubbie, my friend,',
             'President Obama': 'OUR LORD AND SAVIOR PRESIDENT OBAMA', 'crime': 'happiness', 'CRIME': 'HAPPINESS', 'inaccurate': 'trustworthy',
             'con': 'fun!', 'highest': 'MOST MEGA', 'Sleepy Eyes': 'Handsome', 'North Korea': 'South Korea\'s funny uncle', '\\xe2\\x80\\x98': '',
             'false': 'VERY REPUTABLE AND INFORMATIVE', 'Witch': 'Tickle', 'witch': 'tickle', 'wrong': 'correct', 'fabricated': 'defintely not fabricated', 'fiction': 'true',
             'portray': 'tickle', 'Enemy': 'Pizza Delivery Man :)', 'me': 'ME', 'Iran': 'Meat', 'Roger': 'Roger, Hard as a Rock,', '...': '', 'we': 'WEEEEEEEE', 'MAKE AMERICA GREAT AGAIN!': 'I LIKE ROCKS'}

key = ["BORDER", "WALL"]

tweet_id = []



def tweet():
    with open('realdonaldtrump_tweets.csv', newline='') as csv_file:
        tweet_writer = csv.reader(csv_file, delimiter=' ', quotechar='|')
        for row in tweet_writer:

            for items in row:
                if items in tweet_dic and row[0] not in tweet_id:
                    #print(items)
                    tweet_poss = row
                    tweet_beg = row[0]

                    if 'RT' not in tweet_beg and 'https' not in tweet_beg:
                        tweet_part = tweet_beg[22:35]

                        tweet_edited = ' '.join(tweet_poss[1:])
                        new_tweet = replace_all(tweet_edited, tweet_dic)

                        print('Tweeting...')
                        #print(tweet_part + ' ' + tweet_edited)
                        print(tweet_part + ' ' + new_tweet)

                        api.update_status(tweet_part + ' ' + new_tweet)
                        tweet_id.append(row[0])

#print(api.get_user('realdonaldtrump'))

test = 0

while True:
    tweet()
    time.sleep(1800)
    print(test)
    test+=1


#print(tweet_id)










#todo: Replace given selected_word with positive one

#todo: generate new csv as the tweet template

#todo: actually tweet said tweet
