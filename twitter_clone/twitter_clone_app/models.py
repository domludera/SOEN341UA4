from django.db import models
from django.contrib.auth.admin import User
from django.db.models.signals import post_save


class Chirp(models.Model):
    tweet_text = models.CharField(max_length=1000)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date_posted = models.DateTimeField(auto_now_add=True)
    num_like = models.PositiveSmallIntegerField(default=0)
    num_share = models.PositiveSmallIntegerField(default=0)
    likes = models.ManyToManyField(User, related_name='likes', blank=True)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    followers = models.ManyToManyField(User, related_name='followers', blank=True)


def create_profile(sender, **kwargs):
    if kwargs['created']:
        user_profile = UserProfile.objects.create(user=kwargs['instance'])


post_save.connect(create_profile, sender=User)
