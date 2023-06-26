

export interface IArticle {
    author: {
        username: string,
        bio: string,
        image: string,
        following: boolean,
    }
    body: string,
    description: string,
    favorited: boolean,
    favoritesCount: number,
    slug: string,
    title: string,
    tagList: string[],
    createdAt: string,
    updatedAt: string,
}

export interface IArticleArray extends Array<IArticle> { }
