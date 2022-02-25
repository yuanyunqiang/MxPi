from django.db import models
from django.utils import timezone

# Create your models here.
class MxpiArticles(models.Model):
    title = models.CharField(max_length=300)
    body = models.CharField(max_length=30000)
    read = models.BooleanField()
    publish = models.DateTimeField(default=timezone.now)  #建立一个发布时间的字段

    class Meta:
        ordering = ("-publish",) #规定按照publish倒序显示
    
    def __str__(self):
        return self.title