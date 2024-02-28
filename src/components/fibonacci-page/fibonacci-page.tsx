import React, { useState } from "react";
import styles from "../styles.module.css"
import style from './fibonacci.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [circles, setCircles] = useState<JSX.Element[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setInputValue(undefined);
    }
    const numericValue = parseInt(event.target.value, 10);

    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 19) {
      setInputValue(numericValue);
    } else event.target.value = ''
  };

  const handleClick = () => {


    function fibArray(n: number): number[] {
      const result = [];
      let a = 1, b = 1, temp;
      for (let i = 0; i <= n; i++) {
        result.push(a);
        temp = a + b;
        a = b;
        b = temp;
      }
      return result;
    }

    if (inputValue) {
      const fibSequence = fibArray(inputValue);
      const circleElements = fibSequence.map((element, index) => (
        <Circle extraClass={`${styles.circle}`} key={index} state={ElementStates.Default} letter={`${element}`} index={index} />
      ));

      setCircles(circleElements);
    }
  };

  const showCircles = () => {
    for (let i = 0; i < circles.length; i++) {
      setTimeout(() => {
      }, 500);
      return circles[i];
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
          disabled={inputValue === 0}
          isLoader={isLoading}
          onClick={() => {
            handleClick();
          }}
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
