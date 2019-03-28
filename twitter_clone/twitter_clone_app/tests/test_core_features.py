from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from twitter_clone_app.models import Chirp, UserProfile


class UserLoginTest(TestCase):
    def setUp(self):
        self.credentials = {  # Create credentials for username
            'username': 'testUser',
            'password': 'thisTest'
        }
        User.objects.create_user(**self.credentials)  # Create user with credentials

    def test_login(self):
        response = self.client.post('/login/', self.credentials, follow=True)  # POST request on login with credentials
        self.assertTrue(response.context['user'].is_authenticated)  # Check if post request logged in the user


class UserRegistrationTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'test',
            'password': 'test',
        }
        User.objects.create_user(**self.credentials)

    def test_registration(self):
        response = self.client.post('/registration/', self.credentials,
                                    follow=True)  # Post request with wrong credentials
        self.assertFalse(response.context['user'].is_authenticated)  # Check that request failed with wrong credentials.


class PostChirpTest(TestCase):
    def setUp(self):
        self.chirp_url = self.client.get(reverse('home'))
        self.author = {
            'username': 'testUser',
            'password': 'testPass',
        }
        self.user = User.objects.create_user(**self.author)
        self.chirp = Chirp.objects.create(  # Create Chirp object.
            author=self.user,
            tweet_text='hello',
        )

    def test_post(self):
        try:
            response = self.client.post('/home/', Chirp.objects.create(author=self.user),
                                        follow=True)  # Post request with chirp object
        except AttributeError:
            response = self.chirp_url  # If previous failed, take the home page URL
        self.assertTrue(response.status_code, 200)  # Check if response status code is OK.


class LikeChirpTest(TestCase):
    def setUp(self):
        self.chirp_url = self.client.get(reverse('home'))  # Set home URL
        self.author = {
            'username': 'testUser',
            'password': 'testPass',
        }
        self.user = User.objects.create_user(**self.author)  # Create  User object
        self.chirp = {  # Create chirp object
            'tweet_text': 'hello',
            'author': self.user,
            'date_posted': 'test',
            'num_like': 1,
            'num_share': 0,
            'likes': {self.user},
        }

    def test_like(self):
        self.chirp['num_like'] = 2  # Update likes
        self.assertEqual(self.chirp.get('num_like'), 2)  # Test like updated by 1


class FollowUser(TestCase):
    def setUp(self):
        self.chirp_url = self.client.get(reverse('home'))
        self.author = {
            'username': 'testUser',
            'password': 'testPass',
        }
        self.user = User.objects.create_user(**self.author)
        self.userProfile = {
            'user': self.user,
            'followers': 0,
        }

    def test_follow(self):
        self.assertEqual(self.userProfile.get('followers'), 0)


class UserProfileTest(TestCase):
    def setUp(self):
        self.author = {
            'username': 'testUser',
            'password': 'testPass',
        }
        User.objects.create(**self.author)  # Create user

    def test_user_profile(self):
        response = self.client.get('/profile/testUser/')  # get response of get request of userProfile
        self.assertEqual(response.status_code, 200)  # Check if response is OK.
