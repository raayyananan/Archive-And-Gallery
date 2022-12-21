// collection-view data for thumbnails
interface collectionItem {
    id: number,
    src?: string,
    name?: string,
    url?: string,
    number?: number,
    alt?: string
}

export const names: Array<string> = [
    'Aromatic Fragrance',
    'Stuart Little',
    'Blossom',
    'Overwhelmed',
    'Stationary Study',
    'Editorial Mimicry',
    'Architecture',
    'Insectified'
]


// export const thumbnailNumbers = [11, 8, 1, 12, 6, 2, 7, 13];
export const thumbnailNumbers = [11, 8, 9, 12, 6, 2, 7, 13];

// export const collectionOrderOld: collectionItem[] = [
//     // row 1:
//     {id: 0, }, // edge
//     {id: 1, src: 'assets/thumbnails/15.png', name: names[0], url: URLify(names[0]), number: 0},
//     {id: 2, },
//     {id: 3, src: 'assets/thumbnails/16.jpg', name: names[2], url: URLify(names[2]), number: 1},
//     {id: 4, },
//     {id: 5, },
//     {id: 6, },
//     {id: 7, src: 'assets/thumbnails/12.png', name: names[5], url: URLify(names[5]), number: 2},
//     {id: 8, },
//     {id: 9, src: 'assets/thumbnails/04.jpg', name: names[7], url: URLify(names[7]), number: 3},
//     {id: 10, }, // edge

//     // row 2:
//     {id: 11, }, // edge
//     {id: 12, src: 'assets/thumbnails/20.png', name: names[0], url: URLify(names[0]), number: 4},
//     {id: 13, },
//     {id: 14, },
//     {id: 15, src: 'assets/thumbnails/18.jpg', name: names[3], url: URLify(names[3]), number: 5},
//     {id: 16, },
//     {id: 17, src: 'assets/thumbnails/17.jpg', name: names[4], url: URLify(names[4]), number: 6},
//     {id: 18, },
//     {id: 19, src: 'assets/thumbnails/07.jpg', name: names[6], url: URLify(names[6]), number: 7},
//     {id: 20, },
//     {id: 21, }, // edge

//     // row 3:
//     {id: 22, }, // edge
//     {id: 23, },
//     {id: 24, src: 'assets/thumbnails/10.jpg', name: names[1], url: URLify(names[1]), number: 8},
//     {id: 25, src: 'assets/thumbnails/09.jpg', name: names[2], url: URLify(names[2]), number: 9},
//     {id: 26, },
//     {id: 27, },
//     {id: 28, },
//     {id: 29, src: 'assets/thumbnails/13.png', name: names[5], url: URLify(names[5]), number: 10},
//     {id: 30, },
//     {id: 31, },
//     {id: 32, }, // edge

//     // row 4:
//     {id: 33, }, // edge
//     {id: 34, src: 'assets/thumbnails/06.jpg', name: names[0], url: URLify(names[0]), number: 11},
//     {id: 35, },
//     {id: 36, },
//     {id: 37, src: 'assets/thumbnails/19.png', name: names[3], url: URLify(names[3]), number: 12},
//     {id: 38, },
//     {id: 39, },
//     {id: 40, },
//     {id: 41, },
//     {id: 42, src: 'assets/thumbnails/03.jpg', name: names[7], url: URLify(names[7]), number: 13},
//     {id: 43, }, // edge
// ]

