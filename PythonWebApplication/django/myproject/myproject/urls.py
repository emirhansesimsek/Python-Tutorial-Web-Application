from django.contrib import admin
from django.urls import path

urlpatterns = [
    path("admin/", admin.site.urls),
]

from django.urls import path
from myapp import views

urlpatterns = [
    path('', views.run_code, name='home'),  # Ana sayfa için view fonksiyonu run_python_code idi
    path('myapp/', views.run_code, name='myapp_home'),
    path('run_code/', views.run_code, name='run_code'),
]
