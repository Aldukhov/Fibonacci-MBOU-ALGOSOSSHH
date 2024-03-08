import React, { useState, useRef, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from '../styles.module.css'
import style from './queue.module.css'
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import classNames from 'classnames'
import { IQueue, Queue } from "./utils";

export const QueuePage: React.FC = () => {

  const [disableDelete, setDisableDelete] = useState<boolean>(false);
  const [disableClean, setDisableClean] = useState<boolean>(true);
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


  const updateCircle = (index: number, head: string, tail: string, letter: string, state: ElementStates | undefined): JSX.Element => {
    return (
      <Circle
        key={index}
        state={state}
        letter={letter}
        index={index}
        head={head}
        tail={tail}
        extraClass={`${styles.circle}`}
      />
    );
  };

  const addCircle = () => {
    if (inputValue !== '' && queue !== null && !isNaN(Number(inputValue))) {
      queue.enqueue(Number(inputValue));

      setCircles(prevState => {
        const newArr = [...prevState];
        const arr = newArr.map((element, index) => {
          const queueValue = queue.container[index];
          let head = '', tail = '', letter = '';
          let state = ElementStates.Default;
          if (queueValue !== undefined) {
            if (queueValue !== null) {
              letter = `${queueValue}`;
              if (queue.head === index) head = 'top';
              if (queue.tail - 1 === index) tail = 'tail';
              if (queue.length - 1 === index) { state = ElementStates.Changing; }
            }
            if (state === ElementStates.Changing) {
              setTimeout(() => {
                setCircles(prevState => {
                  const updatedArr = [...prevState];
                  updatedArr[index] = updateCircle(index, head, tail, letter, ElementStates.Default);
                  return updatedArr;
                });
              }, 500);
            }
            return updateCircle(index, head, tail, letter, state);
          }
          return element;
        });
        return arr;
      });

      if (formRef.current) {
        formRef.current.reset();
      }
    }

    setInputValue('');
    setDisableClean(false);
    if (formRef.current) {
      formRef.current.reset();
    }
  };


  const deleteCircle = () => {
    setDisableDelete(true);
    if (queue !== null) {
      let headIndex = queue.head;
      queue.dequeue();

      setCircles(prevState => {
        const newArr = [...prevState];
        return newArr.map((element, index) => {

          if (headIndex === index) {
            return React.cloneElement(element, { state: ElementStates.Changing });
          }
          return element;
        });
      });
      setTimeout(() => {
        setCircles(prevState => {
          const newArr = [...prevState];
          const arr = newArr.map((element, index) => {
            const queueValue = queue.container[index];
            let head = '', tail = '', letter = '';
            if (queueValue !== undefined) {
              if (queueValue !== null) {
                letter = `${queueValue}`;
                if (queue.head === index) head = 'top';
                if (queue.tail - 1 === index) tail = 'tail';
              }
              if (headIndex === index) {
                return updateCircle(index, head, tail, letter, ElementStates.Default);
              }
              return updateCircle(index, head, tail, letter, ElementStates.Default);
            }
            return element;
          });



          return arr;
        });
        setDisableDelete(false);
      }, 500);

    } else {
      setDisableDelete(false);
    };

  }

  const cleanCircle = () => {
    emptyCircle();
    setQueue(new Queue<number>(8));
    if (formRef.current) {
      formRef.current.reset();
    }

    setDisableClean(true);
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
            disabled={disableDelete}
            onClick={() => {
              deleteCircle();
            }}
          />
        </div>

        <Button
          text={"Очистить"}
          type={"button"}
          extraClass={style.ml}
          disabled={disableClean}
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

