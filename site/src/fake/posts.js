import { users } from './users'

export const posts = [
    {
        postId: 101,
        type: 3,
        locked: false,
        opened: false,
        state: false,
        tags: [{ name: 'émargement' },
            { name: 'présence' },
            { name: 'promo:l2' },
            { name: 'cours' },
            { name: 'importance:moyenne' },
            { name: 'fréquence:régulier' }],

        body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Problème observé: les étudiants sont parfois notés absents à des cours auxquels ils sont présents (particulièrement en ligne)"}]},{"type":"paragraph","content":[{"type":"text","text":"Solution potentielle: mettre en place un système d’émargement électronique officiel"}]}]}',
        title: 'Problème avec le système d\'émargement en L2',
        author: users[0],
        favorites: 33,
        upvotes: 243,
        views: 44653,
        downvotes: 3,
        createdAt: '2021-10-18T13:51:36.631Z', contentLastUpdatedAt: '2021-10-18T13:51:36.631Z',
        replies: [
            {
                content: 'Ceci est une réponse',
                author: users[2],
                comments: [
                    {
                        content: "Ceci est un commentaire.",
                        author: users[1]},
                    {   content: "Je suis d'accord",
                        author: users[1]
                    },
                    {
                        content: "Ceci est un commentaire caché par défaut",
                        author: users[1]
                    }
                ]
            }
        ]
    },
    { postId: 2201, type: 2, locked: false, opened: true, state: true,
        tags: [{ name: 'terrasse' },
            { name: 'promo:toutes' },
            { name: 'matériel' },
            { name: 'importance:moyenne' },
            { name: 'difficulté:facile' }],
        body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Les poufs sur la terrasse au dessus du fab lab sont laissés en extérieur la nuit ce qui les salit quand il pleut."}]},{"type":"paragraph","content":[{"type":"text","text":"Peut-être que les étudiants pourraient être autorisés et encourager à les ranger dans le hall du Bât. C ou dans le Bât. A les soirs de pluie ?"}]}]}',
        title: 'Rangement des poufs sur la terrasse du Bât. I',
        author: users[1],
        favorites: 104, upvotes: 1255, views: 27553, downvotes: 3,
        createdAt: '2021-10-15T13:51:36.631Z', contentLastUpdatedAt: '2021-10-17T13:51:36.631Z', replies: [{content: 'Ceci est une réponse', author: users[2], comments: [{content: "Ceci est un commentaire.", author: users[1]}, {content: "Je suis d'accord", author: users[1]}, {content: "Ceci est un commentaire caché par défaut", author: users[1]}]}] },

    { postId: 3032, type: 1, locked: true, opened: false, state: true,
        tags: [{ name: 'pave' },
            { name: 'déclaration pave' },
            { name: 'promo:toutes' },
            { name: 'urgence:haute' }],
        body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"J\'ai entendu dire qu\'il y\'avait besoin de remplir une déclaration de PAVE pour avoir ses points pour un semestre donné, mais je ne la connais pas."}]},{"type":"paragraph","content":[{"type":"text","text":"Est-ce quelqu\'un pourrait me montrer comment faire, étape par étape ?"}]}]}',
        title: 'Comment déclarer sa PAVE ?',
        author: users[2],
        favorites: 95, upvotes: 1004, views: 16993, downvotes: 3,
        createdAt: '2021-10-01T13:51:36.631Z', contentLastUpdatedAt: '2021-10-08T13:51:36.631Z', replies: [{content: 'Ceci est une réponse', author: users[2], comments: [{content: "Ceci est un commentaire.", author: users[1]}, {content: "Je suis d'accord", author: users[1]}, {content: "Ceci est un commentaire caché par défaut", author: users[1]}]}] },

    { postId: 11093, type: 4, locked: false, opened: true, state: false,
        tags: [{ name: 'stage' },
            { name: 'sopra steria' },
            { name: 'promo:m1' },
            { name: 'expérience' }],
        body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Bonjour à tous ! J\'ai reçu une proposition de stage chez Sopra, mais j\'hésite encore à l\'accepter"}]},{"type":"paragraph","content":[{"type":"text","text":"Pour ceux qui ont déjà fait un stage chez eux, comment fut votre expérience là-bas ? Avez-vous des conseils ?"}]}]}',
        title: 'Retour d\'expérience Sopra Steria',
        author: users[3],
        favorites: 12, upvotes: 430, views: 4683, downvotes: 3,
        createdAt: '2021-02-04T13:51:36.631Z', contentLastUpdatedAt: '2021-03-04T13:51:36.631Z', replies: [{content: 'Ceci est une réponse', author: users[2], comments: [{content: "Ceci est un commentaire.", author: users[1]}, {content: "Je suis d'accord", author: users[1]}, {content: "Ceci est un commentaire caché par défaut", author: users[1]}]}] }
]
