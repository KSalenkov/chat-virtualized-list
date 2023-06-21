import { __assign } from "tslib";
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { throttle } from 'throttle-debounce';
import { Item } from "./components";
export function VirtualizedList(_a) {
    var height = _a.height, data = _a.data, dataLength = _a.dataLength, children = _a.children, className = _a.className, _b = _a.style, style = _b === void 0 ? {} : _b, hasMoreNext = _a.hasMoreNext, next = _a.next, hasMorePrev = _a.hasMorePrev, prev = _a.prev, getKey = _a.getKey, _c = _a.threshold, threshold = _c === void 0 ? 0.8 : _c, _d = _a.inverse, inverse = _d === void 0 ? false : _d, idForScroll = _a.idForScroll;
    var scrollContainerRef = useRef(null);
    var actionTriggeredRef = useRef(false);
    var hasMoreNextRef = useRef(hasMoreNext);
    var nextRef = useRef(next);
    var hasMorePrevRef = useRef(hasMorePrev);
    var prevRef = useRef(prev);
    var inverseRef = useRef(inverse);
    var currentIdScrolled = useRef(false);
    var _e = useState(0), renderedItemsCount = _e[0], setRenderedItemsCount = _e[1];
    var allChildMounted = renderedItemsCount === dataLength;
    var renderEndRef = useRef(false);
    var isElementAtBottom = function (target) {
        var clientHeight = target.clientHeight;
        if (inverseRef.current) {
            return ((target.scrollTop * -1) + clientHeight <= target.scrollHeight * (1 - threshold));
        }
        return (target.scrollTop + clientHeight >= target.scrollHeight * threshold);
    };
    var isElementAtTop = function (target) {
        var clientHeight = target.clientHeight;
        if (inverseRef.current) {
            return ((target.scrollTop * -1) + clientHeight >= target.scrollHeight * threshold);
        }
        return target.scrollTop + clientHeight <= target.scrollHeight * (1 - threshold);
    };
    var onScrollListener = function (event) {
        var target = event.target;
        var atBottom = isElementAtBottom(target);
        var atTop = isElementAtTop(target);
        if (actionTriggeredRef.current)
            return;
        if (atBottom && hasMoreNextRef.current && nextRef.current) {
            actionTriggeredRef.current = true;
            console.log("NEXT");
            nextRef.current();
        }
        if (atTop && hasMorePrevRef.current && prevRef.current) {
            actionTriggeredRef.current = true;
            console.log("PREV");
            prevRef.current();
        }
    };
    var throttledOnScrollListener = throttle(150, onScrollListener);
    useLayoutEffect(function () {
        if (scrollContainerRef.current) {
            var el_1 = scrollContainerRef.current;
            el_1.addEventListener("scroll", throttledOnScrollListener);
            return function () {
                el_1.removeEventListener("scroll", throttledOnScrollListener);
            };
        }
        return;
    }, [scrollContainerRef.current]);
    useEffect(function () {
        actionTriggeredRef.current = false;
    }, [dataLength]);
    useEffect(function () {
        hasMoreNextRef.current = hasMoreNext;
    }, [hasMoreNext]);
    useEffect(function () {
        nextRef.current = next;
    }, [next]);
    useEffect(function () {
        hasMorePrevRef.current = hasMorePrev;
    }, [hasMorePrev]);
    useEffect(function () {
        prevRef.current = prev;
    }, [prev]);
    useEffect(function () {
        inverseRef.current = inverse;
    }, [inverse]);
    useEffect(function () {
        renderEndRef.current = true;
    }, []);
    useLayoutEffect(function () {
        // console.log("HERE 1")
        var el = scrollContainerRef.current;
        if (el) {
            el.childNodes;
        }
        if (idForScroll && allChildMounted && !currentIdScrolled.current) {
            var idElement = document.getElementById(idForScroll);
            if (idElement) {
                idElement.scrollIntoView();
                currentIdScrolled.current = true;
            }
        }
        // setTimeout(() => {
        //   if (idForScroll && renderEndRef.current && scrollContainerRef.current) {
        //     const childNodes = scrollContainerRef.current.childNodes;
        //     console.log("childNodes", childNodes)
        //
        //     const el = Array.from(childNodes).find((el: any) => el.id === idForScroll);
        //
        //     console.log("EL", el)
        //
        //     // const idElement = document.getElementById(idForScroll);
        //     // console.log("HERE 2", idElement)
        //     if (el) {
        //       (el as Element).scrollIntoView();
        //     }
        //   }
        // }, 0)
    }, [idForScroll, allChildMounted]);
    useEffect(function () {
        return function () {
            currentIdScrolled.current = false;
        };
    }, [idForScroll]);
    var scrollContainerStyle = __assign({ height: height, maxHeight: height, overflowY: 'auto', 
        // visibility: !allChildMounted ? "hidden" : 'visible',
        display: "flex", flexDirection: inverse ? "column-reverse" : "column" }, style);
    var onMountChild = function () {
        setRenderedItemsCount(function (prev) { return prev + 1; });
    };
    var onUnmountChild = function () {
        setRenderedItemsCount(function (prev) { return prev - 1; });
    };
    return (React.createElement("div", { ref: scrollContainerRef, style: scrollContainerStyle, className: className }, data.map(function (item, index) { return (React.createElement(Item, { key: getKey ? getKey(item, index) : (item === null || item === void 0 ? void 0 : item.uuid) || index.toString(), onMount: onMountChild, onUnmount: onUnmountChild }, children(item, index))); })));
}
//# sourceMappingURL=VirtualizedList.js.map