import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const IDENTIFIER = '@implements-boilerplate/datepicker:fontSize';

type FontSizeContextType = {
  defaultFontSize: number;
  fontSize: number;
  increaseFont: () => void;
  decreaseFont: () => void;
  resetFont: () => void;
};

const fontSizeContextDefaultValues: FontSizeContextType =
  {} as FontSizeContextType;

const FontSizeContext = createContext<FontSizeContextType>(
  fontSizeContextDefaultValues,
);

export function useFontSize() {
  return useContext(FontSizeContext);
}

type Props = {
  children: ReactNode;
};

export function FontSizeProvider({ children }: Props) {
  const defaultFontSize = 16;
  const [fontSize, setFontSize] = useState(defaultFontSize);

  function changeDom(newValue: number) {
    const html = document.querySelector('html') as HTMLElement;
    html.style.fontSize = `${newValue}px`;
    sessionStorage.setItem(IDENTIFIER, String(newValue));
    setFontSize(newValue);
  }

  function increaseFont() {
    changeDom(fontSize + 1);
  }
  function decreaseFont() {
    changeDom(fontSize - 1);
  }
  function resetFont() {
    changeDom(defaultFontSize);
  }

  useEffect(() => {
    const result = sessionStorage.getItem(IDENTIFIER);
    if (result) {
      changeDom(Number(result));
    }
  }, []);

  const memoizedValue = useMemo(
    () => ({
      fontSize,
      defaultFontSize,
      increaseFont,
      decreaseFont,
      resetFont,
    }),
    [fontSize],
  );

  return (
    <FontSizeContext.Provider value={memoizedValue}>
      {children}
    </FontSizeContext.Provider>
  );
}
