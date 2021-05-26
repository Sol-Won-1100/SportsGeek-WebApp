export const menuItems = {
    User: [
        {
            active: [
                {
                    label: 'Home',
                    routeLink: '/user'
                },
                {
                    label: 'Organization',
                    routeLink: '/user/organization'
                },
                {
                    label: 'Donation History',
                    routeLink: '/user/donation-history'
                },
                {
                    label: 'Volunteer',
                    routeLink: '/user/volunteer-task'
                },
                {
                    label: 'Pickup Tasks',
                    routeLink: '/user/pick-task'
                }
            ]
        },
        {
            inactive: [
                {
                    label: 'Home',
                    routeLink: '/user'
                },
                {
                    label: 'Organization',
                    routeLink: '/user/organization'
                },
                {
                    label: 'Login',
                    routeLink: '/login'
                },
                {
                    label: 'Register',
                    routeLink: '/user/register'
                }
            ]
        }
    ],
    Admin: [
        {
            active: [
                {
                    label: 'Users',
                    routeLink: '/manageUser'
                },
                {
                    label: 'Recharge',
                    routeLink: '/manageRecharge'
                },
                {
                    label: 'Team',
                    routeLink: '/manageTeam'
                },
                {
                    label: 'Matches',
                    routeLink: '/manageMatches'
                }
            ]
        },
        {
            inactive: [
                {
                    label: 'Login',
                    routeLink: '/login'
                }
            ]
        }
    ],
}