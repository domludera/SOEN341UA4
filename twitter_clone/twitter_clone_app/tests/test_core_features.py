from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse


class UserLogin(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'testUser',
            'password': 'thisTest'
        }
        User.objects.create_user(**self.credentials)

    def test_login(self):
        response = self.client.post('/login/', self.credentials, follow=True)
        self.assertTrue(response.context['user'].is_authenticated)


class UserRegistration(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'test',
            'password': 'test',
        }
        User.objects.create_user(**self.credentials)

    def test_registration(self):
        response = self.client.post('/registration/', self.credentials, follow=True)
        self.assertFalse(response.context['user'].is_authenticated)


class PostChirp(TestCase):
    def setUp(self):
        self.chirp_url = self.client.get(reverse('home'))
        self.author = {
            'username': 'testUser',
            'password': 'testPass',
        }
        self.user = User.objects.create_user(**self.author)
        self.chirp = {
            'tweet_text': 'hello',
            'author': self.user,
            'date_posted': 'test',
            'num_like': 0,
            'num_share': 0,
            'likes': {self.user},
        }

    def test_post(self):
        self.assertEqual(self.chirp.get('tweet_text'), 'hello')


class LikeChirp(TestCase):
    def setUp(self):
        self.chirp_url = self.client.get(reverse('home'))
        self.author = {
            'username': 'testUser',
            'password': 'testPass',
        }
        self.user = User.objects.create_user(**self.author)
        self.chirp = {
            'tweet_text': 'hello',
            'author': self.user,
            'date_posted': 'test',
            'num_like': 1,
            'num_share': 0,
            'likes': {self.user},
        }

    def test_post(self):
        self.assertEqual(self.chirp.get('num_like'), 1)


class FollowUser(TestCase):
    def setUp(self):
        self.follow_url = self.client.get(reverse('profiles'))
        self.user = {
            'username': 'testUser',
            'password': 'testPass',
        }
        self.author = User.objects.create(**self.user)
        self.credentials = {
            'username': self.author,
            'followers': 0,
        }
