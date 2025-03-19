import { TracksDatum } from "./chart";

export interface PlaylistResponse {
    id:             string;
    title:          string;
    description:    string;
    duration:       number;
    public:         boolean;
    is_loved_track: boolean;
    collaborative:  boolean;
    nb_tracks:      number;
    fans:           number;
    link:           string;
    share:          string;
    picture:        string;
    picture_small:  string;
    picture_medium: string;
    picture_big:    string;
    picture_xl:     string;
    checksum:       string;
    tracklist:      string;
    creation_date:  Date;
    add_date:       Date;
    mod_date:       Date;
    md5_image:      string;
    picture_type:   string;
    creator:        Creator;
    type:           string;
    tracks:         Tracks;
}

export interface Creator {
    id:        string;
    name:      string;
    tracklist: string;
    type:      CreatorType;
    link?:     string;
}

export enum CreatorType {
    Artist = "artist",
    User = "user",
}

export interface Tracks {
    data:     TracksDatum[];
    checksum: string;
}

export interface Datum {
    id:                      string;
    readable:                boolean;
    title:                   string;
    title_short:             string;
    title_version?:          string;
    isrc:                    string;
    link:                    string;
    duration:                string;
    rank:                    string;
    explicit_lyrics:         boolean;
    explicit_content_lyrics: number;
    explicit_content_cover:  number;
    preview:                 string;
    md5_image:               string;
    time_add:                number;
    artist:                  Creator;
    album:                   Album;
    type:                    DatumType;
}

export interface Album {
    id:           string;
    title:        string;
    upc:          string;
    cover:        string;
    cover_small:  string;
    cover_medium: string;
    cover_big:    string;
    cover_xl:     string;
    md5_image:    string;
    tracklist:    string;
    type:         AlbumType;
}

export enum AlbumType {
    Album = "album",
}

export enum DatumType {
    Track = "track",
}
