# Generated by Django 5.0.7 on 2024-08-07 22:49

import django.db.models.manager
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('characters', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='character',
            managers=[
                ('characters', django.db.models.manager.Manager()),
            ],
        ),
    ]
