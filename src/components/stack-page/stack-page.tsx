import React, { useState, useRef } from "react";
import classNames from 'classnames';
import styles from '../styles.module.css'
import style from './stack.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {

  const [circles, setCircles] = useState<JSX.Element[]>([]);
  const [inputValue, setInputValue] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };


  const addCircle = (): void => {

    if (inputValue) {
      setCircles(prevCircles => {
        if (prevCircles.length === 0) {

          return [
            <Circle
              key={0}
              state={ElementStates.Default}
              letter={inputValue}
              index={0}
              head={'top'}
              extraClass={`${styles.circle}`}
            />
          ];
        } else {

          return [
            ...prevCircles.map(circle => React.cloneElement(circle, { head: '' })),
            <Circle
              key={prevCircles.length}
              state={ElementStates.Default}
              letter={inputValue}
              index={prevCircles.length}
              head={'top'}
              extraClass={`${styles.circle}`}
            />
          ];
        }
      });
    }
  }

  const deleteCircle = (): void => {


    setCircles(prevCircles => {

      const newArr: JSX.Element[] = [...prevCircles];
      newArr.pop();

      let arr: JSX.Element[] = newArr.map((element, index) => (
        index === newArr.length - 1 ? (React.cloneElement(element, { head: 'top' })) : (React.cloneElement(element, { head: '' }))))

      return arr;
    })
  }

  const cleanCircle = (): void => {

    setCircles([]);
    setInputValue('');
    if (formRef.current) {
      formRef.current.reset(); 
    }
  }
  return (
    <SolutionLayout title="Стек">
      <form ref={formRef  } className={classNames(styles.inputBlock, style.form)}>

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
          extraClass={style.btnL}
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
};
