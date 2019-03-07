const Node = require('../src/node');

describe.skip('My Node', () => {
	describe('Tests', () => {
		let top1Node, top2Node, top3Node, top4Node, top5Node, top6Node, top7Node
/*
				1
			   / \
			  2   3
			 / \
			4   5
		   / \
		  6   7
*/
		beforeEach(() => {
			top1Node = new Node(1, 1);
			top2Node = new Node(2, 2);
			top3Node = new Node(3, 3);
			top4Node = new Node(4, 4);
			top5Node = new Node(5, 5);
			top6Node = new Node(6, 6);
			top7Node = new Node(7, 7);
			top8Node = new Node(8, 8);
			top9Node = new Node(9, 9);

			// Setup
			top1Node.appendChild(top2Node);
			top1Node.appendChild(top3Node);
			top2Node.appendChild(top4Node);
			top2Node.appendChild(top5Node);
			top4Node.appendChild(top6Node);
			top4Node.appendChild(top7Node);
			top6Node.appendChild(top8Node);
			top6Node.appendChild(top9Node);
		});

/*                                   
				1                   2
			   / \                 / \                    
			  2   3               1   3                   
			 / \        =>       / \        
			4   5               4   5                     
		   / \                 / \                        
		  6   7               6   7  
		 / \                 / \                     
	    8   9               8   9
*/
		it('TestRoot', () => {
			top2Node.swapWithParent();

			// top2node
			expect(top2Node.parent).to.equal(null);
			expect(top2Node.left).to.equal(top1Node);
			expect(top2Node.right).to.equal(top3Node);

			// top1node
			expect(top1Node.parent).to.equal(top2Node);
			expect(top1Node.left).to.equal(top4Node);
			expect(top1Node.right).to.equal(top5Node);

			// top3node
			expect(top4Node.parent).to.equal(top1Node);
			expect(top4Node.left).to.equal(top6Node);
			expect(top4Node.right).to.equal(top7Node);
		});

		/*                                   
				1                   1
			   / \                 / \                    
			  2   3               4   3                   
			 / \        =>       / \        
			4   5               2   5                     
		   / \                 / \                        
		  6   7               6   7                       
		 / \                 / \                     
	    8   9               8   9
		*/
		it('TestMiddleNode', () => {
			top4Node.swapWithParent();

			// top1node
			expect(top1Node.parent).to.equal(null);
			expect(top1Node.left).to.equal(top4Node);
			expect(top1Node.right).to.equal(top3Node);

			// top4node
			expect(top4Node.parent).to.equal(top1Node);
			expect(top4Node.left).to.equal(top2Node);
			expect(top4Node.right).to.equal(top5Node);

			// top2Node
			expect(top2Node.parent).to.equal(top4Node);
			expect(top2Node.left).to.equal(top6Node);
			expect(top2Node.right).to.equal(top7Node);

			// top6Node
			expect(top6Node.parent).to.equal(top2Node);
			expect(top6Node.left).to.equal(top8Node);
			expect(top6Node.right).to.equal(top9Node);
		});

		/*                                   
				1                   1
			   / \                 / \                    
			  2   3               2   3                   
			 / \        =>       / \        
			4   5               4   5                     
		   / \                 / \                        
		  6   7               9   7                       
		 / \                 / \                     
	    8   9               8   6
		*/
		it('TestBottomNode', () => {
			top9Node.swapWithParent();

			// top4node
			expect(top4Node.parent).to.equal(top2Node);
			expect(top4Node.left).to.equal(top9Node);
			expect(top4Node.right).to.equal(top7Node);

			// top9Node
			expect(top9Node.parent).to.equal(top4Node);
			expect(top9Node.left).to.equal(top8Node);
			expect(top9Node.right).to.equal(top6Node);			

			// top8Node
			expect(top8Node.parent).to.equal(top9Node);
			expect(top8Node.left).to.equal(null);
			expect(top8Node.right).to.equal(null);
		});
	})
})



