"use strict";
exports.__esModule = true;
exports.Item = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var Item = function (_a) {
    var children = _a.children, onMount = _a.onMount, onUnmount = _a.onUnmount;
    (0, react_1.useEffect)(function () {
        onMount();
        return onUnmount;
    }, []);
    return react_1["default"].createElement(react_1["default"].Fragment, null, children);
};
exports.Item = Item;
//# sourceMappingURL=Item.js.map