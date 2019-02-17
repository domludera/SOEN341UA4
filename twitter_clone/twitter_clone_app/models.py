from django.db import models


class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)


class Tweet(models.Model):
    tweet_text = models.CharField(max_length=1000)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date_posted = models.DateTimeField(auto_now_add=True)
    num_like = models.PositiveSmallIntegerField(default=0)
    num_share = models.PositiveSmallIntegerField(default=0)
