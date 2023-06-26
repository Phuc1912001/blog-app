export interface IComment {
    author: {
        username: string,
        bio: string,
        image: string,
        following: boolean,
    }
    body: string,
    id: number,
    createdAt: string,
    updatedAt: string,
}
export type ICommentArray = IComment[];
