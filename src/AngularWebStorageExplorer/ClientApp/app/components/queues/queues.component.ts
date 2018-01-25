﻿import { Component, Inject, ViewChild } from '@angular/core';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
	selector: 'queues',
	templateUrl: './queues.component.html'
})

export class QueuesComponent {
	public queues: string[];

	public selectedQueue: string;

	utilsService: UtilsService;

	@ViewChild('newQueueName') newQueueName: any;
	@ViewChild('queuesMenu') queuesMenu: any;

	constructor(utils: UtilsService) {

		this.utilsService = utils;

		this.getQueues();
	}

	ngOnChanges() {
		this.getQueues();
	}

	getQueues() {
		this.utilsService.getData('api/Queues/GetQueues').subscribe(result => {
			this.queues = result.json();
		}, error => console.error(error));
	}

	queueChanged(event: Event) {
		var element = (event.currentTarget as Element);
		var queue = (element.textContent as string).trim();

		var nodes = this.queuesMenu.nativeElement.childNodes;
		debugger;
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].classList)
				nodes[i].classList.remove("active");
		}

		element.classList.add("active");

		this.selectedQueue = queue;
	}

	newQueue(event: Event) {
		this.utilsService.postData('api/Queues/NewQueue?queue=' + this.newQueueName.nativeElement.value, null).subscribe(result => {
			this.newQueueName.nativeElement.value = "";
			this.getQueues();
		}, error => console.error(error));
	}
}