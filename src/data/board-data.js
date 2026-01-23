export const initialColumns = [
    {
        id: "created",
        title: "CREATED",
        count: 12,
        cards: [
            {
                id: "SAAS-412",
                title: "Refactor authentication middleware for OAuth2.0 flow",
                tag: { label: "Backend", variant: "default" },
                link: "SAAS-390",
            },
            {
                id: "SAAS-425",
                title: "Design system update: New navigation icons",
                tag: { label: "Design", variant: "secondary" },
            },
        ],
    },
    {
        id: "inprogress",
        title: "IN PROGRESS",
        count: 5,
        cards: [
            {
                id: "SAAS-398",
                title: "Implement real-time dashboard analytics",
                tag: { label: "Urgent", variant: "warning" },
                progress: 80,
            },
            {
                id: "SAAS-382",
                title: "Integrate Stripe Subscriptions with core engine",
                tag: { label: "Billing", variant: "success" },
                tag2: { label: "Feature", variant: "default" },
                highlight: true,
            },
            {
                id: "SAAS-401",
                title: "Cloud sync conflict resolution logic",
                tag: { label: "API", variant: "default" },
            },
        ],
    },
    {
        id: "done",
        title: "DONE",
        count: 42,
        cards: [
            {
                id: "SAAS-210",
                title: "Landing page V2 hero section rewrite",
                completed: true,
            },
            {
                id: "SAAS-205",
                title: "Persist theme toggle persistence",
                completed: true,
            },
        ],
    },
    {
        id: "bugs",
        title: "BUGS",
        count: 3,
        cards: [
            {
                id: "SAAS-450",
                title: "Mobile logout button not responsive on Safari",
                link: "SAAS-102",
                isBug: true,
            },
        ],
    },
];
