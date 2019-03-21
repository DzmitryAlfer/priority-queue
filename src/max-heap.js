const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		const node = new Node(data, priority);

		this.insertNode(node);

		this.shiftNodeUp(node);
	}

	pop() {
		if(this.root === null){
			return null;
		}

		const root = this.detachRoot();

		this.restoreRootFromLastInsertedNode(root);

		return root;
	}

	detachRoot() {
		const _root = this.root;

		this.root = null;

		const _rootIndex = this.parentNodes.findIndex(n => n === _root);

		if (_rootIndex >= 0) {

			if(this.parentNodes.length === 1) {
				this.parentNodes = [];
				
				// First item in array
			} else if(_rootIndex == 0) {
				this.parentNodes = this.parentNodes.slice(_rootIndex + 1);

				// Last item in array
			} else if(_rootIndex == this.parentNodes.length - 1) {
				this.parentNodes = this.parentNodes.slice(_rootIndex - 1);

				// item in the middle position of array
			} else {
				this.parentNodes = this.parentNodes.slice(0, _rootIndex - 1).concat(this.parentNodes.slice(_rootIndex + 1, this.parentNodes.length - 1));
			}
		}

		return _root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length === 1) {
			this.root = this.parentNodes[0];

			this.root.parent = null;
			this.root.left = null;
			this.root.right = null;
			return;
		}

		const _lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
		this.parentNodes = this.parentNodes.slice(0, this.parentNodes.length - 1);
		this.root = _lastInsertedNode;

		if(_lastInsertedNode.parent.right === _lastInsertedNode) {
			if (_lastInsertedNode.parent !== detached) {
				this.parentNodes.unshift(_lastInsertedNode.parent);
			}
			
			_lastInsertedNode.parent.right = null;
		}

		if(_lastInsertedNode.parent.left === _lastInsertedNode) {
			_lastInsertedNode.parent.left = null;
		}

		_lastInsertedNode.left = detached.left;

		if(_lastInsertedNode.left) {
			_lastInsertedNode.left.parent = _lastInsertedNode;
		}

		_lastInsertedNode.right = detached.right;

		if(_lastInsertedNode.right) {
			_lastInsertedNode.right.parent = _lastInsertedNode;
		}

		if (_lastInsertedNode.right === null) {
			this.parentNodes.unshift(_lastInsertedNode);
		}
	}

	

	size() {
		let _size = 0;

		const calculateSize = (node) => {
			if(node === null) {
				return;
			}

			_size += 1;

			calculateSize(node.left);
			calculateSize(node.right);
		}

		calculateSize(this.root);

		return _size;
	}

	isEmpty() {
		return this.root === null;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if(!this.root) {
			this.root = node;
			this.parentNodes.push(node);
			return;
		}

		const firstNode = this.parentNodes[0];
		firstNode.appendChild(node);
		this.parentNodes.push(node);

		if(firstNode.right) {
			this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		if(!node.parent || node.priority <= node.parent.priority){
			return;
		}

		const nodeIndex = this.parentNodes.findIndex(n => n === node);
		const parentIndex = this.parentNodes.findIndex(n => n === node.parent);

		if (nodeIndex >= 0) {
			this.parentNodes[nodeIndex] = node.parent;
		}

		if (parentIndex >= 0) {
			this.parentNodes[parentIndex] = node;
		}

		node.swapWithParent();

		if(node.parent === null) {
			this.root = node;
		}

		this.shiftNodeUp(node);
	}

	shiftNodeDown(node) {
		if(!node) {
			return;
		}

		if(node.left) {
			const leftChild = node.left;

			if(leftChild.priority > node.priority) {
				const nodeIndex = this.parentNodes.findIndex(n => n === node);
				const childIndex = this.parentNodes.findIndex(n => n === leftChild);

				if (nodeIndex >= 0) {
					this.parentNodes[nodeIndex] = leftChild;
				}

				if (childIndex >= 0) {
					this.parentNodes[childIndex] = node;
				}

				leftChild.swapWithParent();

				if (!leftChild.parent) {
					this.root = leftChild;
				}

				this.shiftNodeDown(node);

				return;
			}
		}

		if(node.right) {
			const rightChild = node.right;

			if(rightChild.priority > node.priority) {
				const nodeIndex = this.parentNodes.findIndex(n => n === node);
				const childIndex = this.parentNodes.findIndex(n => n === rightChild);

				if (nodeIndex >= 0) {
					this.parentNodes[nodeIndex] = rightChild;
				}

				if (childIndex >= 0) {
					this.parentNodes[childIndex] = node;
				}

				rightChild.swapWithParent();

				if (!rightChild.parent) {
					this.root = rightChild;
				}

				this.shiftNodeDown(node);

				return;
			}
		}
	}
}

module.exports = MaxHeap;
