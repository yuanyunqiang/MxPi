from django.contrib import admin
from .models import MxpiArticles

class MxpiArticlesAdmin(admin.ModelAdmin):
    list_display = ("title","body","read","publish")


admin.site.register(MxpiArticles,MxpiArticlesAdmin)