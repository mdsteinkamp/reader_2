from rest_framework import views, response, permissions

from user import authentication

class BookCreateListApi(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        pass

    def get(self, request):
        pass