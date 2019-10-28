#!/usr/bin/env python
# encoding: utf-8

import tweepy  # https://github.com/tweepy/tweepy
import csv
import time

# Twitter API credentials
consumer_key = "tQYtMEH8pwNLNUZdMR3w9jq9e"
consumer_secret = "HycjOJgNZ8Brxi9eNovUGUElNm1xmfrgcqV6Z2Rmk6NzHVLSKU"
access_key = "1086121816706281472-ZuffhSLdI1zqg7l4GS5nxXvY9bvadB"
access_secret = "3hiQuqoDDT03CdjfTQ0arRU18I9ixpgHUWuYXtqbQYmhN"


def get_all_tweets(screen_name):
    # Twitter only allows access to a users most recent 3240 tweets with this method

    # authorize twitter, initialize tweepy
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_key, access_secret)
    api = tweepy.API(auth)

    # initialize a list to hold all the tweepy Tweets
    alltweets = []

    # make initial request for most recent tweets (200 is the maximum allowed count)
    new_tweets = api.user_timeline(screen_name=screen_name, count=2, tweet_mode='extended')

    # save most recent tweets
    alltweets.extend(new_tweets)


    # save the id of the oldest tweet less one
    oldest = alltweets[-1].id - 1

    # keep grabbing tweets until there are no tweets left to grab
    while len(new_tweets) > 0:
        print ("getting tweets before %s" % (oldest))


        # all subsiquent requests use the max_id param to prevent duplicates
        new_tweets = api.user_timeline(screen_name=screen_name, count=2, max_id=oldest, tweet_mode='extended')

        # save most recent tweets
        alltweets.extend(new_tweets)

        # update the id of the oldest tweet less one
        oldest = alltweets[-1].id - 1

        print ("...%s tweets downloaded so far" % (len(alltweets)))

    # transform the tweepy tweets into a 2D array that will populate the csv
    outtweets = [[tweet.id_str, tweet.full_text.encode("utf-8")] for tweet in alltweets]

    # write the csv
    with open('%s_tweets.csv' % screen_name, 'w', encoding='utf-8') as f:
        writer = csv.writer(f, quotechar='|')
        writer.writerow(["id", "created_at", "text"])
        writer.writerows(outtweets)

    pass

if __name__ == '__main__':
    # pass in the username of the account you want to download

    get_all_tweets("realdonaldtrump")

