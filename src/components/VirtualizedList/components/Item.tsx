import React, {useEffect} from 'react';

interface ItemProps {
  children: React.ReactNode;
  onMount: () => void;
  onUnmount: () => void;
}

export const Item: React.FC<ItemProps> = ({children, onMount, onUnmount}) => {
  useEffect(() => {
    onMount();
    return onUnmount;
  }, [])

  return <>{children}</>
}
