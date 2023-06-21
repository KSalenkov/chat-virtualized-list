import React from 'react';
interface ItemProps {
    children: React.ReactNode;
    onMount: () => void;
    onUnmount: () => void;
}
export declare const Item: React.FC<ItemProps>;
export {};
