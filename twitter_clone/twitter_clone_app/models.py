from django.db import models
from django.contrib.auth.admin import User


class Chirp(models.Model):
    tweet_text = models.CharField(max_length=1000)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date_posted = models.DateTimeField(auto_now_add=True)
    num_like = models.PositiveSmallIntegerField(default=0)
    num_share = models.PositiveSmallIntegerField(default=0)
    likes = models.ManyToManyField(User, related_name='likes', blank=True)

    def total_likes(self):
        return self.likes.count()
