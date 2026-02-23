from datetime import timedelta

SIMPLE_JWT = {
    'TOKEN_OBTAIN_SERIALIZER' : 'account.serializers.TokenObtainPairSerializer',
    'ACCESS_TOKEN_LIFETIME' : timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME' : timedelta(weeks=1),
}

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_AUTHENTICATION_CLASSES' : [
        'rest_framework_simplejwt.authentication.JWTAuthentication'
    ]
}