"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require("debug");
var dotenv = require("dotenv");
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var index_1 = require("../util/index");
var LinuxConfig_1 = require("./LinuxConfig");
var MacConfig_1 = require("./MacConfig");
var NsisConfig_1 = require("./NsisConfig");
var WinConfig_1 = require("./WinConfig");
var debug = Debug('nwjs-builder-phoenix:BuildConfig');
var BuildConfig = /** @class */ (function () {
    function BuildConfig(pkg) {
        if (pkg === void 0) { pkg = {}; }
        var _this = this;
        this.nwVersion = 'lts';
        this.nwFlavor = 'normal';
        this.output = './dist/';
        this.outputPattern = '${NAME}-${VERSION}-${PLATFORM}-${ARCH}';
        this.packed = false;
        this.targets = [];
        this.files = ['**/*'];
        this.excludes = [];
        this.win = new WinConfig_1.WinConfig();
        this.mac = new MacConfig_1.MacConfig();
        this.linux = new LinuxConfig_1.LinuxConfig();
        this.nsis = new NsisConfig_1.NsisConfig();
        this.appId = undefined;
        this.ffmpegIntegration = false;
        this.strippedProperties = ['scripts', 'devDependencies', 'build'];
        this.filesToSignGlobs = [''];
        var options = pkg.build ? pkg.build : {};
        Object.keys(this).map(function (key) {
            if (options[key] !== undefined) {
                switch (key) {
                    case 'win':
                        _this.win = new WinConfig_1.WinConfig(options.win);
                        break;
                    case 'mac':
                        _this.mac = new MacConfig_1.MacConfig(options.mac);
                        break;
                    case 'linux':
                        _this.linux = new LinuxConfig_1.LinuxConfig(options.linux);
                        break;
                    case 'nsis':
                        _this.nsis = new NsisConfig_1.NsisConfig(options.nsis);
                        break;
                    default:
                        _this[key] = options[key];
                        break;
                }
            }
        });
        this.output = path_1.normalize(this.output);
        this.appId = this.appId ? this.appId : "io.github.nwjs." + pkg.name;
        if (this.win.versionStrings.ProductName && !this.win.productName) {
            console.warn('DEPRECATED: build.win.versionStrings.ProductName is deprecated, use build.win.productName instead.');
            this.win.productName = this.win.versionStrings.ProductName;
        }
        if (this.win.versionStrings.CompanyName && !this.win.companyName) {
            console.warn('DEPRECATED: build.win.versionStrings.CompanyName is deprecated, use build.win.companyName instead.');
            this.win.companyName = this.win.versionStrings.CompanyName;
        }
        if (this.win.versionStrings.FileDescription && !this.win.fileDescription) {
            console.warn('DEPRECATED: build.win.versionStrings.FileDescription is deprecated, use build.win.fileDescription instead.');
            this.win.fileDescription = this.win.versionStrings.FileDescription;
        }
        if (this.win.versionStrings.LegalCopyright && !this.win.copyright) {
            console.warn('DEPRECATED: build.win.versionStrings.LegalCopyright is deprecated, use build.win.copyright instead.');
            this.win.copyright = this.win.versionStrings.LegalCopyright;
        }
        this.win.productName = this.win.productName ? this.win.productName : pkg.name;
        this.win.companyName = this.win.companyName ? this.win.companyName : this.win.productName;
        this.win.fileDescription = this.win.fileDescription ? this.win.fileDescription : pkg.description;
        this.win.productVersion = this.win.productVersion ? this.win.productVersion : pkg.version;
        this.win.fileVersion = this.win.fileVersion ? this.win.fileVersion : this.win.productVersion;
        var _loop_1 = function (config) {
            config.signing.cliArgsInterpolated = config.signing.cliArgs.split(' ');
            if (config.signing.cliArgsVarsFile) {
                var cliArgsVarsFile = config.signing.cliArgsVarsFile;
                var cliArgsVarsFileAbsolutePath = path_1.resolve(process.cwd(), cliArgsVarsFile);
                try {
                    var actualArgsVarsFile = fs_extra_1.readFileSync(cliArgsVarsFileAbsolutePath);
                    var envVars_1 = dotenv.parse(actualArgsVarsFile);
                    var interpolatedCliArgs = config.signing.cliArgsInterpolated.map(function (arg) { return index_1.parseTmpl(arg, envVars_1); });
                    debug("using interpolatedCliArgs CLI args: ", interpolatedCliArgs);
                    config.signing.cliArgsInterpolated = interpolatedCliArgs;
                }
                catch (err) {
                    if (err.code === 'ENOENT') {
                        debug("args vars file not found: " + cliArgsVarsFile);
                    }
                    else {
                        throw err;
                    }
                }
            }
        };
        for (var _i = 0, _a = [this.win, this.mac]; _i < _a.length; _i++) {
            var config = _a[_i];
            _loop_1(config);
        }
        this.mac.name = this.mac.name ? this.mac.name : pkg.name;
        this.mac.displayName = this.mac.displayName ? this.mac.displayName : this.mac.name;
        this.mac.version = this.mac.version ? this.mac.version : pkg.version;
        this.mac.description = this.mac.description ? this.mac.description : pkg.description;
    }
    return BuildConfig;
}());
exports.BuildConfig = BuildConfig;
//# sourceMappingURL=BuildConfig.js.map