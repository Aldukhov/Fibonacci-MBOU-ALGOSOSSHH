import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./utils";
import styles from './list.module.css'



interface IArr {
  smallCircle: ISmallCircle | null
  state: ElementStates,
  value: string,
}

interface ISmallCircle {
  state: ElementStates,
  value: string,
  activeClass: 'smallCircle' | 'bigCircle';
}

const arr = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10).toString());

const list = new LinkedList<string | number>(arr)

const initialArr = arr.map((item) => {
  return {
    state: ElementStates.Default,
    smallCircle: null,
    value: item,
  }
})

const setDelay = (timer: number) => new Promise<void>(
  resolve => setTimeout(resolve, timer)
);

export const ListPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [addHead, setAddHead] = useState<boolean>(false);
  const [addTail, setAddTail] = useState<boolean>(false);
  const [addByIndex, setAddByIndex] = useState<boolean>(false);
  const [removeHead, setRemoveHead] = useState<boolean>(false);
  const [removeTail, setRemoveTail] = useState<boolean>(false);
  const [removeByIndex, setRemoveByIndex] = useState<boolean>(false);

  const [formDisabled, setFormDisabled] = useState<boolean>(false);

  const [array, setArray] = useState<IArr[]>(initialArr);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue: string = e.currentTarget.value;
    setInputValue(inputValue);
  }

  const onChangeIndex = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue: string = e.currentTarget.value;
    const inputIndex: number = parseInt(inputValue, 10);
    setInputIndex(inputIndex);
  }


  const onAddHead = async () => {
    try {
      setFormDisabled(true);
      setAddHead(true);


      list.prepend(inputValue);

      if (array.length > 0) {

        array[0].smallCircle = {
          state: ElementStates.Changing,
          value: inputValue,
          activeClass: 'smallCircle'
        };
      }

      setArray([...array]);


      await new Promise(resolve => setTimeout(resolve, 500));


      array[0] = {
        ...array[0],
        smallCircle: null
      };


      array.unshift({
        ...array[0],
        state: ElementStates.Modified,
        value: inputValue
      });

      setArray([...array]);

      // Имитируем еще одну задержку в 500 миллисекунд
      await new Promise(resolve => setTimeout(resolve, 500));

      // Устанавливаем состояние элемента в Default
      array[0] = {
        ...array[0],
        state: ElementStates.Default
      };

      setArray([...array]);

      setAddHead(false);
      setInputValue('');
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setFormDisabled(false);
    }
  }



  const onAddTail = async () => {
    setFormDisabled(true);
    setAddTail(true);

    list.append(inputValue);

    setArray(prevArray => [
      ...prevArray.slice(0, prevArray.length - 1),
      {
        ...prevArray[prevArray.length - 1],
        topCircle: {
          state: ElementStates.Changing,
          value: inputValue,
          activeClass: 'topCircle',
        }
      }
    ]);

    await setDelay(500);

    setArray(prevArray => [
      ...prevArray.slice(0, prevArray.length - 1),
      {
        ...prevArray[prevArray.length - 1],
        topCircle: null
      }
    ]);

    setArray(prevArray => [
      ...prevArray,
      {
        state: ElementStates.Modified,
        value: inputValue,
        smallCircle: null,
      }
    ]);

    await setDelay(500);

    setArray(prevArray => [
      ...prevArray.slice(0, prevArray.length - 1),
      {
        ...prevArray[prevArray.length - 1],
        state: ElementStates.Default
      }
    ]);

    setAddTail(false);
    setInputValue('');
    setFormDisabled(false);
  };



  const onAddValueByIndex = async () => {
    try {
      setFormDisabled(true);
      setAddByIndex(true);

      list.addByIndex(inputValue, inputIndex);

      const updatedArray = [...array];

      for (let i = 0; i <= inputIndex; i++) {
        updatedArray[i] = {
          ...updatedArray[i],
          state: ElementStates.Changing,
          smallCircle: {
            state: ElementStates.Changing,
            value: inputValue,
            activeClass: "smallCircle"
          }
         
        };

        await setDelay(1000);
        setArray([...updatedArray]);

        if (i > 0) {
          updatedArray[i - 1] = {
            ...updatedArray[i - 1],
            smallCircle: null
          };
          setArray([...updatedArray]);
        }
      }

      await setDelay(500);
      updatedArray[inputIndex] = {
        ...updatedArray[inputIndex],
        state: ElementStates.Default,
        smallCircle: null
      };
      updatedArray.splice(inputIndex, 0, {
        state: ElementStates.Modified,
        value: inputValue,
        smallCircle: null
      });
      setArray([...updatedArray]);

      updatedArray[inputIndex] = {
        ...updatedArray[inputIndex],
        state: ElementStates.Default
      };

      updatedArray.forEach((item, index) => {
        if (index <= inputIndex) {
          item.state = ElementStates.Default;
        }
      });

      await setDelay(500);
      setArray([...updatedArray]);
      setInputIndex(0);

      setAddByIndex(false);
      setInputValue('');
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setFormDisabled(false);
    }
  }



  const onRemoveHead = async () => {
    setFormDisabled(true);
    setRemoveHead(true);

    list.deleteHead();

    setArray(prevArray => {
      const [firstItem, ...rest] = prevArray;
      if (firstItem) {
        return [
          {
            ...firstItem,
            value: '',
            topCircle: {
              state: ElementStates.Changing,
              value: firstItem.value,
              activeClass: "bottomCircle"
            }
          },
          ...rest
        ];
      }
      return prevArray;
    });

    await setDelay(500);

    setArray(prevArray => {
      const [, ...rest] = prevArray;
      return rest;
    });

    await setDelay(500);

    setRemoveHead(false);
    setFormDisabled(false);
  };



  const onRemoveTail = async () => {
    setFormDisabled(true);
    setRemoveTail(true);

    list.deleteTail();

    setArray(prevArray => {
      const newArray = [...prevArray];
      const lastItem = newArray.pop();
      if (lastItem) {
        return [
          ...newArray,
          {
            ...lastItem,
            value: '',
            topCircle: {
              state: ElementStates.Changing,
              value: lastItem.value,
              activeClass: "bottomCircle"
            }
          }
        ];
      }
      return newArray;
    });

    await setDelay(500);

    setArray(prevArray => {
      const newArray = [...prevArray];
      newArray.pop();
      return newArray;
    });

    await setDelay(500);

    setRemoveTail(false);
    setFormDisabled(false);
  };


  const onRemoveValueByIndex = async () => {
    setFormDisabled(true);
    setRemoveByIndex(true);

    list.deleteByIndex(inputIndex);

    const updatedArray = array.map((item, index) => {
      if (index <= inputIndex) {
        return {
          ...item,
          state: ElementStates.Changing
        };
      } else {
        return item;
      }
    });

    setArray(updatedArray);
    await setDelay(500);

    setArray(prevArray => {
      const newArray = [...prevArray];
      newArray[inputIndex] = {
        ...newArray[inputIndex],
        value: '',
        smallCircle: {
          state: ElementStates.Changing,
          value: newArray[inputIndex].value,
          activeClass: "bigCircle"
        }
      };
      return newArray;
    });
    await setDelay(500);

    setArray(prevArray => {
      const newArray = [...prevArray];
      newArray.splice(inputIndex, 1);
      if (inputIndex > 0) {
        newArray[inputIndex - 1] = {
          ...newArray[inputIndex - 1],
          state: ElementStates.Modified,
          smallCircle: null
        };
      }
      return newArray;
    });
    await setDelay(500);

    setArray(prevArray => {
      const newArray = prevArray.map(item => ({
        ...item,
        state: ElementStates.Default
      }));
      return newArray;
    });
    await setDelay(500);

    setRemoveByIndex(false);
    setInputIndex(0);
    setFormDisabled(false);
  };


  return (
    <SolutionLayout title="Связный список">

      <form className={styles.form}>
        <Input
          onChange={onChange}
          placeholder="Введите значение"
          isLimitText={true}
          maxLength={4}
          value={inputValue}
          disabled={formDisabled}
          extraClass={styles.input}
          data-testid='input'
        />
        <div className={styles.form_buttons}>
          <Button
            onClick={onAddHead}
            text="Добавить в head"
            isLoader={addHead}
            extraClass={styles.button_small}
            disabled={formDisabled || inputValue.length === 0 || array.length >= 9}
          />
          <Button
            onClick={onAddTail}
            text="Добавить в tail"
            extraClass={styles.button_small}
            isLoader={addTail}
            disabled={formDisabled || inputValue.length === 0 || array.length >= 9}
          />
          <Button
            onClick={onRemoveHead}
            text="Удалить из head"
            extraClass={styles.button_small}
            isLoader={removeHead}
            disabled={formDisabled || array.length <= 1}
          />
          <Button
            onClick={onRemoveTail}
            text="Удалить из tail"
            extraClass={styles.button_small}
            isLoader={removeTail}
            disabled={formDisabled || array.length <= 1}
          />
        </div>
      </form>

      <form className={styles.form} data-testid="secondForm">
        <Input
          onChange={onChangeIndex}
          isLimitText={false}
          type="number"
          maxLength={1}
          max={array.length - 1}
          min={0}
          value={inputIndex}
          disabled={formDisabled}
          placeholder="Введите индекс"
          extraClass={styles.input}
          data-testid='inputIndex'
        />
        <div className={styles.form_buttons}>
          <Button
            text="Добавить по индексу"
            extraClass={styles.button_big}
            onClick={onAddValueByIndex}
            isLoader={addByIndex}
            disabled={formDisabled || inputValue.length === 0 || inputIndex > array.length - 1}
          />
          <Button
            text="Удалить по индексу"
            extraClass={styles.button_big}
            onClick={onRemoveValueByIndex}
            isLoader={removeByIndex}
            disabled={formDisabled || array.length === 0 || !inputIndex || inputIndex > array.length - 1 || inputIndex < 1}
          />
        </div>
      </form>

      <div className={styles.list}>
        {array.map((item, index) => {
          const isHead = !item.smallCircle && index === 0;
          const isTail = !item.smallCircle && index === array.length - 1;
          const circleExtraClass = item.smallCircle && item.smallCircle.activeClass === 'smallCircle' ? styles.smallCircle : styles.bigCircle;

          return (
            <div className={styles.item} key={index}>
              <Circle
                extraClass={styles.bigCircle}
                letter={item.value}
                state={item.state}
                head={isHead ? "head" : ""}
                tail={isTail ? "tail" : ""}
                index={index}
                isSmall={false}
              />

              {item.smallCircle && (
                <Circle
                  state={item.smallCircle.state}
                  letter={item.smallCircle.value}
                  isSmall={true}
                  extraClass={`${styles.circle} ${circleExtraClass}`}
                />
              )}

              {index < array.length - 1 && <ArrowIcon fill="#0032FF" />}
            </div>
          );
        })}
      </div>


    </SolutionLayout>
  );
};