export const collectionOrder: collectionItem[] = [
    // row 1:
    {id: 0, }, // edge
    {id: 1, src: 'assets/bwthumbnails/2.webp', name: names[0], url: URLify(names[0]), number: 0, alt: `Wooden table, part of the collection '${names[0]}' in Archive and Gallery`},
    {id: 2, },
    {id: 3, src: 'assets/bwthumbnails/5.webp', name: names[2], url: URLify(names[2]), number: 1, alt: `White flowers, part of the collection '${names[2]}' in Archive and Gallery`},
    {id: 4, },
    {id: 5, },
    {id: 6, },
    {id: 7, src: 'assets/bwthumbnails/10.webp', name: names[5], url: URLify(names[5]), number: 2, alt: `Curly haired boy looking up, part of the collection '${names[5]}' in Archive and Gallery`},
    {id: 8, },
    {id: 9, src: 'assets/bwthumbnails/17.webp', name: names[7], url: URLify(names[7]), number: 3, alt: `Red insect close up shot, part of the collection '${names[7]}' in Archive and Gallery`},
    {id: 10, }, // edge

    // row 2:
    {id: 11, }, // edge
    {id: 12, src: 'assets/bwthumbnails/1.webp', name: names[0], url: URLify(names[0]), number: 4, alt: `Perfume bottle, part of the '${names[0]}' collection in Archive and Gallery`},
    {id: 13, },
    {id: 14, },
    {id: 15, src: 'assets/bwthumbnails/7.webp', name: names[3], url: URLify(names[3]), number: 5, alt: `Boy laying on a sofa surrounded by and covered in pillows, part of the collection '${names[3]}' in Archive and Gallery`},
    {id: 16, },
    {id: 17, src: 'assets/bwthumbnails/9.webp', name: names[4], url: URLify(names[4]), number: 6, alt: `Top down shot of an hp laptop. Part of the collection '${names[4]}' in Archive and Gallery`},
    {id: 18, },
    {id: 19, src: 'assets/bwthumbnails/14.webp', name: names[6], url: URLify(names[6]), number: 7, alt: `A building. Part of the collection '${names[6]}' in Archive and Gallery`},
    {id: 20, },
    {id: 21, }, // edge

    // row 3:
    {id: 22, }, // edge
    {id: 23, },
    {id: 24, src: 'assets/bwthumbnails/4.webp', name: names[1], url: URLify(names[1]), number: 8, alt: `An eye of a cat, part of the collection '${names[1]}' in Archive and Gallery`},
    {id: 25, src: 'assets/bwthumbnails/6.webp', name: names[2], url: URLify(names[2]), number: 9, alt: `Close up of a leaf, part of the collection '${names[2]}' in Archive and Gallery`},
    {id: 26, },
    {id: 27, },
    {id: 28, },
    {id: 29, src: 'assets/bwthumbnails/12.webp', name: names[5], url: URLify(names[5]), number: 10, alt: `Man on his knees grabbing his own neck, part of the collection '${names[5]}' in Archive and Gallery`},
    {id: 30, },
    {id: 31, },
    {id: 32, }, // edge

    // row 4:
    {id: 33, }, // edge
    {id: 34, src: 'assets/bwthumbnails/3.webp', name: names[0], url: URLify(names[0]), number: 11, alt: `Perfume bottle, part of the collection '${names[0]}' in Archive and Gallery`},
    {id: 35, },
    {id: 36, },
    {id: 37, src: 'assets/bwthumbnails/8.webp', name: names[3], url: URLify(names[3]), number: 12, alt: `Man stretching on sofa chair. Part of the collection '${names[3]}' in Archive and Gallery`},
    {id: 38, },
    {id: 39, },
    {id: 40, },
    {id: 41, },
    {id: 42, src: 'assets/bwthumbnails/16.webp', name: names[7], url: URLify(names[7]), number: 13, alt: `An insect drinking nectar from a flower. Part of the collection '${names[7]}' in Archive and Gallery`},
    {id: 43, }, // edge
]

// export const mobileListOrder: Array<collectionItem[]> = [
//     [ // top list
//         {id: 1, src: 'assets/thumbnails/20.png', name: names[0], url: URLify(names[0])},
//         {id: 2, src: 'assets/thumbnails/10.jpg', name: names[1], url: URLify(names[1])},
//         {id: 3, src: 'assets/thumbnails/16.jpg', name: names[2], url: URLify(names[2])},
//         {id: 4, src: 'assets/thumbnails/18.jpg', name: names[3], url: URLify(names[3])},
//         {id: 5, src: 'assets/thumbnails/21.jpg', name: names[4], url: URLify(names[4])},
//         {id: 6, src: 'assets/thumbnails/12.png', name: names[5], url: URLify(names[5])},
//         {id: 7, src: 'assets/thumbnails/07.jpg', name: names[6], url: URLify(names[6])},
//         {id: 8, src: 'assets/thumbnails/04.jpg', name: names[7], url: URLify(names[7])},
//     ],
//     [ // bottom list
//         {id: 9, src: 'assets/thumbnails/15.png', name: names[0], url: URLify(names[0])},
//         {id: 10, src: 'assets/thumbnails/11.jpg', name: names[1], url: URLify(names[1])},
//         {id: 11, src: 'assets/thumbnails/09.jpg', name: names[2], url: URLify(names[2])},
//         {id: 12, src: 'assets/thumbnails/19.png', name: names[3], url: URLify(names[3])},
//         {id: 13, src: 'assets/thumbnails/17.jpg', name: names[4], url: URLify(names[4])},
//         {id: 14, src: 'assets/thumbnails/13.png', name: names[5], url: URLify(names[5])},
//         {id: 15, src: 'assets/thumbnails/08.jpg', name: names[6], url: URLify(names[6])},
//         {id: 16, src: 'assets/thumbnails/03.jpg', name: names[7], url: URLify(names[7])},
//     ]
//     // in order to access corresponding list item, add/subtract 8
// ]

