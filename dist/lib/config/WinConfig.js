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
var WinConfig = /** @class */ (function (_super) {
    __extends(WinConfig, _super);
    function WinConfig(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.productName = '';
        _this.companyName = '';
        _this.fileDescription = '';
        _this.productVersion = '';
        _this.fileVersion = '';
        _this.copyright = '';
        _this.versionStrings = {};
        _this.icon = undefined;
        // default filesToSign for Windows
        _this.signing.filesToSignGlobs = ['**/*.+(exe|dll)'];
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
    return WinConfig;
}(SignableConfig_1.SignableConfig));
exports.WinConfig = WinConfig;
//# sourceMappingURL=WinConfig.js.map