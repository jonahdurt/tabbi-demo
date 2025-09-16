export interface Upload {
    artist: string
    public: boolean
    popularity: number
    title: string
    uploader: number
    id: string
    username: string
}

export interface UploadsGetResponse {
    uploads: Record<string, Upload>
}

export interface Metadata {
    artist: string
    public: number
    title: string
    id: string
}

export interface Progress {
    step_current: string
    steps_left: number
    steps_total: number
}

export interface UploadWithProgress {
    metadata: Metadata
    progress: Progress
}

export interface UploadsProgressResponse {
    [key: string]: UploadWithProgress
}

export interface UserProfile {
    username: string;
    email: string;
    picture: string;
}

export interface SSEMessage {
    uploads: {
        [key: string]: Progress
    }
}