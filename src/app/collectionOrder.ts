interface collectionItem {
    url?: string,
    name?: string
}

const names: Array<string> = [
    'Aromatic Fragrance',
    'Stuart Little',
    'Blossom',
    'Overwhelmed',
    'Stationary Study',
    'Editorial Mimicry',
    'Architecture',
    'Insectified'
]

export const collection: collectionItem[] = [
    // row 1:
    {}, // edge
    {url: 'assets/thumbnails/15.png', name: names[0]},
    {},
    {url: 'assets/thumbnails/16.jpg', name: names[2]},
    {},
    {},
    {},
    {url: 'assets/thumbnails/12.png', name: names[5]},
    {},
    {url: 'assets/thumbnails/04.jpg', name: names[7]},
    {}, // edge

    // row 2:
    {}, // edge
    {url: 'assets/thumbnails/20.png', name: names[0]},
    {},
    {},
    {url: 'assets/thumbnails/18.jpg', name: names[3]},
    {},
    {url: 'assets/thumbnails/17.jpg', name: names[4]},
    {},
    {url: 'assets/thumbnails/07.jpg', name: names[6]},
    {},
    {}, // edge

    // row 3:
    {}, // edge
    {},
    {url: 'assets/thumbnails/10.jpg', name: names[1]},
    {url: 'assets/thumbnails/09.jpg', name: names[2]},
    {},
    {},
    {},
    {url: 'assets/thumbnails/13.png', name: names[5]},
    {},
    {},
    {}, // edge

    // row 4:
    {}, // edge
    {url: 'assets/thumbnails/06.jpg', name: names[0]},
    {},
    {},
    {url: 'assets/thumbnails/19.png', name: names[3]},
    {},
    {},
    {},
    {},
    {url: 'assets/thumbnails/03.jpg', name: names[7]},
    {}, // edge
]