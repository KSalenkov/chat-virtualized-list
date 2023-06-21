import React, { CSSProperties } from 'react';
interface VirtualizedListProps<T> {
    height: CSSProperties["height"];
    data: (T & {
        uuid?: string;
    })[];
    dataLength: number;
    children: (item: T, index: number) => React.ReactNode;
    className?: string;
    style?: CSSProperties;
    hasMoreNext?: boolean;
    next?: () => any;
    hasMorePrev?: boolean;
    prev?: () => any;
    getKey?: (item: T, index: number) => string;
    threshold?: number;
    inverse?: boolean;
    idForScroll?: string;
}
export declare function VirtualizedList<T>({ height, data, dataLength, children, className, style, hasMoreNext, next, hasMorePrev, prev, getKey, threshold, inverse, idForScroll }: VirtualizedListProps<T>): JSX.Element;
export {};
