import { TracksDatum } from "./chart";

export interface Album {
    id:                      number;
    title:                   Title;
    upc:                     string;
    link:                    string;
    share:                   string;
    cover:                   string;
    cover_small:             string;
    cover_medium:            string;
    cover_big:               string;
    cover_xl:                string;
    md5_image:               Md5Image;
    genre_id:                number;
    genres:                  Genres;
    label:                   string;
    nb_tracks:               number;
    duration:                number;
    fans:                    number;
    release_date:            Date;
    record_type:             RecordTypeEnum;
    available:               boolean;
    tracklist:               string;
    explicit_lyrics:         boolean;
    explicit_content_lyrics: number;
    explicit_content_cover:  number;
    contributors:            Contributor[];
    artist:                  Artist;
    type:                    RecordTypeEnum;
    tracks:                  Tracks;
}

export interface Artist {
    id:             number;
    name:           Name;
    picture:        string;
    picture_small:  string;
    picture_medium: string;
    picture_big:    string;
    picture_xl:     string;
    tracklist:      string;
    type:           ArtistType;
}

export enum Name {
    DaftPunk = "Daft Punk",
    Dance = "Dance",
}

export enum ArtistType {
    Artist = "artist",
    Genre = "genre",
}

export interface Contributor {
    id:             number;
    name:           Name;
    link:           string;
    share:          string;
    picture:        string;
    picture_small:  string;
    picture_medium: string;
    picture_big:    string;
    picture_xl:     string;
    radio:          boolean;
    tracklist:      string;
    type:           ArtistType;
    role:           string;
}

export interface Genres {
    data: ArtistElement[];
}

export interface ArtistElement {
    id:         number;
    name:       Name;
    picture?:   string;
    type:       ArtistType;
    tracklist?: string;
}

export enum Md5Image {
    The5718F7C81C27E0B2417E2A4C45224F8A = "5718f7c81c27e0b2417e2a4c45224f8a",
}

export enum RecordTypeEnum {
    Album = "album",
}

export enum Title {
    Discovery = "Discovery",
}

export interface Tracks {
    data: TracksDatum[];
}


export interface AlbumClass {
    id:           number;
    title:        Title;
    cover:        string;
    cover_small:  string;
    cover_medium: string;
    cover_big:    string;
    cover_xl:     string;
    md5_image:    Md5Image;
    tracklist:    string;
    type:         RecordTypeEnum;
}

export enum PurpleType {
    Track = "track",
}
