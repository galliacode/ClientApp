﻿export class NetcastGenreDto {
	constructor() {
		this.netcastGenreId = 0;
		this.createdDate  = null;
		this.value = "";
		this.description = "";
		this.imageFilename = "";
	}

	netcastGenreId: number;
	createdDate: Date | null;
	value: string;
	description: string;
	imageFilename: string;
}
