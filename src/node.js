class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;

		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(!this.left) {
			this.left = node;

			node.parent = this;
		} else if(!this.right) {
			this.right = node;

			node.parent = this;
		}
	}

	removeChild(node) {
		if(this.left === node) {
			this.left = null;
			node.parent = null;
		} else if(this.right === node) {
			this.right = null;
			node.parent = null;
		} else {
			throw "Can not find specified node!";
		}
	}

	remove() {
		if(this.parent)
		{
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		const parent = this.parent;

		if(!parent) {
			return;
		}

		const tempParent = parent.parent;
		const tempLeft = parent.left;
		const tempRight = parent.right;

		parent.left = this.left;
		parent.right = this.right;
		parent.parent = this;

		if(tempLeft === this) {
			this.left = parent;
			this.right = tempRight;

			if(this.right) {
				this.right.parent = this;
			}
			
		} else {
			this.right = parent;
			this.left = tempLeft;
			

			if(this.left) {
				this.left.parent = this;
			}
		}

		this.parent = tempParent;

		if(tempParent) {
			if(tempParent.left === parent) {
				tempParent.left = this;
			} else {
				tempParent.right = this;
			}
		}
		

		/*const grandfather = parent.parent;

		this.remove();

		//const sibling = parent.left ? parent.left : parent.right;
		
		if(grandfather) {
			grandfather.removeChild(parent);

			grandfather.appendChild(this);
		}

		this.appendChild(parent);

		if(sibling) {
			parent.removeChild(sibling);
			this.appendChild(sibling);
		}*/
	}
}

module.exports = Node;
