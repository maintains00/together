from django.db import models

# Create your models here.
class kiosk(models.Model):
    category = models.IntegerField(default=0)
    name = models.CharField(max_length=30)
    price = models.CharField(max_length=30)
    image = models.ImageField(upload_to='images/', null=False)
    
    class Meta:
        db_table = 'kiosks'