# Generated by Django 3.2.12 on 2022-02-04 18:09

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MxpiArticles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('body', models.CharField(max_length=30000)),
                ('read', models.BooleanField()),
                ('publish', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'ordering': ('-publish',),
            },
        ),
    ]
