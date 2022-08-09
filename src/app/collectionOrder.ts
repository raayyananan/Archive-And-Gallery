// collection-view data for thumbnails
interface collectionItem {
    id: number,
    src?: string,
    name?: string,
    url?: string
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

export const collectionOrder: collectionItem[] = [
    // row 1:
    {id: 0, }, // edge
    {id: 1, src: 'assets/thumbnails/15.png', name: names[0], url: URLify(names[0])},
    {id: 2, },
    {id: 3, src: 'assets/thumbnails/16.jpg', name: names[2], url: URLify(names[2])},
    {id: 4, },
    {id: 5, },
    {id: 6, },
    {id: 7, src: 'assets/thumbnails/12.png', name: names[5], url: URLify(names[5])},
    {id: 8, },
    {id: 9, src: 'assets/thumbnails/04.jpg', name: names[7], url: URLify(names[7])},
    {id: 10, }, // edge

    // row 2:
    {id: 11, }, // edge
    {id: 12, src: 'assets/thumbnails/20.png', name: names[0], url: URLify(names[0])},
    {id: 13, },
    {id: 14, },
    {id: 15, src: 'assets/thumbnails/18.jpg', name: names[3], url: URLify(names[3])},
    {id: 16, },
    {id: 17, src: 'assets/thumbnails/17.jpg', name: names[4], url: URLify(names[4])},
    {id: 18, },
    {id: 19, src: 'assets/thumbnails/07.jpg', name: names[6], url: URLify(names[6])},
    {id: 20, },
    {id: 21, }, // edge

    // row 3:
    {id: 22, }, // edge
    {id: 23, },
    {id: 24, src: 'assets/thumbnails/10.jpg', name: names[1], url: URLify(names[1])},
    {id: 25, src: 'assets/thumbnails/09.jpg', name: names[2], url: URLify(names[2])},
    {id: 26, },
    {id: 27, },
    {id: 28, },
    {id: 29, src: 'assets/thumbnails/13.png', name: names[5], url: URLify(names[5])},
    {id: 30, },
    {id: 31, },
    {id: 32, }, // edge

    // row 4:
    {id: 33, }, // edge
    {id: 34, src: 'assets/thumbnails/06.jpg', name: names[0], url: URLify(names[0])},
    {id: 35, },
    {id: 36, },
    {id: 37, src: 'assets/thumbnails/19.png', name: names[3], url: URLify(names[3])},
    {id: 38, },
    {id: 39, },
    {id: 40, },
    {id: 41, },
    {id: 42, src: 'assets/thumbnails/03.jpg', name: names[7], url: URLify(names[7])},
    {id: 43, }, // edge
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
            'assets/images/Aromatic Fragrance/1.png',
            'assets/images/Aromatic Fragrance/2.jpg',
            'assets/images/Aromatic Fragrance/3.png',
            'assets/images/Aromatic Fragrance/4.jpg',
            'assets/images/Aromatic Fragrance/5.jpg',
            'assets/images/Aromatic Fragrance/6.jpg',
        ]
    }, 
    {
        url: URLify(names[1]),
        name: names[1],
        sources: [
            'assets/images/Stuart Little/1.jpg',
            'assets/images/Stuart Little/2.jpg',
            'assets/images/Stuart Little/3.jpg',
            'assets/images/Stuart Little/4.jpg',
            'assets/images/Stuart Little/5.jpg',
            'assets/images/Stuart Little/6.jpg',
            'assets/images/Stuart Little/7.jpg',
            'assets/images/Stuart Little/8.jpg',
        ]
    }, 
    {
        url: URLify(names[2]),
        name: names[2],
        sources: [
            'assets/images/Blossom/1.jpg',
            'assets/images/Blossom/2.jpg',
            'assets/images/Blossom/3.jpg',
            'assets/images/Blossom/4.png',
            'assets/images/Blossom/5.jpg',
            'assets/images/Blossom/6.png',
            'assets/images/Blossom/7.jpg',
            'assets/images/Blossom/8.jpg',
        ]
    }, 
    {
        url: URLify(names[3]),
        name: names[3],
        sources: [
            'assets/images/Overwhelmed/1.jpg',
            'assets/images/Overwhelmed/2.jpg',
            'assets/images/Overwhelmed/3.jpg',
            'assets/images/Overwhelmed/4.jpg',
            'assets/images/Overwhelmed/5.jpg',
            'assets/images/Overwhelmed/6.jpg',
            'assets/images/Overwhelmed/7.jpg',
            'assets/images/Overwhelmed/8.jpg',
            'assets/images/Overwhelmed/9.jpg',
            'assets/images/Overwhelmed/10.jpg',
        ]
    },
    {
        url: URLify(names[4]),
        name: names[4],
        sources: [
            'assets/images/Stationary Study/1.jpg',
            'assets/images/Stationary Study/2.jpg',
            'assets/images/Stationary Study/3.jpg',
            'assets/images/Stationary Study/4.jpg',
            'assets/images/Stationary Study/5.jpg',
            'assets/images/Stationary Study/6.jpg',
            'assets/images/Stationary Study/7.jpg',
        ]
    }, 
    {
        url: URLify(names[5]),
        name: names[5],
        sources: [
            'assets/images/Editorial Mimicry/1.jpg',
            'assets/images/Editorial Mimicry/2.jpg',
            'assets/images/Editorial Mimicry/3.jpg',
            'assets/images/Editorial Mimicry/4.jpg',
            'assets/images/Editorial Mimicry/5.jpg',
            'assets/images/Editorial Mimicry/6.jpg',
            'assets/images/Editorial Mimicry/7.jpg',
            'assets/images/Editorial Mimicry/8.jpg',
            'assets/images/Editorial Mimicry/9.jpg',
            'assets/images/Editorial Mimicry/10.jpg',
            'assets/images/Editorial Mimicry/11.jpg',
            'assets/images/Editorial Mimicry/12.jpg',
        ]
    },
    {
        url: URLify(names[6]),
        name: names[6],
        sources: [
            'assets/images/Architecture/1.jpg',
            'assets/images/Architecture/2.jpg',
            'assets/images/Architecture/3.jpg',
            'assets/images/Architecture/4.jpg',
            'assets/images/Architecture/5.jpg',
            'assets/images/Architecture/6.jpg',
            'assets/images/Architecture/7.jpg',
        ]
    },
    {
        url: URLify(names[7]),
        name: names[7],
        sources: [
            'assets/images/Insectified/1.jpg',
            'assets/images/Insectified/2.jpg',
            'assets/images/Insectified/3.jpg',
            'assets/images/Insectified/4.jpg',
            'assets/images/Insectified/5.jpg',
            'assets/images/Insectified/6.jpg',
        ]
    },
]