import {
  InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  autofocus?: boolean;
  isShow?: boolean;
  onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder = '',
    autoFocus = false,
    isShow = false,
    ...otherProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length);
  };

  useEffect(() => {
    if (autoFocus && isShow) {
      setIsFocused(true);
      inputRef?.current.focus();
    }
  }, [autoFocus, isShow]);

  return (
    <div className={classNames(cls.InputWrapper, {}, [className])}>
      {placeholder && (
        <div className={cls.placeholder}>
          {`${placeholder}>`}
        </div>
      )}

      <div className={cls.caretWrapper}>

        <input
          ref={inputRef}
          type={type}
          className={cls.input}
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChangeHandler}
          onSelect={onSelect}
          {...otherProps}
        />

        {isFocused && (
          <span
            className={cls.caret}
            style={{ left: caretPosition * 9 }}
          />
        )}

      </div>
    </div>
  );
});