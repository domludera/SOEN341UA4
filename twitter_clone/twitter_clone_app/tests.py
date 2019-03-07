from django.test import TestCase
from django.contrib.auth.models import User


class UserLogin(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'testUser',
            'password': 'alecadub'
        }
        User.objects.create_user(**self.credentials)

    def test_login(self):
        response = self.client.post('/twitter/login/', self.credentials, follow=True)
        self.assertTrue(response.context['user'].is_active)

