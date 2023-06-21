import React, {CSSProperties, useEffect, useLayoutEffect, useRef, useState} from 'react';
import { throttle } from 'throttle-debounce';
import {Item} from "./components";

interface VirtualizedListProps<T> {
  height: CSSProperties["height"];
  data: (T & {uuid?: string})[];
  dataLength: number;
  children: (item: T, index: number) => React.ReactNode;
  className?: string;
  style?: CSSProperties;
  hasMoreNext?: boolean,
  next?: () => any;
  hasMorePrev?: boolean,
  prev?: () => any;
  getKey?: (item: T, index: number) => string;
  threshold?: number;
  inverse?: boolean;
  idForScroll?: string;
}

export function VirtualizedList<T>({
  height,
  data,
  dataLength,
  children,
  className,
  style = {},
  hasMoreNext,
  next,
  hasMorePrev,
  prev,
  getKey,
  threshold = 0.8,
  inverse = false,
  idForScroll
}: VirtualizedListProps<T>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const actionTriggeredRef = useRef(false);
  const hasMoreNextRef = useRef(hasMoreNext);
  const nextRef = useRef(next);
  const hasMorePrevRef = useRef(hasMorePrev);
  const prevRef = useRef(prev);
  const inverseRef = useRef(inverse);

  const currentIdScrolled = useRef(false);

  const [renderedItemsCount, setRenderedItemsCount] = useState(0);

  const allChildMounted = renderedItemsCount === dataLength;

  const renderEndRef = useRef(false);

  const isElementAtBottom = (
    target: HTMLElement
  ) => {
    const clientHeight = target.clientHeight;

    if (inverseRef.current) {
      return (
        (target.scrollTop * -1) + clientHeight <= target.scrollHeight * (1 - threshold)
      );
    }

    return (
      target.scrollTop + clientHeight >= target.scrollHeight * threshold
    );
  }

  const isElementAtTop = (
    target: HTMLElement
  ) => {
    const clientHeight = target.clientHeight;

    if (inverseRef.current) {
      return (
        (target.scrollTop * -1) + clientHeight >= target.scrollHeight * threshold
      );
    }
    return target.scrollTop + clientHeight <= target.scrollHeight * (1 - threshold);
  }

  const onScrollListener = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const atBottom = isElementAtBottom(target);
    const atTop = isElementAtTop(target);

    if (actionTriggeredRef.current) return;

    if (atBottom && hasMoreNextRef.current && nextRef.current) {
      actionTriggeredRef.current = true;
      console.log("NEXT")
      nextRef.current();
    }

    if (atTop && hasMorePrevRef.current && prevRef.current) {
      actionTriggeredRef.current = true;
      console.log("PREV")
      prevRef.current();
    }
  };

  const throttledOnScrollListener = throttle(150, onScrollListener) as unknown as EventListenerOrEventListenerObject;

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      el.addEventListener("scroll", throttledOnScrollListener);

      return () => {
        el.removeEventListener("scroll", throttledOnScrollListener);
      }
    }
    return
  }, [scrollContainerRef.current]);

  useEffect(() => {
    actionTriggeredRef.current = false;
  }, [dataLength]);

  useEffect(() => {
    hasMoreNextRef.current = hasMoreNext;
  }, [hasMoreNext]);

  useEffect(() => {
    nextRef.current = next;
  }, [next]);

  useEffect(() => {
    hasMorePrevRef.current = hasMorePrev;
  }, [hasMorePrev]);

  useEffect(() => {
    prevRef.current = prev;
  }, [prev]);

  useEffect(() => {
    inverseRef.current = inverse;
  }, [inverse]);

  useEffect(() => {
    renderEndRef.current = true;
  }, []);

  useLayoutEffect(() => {
    if (idForScroll && allChildMounted && !currentIdScrolled.current) {
      const idElement = document.getElementById(idForScroll);
      if (idElement) {
        idElement.scrollIntoView();
        currentIdScrolled.current = true;
      }
    }
  }, [idForScroll, allChildMounted]);

  useEffect(() => {
    return () => {
      currentIdScrolled.current = false;
    }
  }, [idForScroll])

  const scrollContainerStyle: CSSProperties = {
    height,
    maxHeight: height,
    overflowY: 'auto',
    // visibility: !allChildMounted ? "hidden" : 'visible',
    display: "flex",
    flexDirection: inverse ? "column-reverse" : "column",
    ...style,
  }

  const onMountChild = () => {
    setRenderedItemsCount((prev) => prev + 1);
  }

  const onUnmountChild = () => {
    setRenderedItemsCount((prev) => prev - 1);
  }

  return (
    <div
      ref={scrollContainerRef}
      style={scrollContainerStyle}
      className={className}
    >
      {data.map((item, index) => (
        <Item
          key={getKey ? getKey(item, index) : item?.uuid || index.toString()}
          onMount={onMountChild}
          onUnmount={onUnmountChild}
        >
          {children(item, index)}
        </Item>
      ))}
    </div>
  )
}
