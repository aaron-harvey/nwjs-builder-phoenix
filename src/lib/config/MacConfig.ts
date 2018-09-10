import {SignableConfig} from './SignableConfig';

export class MacConfig extends SignableConfig {

    public name: string = '';
    public displayName: string = '';
    public version: string = '';
    public description: string = '';
    public copyright: string = '';
    public icon: string = undefined;
    public plistStrings: any = {};

    constructor(options: any = {}) {
        super(options);

        // default filesToSign for Mac
        this.signing.filesToSignGlobs = [
            '**/Contents/Versions/**/libffmpeg.dylib',
            '**/Contents/Versions/**/nwjs Helper.app',
            '**/Contents/Versions/**/nwjs Framework.framework/nwjs Framework',
            '**/Contents/Versions/**/nwjs Framework.framework/Helpers/*',
            '**/Contents/Versions/**/nwjs Framework.framework/Libraries/*',
            '**/Contents/Versions/**/nwjs Framework.framework/Resources/*',
            '**/Contents/Versions/**/nwjs Framework.framework/XPCServices/*',
            '**/Contents/Versions/**/nwjs Framework.framework/Versions/Current/*',
            '**/Contents/Versions/**/nwjs Framework.framework/Versions/A/*',
            '**/Contents/MacOS/nwjs',
        ];

        Object.keys(this).map((key) => {
            if (options[key] !== undefined) {
                switch (key) {
                    default:
                        (<any>this)[key] = options[key];
                        break;
                }
            }
        });
    }

}
