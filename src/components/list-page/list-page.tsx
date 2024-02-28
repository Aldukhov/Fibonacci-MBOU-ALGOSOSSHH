import React, { useState, useRef, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from '../styles.module.css'
import style from './list.module.css'
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import classNames from 'classnames';

export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
  head: Node<T> | null;
  deleteAt: (position: number) => void;
}

class LinkedList<T> implements ILinkedList<T> {
  public head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);

      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node; // Обновляем head, чтобы указывал на новый узел
      } else {
        let curr = this.head;
        let prev = null;
        let currIndex = 0;

        // перебрать элементы в списке до нужной позиции
        while (currIndex < index) {
          prev = curr;
          if (curr) {
            curr = curr.next;
            currIndex++;
          }
        }

        // добавить элемент
        node.next = curr;
        if (prev) {
          prev.next = node;
        } else {
          this.head = node; // Если prev === null, значит элемент должен быть вставлен в начало списка
        }
      }

      this.size++;
    }
  }

  deleteAt(position: number) {

    if (position < 0 || position >= this.size) {
      console.log('Enter a valid position');
      return;
    }

    let curr = this.head;
    let prev = null;
    let index = 0;

    if (curr) {

      // Доходим до узла, который нужно удалить
      while (index < position) {
        if (curr) {
          prev = curr;
          curr = curr.next;
          index++;
        }
      }

      // Удаляем узел из списка
      if (prev === null && curr) {
        // Если удаляется первый узел списка
        this.head = curr.next;
      } else if (curr && prev) {
        prev.next = curr.next;
      }

      this.size--;
    }
  }


  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = '';
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}


export const ListPage: React.FC = () => {

  const [circles, setCircles] = useState<JSX.Element[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const secondFormRef = useRef<HTMLFormElement>(null);
  const [list, setList] = useState<LinkedList<number> | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleInputCIndex = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputIndex(event.target.value);
  };


  const emptyCircle = (): void => {

    setCircles([]);
    if (list) {

      for (let i = 0; i < 4; i++) {
        const randomValue = Math.floor(Math.random() * 100);

        list.append(randomValue);

        setCircles(prevState => {
          const newCircle = (
            <Circle
              key={(Math.random() * randomValue) / Math.random()}
              state={ElementStates.Default}
              letter={`${randomValue}`}
              index={i}
              head={i === 0 ? "head" : ""}
              tail={i === 3 ? "tail" : ""}
              extraClass={`${styles.circle}`}
            />
          );

          return [...prevState, newCircle];
        });

      }
    }

  };

  useEffect(() => {
    setList(new LinkedList<number>());
  }, []);

  useEffect(() => {
    if (list) {
      emptyCircle();
    }
  }, [list]);


  const resetInputs = (): void => {

    if (formRef.current) {
      formRef.current.reset();
      setInputValue('');
      setInputIndex('');
    }

    if (secondFormRef.current) {
      secondFormRef.current.reset();
      setInputValue('');
      setInputIndex('');
    }
  }

  const makeNewCircle = (): void => {

    const elementsArr = elementsList();
    const randomValue = Math.floor(Math.random() * 100);

    const newCircles = elementsArr.map((value, index) => (
      <Circle
        key={(Math.random() * randomValue) / Math.random()}
        state={ElementStates.Default}
        letter={`${value}`}
        index={index}
        head={index === 0 ? "head" : ""}
        tail={index === elementsArr.length - 1 ? "tail" : ""}
        extraClass={`${styles.circle}`}
      />
    ));

    setCircles(newCircles);
  }
  const addCircleHead = () => {

    if (inputValue !== '' && list !== null) {
      list.insertAt(Number(inputValue), 0);
      makeNewCircle();
    };

    resetInputs();
  }

  const addCircleTail = () => {

    if (inputValue !== '' && list !== null) {

      list.append(Number(inputValue))

      makeNewCircle();
    }
    resetInputs();
  }

  const addCircleIndex = () => {

    const iIndex = Number(inputIndex);
    const iValue = Number(inputValue);

    if (inputValue !== '' && list !== null && (iIndex <= circles.length - 1)) {

      list.insertAt(iValue, iIndex);

      makeNewCircle();
    }
    resetInputs();
  }

  const deleteCircleHead = () => {
    if (list !== null) {
      list.deleteAt(0);
      makeNewCircle();
    };
    resetInputs();
  }

  const deleteCircleTail = () => {

    if (list !== null) {
      list.deleteAt(circles.length - 1);
      makeNewCircle();
    };

    resetInputs();
  }

  const elementsList = (): number[] => {
    const elementsArray: number[] = [];
    let currNode = list?.head;
    while (currNode !== null && currNode) {
      elementsArray.push(currNode.value);
      currNode = currNode.next;
    }

    return elementsArray
  }

  const deleteCircleIndex = () => {

    const iIndex = Number(inputIndex);

    if (list !== null && (iIndex <= circles.length - 1)) {

      list.deleteAt(iIndex);

      makeNewCircle();
    }
    resetInputs();
  }


  return (

    <SolutionLayout title="Связный список">
      <form ref={formRef} className={classNames(styles.inputBlock, style.form)}>

        <div className={style.buttons}>
          <Input
            extraClass={classNames(style.input)}
            onChange={handleInputChange}
            maxLength={4}
            isLimitText={true}
          />


          <Button
            text={"Добавить в head"}
            type={"button"}
            extraClass={style.topBtn }
            onClick={() => {
              addCircleHead();
            }}
          />

          <Button
            text={"Добавить в tail"}
            type={"button"}
            extraClass={style.topBtn }
            onClick={() => {
              addCircleTail();
            }}
          />

          <Button
            text={"Удалить из head"}
            type={"button"}
            extraClass={style.topBtn }
            onClick={() => {
              deleteCircleHead();
            }}
          />

          <Button
            text={"Удалить из tail"}
            type={"button"}
            extraClass={style.topBtn }
            onClick={() => {
              deleteCircleTail();
            }}
          />
        </div>

      </form>

      <form ref={secondFormRef} className={classNames(styles.inputBlock, style.form)}>

        <div className={style.buttons}>
          <Input
            extraClass={classNames(style.input)}
            onChange={handleInputCIndex}
            maxLength={4}
            isLimitText={true}
          />


          <Button
            text={"Добавить по индексу"}
            type={"button"}
            extraClass={style.bottomBtn}
            onClick={() => {
              addCircleIndex();
            }}
          />

          <Button
            text={"Удалить по индексу"}
            type={"button"}
            extraClass={style.bottomBtn}
            onClick={() => {
              deleteCircleIndex();
            }}
          />

        </div>

      </form>

      {circles.length > 0 && (
        <div className={styles.circleBlock}>
          {circles}
        </div>
      )}
    </SolutionLayout>
  );
} 
