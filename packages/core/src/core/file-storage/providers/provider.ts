import { StorageEngine } from 'multer';
import { FileStorageOption, FileStorageProviderEnum, FileSystem, UploadedFile } from '@gauzy/contracts';

export abstract class Provider<T> {
	static instance: any;
	tenantId?: string;
	abstract name: FileStorageProviderEnum;
	abstract config: FileSystem;

	constructor() {}

	abstract url(path: string): string;
	abstract path(path: string): string;
	abstract handler(options: FileStorageOption): StorageEngine;
	abstract getFile(file: string): Promise<Buffer>;
	abstract putFile(
		fileContent: string | Buffer | URL,
		path?: string
	): Promise<UploadedFile>;
	abstract deleteFile(path: string): Promise<void>;
	abstract getInstance(): T;

	mapUploadedFile(file): UploadedFile {
		return file;
	}
}
