export interface MySong {
    id:          number;
    video_id:    number;
    track:       Track;
    user_id:     string;
    playlist_id: null;
    pitch:       number;
    created_at:  Date;
}

export interface Track {
    id:                      number;
    link:                    string;
    rank:                    number;
    type:                    string;
    album:                   Album;
    title:                   string;
    artist:                  Artist;
    preview:                 string;
    duration:                number;
    position?:               number;
    md5_image:               string;
    title_short:             string;
    title_version:           string;
    explicit_lyrics:         boolean;
    explicit_content_cover:  number;
    explicit_content_lyrics: number;
    isrc?:                   string;
    readable?:               boolean;
    time_add?:               number;
}

export interface Album {
    id:           number;
    type:         string;
    cover:        string;
    title:        string;
    cover_xl:     string;
    cover_big:    string;
    md5_image:    string;
    tracklist:    string;
    cover_small:  string;
    cover_medium: string;
    upc?:         string;
}

export interface Artist {
    id:              number;
    link:            string;
    name:            string;
    type:            string;
    radio?:          boolean;
    picture?:        string;
    tracklist:       string;
    picture_xl?:     string;
    picture_big?:    string;
    picture_small?:  string;
    picture_medium?: string;
}
