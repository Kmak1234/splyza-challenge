import { User } from "./user";
export { User } from "./user";

export interface Videos{
    id: string;
    title: string;
    createdDate: string;
    author: User;
    previewUrl: string;
}

export interface ReactionToVideo {
    id: string;
    type: 'star' | 'snapshot';
    timeframe: any;
    data?:string;
}

export interface updateVideo {
    title?: string;
    description?: string;
}

export interface VideoReaction {
    id: string;
    video: Videos;
    type: 'star' | 'snapshot';
    postDate?: string;
    timeframe: number;
    createdDate?: string;
    imageUrl?: string;
}

export interface UpdateExistingPayload {
    title?: string;
  description?: string;
}
