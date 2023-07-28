export interface Post {
    title: string
    overview: string
    content: any
    _id: string
    slug: {
        current: string
    }
    _createdAt: string
}

export interface FilterInterface {
    _id: string
    title: string
    image: { alt: string, asset: any },
}