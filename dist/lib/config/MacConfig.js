"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SignableConfig_1 = require("./SignableConfig");
var MacConfig = /** @class */ (function (_super) {
    __extends(MacConfig, _super);
    function MacConfig(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.name = '';
        _this.displayName = '';
        _this.version = '';
        _this.description = '';
        _this.copyright = '';
        _this.icon = undefined;
        _this.plistStrings = {};
        // default filesToSign for Mac
        _this.signing.filesToSignGlobs = [
            '**/*',
        ];
        Object.keys(_this).map(function (key) {
            if (options[key] !== undefined) {
                switch (key) {
                    default:
                        _this[key] = options[key];
                        break;
                }
            }
        });
        return _this;
    }
    return MacConfig;
}(SignableConfig_1.SignableConfig));
exports.MacConfig = MacConfig;
//# sourceMappingURL=MacConfig.js.map