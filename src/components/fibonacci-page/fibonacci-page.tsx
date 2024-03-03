import React, { useState } from "react";
import styles from "../styles.module.css"
import style from './fibonacci.module.css'
import { fibArray } from "./utils";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [circles, setCircles] = useState<JSX.Element[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
      const numericValue = parseInt(event.target.value, 10);
      if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 19) {
        setInputValue(`${numericValue}`);
      } else {
        setInputValue('');
      }
    
  };

  const handleClick = () => {
    if (inputValue) {
      setIsLoading(true); 
      setCircles([]);
      
      const fibSequence = fibArray(Number(inputValue));
  
      const circleElements = fibSequence.map((element, index) => (
        <Circle extraClass={`${styles.circle}`} key={index} state={ElementStates.Default} letter={`${element}`} index={index} />
      ));
  
      const addCirclesWithInterval = (index: number): void => {
        if (index < circleElements.length - 1) {
          setTimeout(() => {
            setCircles(prevState => [...prevState, circleElements[index]]);
            addCirclesWithInterval(index + 1);
          }, 500);
        } else {
          setIsLoading(false); 
        }
      };
  
      addCirclesWithInterval(0);
    }
  };
  


  return (
    <SolutionLayout title="Последовательность Фибоначчи">

      <form className={styles.inputBlock}>

        <Input
          type={'number'}
          extraClass={styles.inputMargin}
          isLimitText={true}
          onChange={handleInputChange}
          value={inputValue}
          max={19}
        />
        <Button
          text={"Развернуть"}
          type={"button"}
          extraClass={styles.btn}
          disabled={inputValue === ''}
          isLoader={isLoading}
          onClick={handleClick}
        />
      </form>

      {<div>
        {circles.length > 0 && (
          <div className={styles.circleBlock}>
            {circles}
          </div>
        )}
      </div>}

    </SolutionLayout>
  );
};
