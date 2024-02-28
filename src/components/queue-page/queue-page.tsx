import React, { useState, useRef, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from '../styles.module.css'
import style from './queue.module.css'
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import classNames from 'classnames';

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  container: (T | null)[];
  head: number;
  tail: number;
}


class Queue<T> implements IQueue<T> {
  public container: (T | null)[] = [];
  public head = 0;
  public tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

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


export const QueuePage: React.FC = () => {


  const [circles, setCircles] = useState<JSX.Element[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const [queue, setQueue] = useState<IQueue<number> | null>(null);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const emptyCircle = (): void => {
    const initialCircles: JSX.Element[] = [];

    for (let i = 0; i <= 7; i++) {
      initialCircles.push(
        <Circle
          key={i}
          state={ElementStates.Default}
          letter={""}
          index={i}
          head={""}
          tail={""}
          extraClass={`${styles.circle}`}
        />
      );
    }
    setCircles(initialCircles);
  };

  useEffect(() => {
    emptyCircle();
    setQueue(new Queue<number>(8));
  }, []);


  const addCircle = () => {

    if (inputValue !== '' && queue !== null) {
      queue.enqueue(Number(inputValue));

      setCircles(prevState => {
        const newArr: JSX.Element[] = [...prevState];
        let arr: JSX.Element[] = newArr.map((element, index) => {

          if (queue.container[index] !== undefined) {
            if (queue.container[index] === null) {
              return React.cloneElement(element, { head: '', tail: '', letter: `` })
            }
            else
              if (queue.head === index && queue.tail - 1 === index) {
                return React.cloneElement(element, { head: 'top', tail: 'tail', letter: `${queue.container[index]}` })
              } else if (queue.tail - 1 === index) {
                return React.cloneElement(element, { head: '', tail: 'tail', letter: `${queue.container[index]}` })
              } else if (queue.head === index) {
                return React.cloneElement(element, { head: 'top', tail: '', letter: `${queue.container[index]}` })
              }
              else {
                return React.cloneElement(element, { head: '', tail: '', letter: `${queue.container[index]}` })
              }
          }
          return element;
        });
        return arr;
      });

      if (formRef.current) {
        formRef.current.reset();
      }
    };

  }
    const deleteCircle = () => {

      if (queue !== null) {
        queue.dequeue();

        setCircles(prevState => {
          const newArr: JSX.Element[] = [...prevState];
          let arr: JSX.Element[] = newArr.map((element, index) => {

            if (queue.container[index] !== undefined) {
              if (queue.container[index] === null) {
                return React.cloneElement(element, { head: '', tail: '', letter: `` })
              }
              else if (queue.head === index && queue.tail - 1 === index) {
                return React.cloneElement(element, { head: 'top', tail: 'tail', letter: `${queue.container[index]}` })
              } else if (queue.tail - 1 === index) {
                return React.cloneElement(element, { head: '', tail: 'tail', letter: `${queue.container[index]}` })
              } else if (queue.head === index) {
                return React.cloneElement(element, { head: 'top', tail: '', letter: `${queue.container[index]}` })
              }
              else {
                return React.cloneElement(element, { head: '', tail: '', letter: `${queue.container[index]}` })
              }
            }
            return element;
          });
          return arr;
        });
      }
    }

    const cleanCircle = () => {
      emptyCircle();
      setQueue(new Queue<number>(8));
      if (formRef.current) {
        formRef.current.reset();
      }
    }

    return (
      <SolutionLayout title="Очередь">
        <form ref={formRef} className={classNames(styles.inputBlock, style.form)}>

          <div className={style.buttons}>
            <Input
              extraClass={style.input}
              onChange={handleInputChange}
              maxLength={4}
              isLimitText={true}
            />


            <Button
              text={"Добавить"}
              type={"button"}
              extraClass={style.mr}
              onClick={() => {
                addCircle();
              }}
            />

            <Button
              text={"Удалить"}
              type={"button"}
              onClick={() => {
                deleteCircle();
              }}
            />
          </div>

          <Button
            text={"Очистить"}
            type={"button"}
            extraClass={style.ml}
            onClick={() => {
              cleanCircle();
            }}
          />
        </form>

        {circles.length > 0 && (
          <div className={style.circleBlock}>
            {circles}
          </div>
        )}
      </SolutionLayout>
    );
  }

