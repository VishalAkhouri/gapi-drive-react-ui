import { GapiMimeType } from '../enums/gapi-mime-type';

export interface IFileList {
    kind: string;
    id: string;
    name: string;
    mimeType: GapiMimeType
}
