# Generated by Django 3.2.6 on 2021-10-16 06:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_chat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='chat',
            name='time',
            field=models.TimeField(null=True),
        ),
    ]
