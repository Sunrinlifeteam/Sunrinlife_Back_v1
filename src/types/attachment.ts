export interface IAttachment {
    filename: string; // ex) test.jpg
    path: string;
    mimetype: string; // ex) image/jpeg (more info: https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
    sha1hash: string;
    md5hash: string;
}
