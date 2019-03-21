const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		const currentHeapSize = this.size();

		if (currentHeapSize + 1 > this.maxSize) 
		{
			throw "Max heap size";
		}

		this.heap.push(data, priority);
	}

	shift() {
		if(this.isEmpty()) {
			throw "Queue is empty";
		}

		return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
