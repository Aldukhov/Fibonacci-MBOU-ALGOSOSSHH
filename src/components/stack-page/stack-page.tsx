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
  const [isDisable, setIsDisable] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };


  const addCircle = (): void => {
    setIsDisable(true); 
  
    if (inputValue) {
      setCircles(prevCircles => {
        const newCircle = (
          <Circle
            key={prevCircles.length}
            state={ElementStates.Changing}
            letter={inputValue}
            index={prevCircles.length}
            head={'top'}
            extraClass={`${styles.circle}`}
          />
        );
  
        const updatedCircles = [...prevCircles.map(circle => React.cloneElement(circle, { head: '' })), newCircle];
  
        setTimeout(() => {
          setCircles(prevCircles => {
            const lastCircleIndex = prevCircles.length - 1;
  
            return prevCircles.map((circle, index) => {
              if (index === lastCircleIndex) {
                return React.cloneElement(circle, { state: ElementStates.Default });
              } else {
                return circle;
              }
            });
          });
          setIsDisable(false); 
        }, 500);
  
        return updatedCircles;
      });
    } else {
      setIsDisable(false);
    }
  };
  


  const deleteCircle = (): void => {
    setIsDisable(true)
    
    setCircles(prevCircles => {
      if (prevCircles.length === 0) {
        return prevCircles; 
      }

      const newArr: JSX.Element[] = [...prevCircles];
      const lastCircle = newArr.pop(); 

      
      if (lastCircle) {
        const changedCircle = React.cloneElement(lastCircle, { state: ElementStates.Changing });
        newArr.push(changedCircle); 
      }

      
      setTimeout(() => {
        newArr.pop();
        let arr: JSX.Element[] = newArr.map((element, index) => (
          index === newArr.length - 1 ? (React.cloneElement(element, { head: 'top' })) : (React.cloneElement(element, { head: '' }))))
        setCircles(arr);
        setIsDisable(false)
      }, 500);

      return newArr; 
    });

    setIsDisable(!isDisable)
  };


  const cleanCircle = (): void => {

    setCircles([]);
    setInputValue('');
    if (formRef.current) {
      formRef.current.reset();
    }
  }
  return (
    <SolutionLayout title="Стек">
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
            disabled={circles.length === 6 || isDisable}
            onClick={() => {
              addCircle();
            }}
          />

          <Button
            text={"Удалить"}
            type={"button"}
            disabled={circles.length === 0 || isDisable}
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
