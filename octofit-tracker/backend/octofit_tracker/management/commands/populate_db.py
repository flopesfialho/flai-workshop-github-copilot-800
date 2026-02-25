from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Deleting existing data...')
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Creating users (superheroes)...')
        users_data = [
            {'username': 'ironman', 'email': 'tony@stark.com', 'password': 'repulsor123'},
            {'username': 'captainamerica', 'email': 'steve@shield.gov', 'password': 'shield456'},
            {'username': 'thor', 'email': 'thor@asgard.com', 'password': 'mjolnir789'},
            {'username': 'spiderman', 'email': 'peter@dailybugle.com', 'password': 'webshooter321'},
            {'username': 'batman', 'email': 'bruce@wayneenterprises.com', 'password': 'gotham999'},
            {'username': 'superman', 'email': 'clark@dailyplanet.com', 'password': 'krypton888'},
            {'username': 'wonderwoman', 'email': 'diana@themyscira.com', 'password': 'lasso777'},
            {'username': 'theflash', 'email': 'barry@ccpd.gov', 'password': 'speedforce555'},
        ]
        users = []
        for data in users_data:
            user = User.objects.create(**data)
            users.append(user)
            self.stdout.write(f'  Created user: {user.username}')

        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(name='Team Marvel')
        for user in [users[0], users[1], users[2], users[3]]:
            team_marvel.members.add(user)

        team_dc = Team.objects.create(name='Team DC')
        for user in [users[4], users[5], users[6], users[7]]:
            team_dc.members.add(user)

        self.stdout.write('  Created teams: Team Marvel, Team DC')

        self.stdout.write('Creating activities...')
        activities_data = [
            {'user': users[0], 'activity_type': 'Flying', 'duration': 45.0, 'date': date(2025, 2, 1)},
            {'user': users[1], 'activity_type': 'Shield Training', 'duration': 60.0, 'date': date(2025, 2, 2)},
            {'user': users[2], 'activity_type': 'Hammer Throw', 'duration': 30.0, 'date': date(2025, 2, 3)},
            {'user': users[3], 'activity_type': 'Web Swinging', 'duration': 50.0, 'date': date(2025, 2, 4)},
            {'user': users[4], 'activity_type': 'Martial Arts', 'duration': 90.0, 'date': date(2025, 2, 1)},
            {'user': users[5], 'activity_type': 'Heat Vision Training', 'duration': 40.0, 'date': date(2025, 2, 2)},
            {'user': users[6], 'activity_type': 'Lasso Practice', 'duration': 55.0, 'date': date(2025, 2, 3)},
            {'user': users[7], 'activity_type': 'Speed Run', 'duration': 20.0, 'date': date(2025, 2, 4)},
        ]
        for data in activities_data:
            activity = Activity.objects.create(**data)
            self.stdout.write(f'  Created activity: {activity.user.username} - {activity.activity_type}')

        self.stdout.write('Creating leaderboard entries...')
        Leaderboard.objects.create(team=team_marvel, points=450)
        Leaderboard.objects.create(team=team_dc, points=410)
        self.stdout.write('  Created leaderboard entries')

        self.stdout.write('Creating workouts...')
        workouts_data = [
            {
                'name': 'Iron Man Cardio Blast',
                'description': 'High-intensity interval training inspired by Tony Stark\'s suit workouts',
                'duration': 45.0
            },
            {
                'name': 'Captain America Strength Circuit',
                'description': 'Super-soldier enhanced strength and endurance routine',
                'duration': 60.0
            },
            {
                'name': 'Thor Thunder Training',
                'description': 'Asgardian power and agility drills with hammer simulation',
                'duration': 50.0
            },
            {
                'name': 'Spider Agility Course',
                'description': 'Flexibility, balance and reflexes training like your friendly neighborhood hero',
                'duration': 40.0
            },
            {
                'name': 'Batman Combat Conditioning',
                'description': 'Dark Knight martial arts and detective-level focus workout',
                'duration': 75.0
            },
            {
                'name': 'Flash Speed Intervals',
                'description': 'Lightning-fast sprints and reaction time exercises',
                'duration': 30.0
            },
        ]
        for data in workouts_data:
            workout = Workout.objects.create(**data)
            self.stdout.write(f'  Created workout: {workout.name}')

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
