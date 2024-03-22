import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import styles from './string.module.css';

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [circles, setCircles] = useState<JSX.Element[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };


  const handleClick = async () => {
    let newCircles = inputValue.split('').map((element, index) => (
      <Circle key={index} extraClass={styles.circle}  state={ElementStates.Default} letter={element}/>
    ));

    setCircles(newCircles);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (newCircles.length > 1) {
      setIsLoading(true);

      let l = 0;
      let r = newCircles.length - 1;

      while (l < r) {
        // Создаем новый массив JSX элементов с обновленным состоянием для элементов l и r
        const updatedCircles = newCircles.map((circle, index) => {
          if (index === l || index === r) {
            // Изменяем состояние элементов l и r на Changing до обмена местами
            return <Circle key={index} extraClass={`${styles.circle}`} state={ElementStates.Changing} letter={circle.props.letter} />;
          }
          return circle;
        });

        // Обновляем состояние кругов
        setCircles(updatedCircles);

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Обмениваем местами элементы l и r в массиве кругов
        const temp = updatedCircles[l];
        updatedCircles[l] = updatedCircles[r];
        updatedCircles[r] = temp;

        // Создаем новый массив JSX элементов с обновленным состоянием для элементов l и r
        const modifiedCircles = updatedCircles.map((circle, index) => {
          if (index === l || index === r) {
            // Изменяем состояние элементов l и r на Modified после обмена местами
            return <Circle extraClass={`${styles.circle}`}  key={index} state={ElementStates.Modified} letter={circle.props.letter} />;
          }
          return circle;
        });

        newCircles = modifiedCircles;
        // Обновляем состояние кругов после обмена местами
        setCircles(modifiedCircles);

        l++;
        r--;
      }


      setIsLoading(false);
    }
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.inputBlock}>
      <Input
          extraClass={styles.inputMargin}
          maxLength={11}
          isLimitText={true}
          onChange={handleInputChange}
          value={inputValue}
          data-testid='input'
        />
        <Button
          text={"Развернуть"}
          type={"button"}
          disabled={!inputValue.trim()}
          isLoader={isLoading}
          onClick={() => {
            handleClick();
          }}
          extraClass={`${styles.btn} ${isLoading ? styles.isLoader : styles.notLoader}`}
          data-testid='btn'
        />
      </form>

      {circles.length > 0 && (
        <div className={styles.circleBlock}>
          {circles}
        </div>
      )}
    </SolutionLayout>
  );
};

