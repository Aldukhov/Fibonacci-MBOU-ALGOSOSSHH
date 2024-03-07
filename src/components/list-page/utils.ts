class LinkedListNode<T> {
    next: LinkedListNode<T> | null;
    value: T;

    constructor(value: T, next: LinkedListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

interface ILinkedList<T> {
    append(item: T): void;
    prepend(item: T): void;
    addByIndex(item: T, index: number): void;
    deleteHead(): void;
    deleteTail(): void;
    deleteByIndex(index: number): void;
    toArray(): T[];
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: LinkedListNode<T> | null;
    private tail: LinkedListNode<T> | null;
    private size: number;

    constructor(arr: T[]) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        arr.forEach(item => this.append(item));
    }

    toArray() {
        let curr = this.head;
        const res: T[] = [];
        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        }
        return res;
    }

    append(item: T) {
        const newNode = new LinkedListNode(item);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }

        this.size++;
    }

    prepend(item: T) {
        const newNode = new LinkedListNode(item, this.head);

        if (!this.head) {
            this.tail = newNode;
        }

        this.head = newNode;
        this.size++;
    }

    deleteHead() {
        if (this.head) {
            this.head = this.head.next;
            if (!this.head) {
                this.tail = null;
            }
            this.size--;
        }
    }

    addByIndex(item: T, index: number) {
        if (index < 0 || index > this.size) {
            return;
        }

        if (index === 0) {
            this.prepend(item);
        } else if (index === this.size) {
            this.append(item);
        } else {
            let curr = this.head;
            let currIndex = 0;
            while (currIndex < index - 1) {
                curr = curr!.next;
                currIndex++;
            }
            const newNode = new LinkedListNode(item, curr!.next);
            curr!.next = newNode;
            this.size++;
        }
    }

    deleteTail() {
        let curr = this.head;
    
        if (!curr) {
            return;
        }
    
        if (!curr.next) {
            this.head = null;
            this.tail = null;
            this.size--;
            return;
        }
    
        while (curr.next !== this.tail) {
            curr = curr.next!;
        }
    
        curr.next = null;
        this.tail = curr;
        this.size--;
    }
    

    deleteByIndex(index: number) {
        if (index < 0 || index >= this.size) {
            return;
        }

        if (index === 0) {
            this.deleteHead();
        } else if (index === this.size - 1) {
            this.deleteTail();
        } else {
            let curr = this.head;
            let currIndex = 0;
            while (currIndex < index - 1) {
                curr = curr!.next;
                currIndex++;
            }
            curr!.next = curr!.next!.next;
            this.size--;
        }
    }
}