export const imageList: Array<collectionItem> = [
    {id: 1, src: 'assets/bwthumbnails/1.webp', name: names[0], url: URLify(names[0]), alt: `Perfume bottle, part of the '${names[0]}' collection in Archive and Gallery`},
    {id: 2, src: 'assets/bwthumbnails/4.webp', name: names[1], url: URLify(names[1]), alt: `An eye of a cat, part of the collection '${names[1]}' in Archive and Gallery`},
    {id: 3, src: 'assets/bwthumbnails/5.webp', name: names[2], url: URLify(names[2]), alt: `White flowers, part of the collection '${names[2]}' in Archive and Gallery`},
    {id: 4, src: 'assets/bwthumbnails/8.webp', name: names[3], url: URLify(names[3]), alt: `Man stretching on sofa chair. Part of the collection '${names[3]}' in Archive and Gallery`},
    {id: 5, src: 'assets/bwthumbnails/9.webp', name: names[4], url: URLify(names[4]), alt: `Top down shot of an hp laptop. Part of the collection '${names[4]}' in Archive and Gallery`},
    {id: 6, src: 'assets/bwthumbnails/11.webp', name: names[5], url: URLify(names[5]), alt: `Boy laying on a chair. Part of the collection '${names[5]}' in Archive and Gallery`},
    {id: 7, src: 'assets/bwthumbnails/14.webp', name: names[6], url: URLify(names[6]), alt: `A building. Part of the collection '${names[6]}' in Archive and Gallery`},
    {id: 8, src: 'assets/bwthumbnails/16.webp', name: names[7], url: URLify(names[7]), alt: `An insect drinking nectar from a flower. Part of the collection '${names[7]}' in Archive and Gallery`},
    // repetition: 
    {id: 9, src: 'assets/bwthumbnails/1.webp', name: names[0], url: URLify(names[0]), alt: `Perfume bottle, part of the '${names[0]}' collection in Archive and Gallery`},
    {id: 10, src: 'assets/bwthumbnails/4.webp', name: names[1], url: URLify(names[1]), alt: `An eye of a cat, part of the collection '${names[1]}' in Archive and Gallery`},
    {id: 11, src: 'assets/bwthumbnails/5.webp', name: names[2], url: URLify(names[2]), alt: `White flowers, part of the collection '${names[2]}' in Archive and Gallery`},
    {id: 12, src: 'assets/bwthumbnails/8.webp', name: names[3], url: URLify(names[3]), alt: `Man stretching on sofa chair. Part of the collection '${names[3]}' in Archive and Gallery`},
    {id: 13, src: 'assets/bwthumbnails/9.webp', name: names[4], url: URLify(names[4]), alt: `Top down shot of an hp laptop. Part of the collection '${names[4]}' in Archive and Gallery`},
    {id: 14, src: 'assets/bwthumbnails/11.webp', name: names[5], url: URLify(names[5]), alt: `Boy laying on a chair. Part of the collection '${names[5]}' in Archive and Gallery`},
    {id: 15, src: 'assets/bwthumbnails/14.webp', name: names[6], url: URLify(names[6]), alt: `A building. Part of the collection '${names[6]}' in Archive and Gallery`},
    {id: 16, src: 'assets/bwthumbnails/16.webp', name: names[7], url: URLify(names[7]), alt: `An insect drinking nectar from a flower. Part of the collection '${names[7]}' in Archive and Gallery`},
]

export function URLify(name: string): string {
    let output: string = '';
    for (let i = 0; i <= name.length -1; i++) {
        if (name[i] === ' ') {
            output += '-';
        } 
        else {
            output += name[i];
        }
    }
    return output.toLowerCase();
}