describe.skip('Node', () => {
	describe('#constructor', () => {
		const node = new Node(42, 15);

		it('assigns passed data and priority to this', () => {
			expect(node.data).to.equal(42);
			expect(node.priority).to.equal(15);
		});

		it('assigns this.parent, this.left and this.right to null', () => {
			expect(node.parent).to.equal(null);
			expect(node.left).to.equal(null);
			expect(node.right).to.equal(null);
		});
	});

	describe('#appendChild', () => {
		let parent, leftChild, rightChild;

		beforeEach(() => {
			parent = new Node(42, 15);
			leftChild = new Node(13, 20);
			rightChild = new Node(98, 69);
		});

		it('assigns passed child to this.left', () => {
			parent.appendChild(leftChild);

			expect(parent.left).to.equal(leftChild);
			expect(parent.right).to.equal(null);
		});

		it('assigns passed child to this.right if this.left exists', () => {
			parent.appendChild(leftChild);
			parent.appendChild(rightChild);

			expect(parent.left).to.equal(leftChild);
			expect(parent.right).to.equal(rightChild);
		});

		it('does nothing if this.left and this.right exist', () => {
			parent.appendChild(leftChild);
			parent.appendChild(rightChild);
			parent.appendChild(new Node(42, 15));

			expect(parent.left).to.equal(leftChild);
			expect(parent.right).to.equal(rightChild);
		});
	});

	describe('#removeChild', () => {
		let parent, leftChild, rightChild;

		beforeEach(() => {
			parent = new Node(42, 15);
			leftChild = new Node(13, 20);
			rightChild = new Node(98, 69);

			parent.appendChild(leftChild);
			parent.appendChild(rightChild);
		});

		it('assing null to this.left if passed node is left child', () => {
			parent.removeChild(leftChild);
			expect(parent.left).to.equal(null);
		});

		it('assing null to this.right if passed node is right child', () => {
			parent.removeChild(rightChild);
			expect(parent.right).to.equal(null);
		});

		it('throws error if passed node is not a child of this node', () => {
			expect(() => {
				parent.removeChild(new Node(15, 42));
			}).to.throw();

			expect(parent.left).to.equal(leftChild);
			expect(parent.right).to.equal(rightChild);
		});

		it('assigns null to child.parent', () => {
			parent.removeChild(leftChild);

			expect(leftChild.parent).to.equal(null);
		})
	});

	describe('#remove', () => {
		it('does nothing if node does not have parent', () => {
			const node = new Node(42, 15);

			expect(() => {
				node.remove();
			}).not.to.throw();
		});

		it('calls child.parent.removeChild with child as arg', () => {
			const parent = new Node(42, 15);
			const child = new Node(15, 42);

			parent.appendChild(child);

			sinon.spy(parent, 'removeChild');

			child.remove();

			expect(parent.removeChild).to.have.been.calledOnce;
			expect(parent.removeChild).to.have.been.calledWith(child);
		});
	});

	describe('#swapWithParent', () => {
		it('does nothing if node does not have parent', () => {
			const node = new Node(15, 42);

			expect(() => {
				node.swapWithParent();
			}).not.to.throw();
		});

		it('updates parent.parent', () => {
			const parent = new Node(15, 42);
			const child = new Node(42, 15);

			parent.appendChild(child);
			child.swapWithParent();

			expect(parent.parent).to.equal(child);
		});

		it('updates parent.parent.parent', () => {
			const root = new Node(8, 8);
			const child = new Node(4, 4);
			const grandson = new Node(2, 2);

			root.appendChild(child);
			child.appendChild(grandson);

			grandson.swapWithParent();

			expect(child.parent).to.equal(grandson);
			expect(grandson.parent).to.equal(root);
		});

		it('updates child.parent', () => {
			const parentOfParent = new Node(100, 500);
			const parent = new Node(15, 42);
			const child = new Node(42, 15);

			parentOfParent.appendChild(parent);
			parent.appendChild(child);
			child.swapWithParent();

			expect(child.parent).to.equal(parentOfParent);
		});

		it('updates parent.child.parent', () => {
			const root = new Node(1, 2);
			const left = new Node(3, 4);
			const right = new Node(5, 6);

			root.appendChild(left);
			root.appendChild(right);

			right.swapWithParent();

			expect(left.parent).to.equal(right);
		})

		it('updates children of node and parent node', () => {
			const root = new Node(42, 15);
			const left = new Node(13, 42);
			const right = new Node(0, 1);
			const childOfLeft = new Node(0, 15);

			root.appendChild(left);
			root.appendChild(right);
			left.appendChild(childOfLeft);

			left.swapWithParent();

			expect(left.right).to.equal(right);
			expect(left.left).to.equal(root);
			expect(root.left).to.equal(childOfLeft);
		});

		it('maintains correct state of parent.parent.left and parent.parent.right', () => {
			const root = new Node(15, 42);
			const left = new Node(42, 15);
			const right = new Node(13, 42);
			const childOfLeft = new Node(13, 34);
			const childOfRight = new Node(0, 1);

			root.appendChild(left);
			root.appendChild(right);
			left.appendChild(childOfLeft);
			right.appendChild(childOfRight);

			childOfLeft.swapWithParent();
			childOfRight.swapWithParent();

			expect(root.left).to.equal(childOfLeft);
			expect(root.right).to.equal(childOfRight);
		});
	});
});
