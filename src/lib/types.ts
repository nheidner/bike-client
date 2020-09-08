export interface Viewer {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    token: string | null;
    didRequest: boolean;
}
