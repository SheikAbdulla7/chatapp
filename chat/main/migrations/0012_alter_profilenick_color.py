# Generated by Django 3.2.6 on 2021-10-16 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_profilenick_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profilenick',
            name='color',
            field=models.CharField(choices=[('blue', 'blue'), ('black', 'black'), ('green', 'green'), ('purple', 'purple')], default='blue', max_length=20),
        ),
    ]