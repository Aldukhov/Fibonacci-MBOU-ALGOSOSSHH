import React, { useState, useEffect } from "react";
import classNames from 'classnames';
import styles from '../styles.module.css'
import style from './sorting.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { bubbleFunc, selectionFunc } from "./utils";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [ascending, setAscending] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disabledButtons, setDisabledButtons] = useState<boolean>(false);
  const [columnColors, setColumnColors] = useState<string[]>([]);

  const randomArr = (): number[] => {
    const length = Math.floor(Math.random() * (17 - 3 + 1)) + 3;
    const randomArray: number[] = [];

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * 101);
      randomArray.push(randomNumber);
    }

    return randomArray;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSelectedValue(event.target.value);
  };

  const ascendingClick = () => {
    setAscending(!ascending);
    setDisabledButtons(true);

    if (arr.length > 0) {
      setIsLoading(true);
      if (selectedValue === 'bubble') {
        bubbleSort();
      } else if (selectedValue === 'selection') {
        selectionSort();
      }
    }
    setDisabledButtons(false);

  }

  const newArrClick = () => {
    let randomArray: number[] = randomArr();
    setArr(randomArray);
    setColumnColors(new Array(randomArray.length).fill('#0032FF'));
  }

  const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const bubbleSort = async (): Promise<void> => {
    if (arr && columnColors) {
      let sortedArr = [...arr];
      let sortedColors = [...columnColors];

      await bubbleFunc(sortedArr,ascending,sortedColors,delay,setColumnColors,setArr);

      setIsLoading(false);
    }
  }

  const selectionSort = async(): Promise<void> => {
    if (arr && columnColors) {
      let sortedArr = [...arr];
      let sortedColors = [...columnColors];

      await selectionFunc(sortedArr,ascending,sortedColors,delay,setColumnColors,setArr);

      if (sortedColors[sortedColors.length - 1] !== '#7FE051') {
        sortedColors[sortedColors.length - 1] = '#7FE051';
        setColumnColors([...sortedColors]);
        await delay(500);
      }

      setIsLoading(false);
    }

  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={classNames(styles.inputBlock, style.form)}>
        <div className={style.buttons}>
          <RadioInput label="Выбор" extraClass={style.mr} name="options" value={'selection'} checked={selectedValue === "selection"} onChange={handleChange} />
          <RadioInput label="Пузырек" name="options" value={'bubble'} checked={selectedValue === "bubble"} onChange={handleChange} />
        </div>
        <div className={style.buttons}>
          <Button
            text={"по возрастанию"}
            type={"button"}
            extraClass={classNames(style.buttonM, style.btns)}
            onClick={ascendingClick}
            isLoader={!ascending && isLoading}
            disabled={disabledButtons || ascending}
          />
          <Button
            text={"по убыванию"}
            type={"button"}
            onClick={ascendingClick}
            isLoader={ascending && isLoading}
            disabled={disabledButtons || !ascending}
            extraClass={classNames(style.btns)}
          />
        </div>
        <Button
          text={"Новый массив"}
          type={"button"}
          onClick={newArrClick}
          isLoader={isLoading}
          extraClass={classNames(style.btns)}
        />
      </form>
      
      <div className={style.container}>
        {arr.map((value, index) => (
          <div className={style.containerBlock} key={index}>
            <div className={style.column} style={{ height: `${(340 * value) / 100}px`, backgroundColor: columnColors[index] }}>
            </div>
            <div>
              {value}
            </div>
          </div>
        ))}
      </div>
      
    </SolutionLayout>
  );
};
