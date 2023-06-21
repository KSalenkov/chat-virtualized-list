"use strict";
exports.__esModule = true;
exports.VirtualizedList = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var throttle_debounce_1 = require("throttle-debounce");
var components_1 = require("./components");
function VirtualizedList(_a) {
    var height = _a.height, data = _a.data, dataLength = _a.dataLength, children = _a.children, className = _a.className, _b = _a.style, style = _b === void 0 ? {} : _b, hasMoreNext = _a.hasMoreNext, next = _a.next, hasMorePrev = _a.hasMorePrev, prev = _a.prev, getKey = _a.getKey, _c = _a.threshold, threshold = _c === void 0 ? 0.8 : _c, _d = _a.inverse, inverse = _d === void 0 ? false : _d, idForScroll = _a.idForScroll;
    var scrollContainerRef = (0, react_1.useRef)(null);
    var actionTriggeredRef = (0, react_1.useRef)(false);
    var hasMoreNextRef = (0, react_1.useRef)(hasMoreNext);
    var nextRef = (0, react_1.useRef)(next);
    var hasMorePrevRef = (0, react_1.useRef)(hasMorePrev);
    var prevRef = (0, react_1.useRef)(prev);
    var inverseRef = (0, react_1.useRef)(inverse);
    var currentIdScrolled = (0, react_1.useRef)(false);
    var _e = (0, react_1.useState)(0), renderedItemsCount = _e[0], setRenderedItemsCount = _e[1];
    var allChildMounted = renderedItemsCount === dataLength;
    var renderEndRef = (0, react_1.useRef)(false);
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
    var throttledOnScrollListener = (0, throttle_debounce_1.throttle)(150, onScrollListener);
    (0, react_1.useLayoutEffect)(function () {
        if (scrollContainerRef.current) {
            var el_1 = scrollContainerRef.current;
            el_1.addEventListener("scroll", throttledOnScrollListener);
            return function () {
                el_1.removeEventListener("scroll", throttledOnScrollListener);
            };
        }
        return;
    }, [scrollContainerRef.current]);
    (0, react_1.useEffect)(function () {
        actionTriggeredRef.current = false;
    }, [dataLength]);
    (0, react_1.useEffect)(function () {
        hasMoreNextRef.current = hasMoreNext;
    }, [hasMoreNext]);
    (0, react_1.useEffect)(function () {
        nextRef.current = next;
    }, [next]);
    (0, react_1.useEffect)(function () {
        hasMorePrevRef.current = hasMorePrev;
    }, [hasMorePrev]);
    (0, react_1.useEffect)(function () {
        prevRef.current = prev;
    }, [prev]);
    (0, react_1.useEffect)(function () {
        inverseRef.current = inverse;
    }, [inverse]);
    (0, react_1.useEffect)(function () {
        renderEndRef.current = true;
    }, []);
    (0, react_1.useLayoutEffect)(function () {
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
    (0, react_1.useEffect)(function () {
        return function () {
            currentIdScrolled.current = false;
        };
    }, [idForScroll]);
    var scrollContainerStyle = tslib_1.__assign({ height: height, maxHeight: height, overflowY: 'auto', 
        // visibility: !allChildMounted ? "hidden" : 'visible',
        display: "flex", flexDirection: inverse ? "column-reverse" : "column" }, style);
    var onMountChild = function () {
        setRenderedItemsCount(function (prev) { return prev + 1; });
    };
    var onUnmountChild = function () {
        setRenderedItemsCount(function (prev) { return prev - 1; });
    };
    return (react_1["default"].createElement("div", { ref: scrollContainerRef, style: scrollContainerStyle, className: className }, data.map(function (item, index) { return (react_1["default"].createElement(components_1.Item, { key: getKey ? getKey(item, index) : (item === null || item === void 0 ? void 0 : item.uuid) || index.toString(), onMount: onMountChild, onUnmount: onUnmountChild }, children(item, index))); })));
}
exports.VirtualizedList = VirtualizedList;
//# sourceMappingURL=VirtualizedList.js.map