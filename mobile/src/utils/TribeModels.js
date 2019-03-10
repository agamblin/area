/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 01:13:11
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 20:30:20
 */

//@flow

export interface TribeProject {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    userId: number;
    imageUrl: string;
}
export interface TribeProviders {
    githubToken: ?any;
    googleToken: ?any;
    trelloToken: ?any;
}
export interface TribeUser {
    email: string;
    username: string;
    token: string;
}
