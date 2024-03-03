export interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    container: (T | null)[];
    head: number;
    tail: number;
    length: number;
  }
  
  
export class Queue<T> implements IQueue<T> {
    public container: (T | null)[] = [];
    public head = 0;
    public tail = 0;
    private readonly size: number = 0;
    public length: number = 0;
  
    constructor(size: number) {
      this.size = size;
      this.container = Array(size);
    }
  
    enqueue = (item: T) => {
      if (this.length >= this.size) {
        throw new Error("Maximum length exceeded");
      }
      this.container[this.tail % this.size] = item; // Добавляем элемент в конец очереди, используя указатель tail
      this.tail = (this.tail + 1) % (this.size); // Обновляем указатель tail с помощью операции взятия остатка от деления
      this.length++;
    };
  
    dequeue = () => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      }
  
      this.container[this.head % this.size] = null; // Удаляем элемент из начала очереди
      this.head = (this.head + 1) % this.size; // Обновляем указатель head
      this.length--;
  
    };
  
    isEmpty = () => this.length === 0;
  }
