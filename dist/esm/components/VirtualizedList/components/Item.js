import React, { useEffect } from 'react';
export var Item = function (_a) {
    var children = _a.children, onMount = _a.onMount, onUnmount = _a.onUnmount;
    useEffect(function () {
        onMount();
        return onUnmount;
    }, []);
    return React.createElement(React.Fragment, null, children);
};
//# sourceMappingURL=Item.js.map