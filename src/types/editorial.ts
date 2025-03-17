export interface EditorialResponse {
    data:  Datum[];
    total: number;
    next:  string;
}

export interface Datum {
    id:             number;
    name:           string;
    picture:        string;
    picture_small:  string;
    picture_medium: string;
    picture_big:    string;
    picture_xl:     string;
    type:           Type;
}

export enum Type {
    Editorial = "editorial",
}
