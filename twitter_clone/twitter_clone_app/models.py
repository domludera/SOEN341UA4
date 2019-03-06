from django.db import models
from django.contrib.auth.admin import User
from django.db.models.signals import post_save


# Chirp (post) object. Contains all the necessary information to the post.

class Chirp(models.Model):
    tweet_text = models.CharField(max_length=1000)
    author = models.ForeignKey(User, on_delete=models.CASCADE)  # When user is deleted, will delete that chirp.
    date_posted = models.DateTimeField(auto_now_add=True)
    num_like = models.PositiveSmallIntegerField(default=0)
    num_share = models.PositiveSmallIntegerField(default=0)
    likes = models.ManyToManyField(User, related_name='likes', blank=True)  # Possible to have many likes.


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Extend user built-in model.
    followers = models.ManyToManyField(User, related_name='followers', blank=True)


def create_profile(sender, **kwargs):  # This function create a user profile every time a user is created.
    if kwargs['created']:
        user_profile = UserProfile.objects.create(user=kwargs['instance'])


#  Calling the function
post_save.connect(create_profile, sender=User)
