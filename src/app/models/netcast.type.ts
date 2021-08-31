﻿import { ElementRef } from "@angular/core";
import { NetcastKind } from "./netcastKind.enum";
export class NetcastType {
	constructor() {
		this.remoteGuid = "";
		this.peerConnection  = null;
		this.mediaStream  = null;
		this.videoElement  = null;
		this.netcastKind  = null;
		this.dataChannels = new Array<RTCDataChannel>();
	}

	remoteGuid: string;
	peerConnection: RTCPeerConnection | null;
	mediaStream: MediaStream | null;
	videoElement: ElementRef | null;
	netcastKind: NetcastKind | null;
	dataChannels: RTCDataChannel[];

	getDataChannel(label: string): RTCDataChannel {
		let dataChannel: RTCDataChannel = this.dataChannels.find((d: RTCDataChannel) => {
			return d.label == label;
		})!;

		return dataChannel;
	}
}