// detail view data
export interface Collection {
    url: string,
    name: string,
    sources: string[]
}
export const collections: Collection[] = [
    {
        url: URLify(names[0]),
        name: names[0],
        sources: [
            'assets/images/Aromatic Fragrance/1.webp',
            'assets/images/Aromatic Fragrance/2.webp',
            'assets/images/Aromatic Fragrance/3.webp',
            'assets/images/Aromatic Fragrance/4.webp',
            'assets/images/Aromatic Fragrance/5.webp',
            'assets/images/Aromatic Fragrance/6.webp',
        ]
    }, 
    {
        url: URLify(names[1]),
        name: names[1],
        sources: [
            'assets/images/Stuart Little/1.webp',
            'assets/images/Stuart Little/2.webp',
            'assets/images/Stuart Little/3.webp',
            'assets/images/Stuart Little/4.webp',
            'assets/images/Stuart Little/5.webp',
            'assets/images/Stuart Little/6.webp',
            'assets/images/Stuart Little/7.webp',
            'assets/images/Stuart Little/8.webp',
        ]
    }, 
    {
        url: URLify(names[2]),
        name: names[2],
        sources: [
            'assets/images/Blossom/1.webp',
            'assets/images/Blossom/2.webp',
            'assets/images/Blossom/3.webp',
            'assets/images/Blossom/4.webp',
            'assets/images/Blossom/5.webp',
            'assets/images/Blossom/6.webp',
            'assets/images/Blossom/7.webp',
            'assets/images/Blossom/8.webp',
        ]
    }, 
    {
        url: URLify(names[3]),
        name: names[3],
        sources: [
            'assets/images/Overwhelmed/1.webp',
            'assets/images/Overwhelmed/2.webp',
            'assets/images/Overwhelmed/3.webp',
            'assets/images/Overwhelmed/4.webp',
            'assets/images/Overwhelmed/5.webp',
            'assets/images/Overwhelmed/6.webp',
            'assets/images/Overwhelmed/7.webp',
            'assets/images/Overwhelmed/8.webp',
            'assets/images/Overwhelmed/9.webp',
            'assets/images/Overwhelmed/10.webp',
        ]
    },
    {
        url: URLify(names[4]),
        name: names[4],
        sources: [
            'assets/images/Stationary Study/1.webp',
            'assets/images/Stationary Study/2.webp',
            'assets/images/Stationary Study/3.webp',
            'assets/images/Stationary Study/4.webp',
            'assets/images/Stationary Study/5.webp',
            'assets/images/Stationary Study/6.webp',
            'assets/images/Stationary Study/7.webp',
        ]
    }, 
    {
        url: URLify(names[5]),
        name: names[5],
        sources: [
            'assets/images/Editorial Mimicry/1.webp',
            'assets/images/Editorial Mimicry/2.webp',
            'assets/images/Editorial Mimicry/3.webp',
            'assets/images/Editorial Mimicry/4.webp',
            'assets/images/Editorial Mimicry/5.webp',
            'assets/images/Editorial Mimicry/6.webp',
            // 'assets/images/Editorial Mimicry/7.webp',
            'assets/images/Editorial Mimicry/8.webp',
            'assets/images/Editorial Mimicry/9.webp',
            'assets/images/Editorial Mimicry/10.webp',
            'assets/images/Editorial Mimicry/11.webp',
            'assets/images/Editorial Mimicry/12.webp',
        ]
    },
    {
        url: URLify(names[6]),
        name: names[6],
        sources: [
            'assets/images/Architecture/1.webp',
            'assets/images/Architecture/2.webp',
            'assets/images/Architecture/3.webp',
            'assets/images/Architecture/4.webp',
            'assets/images/Architecture/5.webp',
            'assets/images/Architecture/6.webp',
            'assets/images/Architecture/7.webp',
        ]
    },
    {
        url: URLify(names[7]),
        name: names[7],
        sources: [
            'assets/images/Insectified/1.webp',
            'assets/images/Insectified/2.webp',
            'assets/images/Insectified/3.webp',
            'assets/images/Insectified/4.webp',
            'assets/images/Insectified/5.webp',
            'assets/images/Insectified/6.webp',
        ]
    },
]