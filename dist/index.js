require('./sourcemap-register.js');module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 3109:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const globby_1 = __importDefault(__webpack_require__(3398));
const core = __importStar(__webpack_require__(2186));
const fs = __importStar(__webpack_require__(5747));
const path_1 = __webpack_require__(5622);
const upload_1 = __webpack_require__(4831);
const utils_1 = __webpack_require__(918);
const accessToken = core.getInput('dropbox_access_token');
const src = core.getInput('src');
const dest = core.getInput('dest');
const multiple = utils_1.asBoolean(core.getInput('multiple'));
const mode = core.getInput('mode');
const autorename = utils_1.asBoolean(core.getInput('autorename'));
const mute = utils_1.asBoolean(core.getInput('mute'));
async function run() {
    try {
        const { upload } = upload_1.makeUpload(accessToken);
        if (!multiple) {
            const contents = await fs.promises.readFile(src);
            if (utils_1.isDirectory(dest)) {
                const path = path_1.join(dest, path_1.basename(src));
                await upload(path, contents, { mode, autorename, mute });
                core.info(`Uploaded: ${src} -> ${path}`);
            }
            else {
                await upload(dest, contents, { mode, autorename, mute });
                core.info(`Uploaded: ${src} -> ${dest}`);
            }
        }
        else {
            const files = await globby_1.default(src);
            await Promise.all(files.map(async (file) => {
                const path = path_1.join(dest, file);
                const contents = await fs.promises.readFile(file);
                await upload(path, contents, { mode, autorename, mute });
                core.info(`Uploaded: ${file} -> ${path}`);
            }));
        }
    }
    catch (error) {
        core.setFailed(error);
    }
}
void run();


/***/ }),

/***/ 4831:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.makeUpload = void 0;
const dropbox_1 = __webpack_require__(8939);
const node_fetch_1 = __importDefault(__webpack_require__(467));
function makeUpload(accessToken) {
    const dropbox = new dropbox_1.Dropbox({ accessToken, fetch: node_fetch_1.default });
    return {
        upload: async (path, contents, options) => {
            await dropbox.filesUpload({
                path,
                contents,
                mode: getMode(options.mode),
                autorename: options.autorename,
                mute: options.mute,
            });
        },
    };
}
exports.makeUpload = makeUpload;
function getMode(mode) {
    switch (mode) {
        case 'overwrite':
            return {
                '.tag': 'overwrite',
            };
        case 'add':
        default:
            return {
                '.tag': 'add',
            };
    }
}


/***/ }),

/***/ 918:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.asBoolean = exports.isDirectory = void 0;
function isDirectory(path) {
    return path.endsWith('/');
}
exports.isDirectory = isDirectory;
function asBoolean(s) {
    return s.toLowerCase() === 'true';
}
exports.asBoolean = asBoolean;


/***/ }),

/***/ 7351:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const os = __importStar(__webpack_require__(2087));
const utils_1 = __webpack_require__(5278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 2186:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const command_1 = __webpack_require__(7351);
const file_command_1 = __webpack_require__(717);
const utils_1 = __webpack_require__(5278);
const os = __importStar(__webpack_require__(2087));
const path = __importStar(__webpack_require__(5622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// For internal use, subject to change.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__webpack_require__(5747));
const os = __importStar(__webpack_require__(2087));
const utils_1 = __webpack_require__(5278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 3803:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs = __webpack_require__(5747);
exports.FILE_SYSTEM_ADAPTER = {
    lstat: fs.lstat,
    stat: fs.stat,
    lstatSync: fs.lstatSync,
    statSync: fs.statSync,
    readdir: fs.readdir,
    readdirSync: fs.readdirSync
};
function createFileSystemAdapter(fsMethods) {
    if (fsMethods === undefined) {
        return exports.FILE_SYSTEM_ADAPTER;
    }
    return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
}
exports.createFileSystemAdapter = createFileSystemAdapter;


/***/ }),

/***/ 8838:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const NODE_PROCESS_VERSION_PARTS = process.versions.node.split('.');
const MAJOR_VERSION = parseInt(NODE_PROCESS_VERSION_PARTS[0], 10);
const MINOR_VERSION = parseInt(NODE_PROCESS_VERSION_PARTS[1], 10);
const SUPPORTED_MAJOR_VERSION = 10;
const SUPPORTED_MINOR_VERSION = 10;
const IS_MATCHED_BY_MAJOR = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION;
const IS_MATCHED_BY_MAJOR_AND_MINOR = MAJOR_VERSION === SUPPORTED_MAJOR_VERSION && MINOR_VERSION >= SUPPORTED_MINOR_VERSION;
/**
 * IS `true` for Node.js 10.10 and greater.
 */
exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR;


/***/ }),

/***/ 5667:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const async = __webpack_require__(4507);
const sync = __webpack_require__(9560);
const settings_1 = __webpack_require__(8662);
exports.Settings = settings_1.default;
function scandir(path, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === 'function') {
        return async.read(path, getSettings(), optionsOrSettingsOrCallback);
    }
    async.read(path, getSettings(optionsOrSettingsOrCallback), callback);
}
exports.scandir = scandir;
function scandirSync(path, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings);
    return sync.read(path, settings);
}
exports.scandirSync = scandirSync;
function getSettings(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions;
    }
    return new settings_1.default(settingsOrOptions);
}


/***/ }),

/***/ 4507:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const fsStat = __webpack_require__(109);
const rpl = __webpack_require__(5288);
const constants_1 = __webpack_require__(8838);
const utils = __webpack_require__(6297);
function read(directory, settings, callback) {
    if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        return readdirWithFileTypes(directory, settings, callback);
    }
    return readdir(directory, settings, callback);
}
exports.read = read;
function readdirWithFileTypes(directory, settings, callback) {
    settings.fs.readdir(directory, { withFileTypes: true }, (readdirError, dirents) => {
        if (readdirError !== null) {
            return callFailureCallback(callback, readdirError);
        }
        const entries = dirents.map((dirent) => ({
            dirent,
            name: dirent.name,
            path: `${directory}${settings.pathSegmentSeparator}${dirent.name}`
        }));
        if (!settings.followSymbolicLinks) {
            return callSuccessCallback(callback, entries);
        }
        const tasks = entries.map((entry) => makeRplTaskEntry(entry, settings));
        rpl(tasks, (rplError, rplEntries) => {
            if (rplError !== null) {
                return callFailureCallback(callback, rplError);
            }
            callSuccessCallback(callback, rplEntries);
        });
    });
}
exports.readdirWithFileTypes = readdirWithFileTypes;
function makeRplTaskEntry(entry, settings) {
    return (done) => {
        if (!entry.dirent.isSymbolicLink()) {
            return done(null, entry);
        }
        settings.fs.stat(entry.path, (statError, stats) => {
            if (statError !== null) {
                if (settings.throwErrorOnBrokenSymbolicLink) {
                    return done(statError);
                }
                return done(null, entry);
            }
            entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
            return done(null, entry);
        });
    };
}
function readdir(directory, settings, callback) {
    settings.fs.readdir(directory, (readdirError, names) => {
        if (readdirError !== null) {
            return callFailureCallback(callback, readdirError);
        }
        const filepaths = names.map((name) => `${directory}${settings.pathSegmentSeparator}${name}`);
        const tasks = filepaths.map((filepath) => {
            return (done) => fsStat.stat(filepath, settings.fsStatSettings, done);
        });
        rpl(tasks, (rplError, results) => {
            if (rplError !== null) {
                return callFailureCallback(callback, rplError);
            }
            const entries = [];
            names.forEach((name, index) => {
                const stats = results[index];
                const entry = {
                    name,
                    path: filepaths[index],
                    dirent: utils.fs.createDirentFromStats(name, stats)
                };
                if (settings.stats) {
                    entry.stats = stats;
                }
                entries.push(entry);
            });
            callSuccessCallback(callback, entries);
        });
    });
}
exports.readdir = readdir;
function callFailureCallback(callback, error) {
    callback(error);
}
function callSuccessCallback(callback, result) {
    callback(null, result);
}


/***/ }),

/***/ 9560:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const fsStat = __webpack_require__(109);
const constants_1 = __webpack_require__(8838);
const utils = __webpack_require__(6297);
function read(directory, settings) {
    if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        return readdirWithFileTypes(directory, settings);
    }
    return readdir(directory, settings);
}
exports.read = read;
function readdirWithFileTypes(directory, settings) {
    const dirents = settings.fs.readdirSync(directory, { withFileTypes: true });
    return dirents.map((dirent) => {
        const entry = {
            dirent,
            name: dirent.name,
            path: `${directory}${settings.pathSegmentSeparator}${dirent.name}`
        };
        if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks) {
            try {
                const stats = settings.fs.statSync(entry.path);
                entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
            }
            catch (error) {
                if (settings.throwErrorOnBrokenSymbolicLink) {
                    throw error;
                }
            }
        }
        return entry;
    });
}
exports.readdirWithFileTypes = readdirWithFileTypes;
function readdir(directory, settings) {
    const names = settings.fs.readdirSync(directory);
    return names.map((name) => {
        const entryPath = `${directory}${settings.pathSegmentSeparator}${name}`;
        const stats = fsStat.statSync(entryPath, settings.fsStatSettings);
        const entry = {
            name,
            path: entryPath,
            dirent: utils.fs.createDirentFromStats(name, stats)
        };
        if (settings.stats) {
            entry.stats = stats;
        }
        return entry;
    });
}
exports.readdir = readdir;


/***/ }),

/***/ 8662:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const path = __webpack_require__(5622);
const fsStat = __webpack_require__(109);
const fs = __webpack_require__(3803);
class Settings {
    constructor(_options = {}) {
        this._options = _options;
        this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, false);
        this.fs = fs.createFileSystemAdapter(this._options.fs);
        this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path.sep);
        this.stats = this._getValue(this._options.stats, false);
        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
        this.fsStatSettings = new fsStat.Settings({
            followSymbolicLink: this.followSymbolicLinks,
            fs: this.fs,
            throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink
        });
    }
    _getValue(option, value) {
        return option === undefined ? value : option;
    }
}
exports.default = Settings;


/***/ }),

/***/ 883:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class DirentFromStats {
    constructor(name, stats) {
        this.name = name;
        this.isBlockDevice = stats.isBlockDevice.bind(stats);
        this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
        this.isDirectory = stats.isDirectory.bind(stats);
        this.isFIFO = stats.isFIFO.bind(stats);
        this.isFile = stats.isFile.bind(stats);
        this.isSocket = stats.isSocket.bind(stats);
        this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
    }
}
function createDirentFromStats(name, stats) {
    return new DirentFromStats(name, stats);
}
exports.createDirentFromStats = createDirentFromStats;


/***/ }),

/***/ 6297:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs = __webpack_require__(883);
exports.fs = fs;


/***/ }),

/***/ 2987:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs = __webpack_require__(5747);
exports.FILE_SYSTEM_ADAPTER = {
    lstat: fs.lstat,
    stat: fs.stat,
    lstatSync: fs.lstatSync,
    statSync: fs.statSync
};
function createFileSystemAdapter(fsMethods) {
    if (fsMethods === undefined) {
        return exports.FILE_SYSTEM_ADAPTER;
    }
    return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
}
exports.createFileSystemAdapter = createFileSystemAdapter;


/***/ }),

/***/ 109:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const async = __webpack_require__(4147);
const sync = __webpack_require__(4527);
const settings_1 = __webpack_require__(2410);
exports.Settings = settings_1.default;
function stat(path, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === 'function') {
        return async.read(path, getSettings(), optionsOrSettingsOrCallback);
    }
    async.read(path, getSettings(optionsOrSettingsOrCallback), callback);
}
exports.stat = stat;
function statSync(path, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings);
    return sync.read(path, settings);
}
exports.statSync = statSync;
function getSettings(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions;
    }
    return new settings_1.default(settingsOrOptions);
}


/***/ }),

/***/ 4147:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function read(path, settings, callback) {
    settings.fs.lstat(path, (lstatError, lstat) => {
        if (lstatError !== null) {
            return callFailureCallback(callback, lstatError);
        }
        if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
            return callSuccessCallback(callback, lstat);
        }
        settings.fs.stat(path, (statError, stat) => {
            if (statError !== null) {
                if (settings.throwErrorOnBrokenSymbolicLink) {
                    return callFailureCallback(callback, statError);
                }
                return callSuccessCallback(callback, lstat);
            }
            if (settings.markSymbolicLink) {
                stat.isSymbolicLink = () => true;
            }
            callSuccessCallback(callback, stat);
        });
    });
}
exports.read = read;
function callFailureCallback(callback, error) {
    callback(error);
}
function callSuccessCallback(callback, result) {
    callback(null, result);
}


/***/ }),

/***/ 4527:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function read(path, settings) {
    const lstat = settings.fs.lstatSync(path);
    if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
        return lstat;
    }
    try {
        const stat = settings.fs.statSync(path);
        if (settings.markSymbolicLink) {
            stat.isSymbolicLink = () => true;
        }
        return stat;
    }
    catch (error) {
        if (!settings.throwErrorOnBrokenSymbolicLink) {
            return lstat;
        }
        throw error;
    }
}
exports.read = read;


/***/ }),

/***/ 2410:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs = __webpack_require__(2987);
class Settings {
    constructor(_options = {}) {
        this._options = _options;
        this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, true);
        this.fs = fs.createFileSystemAdapter(this._options.fs);
        this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, false);
        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
    }
    _getValue(option, value) {
        return option === undefined ? value : option;
    }
}
exports.default = Settings;


/***/ }),

/***/ 6026:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const async_1 = __webpack_require__(7523);
const stream_1 = __webpack_require__(6737);
const sync_1 = __webpack_require__(3068);
const settings_1 = __webpack_require__(141);
exports.Settings = settings_1.default;
function walk(directory, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === 'function') {
        return new async_1.default(directory, getSettings()).read(optionsOrSettingsOrCallback);
    }
    new async_1.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback);
}
exports.walk = walk;
function walkSync(directory, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings);
    const provider = new sync_1.default(directory, settings);
    return provider.read();
}
exports.walkSync = walkSync;
function walkStream(directory, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings);
    const provider = new stream_1.default(directory, settings);
    return provider.read();
}
exports.walkStream = walkStream;
function getSettings(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions;
    }
    return new settings_1.default(settingsOrOptions);
}


/***/ }),

/***/ 7523:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const async_1 = __webpack_require__(5732);
class AsyncProvider {
    constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._reader = new async_1.default(this._root, this._settings);
        this._storage = new Set();
    }
    read(callback) {
        this._reader.onError((error) => {
            callFailureCallback(callback, error);
        });
        this._reader.onEntry((entry) => {
            this._storage.add(entry);
        });
        this._reader.onEnd(() => {
            callSuccessCallback(callback, [...this._storage]);
        });
        this._reader.read();
    }
}
exports.default = AsyncProvider;
function callFailureCallback(callback, error) {
    callback(error);
}
function callSuccessCallback(callback, entries) {
    callback(null, entries);
}


/***/ }),

/***/ 6737:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const stream_1 = __webpack_require__(2413);
const async_1 = __webpack_require__(5732);
class StreamProvider {
    constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._reader = new async_1.default(this._root, this._settings);
        this._stream = new stream_1.Readable({
            objectMode: true,
            read: () => { },
            destroy: this._reader.destroy.bind(this._reader)
        });
    }
    read() {
        this._reader.onError((error) => {
            this._stream.emit('error', error);
        });
        this._reader.onEntry((entry) => {
            this._stream.push(entry);
        });
        this._reader.onEnd(() => {
            this._stream.push(null);
        });
        this._reader.read();
        return this._stream;
    }
}
exports.default = StreamProvider;


/***/ }),

/***/ 3068:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const sync_1 = __webpack_require__(3595);
class SyncProvider {
    constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._reader = new sync_1.default(this._root, this._settings);
    }
    read() {
        return this._reader.read();
    }
}
exports.default = SyncProvider;


/***/ }),

/***/ 5732:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const events_1 = __webpack_require__(8614);
const fsScandir = __webpack_require__(5667);
const fastq = __webpack_require__(7340);
const common = __webpack_require__(7988);
const reader_1 = __webpack_require__(8311);
class AsyncReader extends reader_1.default {
    constructor(_root, _settings) {
        super(_root, _settings);
        this._settings = _settings;
        this._scandir = fsScandir.scandir;
        this._emitter = new events_1.EventEmitter();
        this._queue = fastq(this._worker.bind(this), this._settings.concurrency);
        this._isFatalError = false;
        this._isDestroyed = false;
        this._queue.drain = () => {
            if (!this._isFatalError) {
                this._emitter.emit('end');
            }
        };
    }
    read() {
        this._isFatalError = false;
        this._isDestroyed = false;
        setImmediate(() => {
            this._pushToQueue(this._root, this._settings.basePath);
        });
        return this._emitter;
    }
    destroy() {
        if (this._isDestroyed) {
            throw new Error('The reader is already destroyed');
        }
        this._isDestroyed = true;
        this._queue.killAndDrain();
    }
    onEntry(callback) {
        this._emitter.on('entry', callback);
    }
    onError(callback) {
        this._emitter.once('error', callback);
    }
    onEnd(callback) {
        this._emitter.once('end', callback);
    }
    _pushToQueue(directory, base) {
        const queueItem = { directory, base };
        this._queue.push(queueItem, (error) => {
            if (error !== null) {
                this._handleError(error);
            }
        });
    }
    _worker(item, done) {
        this._scandir(item.directory, this._settings.fsScandirSettings, (error, entries) => {
            if (error !== null) {
                return done(error, undefined);
            }
            for (const entry of entries) {
                this._handleEntry(entry, item.base);
            }
            done(null, undefined);
        });
    }
    _handleError(error) {
        if (!common.isFatalError(this._settings, error)) {
            return;
        }
        this._isFatalError = true;
        this._isDestroyed = true;
        this._emitter.emit('error', error);
    }
    _handleEntry(entry, base) {
        if (this._isDestroyed || this._isFatalError) {
            return;
        }
        const fullpath = entry.path;
        if (base !== undefined) {
            entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
        }
        if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
            this._emitEntry(entry);
        }
        if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
            this._pushToQueue(fullpath, entry.path);
        }
    }
    _emitEntry(entry) {
        this._emitter.emit('entry', entry);
    }
}
exports.default = AsyncReader;


/***/ }),

/***/ 7988:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function isFatalError(settings, error) {
    if (settings.errorFilter === null) {
        return true;
    }
    return !settings.errorFilter(error);
}
exports.isFatalError = isFatalError;
function isAppliedFilter(filter, value) {
    return filter === null || filter(value);
}
exports.isAppliedFilter = isAppliedFilter;
function replacePathSegmentSeparator(filepath, separator) {
    return filepath.split(/[\\/]/).join(separator);
}
exports.replacePathSegmentSeparator = replacePathSegmentSeparator;
function joinPathSegments(a, b, separator) {
    if (a === '') {
        return b;
    }
    return a + separator + b;
}
exports.joinPathSegments = joinPathSegments;


/***/ }),

/***/ 8311:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common = __webpack_require__(7988);
class Reader {
    constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._root = common.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator);
    }
}
exports.default = Reader;


/***/ }),

/***/ 3595:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const fsScandir = __webpack_require__(5667);
const common = __webpack_require__(7988);
const reader_1 = __webpack_require__(8311);
class SyncReader extends reader_1.default {
    constructor() {
        super(...arguments);
        this._scandir = fsScandir.scandirSync;
        this._storage = new Set();
        this._queue = new Set();
    }
    read() {
        this._pushToQueue(this._root, this._settings.basePath);
        this._handleQueue();
        return [...this._storage];
    }
    _pushToQueue(directory, base) {
        this._queue.add({ directory, base });
    }
    _handleQueue() {
        for (const item of this._queue.values()) {
            this._handleDirectory(item.directory, item.base);
        }
    }
    _handleDirectory(directory, base) {
        try {
            const entries = this._scandir(directory, this._settings.fsScandirSettings);
            for (const entry of entries) {
                this._handleEntry(entry, base);
            }
        }
        catch (error) {
            this._handleError(error);
        }
    }
    _handleError(error) {
        if (!common.isFatalError(this._settings, error)) {
            return;
        }
        throw error;
    }
    _handleEntry(entry, base) {
        const fullpath = entry.path;
        if (base !== undefined) {
            entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
        }
        if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
            this._pushToStorage(entry);
        }
        if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
            this._pushToQueue(fullpath, entry.path);
        }
    }
    _pushToStorage(entry) {
        this._storage.add(entry);
    }
}
exports.default = SyncReader;


/***/ }),

/***/ 141:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const path = __webpack_require__(5622);
const fsScandir = __webpack_require__(5667);
class Settings {
    constructor(_options = {}) {
        this._options = _options;
        this.basePath = this._getValue(this._options.basePath, undefined);
        this.concurrency = this._getValue(this._options.concurrency, Infinity);
        this.deepFilter = this._getValue(this._options.deepFilter, null);
        this.entryFilter = this._getValue(this._options.entryFilter, null);
        this.errorFilter = this._getValue(this._options.errorFilter, null);
        this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path.sep);
        this.fsScandirSettings = new fsScandir.Settings({
            followSymbolicLinks: this._options.followSymbolicLinks,
            fs: this._options.fs,
            pathSegmentSeparator: this._options.pathSegmentSeparator,
            stats: this._options.stats,
            throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink
        });
    }
    _getValue(option, value) {
        return option === undefined ? value : option;
    }
}
exports.default = Settings;


/***/ }),

/***/ 9600:
/***/ ((module) => {

"use strict";


module.exports = (...arguments_) => {
	return [...new Set([].concat(...arguments_))];
};


/***/ }),

/***/ 610:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const stringify = __webpack_require__(8750);
const compile = __webpack_require__(9434);
const expand = __webpack_require__(5873);
const parse = __webpack_require__(6477);

/**
 * Expand the given pattern or create a regex-compatible string.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces('{a,b,c}', { compile: true })); //=> ['(a|b|c)']
 * console.log(braces('{a,b,c}')); //=> ['a', 'b', 'c']
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {String}
 * @api public
 */

const braces = (input, options = {}) => {
  let output = [];

  if (Array.isArray(input)) {
    for (let pattern of input) {
      let result = braces.create(pattern, options);
      if (Array.isArray(result)) {
        output.push(...result);
      } else {
        output.push(result);
      }
    }
  } else {
    output = [].concat(braces.create(input, options));
  }

  if (options && options.expand === true && options.nodupes === true) {
    output = [...new Set(output)];
  }
  return output;
};

/**
 * Parse the given `str` with the given `options`.
 *
 * ```js
 * // braces.parse(pattern, [, options]);
 * const ast = braces.parse('a/{b,c}/d');
 * console.log(ast);
 * ```
 * @param {String} pattern Brace pattern to parse
 * @param {Object} options
 * @return {Object} Returns an AST
 * @api public
 */

braces.parse = (input, options = {}) => parse(input, options);

/**
 * Creates a braces string from an AST, or an AST node.
 *
 * ```js
 * const braces = require('braces');
 * let ast = braces.parse('foo/{a,b}/bar');
 * console.log(stringify(ast.nodes[2])); //=> '{a,b}'
 * ```
 * @param {String} `input` Brace pattern or AST.
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.stringify = (input, options = {}) => {
  if (typeof input === 'string') {
    return stringify(braces.parse(input, options), options);
  }
  return stringify(input, options);
};

/**
 * Compiles a brace pattern into a regex-compatible, optimized string.
 * This method is called by the main [braces](#braces) function by default.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.compile('a/{b,c}/d'));
 * //=> ['a/(b|c)/d']
 * ```
 * @param {String} `input` Brace pattern or AST.
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.compile = (input, options = {}) => {
  if (typeof input === 'string') {
    input = braces.parse(input, options);
  }
  return compile(input, options);
};

/**
 * Expands a brace pattern into an array. This method is called by the
 * main [braces](#braces) function when `options.expand` is true. Before
 * using this method it's recommended that you read the [performance notes](#performance))
 * and advantages of using [.compile](#compile) instead.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.expand('a/{b,c}/d'));
 * //=> ['a/b/d', 'a/c/d'];
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.expand = (input, options = {}) => {
  if (typeof input === 'string') {
    input = braces.parse(input, options);
  }

  let result = expand(input, options);

  // filter out empty strings if specified
  if (options.noempty === true) {
    result = result.filter(Boolean);
  }

  // filter out duplicates if specified
  if (options.nodupes === true) {
    result = [...new Set(result)];
  }

  return result;
};

/**
 * Processes a brace pattern and returns either an expanded array
 * (if `options.expand` is true), a highly optimized regex-compatible string.
 * This method is called by the main [braces](#braces) function.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.create('user-{200..300}/project-{a,b,c}-{1..10}'))
 * //=> 'user-(20[0-9]|2[1-9][0-9]|300)/project-(a|b|c)-([1-9]|10)'
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.create = (input, options = {}) => {
  if (input === '' || input.length < 3) {
    return [input];
  }

 return options.expand !== true
    ? braces.compile(input, options)
    : braces.expand(input, options);
};

/**
 * Expose "braces"
 */

module.exports = braces;


/***/ }),

/***/ 9434:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fill = __webpack_require__(6330);
const utils = __webpack_require__(5207);

const compile = (ast, options = {}) => {
  let walk = (node, parent = {}) => {
    let invalidBlock = utils.isInvalidBrace(parent);
    let invalidNode = node.invalid === true && options.escapeInvalid === true;
    let invalid = invalidBlock === true || invalidNode === true;
    let prefix = options.escapeInvalid === true ? '\\' : '';
    let output = '';

    if (node.isOpen === true) {
      return prefix + node.value;
    }
    if (node.isClose === true) {
      return prefix + node.value;
    }

    if (node.type === 'open') {
      return invalid ? (prefix + node.value) : '(';
    }

    if (node.type === 'close') {
      return invalid ? (prefix + node.value) : ')';
    }

    if (node.type === 'comma') {
      return node.prev.type === 'comma' ? '' : (invalid ? node.value : '|');
    }

    if (node.value) {
      return node.value;
    }

    if (node.nodes && node.ranges > 0) {
      let args = utils.reduce(node.nodes);
      let range = fill(...args, { ...options, wrap: false, toRegex: true });

      if (range.length !== 0) {
        return args.length > 1 && range.length > 1 ? `(${range})` : range;
      }
    }

    if (node.nodes) {
      for (let child of node.nodes) {
        output += walk(child, node);
      }
    }
    return output;
  };

  return walk(ast);
};

module.exports = compile;


/***/ }),

/***/ 8774:
/***/ ((module) => {

"use strict";


module.exports = {
  MAX_LENGTH: 1024 * 64,

  // Digits
  CHAR_0: '0', /* 0 */
  CHAR_9: '9', /* 9 */

  // Alphabet chars.
  CHAR_UPPERCASE_A: 'A', /* A */
  CHAR_LOWERCASE_A: 'a', /* a */
  CHAR_UPPERCASE_Z: 'Z', /* Z */
  CHAR_LOWERCASE_Z: 'z', /* z */

  CHAR_LEFT_PARENTHESES: '(', /* ( */
  CHAR_RIGHT_PARENTHESES: ')', /* ) */

  CHAR_ASTERISK: '*', /* * */

  // Non-alphabetic chars.
  CHAR_AMPERSAND: '&', /* & */
  CHAR_AT: '@', /* @ */
  CHAR_BACKSLASH: '\\', /* \ */
  CHAR_BACKTICK: '`', /* ` */
  CHAR_CARRIAGE_RETURN: '\r', /* \r */
  CHAR_CIRCUMFLEX_ACCENT: '^', /* ^ */
  CHAR_COLON: ':', /* : */
  CHAR_COMMA: ',', /* , */
  CHAR_DOLLAR: '$', /* . */
  CHAR_DOT: '.', /* . */
  CHAR_DOUBLE_QUOTE: '"', /* " */
  CHAR_EQUAL: '=', /* = */
  CHAR_EXCLAMATION_MARK: '!', /* ! */
  CHAR_FORM_FEED: '\f', /* \f */
  CHAR_FORWARD_SLASH: '/', /* / */
  CHAR_HASH: '#', /* # */
  CHAR_HYPHEN_MINUS: '-', /* - */
  CHAR_LEFT_ANGLE_BRACKET: '<', /* < */
  CHAR_LEFT_CURLY_BRACE: '{', /* { */
  CHAR_LEFT_SQUARE_BRACKET: '[', /* [ */
  CHAR_LINE_FEED: '\n', /* \n */
  CHAR_NO_BREAK_SPACE: '\u00A0', /* \u00A0 */
  CHAR_PERCENT: '%', /* % */
  CHAR_PLUS: '+', /* + */
  CHAR_QUESTION_MARK: '?', /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: '>', /* > */
  CHAR_RIGHT_CURLY_BRACE: '}', /* } */
  CHAR_RIGHT_SQUARE_BRACKET: ']', /* ] */
  CHAR_SEMICOLON: ';', /* ; */
  CHAR_SINGLE_QUOTE: '\'', /* ' */
  CHAR_SPACE: ' ', /*   */
  CHAR_TAB: '\t', /* \t */
  CHAR_UNDERSCORE: '_', /* _ */
  CHAR_VERTICAL_LINE: '|', /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: '\uFEFF' /* \uFEFF */
};


/***/ }),

/***/ 5873:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fill = __webpack_require__(6330);
const stringify = __webpack_require__(8750);
const utils = __webpack_require__(5207);

const append = (queue = '', stash = '', enclose = false) => {
  let result = [];

  queue = [].concat(queue);
  stash = [].concat(stash);

  if (!stash.length) return queue;
  if (!queue.length) {
    return enclose ? utils.flatten(stash).map(ele => `{${ele}}`) : stash;
  }

  for (let item of queue) {
    if (Array.isArray(item)) {
      for (let value of item) {
        result.push(append(value, stash, enclose));
      }
    } else {
      for (let ele of stash) {
        if (enclose === true && typeof ele === 'string') ele = `{${ele}}`;
        result.push(Array.isArray(ele) ? append(item, ele, enclose) : (item + ele));
      }
    }
  }
  return utils.flatten(result);
};

const expand = (ast, options = {}) => {
  let rangeLimit = options.rangeLimit === void 0 ? 1000 : options.rangeLimit;

  let walk = (node, parent = {}) => {
    node.queue = [];

    let p = parent;
    let q = parent.queue;

    while (p.type !== 'brace' && p.type !== 'root' && p.parent) {
      p = p.parent;
      q = p.queue;
    }

    if (node.invalid || node.dollar) {
      q.push(append(q.pop(), stringify(node, options)));
      return;
    }

    if (node.type === 'brace' && node.invalid !== true && node.nodes.length === 2) {
      q.push(append(q.pop(), ['{}']));
      return;
    }

    if (node.nodes && node.ranges > 0) {
      let args = utils.reduce(node.nodes);

      if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
        throw new RangeError('expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.');
      }

      let range = fill(...args, options);
      if (range.length === 0) {
        range = stringify(node, options);
      }

      q.push(append(q.pop(), range));
      node.nodes = [];
      return;
    }

    let enclose = utils.encloseBrace(node);
    let queue = node.queue;
    let block = node;

    while (block.type !== 'brace' && block.type !== 'root' && block.parent) {
      block = block.parent;
      queue = block.queue;
    }

    for (let i = 0; i < node.nodes.length; i++) {
      let child = node.nodes[i];

      if (child.type === 'comma' && node.type === 'brace') {
        if (i === 1) queue.push('');
        queue.push('');
        continue;
      }

      if (child.type === 'close') {
        q.push(append(q.pop(), queue, enclose));
        continue;
      }

      if (child.value && child.type !== 'open') {
        queue.push(append(queue.pop(), child.value));
        continue;
      }

      if (child.nodes) {
        walk(child, node);
      }
    }

    return queue;
  };

  return utils.flatten(walk(ast));
};

module.exports = expand;


/***/ }),

/***/ 6477:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const stringify = __webpack_require__(8750);

/**
 * Constants
 */

const {
  MAX_LENGTH,
  CHAR_BACKSLASH, /* \ */
  CHAR_BACKTICK, /* ` */
  CHAR_COMMA, /* , */
  CHAR_DOT, /* . */
  CHAR_LEFT_PARENTHESES, /* ( */
  CHAR_RIGHT_PARENTHESES, /* ) */
  CHAR_LEFT_CURLY_BRACE, /* { */
  CHAR_RIGHT_CURLY_BRACE, /* } */
  CHAR_LEFT_SQUARE_BRACKET, /* [ */
  CHAR_RIGHT_SQUARE_BRACKET, /* ] */
  CHAR_DOUBLE_QUOTE, /* " */
  CHAR_SINGLE_QUOTE, /* ' */
  CHAR_NO_BREAK_SPACE,
  CHAR_ZERO_WIDTH_NOBREAK_SPACE
} = __webpack_require__(8774);

/**
 * parse
 */

const parse = (input, options = {}) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  let opts = options || {};
  let max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  if (input.length > max) {
    throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
  }

  let ast = { type: 'root', input, nodes: [] };
  let stack = [ast];
  let block = ast;
  let prev = ast;
  let brackets = 0;
  let length = input.length;
  let index = 0;
  let depth = 0;
  let value;
  let memo = {};

  /**
   * Helpers
   */

  const advance = () => input[index++];
  const push = node => {
    if (node.type === 'text' && prev.type === 'dot') {
      prev.type = 'text';
    }

    if (prev && prev.type === 'text' && node.type === 'text') {
      prev.value += node.value;
      return;
    }

    block.nodes.push(node);
    node.parent = block;
    node.prev = prev;
    prev = node;
    return node;
  };

  push({ type: 'bos' });

  while (index < length) {
    block = stack[stack.length - 1];
    value = advance();

    /**
     * Invalid chars
     */

    if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
      continue;
    }

    /**
     * Escaped chars
     */

    if (value === CHAR_BACKSLASH) {
      push({ type: 'text', value: (options.keepEscaping ? value : '') + advance() });
      continue;
    }

    /**
     * Right square bracket (literal): ']'
     */

    if (value === CHAR_RIGHT_SQUARE_BRACKET) {
      push({ type: 'text', value: '\\' + value });
      continue;
    }

    /**
     * Left square bracket: '['
     */

    if (value === CHAR_LEFT_SQUARE_BRACKET) {
      brackets++;

      let closed = true;
      let next;

      while (index < length && (next = advance())) {
        value += next;

        if (next === CHAR_LEFT_SQUARE_BRACKET) {
          brackets++;
          continue;
        }

        if (next === CHAR_BACKSLASH) {
          value += advance();
          continue;
        }

        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
          brackets--;

          if (brackets === 0) {
            break;
          }
        }
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Parentheses
     */

    if (value === CHAR_LEFT_PARENTHESES) {
      block = push({ type: 'paren', nodes: [] });
      stack.push(block);
      push({ type: 'text', value });
      continue;
    }

    if (value === CHAR_RIGHT_PARENTHESES) {
      if (block.type !== 'paren') {
        push({ type: 'text', value });
        continue;
      }
      block = stack.pop();
      push({ type: 'text', value });
      block = stack[stack.length - 1];
      continue;
    }

    /**
     * Quotes: '|"|`
     */

    if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
      let open = value;
      let next;

      if (options.keepQuotes !== true) {
        value = '';
      }

      while (index < length && (next = advance())) {
        if (next === CHAR_BACKSLASH) {
          value += next + advance();
          continue;
        }

        if (next === open) {
          if (options.keepQuotes === true) value += next;
          break;
        }

        value += next;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Left curly brace: '{'
     */

    if (value === CHAR_LEFT_CURLY_BRACE) {
      depth++;

      let dollar = prev.value && prev.value.slice(-1) === '$' || block.dollar === true;
      let brace = {
        type: 'brace',
        open: true,
        close: false,
        dollar,
        depth,
        commas: 0,
        ranges: 0,
        nodes: []
      };

      block = push(brace);
      stack.push(block);
      push({ type: 'open', value });
      continue;
    }

    /**
     * Right curly brace: '}'
     */

    if (value === CHAR_RIGHT_CURLY_BRACE) {
      if (block.type !== 'brace') {
        push({ type: 'text', value });
        continue;
      }

      let type = 'close';
      block = stack.pop();
      block.close = true;

      push({ type, value });
      depth--;

      block = stack[stack.length - 1];
      continue;
    }

    /**
     * Comma: ','
     */

    if (value === CHAR_COMMA && depth > 0) {
      if (block.ranges > 0) {
        block.ranges = 0;
        let open = block.nodes.shift();
        block.nodes = [open, { type: 'text', value: stringify(block) }];
      }

      push({ type: 'comma', value });
      block.commas++;
      continue;
    }

    /**
     * Dot: '.'
     */

    if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
      let siblings = block.nodes;

      if (depth === 0 || siblings.length === 0) {
        push({ type: 'text', value });
        continue;
      }

      if (prev.type === 'dot') {
        block.range = [];
        prev.value += value;
        prev.type = 'range';

        if (block.nodes.length !== 3 && block.nodes.length !== 5) {
          block.invalid = true;
          block.ranges = 0;
          prev.type = 'text';
          continue;
        }

        block.ranges++;
        block.args = [];
        continue;
      }

      if (prev.type === 'range') {
        siblings.pop();

        let before = siblings[siblings.length - 1];
        before.value += prev.value + value;
        prev = before;
        block.ranges--;
        continue;
      }

      push({ type: 'dot', value });
      continue;
    }

    /**
     * Text
     */

    push({ type: 'text', value });
  }

  // Mark imbalanced braces and brackets as invalid
  do {
    block = stack.pop();

    if (block.type !== 'root') {
      block.nodes.forEach(node => {
        if (!node.nodes) {
          if (node.type === 'open') node.isOpen = true;
          if (node.type === 'close') node.isClose = true;
          if (!node.nodes) node.type = 'text';
          node.invalid = true;
        }
      });

      // get the location of the block on parent.nodes (block's siblings)
      let parent = stack[stack.length - 1];
      let index = parent.nodes.indexOf(block);
      // replace the (invalid) block with it's nodes
      parent.nodes.splice(index, 1, ...block.nodes);
    }
  } while (stack.length > 0);

  push({ type: 'eos' });
  return ast;
};

module.exports = parse;


/***/ }),

/***/ 8750:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const utils = __webpack_require__(5207);

module.exports = (ast, options = {}) => {
  let stringify = (node, parent = {}) => {
    let invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
    let invalidNode = node.invalid === true && options.escapeInvalid === true;
    let output = '';

    if (node.value) {
      if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
        return '\\' + node.value;
      }
      return node.value;
    }

    if (node.value) {
      return node.value;
    }

    if (node.nodes) {
      for (let child of node.nodes) {
        output += stringify(child);
      }
    }
    return output;
  };

  return stringify(ast);
};



/***/ }),

/***/ 5207:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.isInteger = num => {
  if (typeof num === 'number') {
    return Number.isInteger(num);
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isInteger(Number(num));
  }
  return false;
};

/**
 * Find a node of the given type
 */

exports.find = (node, type) => node.nodes.find(node => node.type === type);

/**
 * Find a node of the given type
 */

exports.exceedsLimit = (min, max, step = 1, limit) => {
  if (limit === false) return false;
  if (!exports.isInteger(min) || !exports.isInteger(max)) return false;
  return ((Number(max) - Number(min)) / Number(step)) >= limit;
};

/**
 * Escape the given node with '\\' before node.value
 */

exports.escapeNode = (block, n = 0, type) => {
  let node = block.nodes[n];
  if (!node) return;

  if ((type && node.type === type) || node.type === 'open' || node.type === 'close') {
    if (node.escaped !== true) {
      node.value = '\\' + node.value;
      node.escaped = true;
    }
  }
};

/**
 * Returns true if the given brace node should be enclosed in literal braces
 */

exports.encloseBrace = node => {
  if (node.type !== 'brace') return false;
  if ((node.commas >> 0 + node.ranges >> 0) === 0) {
    node.invalid = true;
    return true;
  }
  return false;
};

/**
 * Returns true if a brace node is invalid.
 */

exports.isInvalidBrace = block => {
  if (block.type !== 'brace') return false;
  if (block.invalid === true || block.dollar) return true;
  if ((block.commas >> 0 + block.ranges >> 0) === 0) {
    block.invalid = true;
    return true;
  }
  if (block.open !== true || block.close !== true) {
    block.invalid = true;
    return true;
  }
  return false;
};

/**
 * Returns true if a node is an open or close node
 */

exports.isOpenOrClose = node => {
  if (node.type === 'open' || node.type === 'close') {
    return true;
  }
  return node.open === true || node.close === true;
};

/**
 * Reduce an array of text nodes.
 */

exports.reduce = nodes => nodes.reduce((acc, node) => {
  if (node.type === 'text') acc.push(node.value);
  if (node.type === 'range') node.type = 'text';
  return acc;
}, []);

/**
 * Flatten an array
 */

exports.flatten = (...args) => {
  const result = [];
  const flat = arr => {
    for (let i = 0; i < arr.length; i++) {
      let ele = arr[i];
      Array.isArray(ele) ? flat(ele, result) : ele !== void 0 && result.push(ele);
    }
    return result;
  };
  flat(args);
  return result;
};


/***/ }),

/***/ 2738:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const path = __webpack_require__(5622);
const pathType = __webpack_require__(3433);

const getExtensions = extensions => extensions.length > 1 ? `{${extensions.join(',')}}` : extensions[0];

const getPath = (filepath, cwd) => {
	const pth = filepath[0] === '!' ? filepath.slice(1) : filepath;
	return path.isAbsolute(pth) ? pth : path.join(cwd, pth);
};

const addExtensions = (file, extensions) => {
	if (path.extname(file)) {
		return `**/${file}`;
	}

	return `**/${file}.${getExtensions(extensions)}`;
};

const getGlob = (directory, options) => {
	if (options.files && !Array.isArray(options.files)) {
		throw new TypeError(`Expected \`files\` to be of type \`Array\` but received type \`${typeof options.files}\``);
	}

	if (options.extensions && !Array.isArray(options.extensions)) {
		throw new TypeError(`Expected \`extensions\` to be of type \`Array\` but received type \`${typeof options.extensions}\``);
	}

	if (options.files && options.extensions) {
		return options.files.map(x => path.posix.join(directory, addExtensions(x, options.extensions)));
	}

	if (options.files) {
		return options.files.map(x => path.posix.join(directory, `**/${x}`));
	}

	if (options.extensions) {
		return [path.posix.join(directory, `**/*.${getExtensions(options.extensions)}`)];
	}

	return [path.posix.join(directory, '**')];
};

module.exports = async (input, options) => {
	options = {
		cwd: process.cwd(),
		...options
	};

	if (typeof options.cwd !== 'string') {
		throw new TypeError(`Expected \`cwd\` to be of type \`string\` but received type \`${typeof options.cwd}\``);
	}

	const globs = await Promise.all([].concat(input).map(async x => {
		const isDirectory = await pathType.isDirectory(getPath(x, options.cwd));
		return isDirectory ? getGlob(x, options) : x;
	}));

	return [].concat.apply([], globs); // eslint-disable-line prefer-spread
};

module.exports.sync = (input, options) => {
	options = {
		cwd: process.cwd(),
		...options
	};

	if (typeof options.cwd !== 'string') {
		throw new TypeError(`Expected \`cwd\` to be of type \`string\` but received type \`${typeof options.cwd}\``);
	}

	const globs = [].concat(input).map(x => pathType.isDirectorySync(getPath(x, options.cwd)) ? getGlob(x, options) : x);

	return [].concat.apply([], globs); // eslint-disable-line prefer-spread
};


/***/ }),

/***/ 8939:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _dropbox = __webpack_require__(6258);

Object.defineProperty(exports, "Dropbox", ({
  enumerable: true,
  get: function get() {
    return _dropbox["default"];
  }
}));

var _auth = __webpack_require__(2361);

Object.defineProperty(exports, "DropboxAuth", ({
  enumerable: true,
  get: function get() {
    return _auth["default"];
  }
}));

/***/ }),

/***/ 9526:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// Auto-generated by Stone, do not modify.
var routes = {};
/**
 * Sets a user's profile photo.
 * @function Dropbox#accountSetProfilePhoto
 * @arg {AccountSetProfilePhotoArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<AccountSetProfilePhotoResult>, Error.<AccountSetProfilePhotoError>>}
 */

routes.accountSetProfilePhoto = function (arg) {
  return this.request('account/set_profile_photo', arg, 'user', 'api', 'rpc');
};
/**
 * Creates an OAuth 2.0 access token from the supplied OAuth 1.0 access token.
 * @function Dropbox#authTokenFromOauth1
 * @arg {AuthTokenFromOAuth1Arg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<AuthTokenFromOAuth1Result>, Error.<AuthTokenFromOAuth1Error>>}
 */


routes.authTokenFromOauth1 = function (arg) {
  return this.request('auth/token/from_oauth1', arg, 'app', 'api', 'rpc');
};
/**
 * Disables the access token used to authenticate the call.
 * @function Dropbox#authTokenRevoke
 * @returns {Promise.<DropboxResponse<void>, Error.<void>>}
 */


routes.authTokenRevoke = function () {
  return this.request('auth/token/revoke', null, 'user', 'api', 'rpc');
};
/**
 * This endpoint performs App Authentication, validating the supplied app key
 * and secret, and returns the supplied string, to allow you to test your code
 * and connection to the Dropbox API. It has no other effect. If you receive an
 * HTTP 200 response with the supplied query, it indicates at least part of the
 * Dropbox API infrastructure is working and that the app key and secret valid.
 * @function Dropbox#checkApp
 * @arg {CheckEchoArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<CheckEchoResult>, Error.<void>>}
 */


routes.checkApp = function (arg) {
  return this.request('check/app', arg, 'app', 'api', 'rpc');
};
/**
 * This endpoint performs User Authentication, validating the supplied access
 * token, and returns the supplied string, to allow you to test your code and
 * connection to the Dropbox API. It has no other effect. If you receive an HTTP
 * 200 response with the supplied query, it indicates at least part of the
 * Dropbox API infrastructure is working and that the access token is valid.
 * @function Dropbox#checkUser
 * @arg {CheckEchoArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<CheckEchoResult>, Error.<void>>}
 */


routes.checkUser = function (arg) {
  return this.request('check/user', arg, 'user', 'api', 'rpc');
};
/**
 * Removes all manually added contacts. You'll still keep contacts who are on
 * your team or who you imported. New contacts will be added when you share.
 * @function Dropbox#contactsDeleteManualContacts
 * @returns {Promise.<DropboxResponse<void>, Error.<void>>}
 */


routes.contactsDeleteManualContacts = function () {
  return this.request('contacts/delete_manual_contacts', null, 'user', 'api', 'rpc');
};
/**
 * Removes manually added contacts from the given list.
 * @function Dropbox#contactsDeleteManualContactsBatch
 * @arg {ContactsDeleteManualContactsArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<ContactsDeleteManualContactsError>>}
 */


routes.contactsDeleteManualContactsBatch = function (arg) {
  return this.request('contacts/delete_manual_contacts_batch', arg, 'user', 'api', 'rpc');
};
/**
 * Add property groups to a Dropbox file. See templates/add_for_user or
 * templates/add_for_team to create new templates.
 * @function Dropbox#filePropertiesPropertiesAdd
 * @arg {FilePropertiesAddPropertiesArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<FilePropertiesAddPropertiesError>>}
 */


routes.filePropertiesPropertiesAdd = function (arg) {
  return this.request('file_properties/properties/add', arg, 'user', 'api', 'rpc');
};
/**
 * Overwrite property groups associated with a file. This endpoint should be
 * used instead of properties/update when property groups are being updated via
 * a "snapshot" instead of via a "delta". In other words, this endpoint will
 * delete all omitted fields from a property group, whereas properties/update
 * will only delete fields that are explicitly marked for deletion.
 * @function Dropbox#filePropertiesPropertiesOverwrite
 * @arg {FilePropertiesOverwritePropertyGroupArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<FilePropertiesInvalidPropertyGroupError>>}
 */


routes.filePropertiesPropertiesOverwrite = function (arg) {
  return this.request('file_properties/properties/overwrite', arg, 'user', 'api', 'rpc');
};
/**
 * Permanently removes the specified property group from the file. To remove
 * specific property field key value pairs, see properties/update. To update a
 * template, see templates/update_for_user or templates/update_for_team. To
 * remove a template, see templates/remove_for_user or
 * templates/remove_for_team.
 * @function Dropbox#filePropertiesPropertiesRemove
 * @arg {FilePropertiesRemovePropertiesArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<FilePropertiesRemovePropertiesError>>}
 */


routes.filePropertiesPropertiesRemove = function (arg) {
  return this.request('file_properties/properties/remove', arg, 'user', 'api', 'rpc');
};
/**
 * Search across property templates for particular property field values.
 * @function Dropbox#filePropertiesPropertiesSearch
 * @arg {FilePropertiesPropertiesSearchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilePropertiesPropertiesSearchResult>, Error.<FilePropertiesPropertiesSearchError>>}
 */


routes.filePropertiesPropertiesSearch = function (arg) {
  return this.request('file_properties/properties/search', arg, 'user', 'api', 'rpc');
};
/**
 * Once a cursor has been retrieved from properties/search, use this to paginate
 * through all search results.
 * @function Dropbox#filePropertiesPropertiesSearchContinue
 * @arg {FilePropertiesPropertiesSearchContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilePropertiesPropertiesSearchResult>, Error.<FilePropertiesPropertiesSearchContinueError>>}
 */


routes.filePropertiesPropertiesSearchContinue = function (arg) {
  return this.request('file_properties/properties/search/continue', arg, 'user', 'api', 'rpc');
};
/**
 * Add, update or remove properties associated with the supplied file and
 * templates. This endpoint should be used instead of properties/overwrite when
 * property groups are being updated via a "delta" instead of via a "snapshot" .
 * In other words, this endpoint will not delete any omitted fields from a
 * property group, whereas properties/overwrite will delete any fields that are
 * omitted from a property group.
 * @function Dropbox#filePropertiesPropertiesUpdate
 * @arg {FilePropertiesUpdatePropertiesArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<FilePropertiesUpdatePropertiesError>>}
 */


routes.filePropertiesPropertiesUpdate = function (arg) {
  return this.request('file_properties/properties/update', arg, 'user', 'api', 'rpc');
};
/**
 * Add a template associated with a team. See properties/add to add properties
 * to a file or folder. Note: this endpoint will create team-owned templates.
 * @function Dropbox#filePropertiesTemplatesAddForTeam
 * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilePropertiesAddTemplateResult>, Error.<FilePropertiesModifyTemplateError>>}
 */


routes.filePropertiesTemplatesAddForTeam = function (arg) {
  return this.request('file_properties/templates/add_for_team', arg, 'team', 'api', 'rpc');
};
/**
 * Add a template associated with a user. See properties/add to add properties
 * to a file. This endpoint can't be called on a team member or admin's behalf.
 * @function Dropbox#filePropertiesTemplatesAddForUser
 * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilePropertiesAddTemplateResult>, Error.<FilePropertiesModifyTemplateError>>}
 */


routes.filePropertiesTemplatesAddForUser = function (arg) {
  return this.request('file_properties/templates/add_for_user', arg, 'user', 'api', 'rpc');
};
/**
 * Get the schema for a specified template.
 * @function Dropbox#filePropertiesTemplatesGetForTeam
 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilePropertiesGetTemplateResult>, Error.<FilePropertiesTemplateError>>}
 */


routes.filePropertiesTemplatesGetForTeam = function (arg) {
  return this.request('file_properties/templates/get_for_team', arg, 'team', 'api', 'rpc');
};
/**
 * Get the schema for a specified template. This endpoint can't be called on a
 * team member or admin's behalf.
 * @function Dropbox#filePropertiesTemplatesGetForUser
 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilePropertiesGetTemplateResult>, Error.<FilePropertiesTemplateError>>}
 */


routes.filePropertiesTemplatesGetForUser = function (arg) {
  return this.request('file_properties/templates/get_for_user', arg, 'user', 'api', 'rpc');
};
/**
 * Get the template identifiers for a team. To get the schema of each template
 * use templates/get_for_team.
 * @function Dropbox#filePropertiesTemplatesListForTeam
 * @returns {Promise.<DropboxResponse<FilePropertiesListTemplateResult>, Error.<FilePropertiesTemplateError>>}
 */


routes.filePropertiesTemplatesListForTeam = function () {
  return this.request('file_properties/templates/list_for_team', null, 'team', 'api', 'rpc');
};
/**
 * Get the template identifiers for a team. To get the schema of each template
 * use templates/get_for_user. This endpoint can't be called on a team member or
 * admin's behalf.
 * @function Dropbox#filePropertiesTemplatesListForUser
 * @returns {Promise.<DropboxResponse<FilePropertiesListTemplateResult>, Error.<FilePropertiesTemplateError>>}
 */


routes.filePropertiesTemplatesListForUser = function () {
  return this.request('file_properties/templates/list_for_user', null, 'user', 'api', 'rpc');
};
/**
 * Permanently removes the specified template created from
 * templates/add_for_user. All properties associated with the template will also
 * be removed. This action cannot be undone.
 * @function Dropbox#filePropertiesTemplatesRemoveForTeam
 * @arg {FilePropertiesRemoveTemplateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<FilePropertiesTemplateError>>}
 */


routes.filePropertiesTemplatesRemoveForTeam = function (arg) {
  return this.request('file_properties/templates/remove_for_team', arg, 'team', 'api', 'rpc');
};
/**
 * Permanently removes the specified template created from
 * templates/add_for_user. All properties associated with the template will also
 * be removed. This action cannot be undone.
 * @function Dropbox#filePropertiesTemplatesRemoveForUser
 * @arg {FilePropertiesRemoveTemplateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<FilePropertiesTemplateError>>}
 */


routes.filePropertiesTemplatesRemoveForUser = function (arg) {
  return this.request('file_properties/templates/remove_for_user', arg, 'user', 'api', 'rpc');
};
/**
 * Update a template associated with a team. This route can update the template
 * name, the template description and add optional properties to templates.
 * @function Dropbox#filePropertiesTemplatesUpdateForTeam
 * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilePropertiesUpdateTemplateResult>, Error.<FilePropertiesModifyTemplateError>>}
 */


routes.filePropertiesTemplatesUpdateForTeam = function (arg) {
  return this.request('file_properties/templates/update_for_team', arg, 'team', 'api', 'rpc');
};
/**
 * Update a template associated with a user. This route can update the template
 * name, the template description and add optional properties to templates. This
 * endpoint can't be called on a team member or admin's behalf.
 * @function Dropbox#filePropertiesTemplatesUpdateForUser
 * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilePropertiesUpdateTemplateResult>, Error.<FilePropertiesModifyTemplateError>>}
 */


routes.filePropertiesTemplatesUpdateForUser = function (arg) {
  return this.request('file_properties/templates/update_for_user', arg, 'user', 'api', 'rpc');
};
/**
 * Returns the total number of file requests owned by this user. Includes both
 * open and closed file requests.
 * @function Dropbox#fileRequestsCount
 * @returns {Promise.<DropboxResponse<FileRequestsCountFileRequestsResult>, Error.<FileRequestsCountFileRequestsError>>}
 */


routes.fileRequestsCount = function () {
  return this.request('file_requests/count', null, 'user', 'api', 'rpc');
};
/**
 * Creates a file request for this user.
 * @function Dropbox#fileRequestsCreate
 * @arg {FileRequestsCreateFileRequestArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FileRequestsFileRequest>, Error.<FileRequestsCreateFileRequestError>>}
 */


routes.fileRequestsCreate = function (arg) {
  return this.request('file_requests/create', arg, 'user', 'api', 'rpc');
};
/**
 * Delete a batch of closed file requests.
 * @function Dropbox#fileRequestsDelete
 * @arg {FileRequestsDeleteFileRequestArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FileRequestsDeleteFileRequestsResult>, Error.<FileRequestsDeleteFileRequestError>>}
 */


routes.fileRequestsDelete = function (arg) {
  return this.request('file_requests/delete', arg, 'user', 'api', 'rpc');
};
/**
 * Delete all closed file requests owned by this user.
 * @function Dropbox#fileRequestsDeleteAllClosed
 * @returns {Promise.<DropboxResponse<FileRequestsDeleteAllClosedFileRequestsResult>, Error.<FileRequestsDeleteAllClosedFileRequestsError>>}
 */


routes.fileRequestsDeleteAllClosed = function () {
  return this.request('file_requests/delete_all_closed', null, 'user', 'api', 'rpc');
};
/**
 * Returns the specified file request.
 * @function Dropbox#fileRequestsGet
 * @arg {FileRequestsGetFileRequestArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FileRequestsFileRequest>, Error.<FileRequestsGetFileRequestError>>}
 */


routes.fileRequestsGet = function (arg) {
  return this.request('file_requests/get', arg, 'user', 'api', 'rpc');
};
/**
 * Returns a list of file requests owned by this user. For apps with the app
 * folder permission, this will only return file requests with destinations in
 * the app folder.
 * @function Dropbox#fileRequestsListV2
 * @arg {FileRequestsListFileRequestsArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FileRequestsListFileRequestsV2Result>, Error.<FileRequestsListFileRequestsError>>}
 */


routes.fileRequestsListV2 = function (arg) {
  return this.request('file_requests/list_v2', arg, 'user', 'api', 'rpc');
};
/**
 * Returns a list of file requests owned by this user. For apps with the app
 * folder permission, this will only return file requests with destinations in
 * the app folder.
 * @function Dropbox#fileRequestsList
 * @returns {Promise.<DropboxResponse<FileRequestsListFileRequestsResult>, Error.<FileRequestsListFileRequestsError>>}
 */


routes.fileRequestsList = function () {
  return this.request('file_requests/list', null, 'user', 'api', 'rpc');
};
/**
 * Once a cursor has been retrieved from list_v2, use this to paginate through
 * all file requests. The cursor must come from a previous call to list_v2 or
 * list/continue.
 * @function Dropbox#fileRequestsListContinue
 * @arg {FileRequestsListFileRequestsContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FileRequestsListFileRequestsV2Result>, Error.<FileRequestsListFileRequestsContinueError>>}
 */


routes.fileRequestsListContinue = function (arg) {
  return this.request('file_requests/list/continue', arg, 'user', 'api', 'rpc');
};
/**
 * Update a file request.
 * @function Dropbox#fileRequestsUpdate
 * @arg {FileRequestsUpdateFileRequestArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FileRequestsFileRequest>, Error.<FileRequestsUpdateFileRequestError>>}
 */


routes.fileRequestsUpdate = function (arg) {
  return this.request('file_requests/update', arg, 'user', 'api', 'rpc');
};
/**
 * Returns the metadata for a file or folder. This is an alpha endpoint
 * compatible with the properties API. Note: Metadata for the root folder is
 * unsupported.
 * @function Dropbox#filesAlphaGetMetadata
 * @deprecated
 * @arg {FilesAlphaGetMetadataArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata)>, Error.<FilesAlphaGetMetadataError>>}
 */


routes.filesAlphaGetMetadata = function (arg) {
  return this.request('files/alpha/get_metadata', arg, 'user', 'api', 'rpc');
};
/**
 * Create a new file with the contents provided in the request. Note that this
 * endpoint is part of the properties API alpha and is slightly different from
 * upload. Do not use this to upload a file larger than 150 MB. Instead, create
 * an upload session with upload_session/start.
 * @function Dropbox#filesAlphaUpload
 * @deprecated
 * @arg {FilesCommitInfoWithProperties} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesFileMetadata>, Error.<FilesUploadErrorWithProperties>>}
 */


routes.filesAlphaUpload = function (arg) {
  return this.request('files/alpha/upload', arg, 'user', 'content', 'upload');
};
/**
 * Copy a file or folder to a different location in the user's Dropbox. If the
 * source path is a folder all its contents will be copied.
 * @function Dropbox#filesCopyV2
 * @arg {FilesRelocationArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesRelocationResult>, Error.<FilesRelocationError>>}
 */


routes.filesCopyV2 = function (arg) {
  return this.request('files/copy_v2', arg, 'user', 'api', 'rpc');
};
/**
 * Copy a file or folder to a different location in the user's Dropbox. If the
 * source path is a folder all its contents will be copied.
 * @function Dropbox#filesCopy
 * @deprecated
 * @arg {FilesRelocationArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata)>, Error.<FilesRelocationError>>}
 */


routes.filesCopy = function (arg) {
  return this.request('files/copy', arg, 'user', 'api', 'rpc');
};
/**
 * Copy multiple files or folders to different locations at once in the user's
 * Dropbox. This route will replace copy_batch. The main difference is this
 * route will return status for each entry, while copy_batch raises failure if
 * any entry fails. This route will either finish synchronously, or return a job
 * ID and do the async copy job in background. Please use copy_batch/check_v2 to
 * check the job status.
 * @function Dropbox#filesCopyBatchV2
 * @arg {Object} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesRelocationBatchV2Launch>, Error.<void>>}
 */


routes.filesCopyBatchV2 = function (arg) {
  return this.request('files/copy_batch_v2', arg, 'user', 'api', 'rpc');
};
/**
 * Copy multiple files or folders to different locations at once in the user's
 * Dropbox. This route will return job ID immediately and do the async copy job
 * in background. Please use copy_batch/check to check the job status.
 * @function Dropbox#filesCopyBatch
 * @deprecated
 * @arg {FilesRelocationBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesRelocationBatchLaunch>, Error.<void>>}
 */


routes.filesCopyBatch = function (arg) {
  return this.request('files/copy_batch', arg, 'user', 'api', 'rpc');
};
/**
 * Returns the status of an asynchronous job for copy_batch_v2. It returns list
 * of results for each entry.
 * @function Dropbox#filesCopyBatchCheckV2
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesRelocationBatchV2JobStatus>, Error.<AsyncPollError>>}
 */


routes.filesCopyBatchCheckV2 = function (arg) {
  return this.request('files/copy_batch/check_v2', arg, 'user', 'api', 'rpc');
};
/**
 * Returns the status of an asynchronous job for copy_batch. If success, it
 * returns list of results for each entry.
 * @function Dropbox#filesCopyBatchCheck
 * @deprecated
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesRelocationBatchJobStatus>, Error.<AsyncPollError>>}
 */


routes.filesCopyBatchCheck = function (arg) {
  return this.request('files/copy_batch/check', arg, 'user', 'api', 'rpc');
};
/**
 * Get a copy reference to a file or folder. This reference string can be used
 * to save that file or folder to another user's Dropbox by passing it to
 * copy_reference/save.
 * @function Dropbox#filesCopyReferenceGet
 * @arg {FilesGetCopyReferenceArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesGetCopyReferenceResult>, Error.<FilesGetCopyReferenceError>>}
 */


routes.filesCopyReferenceGet = function (arg) {
  return this.request('files/copy_reference/get', arg, 'user', 'api', 'rpc');
};
/**
 * Save a copy reference returned by copy_reference/get to the user's Dropbox.
 * @function Dropbox#filesCopyReferenceSave
 * @arg {FilesSaveCopyReferenceArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesSaveCopyReferenceResult>, Error.<FilesSaveCopyReferenceError>>}
 */


routes.filesCopyReferenceSave = function (arg) {
  return this.request('files/copy_reference/save', arg, 'user', 'api', 'rpc');
};
/**
 * Create a folder at a given path.
 * @function Dropbox#filesCreateFolderV2
 * @arg {FilesCreateFolderArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesCreateFolderResult>, Error.<FilesCreateFolderError>>}
 */


routes.filesCreateFolderV2 = function (arg) {
  return this.request('files/create_folder_v2', arg, 'user', 'api', 'rpc');
};
/**
 * Create a folder at a given path.
 * @function Dropbox#filesCreateFolder
 * @deprecated
 * @arg {FilesCreateFolderArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesFolderMetadata>, Error.<FilesCreateFolderError>>}
 */


routes.filesCreateFolder = function (arg) {
  return this.request('files/create_folder', arg, 'user', 'api', 'rpc');
};
/**
 * Create multiple folders at once. This route is asynchronous for large
 * batches, which returns a job ID immediately and runs the create folder batch
 * asynchronously. Otherwise, creates the folders and returns the result
 * synchronously for smaller inputs. You can force asynchronous behaviour by
 * using the CreateFolderBatchArg.force_async flag.  Use
 * create_folder_batch/check to check the job status.
 * @function Dropbox#filesCreateFolderBatch
 * @arg {FilesCreateFolderBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesCreateFolderBatchLaunch>, Error.<void>>}
 */


routes.filesCreateFolderBatch = function (arg) {
  return this.request('files/create_folder_batch', arg, 'user', 'api', 'rpc');
};
/**
 * Returns the status of an asynchronous job for create_folder_batch. If
 * success, it returns list of result for each entry.
 * @function Dropbox#filesCreateFolderBatchCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesCreateFolderBatchJobStatus>, Error.<AsyncPollError>>}
 */


routes.filesCreateFolderBatchCheck = function (arg) {
  return this.request('files/create_folder_batch/check', arg, 'user', 'api', 'rpc');
};
/**
 * Delete the file or folder at a given path. If the path is a folder, all its
 * contents will be deleted too. A successful response indicates that the file
 * or folder was deleted. The returned metadata will be the corresponding
 * FileMetadata or FolderMetadata for the item at time of deletion, and not a
 * DeletedMetadata object.
 * @function Dropbox#filesDeleteV2
 * @arg {FilesDeleteArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesDeleteResult>, Error.<FilesDeleteError>>}
 */


routes.filesDeleteV2 = function (arg) {
  return this.request('files/delete_v2', arg, 'user', 'api', 'rpc');
};
/**
 * Delete the file or folder at a given path. If the path is a folder, all its
 * contents will be deleted too. A successful response indicates that the file
 * or folder was deleted. The returned metadata will be the corresponding
 * FileMetadata or FolderMetadata for the item at time of deletion, and not a
 * DeletedMetadata object.
 * @function Dropbox#filesDelete
 * @deprecated
 * @arg {FilesDeleteArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata)>, Error.<FilesDeleteError>>}
 */


routes.filesDelete = function (arg) {
  return this.request('files/delete', arg, 'user', 'api', 'rpc');
};
/**
 * Delete multiple files/folders at once. This route is asynchronous, which
 * returns a job ID immediately and runs the delete batch asynchronously. Use
 * delete_batch/check to check the job status.
 * @function Dropbox#filesDeleteBatch
 * @arg {FilesDeleteBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesDeleteBatchLaunch>, Error.<void>>}
 */


routes.filesDeleteBatch = function (arg) {
  return this.request('files/delete_batch', arg, 'user', 'api', 'rpc');
};
/**
 * Returns the status of an asynchronous job for delete_batch. If success, it
 * returns list of result for each entry.
 * @function Dropbox#filesDeleteBatchCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesDeleteBatchJobStatus>, Error.<AsyncPollError>>}
 */


routes.filesDeleteBatchCheck = function (arg) {
  return this.request('files/delete_batch/check', arg, 'user', 'api', 'rpc');
};
/**
 * Download a file from a user's Dropbox.
 * @function Dropbox#filesDownload
 * @arg {FilesDownloadArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesFileMetadata>, Error.<FilesDownloadError>>}
 */


routes.filesDownload = function (arg) {
  return this.request('files/download', arg, 'user', 'content', 'download');
};
/**
 * Download a folder from the user's Dropbox, as a zip file. The folder must be
 * less than 20 GB in size and have fewer than 10,000 total files. The input
 * cannot be a single file. Any single file must be less than 4GB in size.
 * @function Dropbox#filesDownloadZip
 * @arg {FilesDownloadZipArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesDownloadZipResult>, Error.<FilesDownloadZipError>>}
 */


routes.filesDownloadZip = function (arg) {
  return this.request('files/download_zip', arg, 'user', 'content', 'download');
};
/**
 * Export a file from a user's Dropbox. This route only supports exporting files
 * that cannot be downloaded directly  and whose ExportResult.file_metadata has
 * ExportInfo.export_as populated.
 * @function Dropbox#filesExport
 * @arg {FilesExportArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesExportResult>, Error.<FilesExportError>>}
 */


routes.filesExport = function (arg) {
  return this.request('files/export', arg, 'user', 'content', 'download');
};
/**
 * Return the lock metadata for the given list of paths.
 * @function Dropbox#filesGetFileLockBatch
 * @arg {FilesLockFileBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesLockFileBatchResult>, Error.<FilesLockFileError>>}
 */


routes.filesGetFileLockBatch = function (arg) {
  return this.request('files/get_file_lock_batch', arg, 'user', 'api', 'rpc');
};
/**
 * Returns the metadata for a file or folder. Note: Metadata for the root folder
 * is unsupported.
 * @function Dropbox#filesGetMetadata
 * @arg {FilesGetMetadataArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata)>, Error.<FilesGetMetadataError>>}
 */


routes.filesGetMetadata = function (arg) {
  return this.request('files/get_metadata', arg, 'user', 'api', 'rpc');
};
/**
 * Get a preview for a file. Currently, PDF previews are generated for files
 * with the following extensions: .ai, .doc, .docm, .docx, .eps, .gdoc,
 * .gslides, .odp, .odt, .pps, .ppsm, .ppsx, .ppt, .pptm, .pptx, .rtf. HTML
 * previews are generated for files with the following extensions: .csv, .ods,
 * .xls, .xlsm, .gsheet, .xlsx. Other formats will return an unsupported
 * extension error.
 * @function Dropbox#filesGetPreview
 * @arg {FilesPreviewArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesFileMetadata>, Error.<FilesPreviewError>>}
 */


routes.filesGetPreview = function (arg) {
  return this.request('files/get_preview', arg, 'user', 'content', 'download');
};
/**
 * Get a temporary link to stream content of a file. This link will expire in
 * four hours and afterwards you will get 410 Gone. This URL should not be used
 * to display content directly in the browser. The Content-Type of the link is
 * determined automatically by the file's mime type.
 * @function Dropbox#filesGetTemporaryLink
 * @arg {FilesGetTemporaryLinkArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesGetTemporaryLinkResult>, Error.<FilesGetTemporaryLinkError>>}
 */


routes.filesGetTemporaryLink = function (arg) {
  return this.request('files/get_temporary_link', arg, 'user', 'api', 'rpc');
};
/**
 * Get a one-time use temporary upload link to upload a file to a Dropbox
 * location.  This endpoint acts as a delayed upload. The returned temporary
 * upload link may be used to make a POST request with the data to be uploaded.
 * The upload will then be perfomed with the CommitInfo previously provided to
 * get_temporary_upload_link but evaluated only upon consumption. Hence, errors
 * stemming from invalid CommitInfo with respect to the state of the user's
 * Dropbox will only be communicated at consumption time. Additionally, these
 * errors are surfaced as generic HTTP 409 Conflict responses, potentially
 * hiding issue details. The maximum temporary upload link duration is 4 hours.
 * Upon consumption or expiration, a new link will have to be generated.
 * Multiple links may exist for a specific upload path at any given time.  The
 * POST request on the temporary upload link must have its Content-Type set to
 * "application/octet-stream".  Example temporary upload link consumption
 * request:  curl -X POST
 * https://content.dropboxapi.com/apitul/1/bNi2uIYF51cVBND --header
 * "Content-Type: application/octet-stream" --data-binary @local_file.txt  A
 * successful temporary upload link consumption request returns the content hash
 * of the uploaded data in JSON format.  Example succesful temporary upload link
 * consumption response: {"content-hash":
 * "599d71033d700ac892a0e48fa61b125d2f5994"}  An unsuccessful temporary upload
 * link consumption request returns any of the following status codes:  HTTP 400
 * Bad Request: Content-Type is not one of application/octet-stream and
 * text/plain or request is invalid. HTTP 409 Conflict: The temporary upload
 * link does not exist or is currently unavailable, the upload failed, or
 * another error happened. HTTP 410 Gone: The temporary upload link is expired
 * or consumed.  Example unsuccessful temporary upload link consumption
 * response: Temporary upload link has been recently consumed.
 * @function Dropbox#filesGetTemporaryUploadLink
 * @arg {FilesGetTemporaryUploadLinkArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesGetTemporaryUploadLinkResult>, Error.<void>>}
 */


routes.filesGetTemporaryUploadLink = function (arg) {
  return this.request('files/get_temporary_upload_link', arg, 'user', 'api', 'rpc');
};
/**
 * Get a thumbnail for an image. This method currently supports files with the
 * following file extensions: jpg, jpeg, png, tiff, tif, gif and bmp. Photos
 * that are larger than 20MB in size won't be converted to a thumbnail.
 * @function Dropbox#filesGetThumbnail
 * @arg {FilesThumbnailArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesFileMetadata>, Error.<FilesThumbnailError>>}
 */


routes.filesGetThumbnail = function (arg) {
  return this.request('files/get_thumbnail', arg, 'user', 'content', 'download');
};
/**
 * Get a thumbnail for a file.
 * @function Dropbox#filesGetThumbnailV2
 * @arg {FilesThumbnailV2Arg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesPreviewResult>, Error.<FilesThumbnailV2Error>>}
 */


routes.filesGetThumbnailV2 = function (arg) {
  return this.request('files/get_thumbnail_v2', arg, 'app, user', 'content', 'download');
};
/**
 * Get thumbnails for a list of images. We allow up to 25 thumbnails in a single
 * batch. This method currently supports files with the following file
 * extensions: jpg, jpeg, png, tiff, tif, gif and bmp. Photos that are larger
 * than 20MB in size won't be converted to a thumbnail.
 * @function Dropbox#filesGetThumbnailBatch
 * @arg {FilesGetThumbnailBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesGetThumbnailBatchResult>, Error.<FilesGetThumbnailBatchError>>}
 */


routes.filesGetThumbnailBatch = function (arg) {
  return this.request('files/get_thumbnail_batch', arg, 'user', 'content', 'rpc');
};
/**
 * Starts returning the contents of a folder. If the result's
 * ListFolderResult.has_more field is true, call list_folder/continue with the
 * returned ListFolderResult.cursor to retrieve more entries. If you're using
 * ListFolderArg.recursive set to true to keep a local cache of the contents of
 * a Dropbox account, iterate through each entry in order and process them as
 * follows to keep your local state in sync: For each FileMetadata, store the
 * new entry at the given path in your local state. If the required parent
 * folders don't exist yet, create them. If there's already something else at
 * the given path, replace it and remove all its children. For each
 * FolderMetadata, store the new entry at the given path in your local state. If
 * the required parent folders don't exist yet, create them. If there's already
 * something else at the given path, replace it but leave the children as they
 * are. Check the new entry's FolderSharingInfo.read_only and set all its
 * children's read-only statuses to match. For each DeletedMetadata, if your
 * local state has something at the given path, remove it and all its children.
 * If there's nothing at the given path, ignore this entry. Note:
 * auth.RateLimitError may be returned if multiple list_folder or
 * list_folder/continue calls with same parameters are made simultaneously by
 * same API app for same user. If your app implements retry logic, please hold
 * off the retry until the previous request finishes.
 * @function Dropbox#filesListFolder
 * @arg {FilesListFolderArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesListFolderResult>, Error.<FilesListFolderError>>}
 */


routes.filesListFolder = function (arg) {
  return this.request('files/list_folder', arg, 'user', 'api', 'rpc');
};
/**
 * Once a cursor has been retrieved from list_folder, use this to paginate
 * through all files and retrieve updates to the folder, following the same
 * rules as documented for list_folder.
 * @function Dropbox#filesListFolderContinue
 * @arg {FilesListFolderContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesListFolderResult>, Error.<FilesListFolderContinueError>>}
 */


routes.filesListFolderContinue = function (arg) {
  return this.request('files/list_folder/continue', arg, 'user', 'api', 'rpc');
};
/**
 * A way to quickly get a cursor for the folder's state. Unlike list_folder,
 * list_folder/get_latest_cursor doesn't return any entries. This endpoint is
 * for app which only needs to know about new files and modifications and
 * doesn't need to know about files that already exist in Dropbox.
 * @function Dropbox#filesListFolderGetLatestCursor
 * @arg {FilesListFolderArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesListFolderGetLatestCursorResult>, Error.<FilesListFolderError>>}
 */


routes.filesListFolderGetLatestCursor = function (arg) {
  return this.request('files/list_folder/get_latest_cursor', arg, 'user', 'api', 'rpc');
};
/**
 * A longpoll endpoint to wait for changes on an account. In conjunction with
 * list_folder/continue, this call gives you a low-latency way to monitor an
 * account for file changes. The connection will block until there are changes
 * available or a timeout occurs. This endpoint is useful mostly for client-side
 * apps. If you're looking for server-side notifications, check out our webhooks
 * documentation https://www.dropbox.com/developers/reference/webhooks.
 * @function Dropbox#filesListFolderLongpoll
 * @arg {FilesListFolderLongpollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesListFolderLongpollResult>, Error.<FilesListFolderLongpollError>>}
 */


routes.filesListFolderLongpoll = function (arg) {
  return this.request('files/list_folder/longpoll', arg, 'noauth', 'notify', 'rpc');
};
/**
 * Returns revisions for files based on a file path or a file id. The file path
 * or file id is identified from the latest file entry at the given file path or
 * id. This end point allows your app to query either by file path or file id by
 * setting the mode parameter appropriately. In the ListRevisionsMode.path
 * (default) mode, all revisions at the same file path as the latest file entry
 * are returned. If revisions with the same file id are desired, then mode must
 * be set to ListRevisionsMode.id. The ListRevisionsMode.id mode is useful to
 * retrieve revisions for a given file across moves or renames.
 * @function Dropbox#filesListRevisions
 * @arg {FilesListRevisionsArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesListRevisionsResult>, Error.<FilesListRevisionsError>>}
 */


routes.filesListRevisions = function (arg) {
  return this.request('files/list_revisions', arg, 'user', 'api', 'rpc');
};
/**
 * Lock the files at the given paths. A locked file will be writable only by the
 * lock holder. A successful response indicates that the file has been locked.
 * Returns a list of the locked file paths and their metadata after this
 * operation.
 * @function Dropbox#filesLockFileBatch
 * @arg {FilesLockFileBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesLockFileBatchResult>, Error.<FilesLockFileError>>}
 */


routes.filesLockFileBatch = function (arg) {
  return this.request('files/lock_file_batch', arg, 'user', 'api', 'rpc');
};
/**
 * Move a file or folder to a different location in the user's Dropbox. If the
 * source path is a folder all its contents will be moved. Note that we do not
 * currently support case-only renaming.
 * @function Dropbox#filesMoveV2
 * @arg {FilesRelocationArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesRelocationResult>, Error.<FilesRelocationError>>}
 */


routes.filesMoveV2 = function (arg) {
  return this.request('files/move_v2', arg, 'user', 'api', 'rpc');
};
/**
 * Move a file or folder to a different location in the user's Dropbox. If the
 * source path is a folder all its contents will be moved.
 * @function Dropbox#filesMove
 * @deprecated
 * @arg {FilesRelocationArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata)>, Error.<FilesRelocationError>>}
 */


routes.filesMove = function (arg) {
  return this.request('files/move', arg, 'user', 'api', 'rpc');
};
/**
 * Move multiple files or folders to different locations at once in the user's
 * Dropbox. Note that we do not currently support case-only renaming. This route
 * will replace move_batch. The main difference is this route will return status
 * for each entry, while move_batch raises failure if any entry fails. This
 * route will either finish synchronously, or return a job ID and do the async
 * move job in background. Please use move_batch/check_v2 to check the job
 * status.
 * @function Dropbox#filesMoveBatchV2
 * @arg {FilesMoveBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesRelocationBatchV2Launch>, Error.<void>>}
 */


routes.filesMoveBatchV2 = function (arg) {
  return this.request('files/move_batch_v2', arg, 'user', 'api', 'rpc');
};
/**
 * Move multiple files or folders to different locations at once in the user's
 * Dropbox. This route will return job ID immediately and do the async moving
 * job in background. Please use move_batch/check to check the job status.
 * @function Dropbox#filesMoveBatch
 * @deprecated
 * @arg {FilesRelocationBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesRelocationBatchLaunch>, Error.<void>>}
 */


routes.filesMoveBatch = function (arg) {
  return this.request('files/move_batch', arg, 'user', 'api', 'rpc');
};
/**
 * Returns the status of an asynchronous job for move_batch_v2. It returns list
 * of results for each entry.
 * @function Dropbox#filesMoveBatchCheckV2
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesRelocationBatchV2JobStatus>, Error.<AsyncPollError>>}
 */


routes.filesMoveBatchCheckV2 = function (arg) {
  return this.request('files/move_batch/check_v2', arg, 'user', 'api', 'rpc');
};
/**
 * Returns the status of an asynchronous job for move_batch. If success, it
 * returns list of results for each entry.
 * @function Dropbox#filesMoveBatchCheck
 * @deprecated
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesRelocationBatchJobStatus>, Error.<AsyncPollError>>}
 */


routes.filesMoveBatchCheck = function (arg) {
  return this.request('files/move_batch/check', arg, 'user', 'api', 'rpc');
};
/**
 * Permanently delete the file or folder at a given path (see
 * https://www.dropbox.com/en/help/40). If the given file or folder is not yet
 * deleted, this route will first delete it. It is possible for this route to
 * successfully delete, then fail to permanently delete. Note: This endpoint is
 * only available for Dropbox Business apps.
 * @function Dropbox#filesPermanentlyDelete
 * @arg {FilesDeleteArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<FilesDeleteError>>}
 */


routes.filesPermanentlyDelete = function (arg) {
  return this.request('files/permanently_delete', arg, 'user', 'api', 'rpc');
};
/**
 * @function Dropbox#filesPropertiesAdd
 * @deprecated
 * @arg {FilePropertiesAddPropertiesArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<FilePropertiesAddPropertiesError>>}
 */


routes.filesPropertiesAdd = function (arg) {
  return this.request('files/properties/add', arg, 'user', 'api', 'rpc');
};
/**
 * @function Dropbox#filesPropertiesOverwrite
 * @deprecated
 * @arg {FilePropertiesOverwritePropertyGroupArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<FilePropertiesInvalidPropertyGroupError>>}
 */


routes.filesPropertiesOverwrite = function (arg) {
  return this.request('files/properties/overwrite', arg, 'user', 'api', 'rpc');
};
/**
 * @function Dropbox#filesPropertiesRemove
 * @deprecated
 * @arg {FilePropertiesRemovePropertiesArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<FilePropertiesRemovePropertiesError>>}
 */


routes.filesPropertiesRemove = function (arg) {
  return this.request('files/properties/remove', arg, 'user', 'api', 'rpc');
};
/**
 * @function Dropbox#filesPropertiesTemplateGet
 * @deprecated
 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilePropertiesGetTemplateResult>, Error.<FilePropertiesTemplateError>>}
 */


routes.filesPropertiesTemplateGet = function (arg) {
  return this.request('files/properties/template/get', arg, 'user', 'api', 'rpc');
};
/**
 * @function Dropbox#filesPropertiesTemplateList
 * @deprecated
 * @returns {Promise.<DropboxResponse<FilePropertiesListTemplateResult>, Error.<FilePropertiesTemplateError>>}
 */


routes.filesPropertiesTemplateList = function () {
  return this.request('files/properties/template/list', null, 'user', 'api', 'rpc');
};
/**
 * @function Dropbox#filesPropertiesUpdate
 * @deprecated
 * @arg {FilePropertiesUpdatePropertiesArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<FilePropertiesUpdatePropertiesError>>}
 */


routes.filesPropertiesUpdate = function (arg) {
  return this.request('files/properties/update', arg, 'user', 'api', 'rpc');
};
/**
 * Restore a specific revision of a file to the given path.
 * @function Dropbox#filesRestore
 * @arg {FilesRestoreArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesFileMetadata>, Error.<FilesRestoreError>>}
 */


routes.filesRestore = function (arg) {
  return this.request('files/restore', arg, 'user', 'api', 'rpc');
};
/**
 * Save the data from a specified URL into a file in user's Dropbox. Note that
 * the transfer from the URL must complete within 5 minutes, or the operation
 * will time out and the job will fail. If the given path already exists, the
 * file will be renamed to avoid the conflict (e.g. myfile (1).txt).
 * @function Dropbox#filesSaveUrl
 * @arg {FilesSaveUrlArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesSaveUrlResult>, Error.<FilesSaveUrlError>>}
 */


routes.filesSaveUrl = function (arg) {
  return this.request('files/save_url', arg, 'user', 'api', 'rpc');
};
/**
 * Check the status of a save_url job.
 * @function Dropbox#filesSaveUrlCheckJobStatus
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesSaveUrlJobStatus>, Error.<AsyncPollError>>}
 */


routes.filesSaveUrlCheckJobStatus = function (arg) {
  return this.request('files/save_url/check_job_status', arg, 'user', 'api', 'rpc');
};
/**
 * Searches for files and folders. Note: Recent changes will be reflected in
 * search results within a few seconds and older revisions of existing files may
 * still match your query for up to a few days.
 * @function Dropbox#filesSearch
 * @deprecated
 * @arg {FilesSearchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesSearchResult>, Error.<FilesSearchError>>}
 */


routes.filesSearch = function (arg) {
  return this.request('files/search', arg, 'user', 'api', 'rpc');
};
/**
 * Searches for files and folders. Note: search_v2 along with search/continue_v2
 * can only be used to retrieve a maximum of 10,000 matches. Recent changes may
 * not immediately be reflected in search results due to a short delay in
 * indexing. Duplicate results may be returned across pages. Some results may
 * not be returned.
 * @function Dropbox#filesSearchV2
 * @arg {FilesSearchV2Arg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesSearchV2Result>, Error.<FilesSearchError>>}
 */


routes.filesSearchV2 = function (arg) {
  return this.request('files/search_v2', arg, 'user', 'api', 'rpc');
};
/**
 * Fetches the next page of search results returned from search_v2. Note:
 * search_v2 along with search/continue_v2 can only be used to retrieve a
 * maximum of 10,000 matches. Recent changes may not immediately be reflected in
 * search results due to a short delay in indexing. Duplicate results may be
 * returned across pages. Some results may not be returned.
 * @function Dropbox#filesSearchContinueV2
 * @arg {FilesSearchV2ContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesSearchV2Result>, Error.<FilesSearchError>>}
 */


routes.filesSearchContinueV2 = function (arg) {
  return this.request('files/search/continue_v2', arg, 'user', 'api', 'rpc');
};
/**
 * Unlock the files at the given paths. A locked file can only be unlocked by
 * the lock holder or, if a business account, a team admin. A successful
 * response indicates that the file has been unlocked. Returns a list of the
 * unlocked file paths and their metadata after this operation.
 * @function Dropbox#filesUnlockFileBatch
 * @arg {FilesUnlockFileBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesLockFileBatchResult>, Error.<FilesLockFileError>>}
 */


routes.filesUnlockFileBatch = function (arg) {
  return this.request('files/unlock_file_batch', arg, 'user', 'api', 'rpc');
};
/**
 * Create a new file with the contents provided in the request. Do not use this
 * to upload a file larger than 150 MB. Instead, create an upload session with
 * upload_session/start. Calls to this endpoint will count as data transport
 * calls for any Dropbox Business teams with a limit on the number of data
 * transport calls allowed per month. For more information, see the Data
 * transport limit page
 * https://www.dropbox.com/developers/reference/data-transport-limit.
 * @function Dropbox#filesUpload
 * @arg {FilesCommitInfo} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesFileMetadata>, Error.<FilesUploadError>>}
 */


routes.filesUpload = function (arg) {
  return this.request('files/upload', arg, 'user', 'content', 'upload');
};
/**
 * Append more data to an upload session. When the parameter close is set, this
 * call will close the session. A single request should not upload more than 150
 * MB. The maximum size of a file one can upload to an upload session is 350 GB.
 * Calls to this endpoint will count as data transport calls for any Dropbox
 * Business teams with a limit on the number of data transport calls allowed per
 * month. For more information, see the Data transport limit page
 * https://www.dropbox.com/developers/reference/data-transport-limit.
 * @function Dropbox#filesUploadSessionAppendV2
 * @arg {FilesUploadSessionAppendArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<FilesUploadSessionLookupError>>}
 */


routes.filesUploadSessionAppendV2 = function (arg) {
  return this.request('files/upload_session/append_v2', arg, 'user', 'content', 'upload');
};
/**
 * Append more data to an upload session. A single request should not upload
 * more than 150 MB. The maximum size of a file one can upload to an upload
 * session is 350 GB. Calls to this endpoint will count as data transport calls
 * for any Dropbox Business teams with a limit on the number of data transport
 * calls allowed per month. For more information, see the Data transport limit
 * page https://www.dropbox.com/developers/reference/data-transport-limit.
 * @function Dropbox#filesUploadSessionAppend
 * @deprecated
 * @arg {FilesUploadSessionCursor} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<FilesUploadSessionLookupError>>}
 */


routes.filesUploadSessionAppend = function (arg) {
  return this.request('files/upload_session/append', arg, 'user', 'content', 'upload');
};
/**
 * Finish an upload session and save the uploaded data to the given file path. A
 * single request should not upload more than 150 MB. The maximum size of a file
 * one can upload to an upload session is 350 GB. Calls to this endpoint will
 * count as data transport calls for any Dropbox Business teams with a limit on
 * the number of data transport calls allowed per month. For more information,
 * see the Data transport limit page
 * https://www.dropbox.com/developers/reference/data-transport-limit.
 * @function Dropbox#filesUploadSessionFinish
 * @arg {FilesUploadSessionFinishArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesFileMetadata>, Error.<FilesUploadSessionFinishError>>}
 */


routes.filesUploadSessionFinish = function (arg) {
  return this.request('files/upload_session/finish', arg, 'user', 'content', 'upload');
};
/**
 * This route helps you commit many files at once into a user's Dropbox. Use
 * upload_session/start and upload_session/append_v2 to upload file contents. We
 * recommend uploading many files in parallel to increase throughput. Once the
 * file contents have been uploaded, rather than calling upload_session/finish,
 * use this route to finish all your upload sessions in a single request.
 * UploadSessionStartArg.close or UploadSessionAppendArg.close needs to be true
 * for the last upload_session/start or upload_session/append_v2 call. The
 * maximum size of a file one can upload to an upload session is 350 GB. This
 * route will return a job_id immediately and do the async commit job in
 * background. Use upload_session/finish_batch/check to check the job status.
 * For the same account, this route should be executed serially. That means you
 * should not start the next job before current job finishes. We allow up to
 * 1000 entries in a single request. Calls to this endpoint will count as data
 * transport calls for any Dropbox Business teams with a limit on the number of
 * data transport calls allowed per month. For more information, see the Data
 * transport limit page
 * https://www.dropbox.com/developers/reference/data-transport-limit.
 * @function Dropbox#filesUploadSessionFinishBatch
 * @arg {FilesUploadSessionFinishBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesUploadSessionFinishBatchLaunch>, Error.<void>>}
 */


routes.filesUploadSessionFinishBatch = function (arg) {
  return this.request('files/upload_session/finish_batch', arg, 'user', 'api', 'rpc');
};
/**
 * Returns the status of an asynchronous job for upload_session/finish_batch. If
 * success, it returns list of result for each entry.
 * @function Dropbox#filesUploadSessionFinishBatchCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesUploadSessionFinishBatchJobStatus>, Error.<AsyncPollError>>}
 */


routes.filesUploadSessionFinishBatchCheck = function (arg) {
  return this.request('files/upload_session/finish_batch/check', arg, 'user', 'api', 'rpc');
};
/**
 * Upload sessions allow you to upload a single file in one or more requests,
 * for example where the size of the file is greater than 150 MB.  This call
 * starts a new upload session with the given data. You can then use
 * upload_session/append_v2 to add more data and upload_session/finish to save
 * all the data to a file in Dropbox. A single request should not upload more
 * than 150 MB. The maximum size of a file one can upload to an upload session
 * is 350 GB. An upload session can be used for a maximum of 48 hours.
 * Attempting to use an UploadSessionStartResult.session_id with
 * upload_session/append_v2 or upload_session/finish more than 48 hours after
 * its creation will return a UploadSessionLookupError.not_found. Calls to this
 * endpoint will count as data transport calls for any Dropbox Business teams
 * with a limit on the number of data transport calls allowed per month. For
 * more information, see the Data transport limit page
 * https://www.dropbox.com/developers/reference/data-transport-limit. By
 * default, upload sessions require you to send content of the file in
 * sequential order via consecutive upload_session/start,
 * upload_session/append_v2, upload_session/finish calls. For better
 * performance, you can instead optionally use a UploadSessionType.concurrent
 * upload session. To start a new concurrent session, set
 * UploadSessionStartArg.session_type to UploadSessionType.concurrent. After
 * that, you can send file data in concurrent upload_session/append_v2 requests.
 * Finally finish the session with upload_session/finish. There are couple of
 * constraints with concurrent sessions to make them work. You can not send data
 * with upload_session/start or upload_session/finish call, only with
 * upload_session/append_v2 call. Also data uploaded in upload_session/append_v2
 * call must be multiple of 4194304 bytes (except for last
 * upload_session/append_v2 with UploadSessionStartArg.close to true, that may
 * contain any remaining data).
 * @function Dropbox#filesUploadSessionStart
 * @arg {FilesUploadSessionStartArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilesUploadSessionStartResult>, Error.<FilesUploadSessionStartError>>}
 */


routes.filesUploadSessionStart = function (arg) {
  return this.request('files/upload_session/start', arg, 'user', 'content', 'upload');
};
/**
 * Marks the given Paper doc as archived. This action can be performed or undone
 * by anyone with edit permissions to the doc. Note that this endpoint will
 * continue to work for content created by users on the older version of Paper.
 * To check which version of Paper a user is on, use /users/features/get_values.
 * If the paper_as_files feature is enabled, then the user is running the new
 * version of Paper. This endpoint will be retired in September 2020. Refer to
 * the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * more information.
 * @function Dropbox#paperDocsArchive
 * @deprecated
 * @arg {PaperRefPaperDoc} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<PaperDocLookupError>>}
 */


routes.paperDocsArchive = function (arg) {
  return this.request('paper/docs/archive', arg, 'user', 'api', 'rpc');
};
/**
 * Creates a new Paper doc with the provided content. Note that this endpoint
 * will continue to work for content created by users on the older version of
 * Paper. To check which version of Paper a user is on, use
 * /users/features/get_values. If the paper_as_files feature is enabled, then
 * the user is running the new version of Paper. This endpoint will be retired
 * in September 2020. Refer to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * more information.
 * @function Dropbox#paperDocsCreate
 * @deprecated
 * @arg {PaperPaperDocCreateArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<PaperPaperDocCreateUpdateResult>, Error.<PaperPaperDocCreateError>>}
 */


routes.paperDocsCreate = function (arg) {
  return this.request('paper/docs/create', arg, 'user', 'api', 'upload');
};
/**
 * Exports and downloads Paper doc either as HTML or markdown. Note that this
 * endpoint will continue to work for content created by users on the older
 * version of Paper. To check which version of Paper a user is on, use
 * /users/features/get_values. If the paper_as_files feature is enabled, then
 * the user is running the new version of Paper. Refer to the Paper Migration
 * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
 * for migration information.
 * @function Dropbox#paperDocsDownload
 * @deprecated
 * @arg {PaperPaperDocExport} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<PaperPaperDocExportResult>, Error.<PaperDocLookupError>>}
 */


routes.paperDocsDownload = function (arg) {
  return this.request('paper/docs/download', arg, 'user', 'api', 'download');
};
/**
 * Lists the users who are explicitly invited to the Paper folder in which the
 * Paper doc is contained. For private folders all users (including owner)
 * shared on the folder are listed and for team folders all non-team users
 * shared on the folder are returned. Note that this endpoint will continue to
 * work for content created by users on the older version of Paper. To check
 * which version of Paper a user is on, use /users/features/get_values. If the
 * paper_as_files feature is enabled, then the user is running the new version
 * of Paper. Refer to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * migration information.
 * @function Dropbox#paperDocsFolderUsersList
 * @deprecated
 * @arg {PaperListUsersOnFolderArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<PaperListUsersOnFolderResponse>, Error.<PaperDocLookupError>>}
 */


routes.paperDocsFolderUsersList = function (arg) {
  return this.request('paper/docs/folder_users/list', arg, 'user', 'api', 'rpc');
};
/**
 * Once a cursor has been retrieved from docs/folder_users/list, use this to
 * paginate through all users on the Paper folder. Note that this endpoint will
 * continue to work for content created by users on the older version of Paper.
 * To check which version of Paper a user is on, use /users/features/get_values.
 * If the paper_as_files feature is enabled, then the user is running the new
 * version of Paper. Refer to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * migration information.
 * @function Dropbox#paperDocsFolderUsersListContinue
 * @deprecated
 * @arg {PaperListUsersOnFolderContinueArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<PaperListUsersOnFolderResponse>, Error.<PaperListUsersCursorError>>}
 */


routes.paperDocsFolderUsersListContinue = function (arg) {
  return this.request('paper/docs/folder_users/list/continue', arg, 'user', 'api', 'rpc');
};
/**
 * Retrieves folder information for the given Paper doc. This includes:   -
 * folder sharing policy; permissions for subfolders are set by the top-level
 * folder.   - full 'filepath', i.e. the list of folders (both folderId and
 * folderName) from     the root folder to the folder directly containing the
 * Paper doc.  If the Paper doc is not in any folder (aka unfiled) the response
 * will be empty. Note that this endpoint will continue to work for content
 * created by users on the older version of Paper. To check which version of
 * Paper a user is on, use /users/features/get_values. If the paper_as_files
 * feature is enabled, then the user is running the new version of Paper. Refer
 * to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * migration information.
 * @function Dropbox#paperDocsGetFolderInfo
 * @deprecated
 * @arg {PaperRefPaperDoc} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<PaperFoldersContainingPaperDoc>, Error.<PaperDocLookupError>>}
 */


routes.paperDocsGetFolderInfo = function (arg) {
  return this.request('paper/docs/get_folder_info', arg, 'user', 'api', 'rpc');
};
/**
 * Return the list of all Paper docs according to the argument specifications.
 * To iterate over through the full pagination, pass the cursor to
 * docs/list/continue. Note that this endpoint will continue to work for content
 * created by users on the older version of Paper. To check which version of
 * Paper a user is on, use /users/features/get_values. If the paper_as_files
 * feature is enabled, then the user is running the new version of Paper. Refer
 * to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * migration information.
 * @function Dropbox#paperDocsList
 * @deprecated
 * @arg {PaperListPaperDocsArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<PaperListPaperDocsResponse>, Error.<void>>}
 */


routes.paperDocsList = function (arg) {
  return this.request('paper/docs/list', arg, 'user', 'api', 'rpc');
};
/**
 * Once a cursor has been retrieved from docs/list, use this to paginate through
 * all Paper doc. Note that this endpoint will continue to work for content
 * created by users on the older version of Paper. To check which version of
 * Paper a user is on, use /users/features/get_values. If the paper_as_files
 * feature is enabled, then the user is running the new version of Paper. Refer
 * to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * migration information.
 * @function Dropbox#paperDocsListContinue
 * @deprecated
 * @arg {PaperListPaperDocsContinueArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<PaperListPaperDocsResponse>, Error.<PaperListDocsCursorError>>}
 */


routes.paperDocsListContinue = function (arg) {
  return this.request('paper/docs/list/continue', arg, 'user', 'api', 'rpc');
};
/**
 * Permanently deletes the given Paper doc. This operation is final as the doc
 * cannot be recovered. This action can be performed only by the doc owner. Note
 * that this endpoint will continue to work for content created by users on the
 * older version of Paper. To check which version of Paper a user is on, use
 * /users/features/get_values. If the paper_as_files feature is enabled, then
 * the user is running the new version of Paper. Refer to the Paper Migration
 * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
 * for migration information.
 * @function Dropbox#paperDocsPermanentlyDelete
 * @deprecated
 * @arg {PaperRefPaperDoc} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<PaperDocLookupError>>}
 */


routes.paperDocsPermanentlyDelete = function (arg) {
  return this.request('paper/docs/permanently_delete', arg, 'user', 'api', 'rpc');
};
/**
 * Gets the default sharing policy for the given Paper doc. Note that this
 * endpoint will continue to work for content created by users on the older
 * version of Paper. To check which version of Paper a user is on, use
 * /users/features/get_values. If the paper_as_files feature is enabled, then
 * the user is running the new version of Paper. Refer to the Paper Migration
 * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
 * for migration information.
 * @function Dropbox#paperDocsSharingPolicyGet
 * @deprecated
 * @arg {PaperRefPaperDoc} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<PaperSharingPolicy>, Error.<PaperDocLookupError>>}
 */


routes.paperDocsSharingPolicyGet = function (arg) {
  return this.request('paper/docs/sharing_policy/get', arg, 'user', 'api', 'rpc');
};
/**
 * Sets the default sharing policy for the given Paper doc. The default
 * 'team_sharing_policy' can be changed only by teams, omit this field for
 * personal accounts. The 'public_sharing_policy' policy can't be set to the
 * value 'disabled' because this setting can be changed only via the team admin
 * console. Note that this endpoint will continue to work for content created by
 * users on the older version of Paper. To check which version of Paper a user
 * is on, use /users/features/get_values. If the paper_as_files feature is
 * enabled, then the user is running the new version of Paper. Refer to the
 * Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * migration information.
 * @function Dropbox#paperDocsSharingPolicySet
 * @deprecated
 * @arg {PaperPaperDocSharingPolicy} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<PaperDocLookupError>>}
 */


routes.paperDocsSharingPolicySet = function (arg) {
  return this.request('paper/docs/sharing_policy/set', arg, 'user', 'api', 'rpc');
};
/**
 * Updates an existing Paper doc with the provided content. Note that this
 * endpoint will continue to work for content created by users on the older
 * version of Paper. To check which version of Paper a user is on, use
 * /users/features/get_values. If the paper_as_files feature is enabled, then
 * the user is running the new version of Paper. This endpoint will be retired
 * in September 2020. Refer to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * more information.
 * @function Dropbox#paperDocsUpdate
 * @deprecated
 * @arg {PaperPaperDocUpdateArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<PaperPaperDocCreateUpdateResult>, Error.<PaperPaperDocUpdateError>>}
 */


routes.paperDocsUpdate = function (arg) {
  return this.request('paper/docs/update', arg, 'user', 'api', 'upload');
};
/**
 * Allows an owner or editor to add users to a Paper doc or change their
 * permissions using their email address or Dropbox account ID. The doc owner's
 * permissions cannot be changed. Note that this endpoint will continue to work
 * for content created by users on the older version of Paper. To check which
 * version of Paper a user is on, use /users/features/get_values. If the
 * paper_as_files feature is enabled, then the user is running the new version
 * of Paper. Refer to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * migration information.
 * @function Dropbox#paperDocsUsersAdd
 * @deprecated
 * @arg {PaperAddPaperDocUser} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<Array.<PaperAddPaperDocUserMemberResult>>, Error.<PaperDocLookupError>>}
 */


routes.paperDocsUsersAdd = function (arg) {
  return this.request('paper/docs/users/add', arg, 'user', 'api', 'rpc');
};
/**
 * Lists all users who visited the Paper doc or users with explicit access. This
 * call excludes users who have been removed. The list is sorted by the date of
 * the visit or the share date. The list will include both users, the explicitly
 * shared ones as well as those who came in using the Paper url link. Note that
 * this endpoint will continue to work for content created by users on the older
 * version of Paper. To check which version of Paper a user is on, use
 * /users/features/get_values. If the paper_as_files feature is enabled, then
 * the user is running the new version of Paper. Refer to the Paper Migration
 * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
 * for migration information.
 * @function Dropbox#paperDocsUsersList
 * @deprecated
 * @arg {PaperListUsersOnPaperDocArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<PaperListUsersOnPaperDocResponse>, Error.<PaperDocLookupError>>}
 */


routes.paperDocsUsersList = function (arg) {
  return this.request('paper/docs/users/list', arg, 'user', 'api', 'rpc');
};
/**
 * Once a cursor has been retrieved from docs/users/list, use this to paginate
 * through all users on the Paper doc. Note that this endpoint will continue to
 * work for content created by users on the older version of Paper. To check
 * which version of Paper a user is on, use /users/features/get_values. If the
 * paper_as_files feature is enabled, then the user is running the new version
 * of Paper. Refer to the Paper Migration Guide
 * https://www.dropbox.com/lp/developers/reference/paper-migration-guide for
 * migration information.
 * @function Dropbox#paperDocsUsersListContinue
 * @deprecated
 * @arg {PaperListUsersOnPaperDocContinueArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<PaperListUsersOnPaperDocResponse>, Error.<PaperListUsersCursorError>>}
 */


routes.paperDocsUsersListContinue = function (arg) {
  return this.request('paper/docs/users/list/continue', arg, 'user', 'api', 'rpc');
};
/**
 * Allows an owner or editor to remove users from a Paper doc using their email
 * address or Dropbox account ID. The doc owner cannot be removed. Note that
 * this endpoint will continue to work for content created by users on the older
 * version of Paper. To check which version of Paper a user is on, use
 * /users/features/get_values. If the paper_as_files feature is enabled, then
 * the user is running the new version of Paper. Refer to the Paper Migration
 * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
 * for migration information.
 * @function Dropbox#paperDocsUsersRemove
 * @deprecated
 * @arg {PaperRemovePaperDocUser} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<PaperDocLookupError>>}
 */


routes.paperDocsUsersRemove = function (arg) {
  return this.request('paper/docs/users/remove', arg, 'user', 'api', 'rpc');
};
/**
 * Create a new Paper folder with the provided info. Note that this endpoint
 * will continue to work for content created by users on the older version of
 * Paper. To check which version of Paper a user is on, use
 * /users/features/get_values. If the paper_as_files feature is enabled, then
 * the user is running the new version of Paper. Refer to the Paper Migration
 * Guide https://www.dropbox.com/lp/developers/reference/paper-migration-guide
 * for migration information.
 * @function Dropbox#paperFoldersCreate
 * @deprecated
 * @arg {PaperPaperFolderCreateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<PaperPaperFolderCreateResult>, Error.<PaperPaperFolderCreateError>>}
 */


routes.paperFoldersCreate = function (arg) {
  return this.request('paper/folders/create', arg, 'user', 'api', 'rpc');
};
/**
 * Adds specified members to a file.
 * @function Dropbox#sharingAddFileMember
 * @arg {SharingAddFileMemberArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<Array.<SharingFileMemberActionResult>>, Error.<SharingAddFileMemberError>>}
 */


routes.sharingAddFileMember = function (arg) {
  return this.request('sharing/add_file_member', arg, 'user', 'api', 'rpc');
};
/**
 * Allows an owner or editor (if the ACL update policy allows) of a shared
 * folder to add another member. For the new member to get access to all the
 * functionality for this folder, you will need to call mount_folder on their
 * behalf.
 * @function Dropbox#sharingAddFolderMember
 * @arg {SharingAddFolderMemberArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<SharingAddFolderMemberError>>}
 */


routes.sharingAddFolderMember = function (arg) {
  return this.request('sharing/add_folder_member', arg, 'user', 'api', 'rpc');
};
/**
 * Identical to update_file_member but with less information returned.
 * @function Dropbox#sharingChangeFileMemberAccess
 * @deprecated
 * @arg {SharingChangeFileMemberAccessArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingFileMemberActionResult>, Error.<SharingFileMemberActionError>>}
 */


routes.sharingChangeFileMemberAccess = function (arg) {
  return this.request('sharing/change_file_member_access', arg, 'user', 'api', 'rpc');
};
/**
 * Returns the status of an asynchronous job.
 * @function Dropbox#sharingCheckJobStatus
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingJobStatus>, Error.<AsyncPollError>>}
 */


routes.sharingCheckJobStatus = function (arg) {
  return this.request('sharing/check_job_status', arg, 'user', 'api', 'rpc');
};
/**
 * Returns the status of an asynchronous job for sharing a folder.
 * @function Dropbox#sharingCheckRemoveMemberJobStatus
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingRemoveMemberJobStatus>, Error.<AsyncPollError>>}
 */


routes.sharingCheckRemoveMemberJobStatus = function (arg) {
  return this.request('sharing/check_remove_member_job_status', arg, 'user', 'api', 'rpc');
};
/**
 * Returns the status of an asynchronous job for sharing a folder.
 * @function Dropbox#sharingCheckShareJobStatus
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingShareFolderJobStatus>, Error.<AsyncPollError>>}
 */


routes.sharingCheckShareJobStatus = function (arg) {
  return this.request('sharing/check_share_job_status', arg, 'user', 'api', 'rpc');
};
/**
 * Create a shared link. If a shared link already exists for the given path,
 * that link is returned. Note that in the returned PathLinkMetadata, the
 * PathLinkMetadata.url field is the shortened URL if
 * CreateSharedLinkArg.short_url argument is set to true. Previously, it was
 * technically possible to break a shared link by moving or renaming the
 * corresponding file or folder. In the future, this will no longer be the case,
 * so your app shouldn't rely on this behavior. Instead, if your app needs to
 * revoke a shared link, use revoke_shared_link.
 * @function Dropbox#sharingCreateSharedLink
 * @deprecated
 * @arg {SharingCreateSharedLinkArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingPathLinkMetadata>, Error.<SharingCreateSharedLinkError>>}
 */


routes.sharingCreateSharedLink = function (arg) {
  return this.request('sharing/create_shared_link', arg, 'user', 'api', 'rpc');
};
/**
 * Create a shared link with custom settings. If no settings are given then the
 * default visibility is RequestedVisibility.public (The resolved visibility,
 * though, may depend on other aspects such as team and shared folder settings).
 * @function Dropbox#sharingCreateSharedLinkWithSettings
 * @arg {SharingCreateSharedLinkWithSettingsArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata)>, Error.<SharingCreateSharedLinkWithSettingsError>>}
 */


routes.sharingCreateSharedLinkWithSettings = function (arg) {
  return this.request('sharing/create_shared_link_with_settings', arg, 'user', 'api', 'rpc');
};
/**
 * Returns shared file metadata.
 * @function Dropbox#sharingGetFileMetadata
 * @arg {SharingGetFileMetadataArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingSharedFileMetadata>, Error.<SharingGetFileMetadataError>>}
 */


routes.sharingGetFileMetadata = function (arg) {
  return this.request('sharing/get_file_metadata', arg, 'user', 'api', 'rpc');
};
/**
 * Returns shared file metadata.
 * @function Dropbox#sharingGetFileMetadataBatch
 * @arg {SharingGetFileMetadataBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<Array.<SharingGetFileMetadataBatchResult>>, Error.<SharingSharingUserError>>}
 */


routes.sharingGetFileMetadataBatch = function (arg) {
  return this.request('sharing/get_file_metadata/batch', arg, 'user', 'api', 'rpc');
};
/**
 * Returns shared folder metadata by its folder ID.
 * @function Dropbox#sharingGetFolderMetadata
 * @arg {SharingGetMetadataArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingSharedFolderMetadata>, Error.<SharingSharedFolderAccessError>>}
 */


routes.sharingGetFolderMetadata = function (arg) {
  return this.request('sharing/get_folder_metadata', arg, 'user', 'api', 'rpc');
};
/**
 * Download the shared link's file from a user's Dropbox.
 * @function Dropbox#sharingGetSharedLinkFile
 * @arg {Object} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata)>, Error.<SharingGetSharedLinkFileError>>}
 */


routes.sharingGetSharedLinkFile = function (arg) {
  return this.request('sharing/get_shared_link_file', arg, 'user', 'content', 'download');
};
/**
 * Get the shared link's metadata.
 * @function Dropbox#sharingGetSharedLinkMetadata
 * @arg {SharingGetSharedLinkMetadataArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata)>, Error.<SharingSharedLinkError>>}
 */


routes.sharingGetSharedLinkMetadata = function (arg) {
  return this.request('sharing/get_shared_link_metadata', arg, 'user', 'api', 'rpc');
};
/**
 * Returns a list of LinkMetadata objects for this user, including collection
 * links. If no path is given, returns a list of all shared links for the
 * current user, including collection links, up to a maximum of 1000 links. If a
 * non-empty path is given, returns a list of all shared links that allow access
 * to the given path.  Collection links are never returned in this case. Note
 * that the url field in the response is never the shortened URL.
 * @function Dropbox#sharingGetSharedLinks
 * @deprecated
 * @arg {SharingGetSharedLinksArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingGetSharedLinksResult>, Error.<SharingGetSharedLinksError>>}
 */


routes.sharingGetSharedLinks = function (arg) {
  return this.request('sharing/get_shared_links', arg, 'user', 'api', 'rpc');
};
/**
 * Use to obtain the members who have been invited to a file, both inherited and
 * uninherited members.
 * @function Dropbox#sharingListFileMembers
 * @arg {SharingListFileMembersArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingSharedFileMembers>, Error.<SharingListFileMembersError>>}
 */


routes.sharingListFileMembers = function (arg) {
  return this.request('sharing/list_file_members', arg, 'user', 'api', 'rpc');
};
/**
 * Get members of multiple files at once. The arguments to this route are more
 * limited, and the limit on query result size per file is more strict. To
 * customize the results more, use the individual file endpoint. Inherited users
 * and groups are not included in the result, and permissions are not returned
 * for this endpoint.
 * @function Dropbox#sharingListFileMembersBatch
 * @arg {SharingListFileMembersBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<Array.<SharingListFileMembersBatchResult>>, Error.<SharingSharingUserError>>}
 */


routes.sharingListFileMembersBatch = function (arg) {
  return this.request('sharing/list_file_members/batch', arg, 'user', 'api', 'rpc');
};
/**
 * Once a cursor has been retrieved from list_file_members or
 * list_file_members/batch, use this to paginate through all shared file
 * members.
 * @function Dropbox#sharingListFileMembersContinue
 * @arg {SharingListFileMembersContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingSharedFileMembers>, Error.<SharingListFileMembersContinueError>>}
 */


routes.sharingListFileMembersContinue = function (arg) {
  return this.request('sharing/list_file_members/continue', arg, 'user', 'api', 'rpc');
};
/**
 * Returns shared folder membership by its folder ID.
 * @function Dropbox#sharingListFolderMembers
 * @arg {SharingListFolderMembersArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingSharedFolderMembers>, Error.<SharingSharedFolderAccessError>>}
 */


routes.sharingListFolderMembers = function (arg) {
  return this.request('sharing/list_folder_members', arg, 'user', 'api', 'rpc');
};
/**
 * Once a cursor has been retrieved from list_folder_members, use this to
 * paginate through all shared folder members.
 * @function Dropbox#sharingListFolderMembersContinue
 * @arg {SharingListFolderMembersContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingSharedFolderMembers>, Error.<SharingListFolderMembersContinueError>>}
 */


routes.sharingListFolderMembersContinue = function (arg) {
  return this.request('sharing/list_folder_members/continue', arg, 'user', 'api', 'rpc');
};
/**
 * Return the list of all shared folders the current user has access to.
 * @function Dropbox#sharingListFolders
 * @arg {SharingListFoldersArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingListFoldersResult>, Error.<void>>}
 */


routes.sharingListFolders = function (arg) {
  return this.request('sharing/list_folders', arg, 'user', 'api', 'rpc');
};
/**
 * Once a cursor has been retrieved from list_folders, use this to paginate
 * through all shared folders. The cursor must come from a previous call to
 * list_folders or list_folders/continue.
 * @function Dropbox#sharingListFoldersContinue
 * @arg {SharingListFoldersContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingListFoldersResult>, Error.<SharingListFoldersContinueError>>}
 */


routes.sharingListFoldersContinue = function (arg) {
  return this.request('sharing/list_folders/continue', arg, 'user', 'api', 'rpc');
};
/**
 * Return the list of all shared folders the current user can mount or unmount.
 * @function Dropbox#sharingListMountableFolders
 * @arg {SharingListFoldersArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingListFoldersResult>, Error.<void>>}
 */


routes.sharingListMountableFolders = function (arg) {
  return this.request('sharing/list_mountable_folders', arg, 'user', 'api', 'rpc');
};
/**
 * Once a cursor has been retrieved from list_mountable_folders, use this to
 * paginate through all mountable shared folders. The cursor must come from a
 * previous call to list_mountable_folders or list_mountable_folders/continue.
 * @function Dropbox#sharingListMountableFoldersContinue
 * @arg {SharingListFoldersContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingListFoldersResult>, Error.<SharingListFoldersContinueError>>}
 */


routes.sharingListMountableFoldersContinue = function (arg) {
  return this.request('sharing/list_mountable_folders/continue', arg, 'user', 'api', 'rpc');
};
/**
 * Returns a list of all files shared with current user.  Does not include files
 * the user has received via shared folders, and does  not include unclaimed
 * invitations.
 * @function Dropbox#sharingListReceivedFiles
 * @arg {SharingListFilesArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingListFilesResult>, Error.<SharingSharingUserError>>}
 */


routes.sharingListReceivedFiles = function (arg) {
  return this.request('sharing/list_received_files', arg, 'user', 'api', 'rpc');
};
/**
 * Get more results with a cursor from list_received_files.
 * @function Dropbox#sharingListReceivedFilesContinue
 * @arg {SharingListFilesContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingListFilesResult>, Error.<SharingListFilesContinueError>>}
 */


routes.sharingListReceivedFilesContinue = function (arg) {
  return this.request('sharing/list_received_files/continue', arg, 'user', 'api', 'rpc');
};
/**
 * List shared links of this user. If no path is given, returns a list of all
 * shared links for the current user. For members of business teams using team
 * space and member folders, returns all shared links in the team member's home
 * folder unless the team space ID is specified in the request header. For more
 * information, refer to the Namespace Guide
 * https://www.dropbox.com/developers/reference/namespace-guide. If a non-empty
 * path is given, returns a list of all shared links that allow access to the
 * given path - direct links to the given path and links to parent folders of
 * the given path. Links to parent folders can be suppressed by setting
 * direct_only to true.
 * @function Dropbox#sharingListSharedLinks
 * @arg {SharingListSharedLinksArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingListSharedLinksResult>, Error.<SharingListSharedLinksError>>}
 */


routes.sharingListSharedLinks = function (arg) {
  return this.request('sharing/list_shared_links', arg, 'user', 'api', 'rpc');
};
/**
 * Modify the shared link's settings. If the requested visibility conflict with
 * the shared links policy of the team or the shared folder (in case the linked
 * file is part of a shared folder) then the LinkPermissions.resolved_visibility
 * of the returned SharedLinkMetadata will reflect the actual visibility of the
 * shared link and the LinkPermissions.requested_visibility will reflect the
 * requested visibility.
 * @function Dropbox#sharingModifySharedLinkSettings
 * @arg {SharingModifySharedLinkSettingsArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata)>, Error.<SharingModifySharedLinkSettingsError>>}
 */


routes.sharingModifySharedLinkSettings = function (arg) {
  return this.request('sharing/modify_shared_link_settings', arg, 'user', 'api', 'rpc');
};
/**
 * The current user mounts the designated folder. Mount a shared folder for a
 * user after they have been added as a member. Once mounted, the shared folder
 * will appear in their Dropbox.
 * @function Dropbox#sharingMountFolder
 * @arg {SharingMountFolderArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingSharedFolderMetadata>, Error.<SharingMountFolderError>>}
 */


routes.sharingMountFolder = function (arg) {
  return this.request('sharing/mount_folder', arg, 'user', 'api', 'rpc');
};
/**
 * The current user relinquishes their membership in the designated file. Note
 * that the current user may still have inherited access to this file through
 * the parent folder.
 * @function Dropbox#sharingRelinquishFileMembership
 * @arg {SharingRelinquishFileMembershipArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<SharingRelinquishFileMembershipError>>}
 */


routes.sharingRelinquishFileMembership = function (arg) {
  return this.request('sharing/relinquish_file_membership', arg, 'user', 'api', 'rpc');
};
/**
 * The current user relinquishes their membership in the designated shared
 * folder and will no longer have access to the folder.  A folder owner cannot
 * relinquish membership in their own folder. This will run synchronously if
 * leave_a_copy is false, and asynchronously if leave_a_copy is true.
 * @function Dropbox#sharingRelinquishFolderMembership
 * @arg {SharingRelinquishFolderMembershipArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<AsyncLaunchEmptyResult>, Error.<SharingRelinquishFolderMembershipError>>}
 */


routes.sharingRelinquishFolderMembership = function (arg) {
  return this.request('sharing/relinquish_folder_membership', arg, 'user', 'api', 'rpc');
};
/**
 * Identical to remove_file_member_2 but with less information returned.
 * @function Dropbox#sharingRemoveFileMember
 * @deprecated
 * @arg {SharingRemoveFileMemberArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingFileMemberActionIndividualResult>, Error.<SharingRemoveFileMemberError>>}
 */


routes.sharingRemoveFileMember = function (arg) {
  return this.request('sharing/remove_file_member', arg, 'user', 'api', 'rpc');
};
/**
 * Removes a specified member from the file.
 * @function Dropbox#sharingRemoveFileMember2
 * @arg {SharingRemoveFileMemberArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingFileMemberRemoveActionResult>, Error.<SharingRemoveFileMemberError>>}
 */


routes.sharingRemoveFileMember2 = function (arg) {
  return this.request('sharing/remove_file_member_2', arg, 'user', 'api', 'rpc');
};
/**
 * Allows an owner or editor (if the ACL update policy allows) of a shared
 * folder to remove another member.
 * @function Dropbox#sharingRemoveFolderMember
 * @arg {SharingRemoveFolderMemberArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<AsyncLaunchResultBase>, Error.<SharingRemoveFolderMemberError>>}
 */


routes.sharingRemoveFolderMember = function (arg) {
  return this.request('sharing/remove_folder_member', arg, 'user', 'api', 'rpc');
};
/**
 * Revoke a shared link. Note that even after revoking a shared link to a file,
 * the file may be accessible if there are shared links leading to any of the
 * file parent folders. To list all shared links that enable access to a
 * specific file, you can use the list_shared_links with the file as the
 * ListSharedLinksArg.path argument.
 * @function Dropbox#sharingRevokeSharedLink
 * @arg {SharingRevokeSharedLinkArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<SharingRevokeSharedLinkError>>}
 */


routes.sharingRevokeSharedLink = function (arg) {
  return this.request('sharing/revoke_shared_link', arg, 'user', 'api', 'rpc');
};
/**
 * Change the inheritance policy of an existing Shared Folder. Only permitted
 * for shared folders in a shared team root. If a ShareFolderLaunch.async_job_id
 * is returned, you'll need to call check_share_job_status until the action
 * completes to get the metadata for the folder.
 * @function Dropbox#sharingSetAccessInheritance
 * @arg {SharingSetAccessInheritanceArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingShareFolderLaunch>, Error.<SharingSetAccessInheritanceError>>}
 */


routes.sharingSetAccessInheritance = function (arg) {
  return this.request('sharing/set_access_inheritance', arg, 'user', 'api', 'rpc');
};
/**
 * Share a folder with collaborators. Most sharing will be completed
 * synchronously. Large folders will be completed asynchronously. To make
 * testing the async case repeatable, set `ShareFolderArg.force_async`. If a
 * ShareFolderLaunch.async_job_id is returned, you'll need to call
 * check_share_job_status until the action completes to get the metadata for the
 * folder.
 * @function Dropbox#sharingShareFolder
 * @arg {SharingShareFolderArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingShareFolderLaunch>, Error.<SharingShareFolderError>>}
 */


routes.sharingShareFolder = function (arg) {
  return this.request('sharing/share_folder', arg, 'user', 'api', 'rpc');
};
/**
 * Transfer ownership of a shared folder to a member of the shared folder. User
 * must have AccessLevel.owner access to the shared folder to perform a
 * transfer.
 * @function Dropbox#sharingTransferFolder
 * @arg {SharingTransferFolderArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<SharingTransferFolderError>>}
 */


routes.sharingTransferFolder = function (arg) {
  return this.request('sharing/transfer_folder', arg, 'user', 'api', 'rpc');
};
/**
 * The current user unmounts the designated folder. They can re-mount the folder
 * at a later time using mount_folder.
 * @function Dropbox#sharingUnmountFolder
 * @arg {SharingUnmountFolderArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<SharingUnmountFolderError>>}
 */


routes.sharingUnmountFolder = function (arg) {
  return this.request('sharing/unmount_folder', arg, 'user', 'api', 'rpc');
};
/**
 * Remove all members from this file. Does not remove inherited members.
 * @function Dropbox#sharingUnshareFile
 * @arg {SharingUnshareFileArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<SharingUnshareFileError>>}
 */


routes.sharingUnshareFile = function (arg) {
  return this.request('sharing/unshare_file', arg, 'user', 'api', 'rpc');
};
/**
 * Allows a shared folder owner to unshare the folder. You'll need to call
 * check_job_status to determine if the action has completed successfully.
 * @function Dropbox#sharingUnshareFolder
 * @arg {SharingUnshareFolderArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<AsyncLaunchEmptyResult>, Error.<SharingUnshareFolderError>>}
 */


routes.sharingUnshareFolder = function (arg) {
  return this.request('sharing/unshare_folder', arg, 'user', 'api', 'rpc');
};
/**
 * Changes a member's access on a shared file.
 * @function Dropbox#sharingUpdateFileMember
 * @arg {SharingUpdateFileMemberArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingMemberAccessLevelResult>, Error.<SharingFileMemberActionError>>}
 */


routes.sharingUpdateFileMember = function (arg) {
  return this.request('sharing/update_file_member', arg, 'user', 'api', 'rpc');
};
/**
 * Allows an owner or editor of a shared folder to update another member's
 * permissions.
 * @function Dropbox#sharingUpdateFolderMember
 * @arg {SharingUpdateFolderMemberArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingMemberAccessLevelResult>, Error.<SharingUpdateFolderMemberError>>}
 */


routes.sharingUpdateFolderMember = function (arg) {
  return this.request('sharing/update_folder_member', arg, 'user', 'api', 'rpc');
};
/**
 * Update the sharing policies for a shared folder. User must have
 * AccessLevel.owner access to the shared folder to update its policies.
 * @function Dropbox#sharingUpdateFolderPolicy
 * @arg {SharingUpdateFolderPolicyArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<SharingSharedFolderMetadata>, Error.<SharingUpdateFolderPolicyError>>}
 */


routes.sharingUpdateFolderPolicy = function (arg) {
  return this.request('sharing/update_folder_policy', arg, 'user', 'api', 'rpc');
};
/**
 * List all device sessions of a team's member.
 * @function Dropbox#teamDevicesListMemberDevices
 * @arg {TeamListMemberDevicesArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamListMemberDevicesResult>, Error.<TeamListMemberDevicesError>>}
 */


routes.teamDevicesListMemberDevices = function (arg) {
  return this.request('team/devices/list_member_devices', arg, 'team', 'api', 'rpc');
};
/**
 * List all device sessions of a team. Permission : Team member file access.
 * @function Dropbox#teamDevicesListMembersDevices
 * @arg {TeamListMembersDevicesArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamListMembersDevicesResult>, Error.<TeamListMembersDevicesError>>}
 */


routes.teamDevicesListMembersDevices = function (arg) {
  return this.request('team/devices/list_members_devices', arg, 'team', 'api', 'rpc');
};
/**
 * List all device sessions of a team. Permission : Team member file access.
 * @function Dropbox#teamDevicesListTeamDevices
 * @deprecated
 * @arg {TeamListTeamDevicesArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamListTeamDevicesResult>, Error.<TeamListTeamDevicesError>>}
 */


routes.teamDevicesListTeamDevices = function (arg) {
  return this.request('team/devices/list_team_devices', arg, 'team', 'api', 'rpc');
};
/**
 * Revoke a device session of a team's member.
 * @function Dropbox#teamDevicesRevokeDeviceSession
 * @arg {TeamRevokeDeviceSessionArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<TeamRevokeDeviceSessionError>>}
 */


routes.teamDevicesRevokeDeviceSession = function (arg) {
  return this.request('team/devices/revoke_device_session', arg, 'team', 'api', 'rpc');
};
/**
 * Revoke a list of device sessions of team members.
 * @function Dropbox#teamDevicesRevokeDeviceSessionBatch
 * @arg {TeamRevokeDeviceSessionBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamRevokeDeviceSessionBatchResult>, Error.<TeamRevokeDeviceSessionBatchError>>}
 */


routes.teamDevicesRevokeDeviceSessionBatch = function (arg) {
  return this.request('team/devices/revoke_device_session_batch', arg, 'team', 'api', 'rpc');
};
/**
 * Get the values for one or more featues. This route allows you to check your
 * account's capability for what feature you can access or what value you have
 * for certain features. Permission : Team information.
 * @function Dropbox#teamFeaturesGetValues
 * @arg {TeamFeaturesGetValuesBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamFeaturesGetValuesBatchResult>, Error.<TeamFeaturesGetValuesBatchError>>}
 */


routes.teamFeaturesGetValues = function (arg) {
  return this.request('team/features/get_values', arg, 'team', 'api', 'rpc');
};
/**
 * Retrieves information about a team.
 * @function Dropbox#teamGetInfo
 * @returns {Promise.<DropboxResponse<TeamTeamGetInfoResult>, Error.<void>>}
 */


routes.teamGetInfo = function () {
  return this.request('team/get_info', null, 'team', 'api', 'rpc');
};
/**
 * Creates a new, empty group, with a requested name. Permission : Team member
 * management.
 * @function Dropbox#teamGroupsCreate
 * @arg {TeamGroupCreateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamGroupFullInfo>, Error.<TeamGroupCreateError>>}
 */


routes.teamGroupsCreate = function (arg) {
  return this.request('team/groups/create', arg, 'team', 'api', 'rpc');
};
/**
 * Deletes a group. The group is deleted immediately. However the revoking of
 * group-owned resources may take additional time. Use the groups/job_status/get
 * to determine whether this process has completed. Permission : Team member
 * management.
 * @function Dropbox#teamGroupsDelete
 * @arg {TeamGroupSelector} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<AsyncLaunchEmptyResult>, Error.<TeamGroupDeleteError>>}
 */


routes.teamGroupsDelete = function (arg) {
  return this.request('team/groups/delete', arg, 'team', 'api', 'rpc');
};
/**
 * Retrieves information about one or more groups. Note that the optional field
 * GroupFullInfo.members is not returned for system-managed groups. Permission :
 * Team Information.
 * @function Dropbox#teamGroupsGetInfo
 * @arg {TeamGroupsSelector} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<Object>, Error.<TeamGroupsGetInfoError>>}
 */


routes.teamGroupsGetInfo = function (arg) {
  return this.request('team/groups/get_info', arg, 'team', 'api', 'rpc');
};
/**
 * Once an async_job_id is returned from groups/delete, groups/members/add , or
 * groups/members/remove use this method to poll the status of granting/revoking
 * group members' access to group-owned resources. Permission : Team member
 * management.
 * @function Dropbox#teamGroupsJobStatusGet
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<AsyncPollEmptyResult>, Error.<TeamGroupsPollError>>}
 */


routes.teamGroupsJobStatusGet = function (arg) {
  return this.request('team/groups/job_status/get', arg, 'team', 'api', 'rpc');
};
/**
 * Lists groups on a team. Permission : Team Information.
 * @function Dropbox#teamGroupsList
 * @arg {TeamGroupsListArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamGroupsListResult>, Error.<void>>}
 */


routes.teamGroupsList = function (arg) {
  return this.request('team/groups/list', arg, 'team', 'api', 'rpc');
};
/**
 * Once a cursor has been retrieved from groups/list, use this to paginate
 * through all groups. Permission : Team Information.
 * @function Dropbox#teamGroupsListContinue
 * @arg {TeamGroupsListContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamGroupsListResult>, Error.<TeamGroupsListContinueError>>}
 */


routes.teamGroupsListContinue = function (arg) {
  return this.request('team/groups/list/continue', arg, 'team', 'api', 'rpc');
};
/**
 * Adds members to a group. The members are added immediately. However the
 * granting of group-owned resources may take additional time. Use the
 * groups/job_status/get to determine whether this process has completed.
 * Permission : Team member management.
 * @function Dropbox#teamGroupsMembersAdd
 * @arg {TeamGroupMembersAddArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamGroupMembersChangeResult>, Error.<TeamGroupMembersAddError>>}
 */


routes.teamGroupsMembersAdd = function (arg) {
  return this.request('team/groups/members/add', arg, 'team', 'api', 'rpc');
};
/**
 * Lists members of a group. Permission : Team Information.
 * @function Dropbox#teamGroupsMembersList
 * @arg {TeamGroupsMembersListArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamGroupsMembersListResult>, Error.<TeamGroupSelectorError>>}
 */


routes.teamGroupsMembersList = function (arg) {
  return this.request('team/groups/members/list', arg, 'team', 'api', 'rpc');
};
/**
 * Once a cursor has been retrieved from groups/members/list, use this to
 * paginate through all members of the group. Permission : Team information.
 * @function Dropbox#teamGroupsMembersListContinue
 * @arg {TeamGroupsMembersListContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamGroupsMembersListResult>, Error.<TeamGroupsMembersListContinueError>>}
 */


routes.teamGroupsMembersListContinue = function (arg) {
  return this.request('team/groups/members/list/continue', arg, 'team', 'api', 'rpc');
};
/**
 * Removes members from a group. The members are removed immediately. However
 * the revoking of group-owned resources may take additional time. Use the
 * groups/job_status/get to determine whether this process has completed. This
 * method permits removing the only owner of a group, even in cases where this
 * is not possible via the web client. Permission : Team member management.
 * @function Dropbox#teamGroupsMembersRemove
 * @arg {TeamGroupMembersRemoveArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamGroupMembersChangeResult>, Error.<TeamGroupMembersRemoveError>>}
 */


routes.teamGroupsMembersRemove = function (arg) {
  return this.request('team/groups/members/remove', arg, 'team', 'api', 'rpc');
};
/**
 * Sets a member's access type in a group. Permission : Team member management.
 * @function Dropbox#teamGroupsMembersSetAccessType
 * @arg {TeamGroupMembersSetAccessTypeArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<Object>, Error.<TeamGroupMemberSetAccessTypeError>>}
 */


routes.teamGroupsMembersSetAccessType = function (arg) {
  return this.request('team/groups/members/set_access_type', arg, 'team', 'api', 'rpc');
};
/**
 * Updates a group's name and/or external ID. Permission : Team member
 * management.
 * @function Dropbox#teamGroupsUpdate
 * @arg {TeamGroupUpdateArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamGroupFullInfo>, Error.<TeamGroupUpdateError>>}
 */


routes.teamGroupsUpdate = function (arg) {
  return this.request('team/groups/update', arg, 'team', 'api', 'rpc');
};
/**
 * Creates new legal hold policy. Note: Legal Holds is a paid add-on. Not all
 * teams have the feature. Permission : Team member file access.
 * @function Dropbox#teamLegalHoldsCreatePolicy
 * @arg {TeamLegalHoldsPolicyCreateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<Object>, Error.<TeamLegalHoldsPolicyCreateError>>}
 */


routes.teamLegalHoldsCreatePolicy = function (arg) {
  return this.request('team/legal_holds/create_policy', arg, 'team', 'api', 'rpc');
};
/**
 * Gets a legal hold by Id. Note: Legal Holds is a paid add-on. Not all teams
 * have the feature. Permission : Team member file access.
 * @function Dropbox#teamLegalHoldsGetPolicy
 * @arg {TeamLegalHoldsGetPolicyArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<Object>, Error.<TeamLegalHoldsGetPolicyError>>}
 */


routes.teamLegalHoldsGetPolicy = function (arg) {
  return this.request('team/legal_holds/get_policy', arg, 'team', 'api', 'rpc');
};
/**
 * List the file metadata that's under the hold. Note: Legal Holds is a paid
 * add-on. Not all teams have the feature. Permission : Team member file access.
 * @function Dropbox#teamLegalHoldsListHeldRevisions
 * @arg {TeamLegalHoldsListHeldRevisionsArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamLegalHoldsListHeldRevisionResult>, Error.<TeamLegalHoldsListHeldRevisionsError>>}
 */


routes.teamLegalHoldsListHeldRevisions = function (arg) {
  return this.request('team/legal_holds/list_held_revisions', arg, 'team', 'api', 'rpc');
};
/**
 * Continue listing the file metadata that's under the hold. Note: Legal Holds
 * is a paid add-on. Not all teams have the feature. Permission : Team member
 * file access.
 * @function Dropbox#teamLegalHoldsListHeldRevisionsContinue
 * @arg {TeamLegalHoldsListHeldRevisionsContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamLegalHoldsListHeldRevisionResult>, Error.<TeamLegalHoldsListHeldRevisionsError>>}
 */


routes.teamLegalHoldsListHeldRevisionsContinue = function (arg) {
  return this.request('team/legal_holds/list_held_revisions_continue', arg, 'team', 'api', 'rpc');
};
/**
 * Lists legal holds on a team. Note: Legal Holds is a paid add-on. Not all
 * teams have the feature. Permission : Team member file access.
 * @function Dropbox#teamLegalHoldsListPolicies
 * @arg {TeamLegalHoldsListPoliciesArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamLegalHoldsListPoliciesResult>, Error.<TeamLegalHoldsListPoliciesError>>}
 */


routes.teamLegalHoldsListPolicies = function (arg) {
  return this.request('team/legal_holds/list_policies', arg, 'team', 'api', 'rpc');
};
/**
 * Releases a legal hold by Id. Note: Legal Holds is a paid add-on. Not all
 * teams have the feature. Permission : Team member file access.
 * @function Dropbox#teamLegalHoldsReleasePolicy
 * @arg {TeamLegalHoldsPolicyReleaseArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<TeamLegalHoldsPolicyReleaseError>>}
 */


routes.teamLegalHoldsReleasePolicy = function (arg) {
  return this.request('team/legal_holds/release_policy', arg, 'team', 'api', 'rpc');
};
/**
 * Updates a legal hold. Note: Legal Holds is a paid add-on. Not all teams have
 * the feature. Permission : Team member file access.
 * @function Dropbox#teamLegalHoldsUpdatePolicy
 * @arg {TeamLegalHoldsPolicyUpdateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<Object>, Error.<TeamLegalHoldsPolicyUpdateError>>}
 */


routes.teamLegalHoldsUpdatePolicy = function (arg) {
  return this.request('team/legal_holds/update_policy', arg, 'team', 'api', 'rpc');
};
/**
 * List all linked applications of the team member. Note, this endpoint does not
 * list any team-linked applications.
 * @function Dropbox#teamLinkedAppsListMemberLinkedApps
 * @arg {TeamListMemberAppsArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamListMemberAppsResult>, Error.<TeamListMemberAppsError>>}
 */


routes.teamLinkedAppsListMemberLinkedApps = function (arg) {
  return this.request('team/linked_apps/list_member_linked_apps', arg, 'team', 'api', 'rpc');
};
/**
 * List all applications linked to the team members' accounts. Note, this
 * endpoint does not list any team-linked applications.
 * @function Dropbox#teamLinkedAppsListMembersLinkedApps
 * @arg {TeamListMembersAppsArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamListMembersAppsResult>, Error.<TeamListMembersAppsError>>}
 */


routes.teamLinkedAppsListMembersLinkedApps = function (arg) {
  return this.request('team/linked_apps/list_members_linked_apps', arg, 'team', 'api', 'rpc');
};
/**
 * List all applications linked to the team members' accounts. Note, this
 * endpoint doesn't list any team-linked applications.
 * @function Dropbox#teamLinkedAppsListTeamLinkedApps
 * @deprecated
 * @arg {TeamListTeamAppsArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamListTeamAppsResult>, Error.<TeamListTeamAppsError>>}
 */


routes.teamLinkedAppsListTeamLinkedApps = function (arg) {
  return this.request('team/linked_apps/list_team_linked_apps', arg, 'team', 'api', 'rpc');
};
/**
 * Revoke a linked application of the team member.
 * @function Dropbox#teamLinkedAppsRevokeLinkedApp
 * @arg {TeamRevokeLinkedApiAppArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<TeamRevokeLinkedAppError>>}
 */


routes.teamLinkedAppsRevokeLinkedApp = function (arg) {
  return this.request('team/linked_apps/revoke_linked_app', arg, 'team', 'api', 'rpc');
};
/**
 * Revoke a list of linked applications of the team members.
 * @function Dropbox#teamLinkedAppsRevokeLinkedAppBatch
 * @arg {TeamRevokeLinkedApiAppBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamRevokeLinkedAppBatchResult>, Error.<TeamRevokeLinkedAppBatchError>>}
 */


routes.teamLinkedAppsRevokeLinkedAppBatch = function (arg) {
  return this.request('team/linked_apps/revoke_linked_app_batch', arg, 'team', 'api', 'rpc');
};
/**
 * Add users to member space limits excluded users list.
 * @function Dropbox#teamMemberSpaceLimitsExcludedUsersAdd
 * @arg {TeamExcludedUsersUpdateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamExcludedUsersUpdateResult>, Error.<TeamExcludedUsersUpdateError>>}
 */


routes.teamMemberSpaceLimitsExcludedUsersAdd = function (arg) {
  return this.request('team/member_space_limits/excluded_users/add', arg, 'team', 'api', 'rpc');
};
/**
 * List member space limits excluded users.
 * @function Dropbox#teamMemberSpaceLimitsExcludedUsersList
 * @arg {TeamExcludedUsersListArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamExcludedUsersListResult>, Error.<TeamExcludedUsersListError>>}
 */


routes.teamMemberSpaceLimitsExcludedUsersList = function (arg) {
  return this.request('team/member_space_limits/excluded_users/list', arg, 'team', 'api', 'rpc');
};
/**
 * Continue listing member space limits excluded users.
 * @function Dropbox#teamMemberSpaceLimitsExcludedUsersListContinue
 * @arg {TeamExcludedUsersListContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamExcludedUsersListResult>, Error.<TeamExcludedUsersListContinueError>>}
 */


routes.teamMemberSpaceLimitsExcludedUsersListContinue = function (arg) {
  return this.request('team/member_space_limits/excluded_users/list/continue', arg, 'team', 'api', 'rpc');
};
/**
 * Remove users from member space limits excluded users list.
 * @function Dropbox#teamMemberSpaceLimitsExcludedUsersRemove
 * @arg {TeamExcludedUsersUpdateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamExcludedUsersUpdateResult>, Error.<TeamExcludedUsersUpdateError>>}
 */


routes.teamMemberSpaceLimitsExcludedUsersRemove = function (arg) {
  return this.request('team/member_space_limits/excluded_users/remove', arg, 'team', 'api', 'rpc');
};
/**
 * Get users custom quota. Returns none as the custom quota if none was set. A
 * maximum of 1000 members can be specified in a single call.
 * @function Dropbox#teamMemberSpaceLimitsGetCustomQuota
 * @arg {TeamCustomQuotaUsersArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<Array.<TeamCustomQuotaResult>>, Error.<TeamCustomQuotaError>>}
 */


routes.teamMemberSpaceLimitsGetCustomQuota = function (arg) {
  return this.request('team/member_space_limits/get_custom_quota', arg, 'team', 'api', 'rpc');
};
/**
 * Remove users custom quota. A maximum of 1000 members can be specified in a
 * single call.
 * @function Dropbox#teamMemberSpaceLimitsRemoveCustomQuota
 * @arg {TeamCustomQuotaUsersArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<Array.<TeamRemoveCustomQuotaResult>>, Error.<TeamCustomQuotaError>>}
 */


routes.teamMemberSpaceLimitsRemoveCustomQuota = function (arg) {
  return this.request('team/member_space_limits/remove_custom_quota', arg, 'team', 'api', 'rpc');
};
/**
 * Set users custom quota. Custom quota has to be at least 15GB. A maximum of
 * 1000 members can be specified in a single call.
 * @function Dropbox#teamMemberSpaceLimitsSetCustomQuota
 * @arg {TeamSetCustomQuotaArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<Array.<TeamCustomQuotaResult>>, Error.<TeamSetCustomQuotaError>>}
 */


routes.teamMemberSpaceLimitsSetCustomQuota = function (arg) {
  return this.request('team/member_space_limits/set_custom_quota', arg, 'team', 'api', 'rpc');
};
/**
 * Adds members to a team. Permission : Team member management A maximum of 20
 * members can be specified in a single call. If no Dropbox account exists with
 * the email address specified, a new Dropbox account will be created with the
 * given email address, and that account will be invited to the team. If a
 * personal Dropbox account exists with the email address specified in the call,
 * this call will create a placeholder Dropbox account for the user on the team
 * and send an email inviting the user to migrate their existing personal
 * account onto the team. Team member management apps are required to set an
 * initial given_name and surname for a user to use in the team invitation and
 * for 'Perform as team member' actions taken on the user before they become
 * 'active'.
 * @function Dropbox#teamMembersAdd
 * @arg {TeamMembersAddArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamMembersAddLaunch>, Error.<void>>}
 */


routes.teamMembersAdd = function (arg) {
  return this.request('team/members/add', arg, 'team', 'api', 'rpc');
};
/**
 * Once an async_job_id is returned from members/add , use this to poll the
 * status of the asynchronous request. Permission : Team member management.
 * @function Dropbox#teamMembersAddJobStatusGet
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamMembersAddJobStatus>, Error.<AsyncPollError>>}
 */


routes.teamMembersAddJobStatusGet = function (arg) {
  return this.request('team/members/add/job_status/get', arg, 'team', 'api', 'rpc');
};
/**
 * Deletes a team member's profile photo. Permission : Team member management.
 * @function Dropbox#teamMembersDeleteProfilePhoto
 * @arg {TeamMembersDeleteProfilePhotoArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamTeamMemberInfo>, Error.<TeamMembersDeleteProfilePhotoError>>}
 */


routes.teamMembersDeleteProfilePhoto = function (arg) {
  return this.request('team/members/delete_profile_photo', arg, 'team', 'api', 'rpc');
};
/**
 * Returns information about multiple team members. Permission : Team
 * information This endpoint will return MembersGetInfoItem.id_not_found, for
 * IDs (or emails) that cannot be matched to a valid team member.
 * @function Dropbox#teamMembersGetInfo
 * @arg {TeamMembersGetInfoArgs} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<Object>, Error.<TeamMembersGetInfoError>>}
 */


routes.teamMembersGetInfo = function (arg) {
  return this.request('team/members/get_info', arg, 'team', 'api', 'rpc');
};
/**
 * Lists members of a team. Permission : Team information.
 * @function Dropbox#teamMembersList
 * @arg {TeamMembersListArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamMembersListResult>, Error.<TeamMembersListError>>}
 */


routes.teamMembersList = function (arg) {
  return this.request('team/members/list', arg, 'team', 'api', 'rpc');
};
/**
 * Once a cursor has been retrieved from members/list, use this to paginate
 * through all team members. Permission : Team information.
 * @function Dropbox#teamMembersListContinue
 * @arg {TeamMembersListContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamMembersListResult>, Error.<TeamMembersListContinueError>>}
 */


routes.teamMembersListContinue = function (arg) {
  return this.request('team/members/list/continue', arg, 'team', 'api', 'rpc');
};
/**
 * Moves removed member's files to a different member. This endpoint initiates
 * an asynchronous job. To obtain the final result of the job, the client should
 * periodically poll members/move_former_member_files/job_status/check.
 * Permission : Team member management.
 * @function Dropbox#teamMembersMoveFormerMemberFiles
 * @arg {TeamMembersDataTransferArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<AsyncLaunchEmptyResult>, Error.<TeamMembersTransferFormerMembersFilesError>>}
 */


routes.teamMembersMoveFormerMemberFiles = function (arg) {
  return this.request('team/members/move_former_member_files', arg, 'team', 'api', 'rpc');
};
/**
 * Once an async_job_id is returned from members/move_former_member_files , use
 * this to poll the status of the asynchronous request. Permission : Team member
 * management.
 * @function Dropbox#teamMembersMoveFormerMemberFilesJobStatusCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<AsyncPollEmptyResult>, Error.<AsyncPollError>>}
 */


routes.teamMembersMoveFormerMemberFilesJobStatusCheck = function (arg) {
  return this.request('team/members/move_former_member_files/job_status/check', arg, 'team', 'api', 'rpc');
};
/**
 * Recover a deleted member. Permission : Team member management Exactly one of
 * team_member_id, email, or external_id must be provided to identify the user
 * account.
 * @function Dropbox#teamMembersRecover
 * @arg {TeamMembersRecoverArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<TeamMembersRecoverError>>}
 */


routes.teamMembersRecover = function (arg) {
  return this.request('team/members/recover', arg, 'team', 'api', 'rpc');
};
/**
 * Removes a member from a team. Permission : Team member management Exactly one
 * of team_member_id, email, or external_id must be provided to identify the
 * user account. Accounts can be recovered via members/recover for a 7 day
 * period or until the account has been permanently deleted or transferred to
 * another account (whichever comes first). Calling members/add while a user is
 * still recoverable on your team will return with
 * MemberAddResult.user_already_on_team. Accounts can have their files
 * transferred via the admin console for a limited time, based on the version
 * history length associated with the team (180 days for most teams). This
 * endpoint may initiate an asynchronous job. To obtain the final result of the
 * job, the client should periodically poll members/remove/job_status/get.
 * @function Dropbox#teamMembersRemove
 * @arg {TeamMembersRemoveArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<AsyncLaunchEmptyResult>, Error.<TeamMembersRemoveError>>}
 */


routes.teamMembersRemove = function (arg) {
  return this.request('team/members/remove', arg, 'team', 'api', 'rpc');
};
/**
 * Once an async_job_id is returned from members/remove , use this to poll the
 * status of the asynchronous request. Permission : Team member management.
 * @function Dropbox#teamMembersRemoveJobStatusGet
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<AsyncPollEmptyResult>, Error.<AsyncPollError>>}
 */


routes.teamMembersRemoveJobStatusGet = function (arg) {
  return this.request('team/members/remove/job_status/get', arg, 'team', 'api', 'rpc');
};
/**
 * Add secondary emails to users. Permission : Team member management. Emails
 * that are on verified domains will be verified automatically. For each email
 * address not on a verified domain a verification email will be sent.
 * @function Dropbox#teamMembersSecondaryEmailsAdd
 * @arg {TeamAddSecondaryEmailsArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamAddSecondaryEmailsResult>, Error.<TeamAddSecondaryEmailsError>>}
 */


routes.teamMembersSecondaryEmailsAdd = function (arg) {
  return this.request('team/members/secondary_emails/add', arg, 'team', 'api', 'rpc');
};
/**
 * Delete secondary emails from users Permission : Team member management. Users
 * will be notified of deletions of verified secondary emails at both the
 * secondary email and their primary email.
 * @function Dropbox#teamMembersSecondaryEmailsDelete
 * @arg {TeamDeleteSecondaryEmailsArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamDeleteSecondaryEmailsResult>, Error.<void>>}
 */


routes.teamMembersSecondaryEmailsDelete = function (arg) {
  return this.request('team/members/secondary_emails/delete', arg, 'team', 'api', 'rpc');
};
/**
 * Resend secondary email verification emails. Permission : Team member
 * management.
 * @function Dropbox#teamMembersSecondaryEmailsResendVerificationEmails
 * @arg {TeamResendVerificationEmailArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamResendVerificationEmailResult>, Error.<void>>}
 */


routes.teamMembersSecondaryEmailsResendVerificationEmails = function (arg) {
  return this.request('team/members/secondary_emails/resend_verification_emails', arg, 'team', 'api', 'rpc');
};
/**
 * Sends welcome email to pending team member. Permission : Team member
 * management Exactly one of team_member_id, email, or external_id must be
 * provided to identify the user account. No-op if team member is not pending.
 * @function Dropbox#teamMembersSendWelcomeEmail
 * @arg {TeamUserSelectorArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<TeamMembersSendWelcomeError>>}
 */


routes.teamMembersSendWelcomeEmail = function (arg) {
  return this.request('team/members/send_welcome_email', arg, 'team', 'api', 'rpc');
};
/**
 * Updates a team member's permissions. Permission : Team member management.
 * @function Dropbox#teamMembersSetAdminPermissions
 * @arg {TeamMembersSetPermissionsArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamMembersSetPermissionsResult>, Error.<TeamMembersSetPermissionsError>>}
 */


routes.teamMembersSetAdminPermissions = function (arg) {
  return this.request('team/members/set_admin_permissions', arg, 'team', 'api', 'rpc');
};
/**
 * Updates a team member's profile. Permission : Team member management.
 * @function Dropbox#teamMembersSetProfile
 * @arg {TeamMembersSetProfileArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamTeamMemberInfo>, Error.<TeamMembersSetProfileError>>}
 */


routes.teamMembersSetProfile = function (arg) {
  return this.request('team/members/set_profile', arg, 'team', 'api', 'rpc');
};
/**
 * Updates a team member's profile photo. Permission : Team member management.
 * @function Dropbox#teamMembersSetProfilePhoto
 * @arg {TeamMembersSetProfilePhotoArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamTeamMemberInfo>, Error.<TeamMembersSetProfilePhotoError>>}
 */


routes.teamMembersSetProfilePhoto = function (arg) {
  return this.request('team/members/set_profile_photo', arg, 'team', 'api', 'rpc');
};
/**
 * Suspend a member from a team. Permission : Team member management Exactly one
 * of team_member_id, email, or external_id must be provided to identify the
 * user account.
 * @function Dropbox#teamMembersSuspend
 * @arg {TeamMembersDeactivateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<TeamMembersSuspendError>>}
 */


routes.teamMembersSuspend = function (arg) {
  return this.request('team/members/suspend', arg, 'team', 'api', 'rpc');
};
/**
 * Unsuspend a member from a team. Permission : Team member management Exactly
 * one of team_member_id, email, or external_id must be provided to identify the
 * user account.
 * @function Dropbox#teamMembersUnsuspend
 * @arg {TeamMembersUnsuspendArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<TeamMembersUnsuspendError>>}
 */


routes.teamMembersUnsuspend = function (arg) {
  return this.request('team/members/unsuspend', arg, 'team', 'api', 'rpc');
};
/**
 * Returns a list of all team-accessible namespaces. This list includes team
 * folders, shared folders containing team members, team members' home
 * namespaces, and team members' app folders. Home namespaces and app folders
 * are always owned by this team or members of the team, but shared folders may
 * be owned by other users or other teams. Duplicates may occur in the list.
 * @function Dropbox#teamNamespacesList
 * @arg {TeamTeamNamespacesListArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamTeamNamespacesListResult>, Error.<TeamTeamNamespacesListError>>}
 */


routes.teamNamespacesList = function (arg) {
  return this.request('team/namespaces/list', arg, 'team', 'api', 'rpc');
};
/**
 * Once a cursor has been retrieved from namespaces/list, use this to paginate
 * through all team-accessible namespaces. Duplicates may occur in the list.
 * @function Dropbox#teamNamespacesListContinue
 * @arg {TeamTeamNamespacesListContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamTeamNamespacesListResult>, Error.<TeamTeamNamespacesListContinueError>>}
 */


routes.teamNamespacesListContinue = function (arg) {
  return this.request('team/namespaces/list/continue', arg, 'team', 'api', 'rpc');
};
/**
 * Permission : Team member file access.
 * @function Dropbox#teamPropertiesTemplateAdd
 * @deprecated
 * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilePropertiesAddTemplateResult>, Error.<FilePropertiesModifyTemplateError>>}
 */


routes.teamPropertiesTemplateAdd = function (arg) {
  return this.request('team/properties/template/add', arg, 'team', 'api', 'rpc');
};
/**
 * Permission : Team member file access.
 * @function Dropbox#teamPropertiesTemplateGet
 * @deprecated
 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilePropertiesGetTemplateResult>, Error.<FilePropertiesTemplateError>>}
 */


routes.teamPropertiesTemplateGet = function (arg) {
  return this.request('team/properties/template/get', arg, 'team', 'api', 'rpc');
};
/**
 * Permission : Team member file access.
 * @function Dropbox#teamPropertiesTemplateList
 * @deprecated
 * @returns {Promise.<DropboxResponse<FilePropertiesListTemplateResult>, Error.<FilePropertiesTemplateError>>}
 */


routes.teamPropertiesTemplateList = function () {
  return this.request('team/properties/template/list', null, 'team', 'api', 'rpc');
};
/**
 * Permission : Team member file access.
 * @function Dropbox#teamPropertiesTemplateUpdate
 * @deprecated
 * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<FilePropertiesUpdateTemplateResult>, Error.<FilePropertiesModifyTemplateError>>}
 */


routes.teamPropertiesTemplateUpdate = function (arg) {
  return this.request('team/properties/template/update', arg, 'team', 'api', 'rpc');
};
/**
 * Retrieves reporting data about a team's user activity.
 * @function Dropbox#teamReportsGetActivity
 * @deprecated
 * @arg {TeamDateRange} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamGetActivityReport>, Error.<TeamDateRangeError>>}
 */


routes.teamReportsGetActivity = function (arg) {
  return this.request('team/reports/get_activity', arg, 'team', 'api', 'rpc');
};
/**
 * Retrieves reporting data about a team's linked devices.
 * @function Dropbox#teamReportsGetDevices
 * @deprecated
 * @arg {TeamDateRange} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamGetDevicesReport>, Error.<TeamDateRangeError>>}
 */


routes.teamReportsGetDevices = function (arg) {
  return this.request('team/reports/get_devices', arg, 'team', 'api', 'rpc');
};
/**
 * Retrieves reporting data about a team's membership.
 * @function Dropbox#teamReportsGetMembership
 * @deprecated
 * @arg {TeamDateRange} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamGetMembershipReport>, Error.<TeamDateRangeError>>}
 */


routes.teamReportsGetMembership = function (arg) {
  return this.request('team/reports/get_membership', arg, 'team', 'api', 'rpc');
};
/**
 * Retrieves reporting data about a team's storage usage.
 * @function Dropbox#teamReportsGetStorage
 * @deprecated
 * @arg {TeamDateRange} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamGetStorageReport>, Error.<TeamDateRangeError>>}
 */


routes.teamReportsGetStorage = function (arg) {
  return this.request('team/reports/get_storage', arg, 'team', 'api', 'rpc');
};
/**
 * Sets an archived team folder's status to active. Permission : Team member
 * file access.
 * @function Dropbox#teamTeamFolderActivate
 * @arg {TeamTeamFolderIdArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamTeamFolderMetadata>, Error.<TeamTeamFolderActivateError>>}
 */


routes.teamTeamFolderActivate = function (arg) {
  return this.request('team/team_folder/activate', arg, 'team', 'api', 'rpc');
};
/**
 * Sets an active team folder's status to archived and removes all folder and
 * file members. Permission : Team member file access.
 * @function Dropbox#teamTeamFolderArchive
 * @arg {TeamTeamFolderArchiveArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamTeamFolderArchiveLaunch>, Error.<TeamTeamFolderArchiveError>>}
 */


routes.teamTeamFolderArchive = function (arg) {
  return this.request('team/team_folder/archive', arg, 'team', 'api', 'rpc');
};
/**
 * Returns the status of an asynchronous job for archiving a team folder.
 * Permission : Team member file access.
 * @function Dropbox#teamTeamFolderArchiveCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamTeamFolderArchiveJobStatus>, Error.<AsyncPollError>>}
 */


routes.teamTeamFolderArchiveCheck = function (arg) {
  return this.request('team/team_folder/archive/check', arg, 'team', 'api', 'rpc');
};
/**
 * Creates a new, active, team folder with no members. Permission : Team member
 * file access.
 * @function Dropbox#teamTeamFolderCreate
 * @arg {TeamTeamFolderCreateArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamTeamFolderMetadata>, Error.<TeamTeamFolderCreateError>>}
 */


routes.teamTeamFolderCreate = function (arg) {
  return this.request('team/team_folder/create', arg, 'team', 'api', 'rpc');
};
/**
 * Retrieves metadata for team folders. Permission : Team member file access.
 * @function Dropbox#teamTeamFolderGetInfo
 * @arg {TeamTeamFolderIdListArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<Array.<TeamTeamFolderGetInfoItem>>, Error.<void>>}
 */


routes.teamTeamFolderGetInfo = function (arg) {
  return this.request('team/team_folder/get_info', arg, 'team', 'api', 'rpc');
};
/**
 * Lists all team folders. Permission : Team member file access.
 * @function Dropbox#teamTeamFolderList
 * @arg {TeamTeamFolderListArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamTeamFolderListResult>, Error.<TeamTeamFolderListError>>}
 */


routes.teamTeamFolderList = function (arg) {
  return this.request('team/team_folder/list', arg, 'team', 'api', 'rpc');
};
/**
 * Once a cursor has been retrieved from team_folder/list, use this to paginate
 * through all team folders. Permission : Team member file access.
 * @function Dropbox#teamTeamFolderListContinue
 * @arg {TeamTeamFolderListContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamTeamFolderListResult>, Error.<TeamTeamFolderListContinueError>>}
 */


routes.teamTeamFolderListContinue = function (arg) {
  return this.request('team/team_folder/list/continue', arg, 'team', 'api', 'rpc');
};
/**
 * Permanently deletes an archived team folder. Permission : Team member file
 * access.
 * @function Dropbox#teamTeamFolderPermanentlyDelete
 * @arg {TeamTeamFolderIdArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<void>, Error.<TeamTeamFolderPermanentlyDeleteError>>}
 */


routes.teamTeamFolderPermanentlyDelete = function (arg) {
  return this.request('team/team_folder/permanently_delete', arg, 'team', 'api', 'rpc');
};
/**
 * Changes an active team folder's name. Permission : Team member file access.
 * @function Dropbox#teamTeamFolderRename
 * @arg {TeamTeamFolderRenameArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamTeamFolderMetadata>, Error.<TeamTeamFolderRenameError>>}
 */


routes.teamTeamFolderRename = function (arg) {
  return this.request('team/team_folder/rename', arg, 'team', 'api', 'rpc');
};
/**
 * Updates the sync settings on a team folder or its contents.  Use of this
 * endpoint requires that the team has team selective sync enabled.
 * @function Dropbox#teamTeamFolderUpdateSyncSettings
 * @arg {TeamTeamFolderUpdateSyncSettingsArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamTeamFolderMetadata>, Error.<TeamTeamFolderUpdateSyncSettingsError>>}
 */


routes.teamTeamFolderUpdateSyncSettings = function (arg) {
  return this.request('team/team_folder/update_sync_settings', arg, 'team', 'api', 'rpc');
};
/**
 * Returns the member profile of the admin who generated the team access token
 * used to make the call.
 * @function Dropbox#teamTokenGetAuthenticatedAdmin
 * @returns {Promise.<DropboxResponse<TeamTokenGetAuthenticatedAdminResult>, Error.<TeamTokenGetAuthenticatedAdminError>>}
 */


routes.teamTokenGetAuthenticatedAdmin = function () {
  return this.request('team/token/get_authenticated_admin', null, 'team', 'api', 'rpc');
};
/**
 * Retrieves team events. If the result's GetTeamEventsResult.has_more field is
 * true, call get_events/continue with the returned cursor to retrieve more
 * entries. If end_time is not specified in your request, you may use the
 * returned cursor to poll get_events/continue for new events. Many attributes
 * note 'may be missing due to historical data gap'. Note that the
 * file_operations category and & analogous paper events are not available on
 * all Dropbox Business plans /business/plans-comparison. Use
 * features/get_values
 * /developers/documentation/http/teams#team-features-get_values to check for
 * this feature. Permission : Team Auditing.
 * @function Dropbox#teamLogGetEvents
 * @arg {TeamLogGetTeamEventsArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamLogGetTeamEventsResult>, Error.<TeamLogGetTeamEventsError>>}
 */


routes.teamLogGetEvents = function (arg) {
  return this.request('team_log/get_events', arg, 'team', 'api', 'rpc');
};
/**
 * Once a cursor has been retrieved from get_events, use this to paginate
 * through all events. Permission : Team Auditing.
 * @function Dropbox#teamLogGetEventsContinue
 * @arg {TeamLogGetTeamEventsContinueArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<TeamLogGetTeamEventsResult>, Error.<TeamLogGetTeamEventsContinueError>>}
 */


routes.teamLogGetEventsContinue = function (arg) {
  return this.request('team_log/get_events/continue', arg, 'team', 'api', 'rpc');
};
/**
 * Get a list of feature values that may be configured for the current account.
 * @function Dropbox#usersFeaturesGetValues
 * @arg {UsersUserFeaturesGetValuesBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<UsersUserFeaturesGetValuesBatchResult>, Error.<UsersUserFeaturesGetValuesBatchError>>}
 */


routes.usersFeaturesGetValues = function (arg) {
  return this.request('users/features/get_values', arg, 'user', 'api', 'rpc');
};
/**
 * Get information about a user's account.
 * @function Dropbox#usersGetAccount
 * @arg {UsersGetAccountArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<UsersBasicAccount>, Error.<UsersGetAccountError>>}
 */


routes.usersGetAccount = function (arg) {
  return this.request('users/get_account', arg, 'user', 'api', 'rpc');
};
/**
 * Get information about multiple user accounts.  At most 300 accounts may be
 * queried per request.
 * @function Dropbox#usersGetAccountBatch
 * @arg {UsersGetAccountBatchArg} arg - The request parameters.
 * @returns {Promise.<DropboxResponse<Object>, Error.<UsersGetAccountBatchError>>}
 */


routes.usersGetAccountBatch = function (arg) {
  return this.request('users/get_account_batch', arg, 'user', 'api', 'rpc');
};
/**
 * Get information about the current user's account.
 * @function Dropbox#usersGetCurrentAccount
 * @returns {Promise.<DropboxResponse<UsersFullAccount>, Error.<void>>}
 */


routes.usersGetCurrentAccount = function () {
  return this.request('users/get_current_account', null, 'user', 'api', 'rpc');
};
/**
 * Get the space usage information for the current user's account.
 * @function Dropbox#usersGetSpaceUsage
 * @returns {Promise.<DropboxResponse<UsersSpaceUsage>, Error.<void>>}
 */


routes.usersGetSpaceUsage = function () {
  return this.request('users/get_space_usage', null, 'user', 'api', 'rpc');
};

exports.routes = routes;

/***/ }),

/***/ 2361:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = undefined;

var _utils = __webpack_require__(59);

var _response = __webpack_require__(4201);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fetch;

if (typeof window !== 'undefined') {
  fetch = window.fetch.bind(window);
} else {
  fetch = __webpack_require__(467); // eslint-disable-line global-require
}

var crypto;

if (typeof window !== 'undefined') {
  crypto = window.crypto || window.msCrypto; // for IE11
} else {
  crypto = __webpack_require__(6417); // eslint-disable-line global-require
} // Expiration is 300 seconds but needs to be in milliseconds for Date object


var TokenExpirationBuffer = 300 * 1000;
var PKCELength = 128;
var TokenAccessTypes = ['legacy', 'offline', 'online'];
var GrantTypes = ['code', 'token'];
var IncludeGrantedScopes = ['none', 'user', 'team'];
var BaseAuthorizeUrl = 'https://www.dropbox.com/oauth2/authorize';
var BaseTokenUrl = 'https://api.dropboxapi.com/oauth2/token';
/**
 * @class DropboxAuth
 * @classdesc The DropboxAuth class that provides methods to manage, acquire, and refresh tokens.
 * @arg {Object} options
 * @arg {Function} [options.fetch] - fetch library for making requests.
 * @arg {String} [options.accessToken] - An access token for making authenticated
 * requests.
 * @arg {Date} [options.AccessTokenExpiresAt] - Date of the current access token's
 * expiration (if available)
 * @arg {String} [options.refreshToken] - A refresh token for retrieving access tokens
 * @arg {String} [options.clientId] - The client id for your app. Used to create
 * authentication URL.
 * @arg {String} [options.clientSecret] - The client secret for your app. Used to create
 * authentication URL and refresh access tokens.
 */

var DropboxAuth = /*#__PURE__*/function () {
  function DropboxAuth(options) {
    _classCallCheck(this, DropboxAuth);

    options = options || {};
    this.fetch = options.fetch || fetch;
    this.accessToken = options.accessToken;
    this.accessTokenExpiresAt = options.accessTokenExpiresAt;
    this.refreshToken = options.refreshToken;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
  }
  /**
   * Set the access token used to authenticate requests to the API.
   * @arg {String} accessToken - An access token
   * @returns {undefined}
   */


  _createClass(DropboxAuth, [{
    key: "setAccessToken",
    value: function setAccessToken(accessToken) {
      this.accessToken = accessToken;
    }
    /**
     * Get the access token
     * @returns {String} Access token
     */

  }, {
    key: "getAccessToken",
    value: function getAccessToken() {
      return this.accessToken;
    }
    /**
     * Set the client id, which is used to help gain an access token.
     * @arg {String} clientId - Your apps client id
     * @returns {undefined}
     */

  }, {
    key: "setClientId",
    value: function setClientId(clientId) {
      this.clientId = clientId;
    }
    /**
     * Get the client id
     * @returns {String} Client id
     */

  }, {
    key: "getClientId",
    value: function getClientId() {
      return this.clientId;
    }
    /**
     * Set the client secret
     * @arg {String} clientSecret - Your app's client secret
     * @returns {undefined}
     */

  }, {
    key: "setClientSecret",
    value: function setClientSecret(clientSecret) {
      this.clientSecret = clientSecret;
    }
    /**
     * Get the client secret
     * @returns {String} Client secret
     */

  }, {
    key: "getClientSecret",
    value: function getClientSecret() {
      return this.clientSecret;
    }
    /**
     * Gets the refresh token
     * @returns {String} Refresh token
     */

  }, {
    key: "getRefreshToken",
    value: function getRefreshToken() {
      return this.refreshToken;
    }
    /**
     * Sets the refresh token
     * @param refreshToken - A refresh token
     */

  }, {
    key: "setRefreshToken",
    value: function setRefreshToken(refreshToken) {
      this.refreshToken = refreshToken;
    }
    /**
     * Gets the access token's expiration date
     * @returns {Date} date of token expiration
     */

  }, {
    key: "getAccessTokenExpiresAt",
    value: function getAccessTokenExpiresAt() {
      return this.accessTokenExpiresAt;
    }
    /**
     * Sets the access token's expiration date
     * @param accessTokenExpiresAt - new expiration date
     */

  }, {
    key: "setAccessTokenExpiresAt",
    value: function setAccessTokenExpiresAt(accessTokenExpiresAt) {
      this.accessTokenExpiresAt = accessTokenExpiresAt;
    }
  }, {
    key: "generatePKCECodes",
    value: function generatePKCECodes() {
      var codeVerifier = crypto.randomBytes(PKCELength);
      codeVerifier = codeVerifier.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '').substr(0, 128);
      this.codeVerifier = codeVerifier;
      var encoder = new TextEncoder();
      var codeData = encoder.encode(codeVerifier);
      var codeChallenge = crypto.createHash('sha256').update(codeData).digest();
      codeChallenge = codeChallenge.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      this.codeChallenge = codeChallenge;
    }
    /**
     * Get a URL that can be used to authenticate users for the Dropbox API.
     * @arg {String} redirectUri - A URL to redirect the user to after
     * authenticating. This must be added to your app through the admin interface.
     * @arg {String} [state] - State that will be returned in the redirect URL to help
     * prevent cross site scripting attacks.
     * @arg {String} [authType] - auth type, defaults to 'token', other option is 'code'
     * @arg {String} [tokenAccessType] - type of token to request.  From the following:
     * null - creates a token with the app default (either legacy or online)
     * legacy - creates one long-lived token with no expiration
     * online - create one short-lived token with an expiration
     * offline - create one short-lived token with an expiration with a refresh token
     * @arg {Array<String>} [scope] - scopes to request for the grant
     * @arg {String} [includeGrantedScopes] - whether or not to include previously granted scopes.
     * From the following:
     * user - include user scopes in the grant
     * team - include team scopes in the grant
     * Note: if this user has never linked the app, include_granted_scopes must be None
     * @arg {boolean} [usePKCE] - Whether or not to use Sha256 based PKCE. PKCE should be only use on
     * client apps which doesn't call your server. It is less secure than non-PKCE flow but
     * can be used if you are unable to safely retrieve your app secret
     * @returns {String} Url to send user to for Dropbox API authentication
     */

  }, {
    key: "getAuthenticationUrl",
    value: function getAuthenticationUrl(redirectUri, state) {
      var authType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'token';
      var tokenAccessType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var scope = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var includeGrantedScopes = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'none';
      var usePKCE = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var clientId = this.getClientId();
      var baseUrl = BaseAuthorizeUrl;

      if (!clientId) {
        throw new Error('A client id is required. You can set the client id using .setClientId().');
      }

      if (authType !== 'code' && !redirectUri) {
        throw new Error('A redirect uri is required.');
      }

      if (!GrantTypes.includes(authType)) {
        throw new Error('Authorization type must be code or token');
      }

      if (tokenAccessType && !TokenAccessTypes.includes(tokenAccessType)) {
        throw new Error('Token Access Type must be legacy, offline, or online');
      }

      if (scope && !(scope instanceof Array)) {
        throw new Error('Scope must be an array of strings');
      }

      if (!IncludeGrantedScopes.includes(includeGrantedScopes)) {
        throw new Error('includeGrantedScopes must be none, user, or team');
      }

      var authUrl;

      if (authType === 'code') {
        authUrl = "".concat(baseUrl, "?response_type=code&client_id=").concat(clientId);
      } else {
        authUrl = "".concat(baseUrl, "?response_type=token&client_id=").concat(clientId);
      }

      if (redirectUri) {
        authUrl += "&redirect_uri=".concat(redirectUri);
      }

      if (state) {
        authUrl += "&state=".concat(state);
      }

      if (tokenAccessType) {
        authUrl += "&token_access_type=".concat(tokenAccessType);
      }

      if (scope) {
        authUrl += "&scope=".concat(scope.join(' '));
      }

      if (includeGrantedScopes !== 'none') {
        authUrl += "&include_granted_scopes=".concat(includeGrantedScopes);
      }

      if (usePKCE) {
        this.generatePKCECodes();
        authUrl += '&code_challenge_method=S256';
        authUrl += "&code_challenge=".concat(this.codeChallenge);
      }

      return authUrl;
    }
    /**
     * Get an OAuth2 access token from an OAuth2 Code.
     * @arg {String} redirectUri - A URL to redirect the user to after
     * authenticating. This must be added to your app through the admin interface.
     * @arg {String} code - An OAuth2 code.
    */

  }, {
    key: "getAccessTokenFromCode",
    value: function getAccessTokenFromCode(redirectUri, code) {
      var clientId = this.getClientId();
      var clientSecret = this.getClientSecret();

      if (!clientId) {
        throw new Error('A client id is required. You can set the client id using .setClientId().');
      }

      var path = BaseTokenUrl;
      path += '?grant_type=authorization_code';
      path += "&code=".concat(code);
      path += "&client_id=".concat(clientId);

      if (clientSecret) {
        path += "&client_secret=".concat(clientSecret);
      } else {
        if (!this.codeChallenge) {
          throw new Error('You must use PKCE when generating the authorization URL to not include a client secret');
        }

        path += "&code_verifier=".concat(this.codeVerifier);
      }

      if (redirectUri) {
        path += "&redirect_uri=".concat(redirectUri);
      }

      var fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      return this.fetch(path, fetchOptions).then(function (res) {
        return (0, _response.parseResponse)(res);
      });
    }
    /**
     * Checks if a token is needed, can be refreshed and if the token is expired.
     * If so, attempts to refresh access token
     * @returns {Promise<*>}
     */

  }, {
    key: "checkAndRefreshAccessToken",
    value: function checkAndRefreshAccessToken() {
      var canRefresh = this.getRefreshToken() && this.getClientId();
      var needsRefresh = this.getAccessTokenExpiresAt() && new Date(Date.now() + TokenExpirationBuffer) >= this.getAccessTokenExpiresAt();
      var needsToken = !this.getAccessToken();

      if ((needsRefresh || needsToken) && canRefresh) {
        return this.refreshAccessToken();
      }

      return Promise.resolve();
    }
    /**
     * Refreshes the access token using the refresh token, if available
     * @arg {Array<String>} scope - a subset of scopes from the original
     * refresh to acquire with an access token
     * @returns {Promise<*>}
     */

  }, {
    key: "refreshAccessToken",
    value: function refreshAccessToken() {
      var _this = this;

      var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var refreshUrl = BaseTokenUrl;
      var clientId = this.getClientId();
      var clientSecret = this.getClientSecret();

      if (!clientId) {
        throw new Error('A client id is required. You can set the client id using .setClientId().');
      }

      if (scope && !(scope instanceof Array)) {
        throw new Error('Scope must be an array of strings');
      }

      var headers = {};
      headers['Content-Type'] = 'application/json';
      refreshUrl += "?grant_type=refresh_token&refresh_token=".concat(this.getRefreshToken());
      refreshUrl += "&client_id=".concat(clientId);

      if (clientSecret) {
        refreshUrl += "&client_secret=".concat(clientSecret);
      }

      if (scope) {
        refreshUrl += "&scope=".concat(scope.join(' '));
      }

      var fetchOptions = {
        method: 'POST'
      };
      fetchOptions.headers = headers;
      return this.fetch(refreshUrl, fetchOptions).then(function (res) {
        return (0, _response.parseResponse)(res);
      }).then(function (res) {
        _this.setAccessToken(res.result.access_token);

        _this.setAccessTokenExpiresAt((0, _utils.getTokenExpiresAtDate)(res.result.expires_in));
      });
    }
    /**
     * An authentication process that works with cordova applications.
     * @param {successCallback} successCallback
     * @param {errorCallback} errorCallback
     */

  }, {
    key: "authenticateWithCordova",
    value: function authenticateWithCordova(successCallback, errorCallback) {
      var redirectUrl = 'https://www.dropbox.com/1/oauth2/redirect_receiver';
      var url = this.getAuthenticationUrl(redirectUrl);
      var removed = false;
      var browser = window.open(url, '_blank');

      function onLoadError(event) {
        if (event.code !== -999) {
          // Workaround to fix wrong behavior on cordova-plugin-inappbrowser
          // Try to avoid a browser crash on browser.close().
          window.setTimeout(function () {
            browser.close();
          }, 10);
          errorCallback();
        }
      }

      function onLoadStop(event) {
        var errorLabel = '&error=';
        var errorIndex = event.url.indexOf(errorLabel);

        if (errorIndex > -1) {
          // Try to avoid a browser crash on browser.close().
          window.setTimeout(function () {
            browser.close();
          }, 10);
          errorCallback();
        } else {
          var tokenLabel = '#access_token=';
          var tokenIndex = event.url.indexOf(tokenLabel);
          var tokenTypeIndex = event.url.indexOf('&token_type=');

          if (tokenIndex > -1) {
            tokenIndex += tokenLabel.length; // Try to avoid a browser crash on browser.close().

            window.setTimeout(function () {
              browser.close();
            }, 10);
            var accessToken = event.url.substring(tokenIndex, tokenTypeIndex);
            successCallback(accessToken);
          }
        }
      }

      function onExit() {
        if (removed) {
          return;
        }

        browser.removeEventListener('loaderror', onLoadError);
        browser.removeEventListener('loadstop', onLoadStop);
        browser.removeEventListener('exit', onExit);
        removed = true;
      }

      browser.addEventListener('loaderror', onLoadError);
      browser.addEventListener('loadstop', onLoadStop);
      browser.addEventListener('exit', onExit);
    }
  }]);

  return DropboxAuth;
}();

exports.default = DropboxAuth;

/***/ }),

/***/ 9478:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var RPC = exports.RPC = 'rpc';
var UPLOAD = exports.UPLOAD = 'upload';
var DOWNLOAD = exports.DOWNLOAD = 'download';
var APP_AUTH = exports.APP_AUTH = 'app';
var USER_AUTH = exports.USER_AUTH = 'user';
var TEAM_AUTH = exports.TEAM_AUTH = 'team';
var NO_AUTH = exports.NO_AUTH = 'noauth';

/***/ }),

/***/ 6258:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = undefined;

var _constants = __webpack_require__(9478);

var _routes = __webpack_require__(9526);

var _auth = __webpack_require__(2361);

var _utils = __webpack_require__(59);

var _response = __webpack_require__(4201);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fetch;

if (typeof window !== 'undefined') {
  fetch = window.fetch.bind(window);
} else {
  fetch = __webpack_require__(467); // eslint-disable-line global-require
}

var b64 = typeof btoa === 'undefined' ? function (str) {
  return Buffer.from(str).toString('base64');
} : btoa;
/**
 * @class Dropbox
 * @classdesc The Dropbox SDK class that provides methods to read, write and
 * create files or folders in a user or team's Dropbox.
 * @arg {Object} options
 * @arg {Function} [options.fetch] - fetch library for making requests.
 * @arg {String} [options.selectUser] - Select user is only used for team functionality.
 * It specifies which user the team access token should be acting as.
 * @arg {String} [options.pathRoot] - root path to access other namespaces
 * Use to access team folders for example
 * @arg {String} [options.selectAdmin] - Select admin is only used by team functionality.
 * It specifies which team admin the team access token should be acting as.
 * @arg {DropboxAuth} [options.auth] - The DropboxAuth object used to authenticate requests.
 * If this is set, the remaining parameters will be ignored.
 * @arg {String} [options.accessToken] - An access token for making authenticated
 * requests.
 * @arg {Date} [options.AccessTokenExpiresAt] - Date of the current access token's
 * expiration (if available)
 * @arg {String} [options.refreshToken] - A refresh token for retrieving access tokens
 * @arg {String} [options.clientId] - The client id for your app. Used to create
 * authentication URL.
 * @arg {String} [options.clientSecret] - The client secret for your app. Used to create
 * authentication URL and refresh access tokens.
 */

var Dropbox = /*#__PURE__*/function () {
  function Dropbox(options) {
    _classCallCheck(this, Dropbox);

    options = options || {};

    if (options.auth) {
      this.auth = options.auth;
    } else {
      this.auth = new _auth["default"](options);
    }

    this.fetch = options.fetch || fetch;
    this.selectUser = options.selectUser;
    this.selectAdmin = options.selectAdmin;
    this.pathRoot = options.pathRoot;
    Object.assign(this, _routes.routes);
  }

  _createClass(Dropbox, [{
    key: "request",
    value: function request(path, args, auth, host, style) {
      switch (style) {
        case _constants.RPC:
          return this.rpcRequest(path, args, auth, host);

        case _constants.DOWNLOAD:
          return this.downloadRequest(path, args, auth, host);

        case _constants.UPLOAD:
          return this.uploadRequest(path, args, auth, host);

        default:
          throw new Error("Invalid request style: ".concat(style));
      }
    }
  }, {
    key: "rpcRequest",
    value: function rpcRequest(path, body, auth, host) {
      var _this = this;

      return this.auth.checkAndRefreshAccessToken().then(function () {
        var fetchOptions = {
          method: 'POST',
          body: body ? JSON.stringify(body) : null,
          headers: {}
        };

        if (body) {
          fetchOptions.headers['Content-Type'] = 'application/json';
        }

        var authHeader;

        switch (auth) {
          case _constants.APP_AUTH:
            if (!_this.auth.clientId || !_this.auth.clientSecret) {
              throw new Error('A client id and secret is required for this function');
            }

            authHeader = b64("".concat(_this.auth.clientId, ":").concat(_this.auth.clientSecret));
            fetchOptions.headers.Authorization = "Basic ".concat(authHeader);
            break;

          case _constants.TEAM_AUTH:
          case _constants.USER_AUTH:
            fetchOptions.headers.Authorization = "Bearer ".concat(_this.auth.getAccessToken());
            break;

          case _constants.NO_AUTH:
            break;

          default:
            throw new Error("Unhandled auth type: ".concat(auth));
        }

        _this.setCommonHeaders(fetchOptions);

        return fetchOptions;
      }).then(function (fetchOptions) {
        return _this.fetch((0, _utils.getBaseURL)(host) + path, fetchOptions);
      }).then(function (res) {
        return (0, _response.parseResponse)(res);
      });
    }
  }, {
    key: "downloadRequest",
    value: function downloadRequest(path, args, auth, host) {
      var _this2 = this;

      return this.auth.checkAndRefreshAccessToken().then(function () {
        if (auth !== _constants.USER_AUTH) {
          throw new Error("Unexpected auth type: ".concat(auth));
        }

        var fetchOptions = {
          method: 'POST',
          headers: {
            Authorization: "Bearer ".concat(_this2.auth.getAccessToken()),
            'Dropbox-API-Arg': (0, _utils.httpHeaderSafeJson)(args)
          }
        };

        _this2.setCommonHeaders(fetchOptions);

        return fetchOptions;
      }).then(function (fetchOptions) {
        return fetch((0, _utils.getBaseURL)(host) + path, fetchOptions);
      }).then(function (res) {
        return (0, _response.parseDownloadResponse)(res);
      });
    }
  }, {
    key: "uploadRequest",
    value: function uploadRequest(path, args, auth, host) {
      var _this3 = this;

      return this.auth.checkAndRefreshAccessToken().then(function () {
        if (auth !== _constants.USER_AUTH) {
          throw new Error("Unexpected auth type: ".concat(auth));
        }

        var contents = args.contents;
        delete args.contents;
        var fetchOptions = {
          body: contents,
          method: 'POST',
          headers: {
            Authorization: "Bearer ".concat(_this3.auth.getAccessToken()),
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': (0, _utils.httpHeaderSafeJson)(args)
          }
        };

        _this3.setCommonHeaders(fetchOptions);

        return fetchOptions;
      }).then(function (fetchOptions) {
        return _this3.fetch((0, _utils.getBaseURL)(host) + path, fetchOptions);
      }).then(function (res) {
        return (0, _response.parseResponse)(res);
      });
    }
  }, {
    key: "setCommonHeaders",
    value: function setCommonHeaders(options) {
      if (this.selectUser) {
        options.headers['Dropbox-API-Select-User'] = this.selectUser;
      }

      if (this.selectAdmin) {
        options.headers['Dropbox-API-Select-Admin'] = this.selectAdmin;
      }

      if (this.pathRoot) {
        options.headers['Dropbox-API-Path-Root'] = this.pathRoot;
      }
    }
  }]);

  return Dropbox;
}();

exports.default = Dropbox;

/***/ }),

/***/ 178:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * The response class of HTTP errors from API calls using the Dropbox SDK.
 */
var DropboxResponseError = /*#__PURE__*/exports.DropboxResponseError = function (_Error) {
  _inherits(DropboxResponseError, _Error);

  var _super = _createSuper(DropboxResponseError);

  function DropboxResponseError(status, headers, error) {
    var _this;

    _classCallCheck(this, DropboxResponseError);

    _this = _super.call(this, "Response failed with a ".concat(status, " code"));
    _this.name = 'DropboxResponseError';
    _this.status = status;
    _this.headers = headers;
    _this.error = error;
    return _this;
  }

  return DropboxResponseError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

/***/ }),

/***/ 4201:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DropboxResponse = undefined;
exports.parseResponse = parseResponse;
exports.parseDownloadResponse = parseDownloadResponse;

var _utils = __webpack_require__(59);

var _error = __webpack_require__(178);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DropboxResponse = exports.DropboxResponse = function DropboxResponse(status, headers, result) {
  _classCallCheck(this, DropboxResponse);

  this.status = status;
  this.headers = headers;
  this.result = result;
};

function throwAsError(res) {
  return res.text().then(function (data) {
    var errorObject;

    try {
      errorObject = JSON.parse(data);
    } catch (error) {
      errorObject = data;
    }

    throw new _error.DropboxResponseError(res.status, res.headers, errorObject);
  });
}

function parseResponse(res) {
  if (!res.ok) {
    return throwAsError(res);
  }

  return res.text().then(function (data) {
    var responseObject;

    try {
      responseObject = JSON.parse(data);
    } catch (error) {
      responseObject = data;
    }

    return new DropboxResponse(res.status, res.headers, responseObject);
  });
}

function parseDownloadResponse(res) {
  if (!res.ok) {
    return throwAsError(res);
  }

  return new Promise(function (resolve) {
    if ((0, _utils.isWindowOrWorker)()) {
      res.blob().then(function (data) {
        return resolve(data);
      });
    } else {
      res.buffer().then(function (data) {
        return resolve(data);
      });
    }
  }).then(function (data) {
    var result = JSON.parse(res.headers.get('dropbox-api-result'));

    if ((0, _utils.isWindowOrWorker)()) {
      result.fileBlob = data;
    } else {
      result.fileBinary = data;
    }

    return new DropboxResponse(res.status, res.headers, result);
  });
}

/***/ }),

/***/ 59:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getBaseURL = getBaseURL;
exports.httpHeaderSafeJson = httpHeaderSafeJson;
exports.getTokenExpiresAtDate = getTokenExpiresAtDate;
exports.isWindowOrWorker = isWindowOrWorker;

function getSafeUnicode(c) {
  var unicode = "000".concat(c.charCodeAt(0).toString(16)).slice(-4);
  return "\\u".concat(unicode);
}

function getBaseURL(host) {
  return "https://".concat(host, ".dropboxapi.com/2/");
} // source https://www.dropboxforum.com/t5/API-support/HTTP-header-quot-Dropbox-API-Arg-quot-could-not-decode-input-as/m-p/173823/highlight/true#M6786


function httpHeaderSafeJson(args) {
  return JSON.stringify(args).replace(/[\u007f-\uffff]/g, getSafeUnicode);
}

function getTokenExpiresAtDate(expiresIn) {
  return new Date(Date.now() + expiresIn * 1000);
}
/* global WorkerGlobalScope */


function isWindowOrWorker() {
  return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope // eslint-disable-line no-restricted-globals
  || "object" === 'undefined' || typeof window !== 'undefined';
}

/***/ }),

/***/ 3664:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const taskManager = __webpack_require__(2708);
const async_1 = __webpack_require__(5679);
const stream_1 = __webpack_require__(4630);
const sync_1 = __webpack_require__(2405);
const settings_1 = __webpack_require__(952);
const utils = __webpack_require__(5444);
async function FastGlob(source, options) {
    assertPatternsInput(source);
    const works = getWorks(source, async_1.default, options);
    const result = await Promise.all(works);
    return utils.array.flatten(result);
}
// https://github.com/typescript-eslint/typescript-eslint/issues/60
// eslint-disable-next-line no-redeclare
(function (FastGlob) {
    function sync(source, options) {
        assertPatternsInput(source);
        const works = getWorks(source, sync_1.default, options);
        return utils.array.flatten(works);
    }
    FastGlob.sync = sync;
    function stream(source, options) {
        assertPatternsInput(source);
        const works = getWorks(source, stream_1.default, options);
        /**
         * The stream returned by the provider cannot work with an asynchronous iterator.
         * To support asynchronous iterators, regardless of the number of tasks, we always multiplex streams.
         * This affects performance (+25%). I don't see best solution right now.
         */
        return utils.stream.merge(works);
    }
    FastGlob.stream = stream;
    function generateTasks(source, options) {
        assertPatternsInput(source);
        const patterns = [].concat(source);
        const settings = new settings_1.default(options);
        return taskManager.generate(patterns, settings);
    }
    FastGlob.generateTasks = generateTasks;
    function isDynamicPattern(source, options) {
        assertPatternsInput(source);
        const settings = new settings_1.default(options);
        return utils.pattern.isDynamicPattern(source, settings);
    }
    FastGlob.isDynamicPattern = isDynamicPattern;
    function escapePath(source) {
        assertPatternsInput(source);
        return utils.path.escape(source);
    }
    FastGlob.escapePath = escapePath;
})(FastGlob || (FastGlob = {}));
function getWorks(source, _Provider, options) {
    const patterns = [].concat(source);
    const settings = new settings_1.default(options);
    const tasks = taskManager.generate(patterns, settings);
    const provider = new _Provider(settings);
    return tasks.map(provider.read, provider);
}
function assertPatternsInput(input) {
    const source = [].concat(input);
    const isValidSource = source.every((item) => utils.string.isString(item) && !utils.string.isEmpty(item));
    if (!isValidSource) {
        throw new TypeError('Patterns must be a string (non empty) or an array of strings');
    }
}
module.exports = FastGlob;


/***/ }),

/***/ 2708:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertPatternGroupToTask = exports.convertPatternGroupsToTasks = exports.groupPatternsByBaseDirectory = exports.getNegativePatternsAsPositive = exports.getPositivePatterns = exports.convertPatternsToTasks = exports.generate = void 0;
const utils = __webpack_require__(5444);
function generate(patterns, settings) {
    const positivePatterns = getPositivePatterns(patterns);
    const negativePatterns = getNegativePatternsAsPositive(patterns, settings.ignore);
    const staticPatterns = positivePatterns.filter((pattern) => utils.pattern.isStaticPattern(pattern, settings));
    const dynamicPatterns = positivePatterns.filter((pattern) => utils.pattern.isDynamicPattern(pattern, settings));
    const staticTasks = convertPatternsToTasks(staticPatterns, negativePatterns, /* dynamic */ false);
    const dynamicTasks = convertPatternsToTasks(dynamicPatterns, negativePatterns, /* dynamic */ true);
    return staticTasks.concat(dynamicTasks);
}
exports.generate = generate;
function convertPatternsToTasks(positive, negative, dynamic) {
    const positivePatternsGroup = groupPatternsByBaseDirectory(positive);
    // When we have a global group – there is no reason to divide the patterns into independent tasks.
    // In this case, the global task covers the rest.
    if ('.' in positivePatternsGroup) {
        const task = convertPatternGroupToTask('.', positive, negative, dynamic);
        return [task];
    }
    return convertPatternGroupsToTasks(positivePatternsGroup, negative, dynamic);
}
exports.convertPatternsToTasks = convertPatternsToTasks;
function getPositivePatterns(patterns) {
    return utils.pattern.getPositivePatterns(patterns);
}
exports.getPositivePatterns = getPositivePatterns;
function getNegativePatternsAsPositive(patterns, ignore) {
    const negative = utils.pattern.getNegativePatterns(patterns).concat(ignore);
    const positive = negative.map(utils.pattern.convertToPositivePattern);
    return positive;
}
exports.getNegativePatternsAsPositive = getNegativePatternsAsPositive;
function groupPatternsByBaseDirectory(patterns) {
    const group = {};
    return patterns.reduce((collection, pattern) => {
        const base = utils.pattern.getBaseDirectory(pattern);
        if (base in collection) {
            collection[base].push(pattern);
        }
        else {
            collection[base] = [pattern];
        }
        return collection;
    }, group);
}
exports.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory;
function convertPatternGroupsToTasks(positive, negative, dynamic) {
    return Object.keys(positive).map((base) => {
        return convertPatternGroupToTask(base, positive[base], negative, dynamic);
    });
}
exports.convertPatternGroupsToTasks = convertPatternGroupsToTasks;
function convertPatternGroupToTask(base, positive, negative, dynamic) {
    return {
        dynamic,
        positive,
        negative,
        base,
        patterns: [].concat(positive, negative.map(utils.pattern.convertToNegativePattern))
    };
}
exports.convertPatternGroupToTask = convertPatternGroupToTask;


/***/ }),

/***/ 5679:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const stream_1 = __webpack_require__(2083);
const provider_1 = __webpack_require__(257);
class ProviderAsync extends provider_1.default {
    constructor() {
        super(...arguments);
        this._reader = new stream_1.default(this._settings);
    }
    read(task) {
        const root = this._getRootDirectory(task);
        const options = this._getReaderOptions(task);
        const entries = [];
        return new Promise((resolve, reject) => {
            const stream = this.api(root, task, options);
            stream.once('error', reject);
            stream.on('data', (entry) => entries.push(options.transform(entry)));
            stream.once('end', () => resolve(entries));
        });
    }
    api(root, task, options) {
        if (task.dynamic) {
            return this._reader.dynamic(root, options);
        }
        return this._reader.static(task.patterns, options);
    }
}
exports.default = ProviderAsync;


/***/ }),

/***/ 6983:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils = __webpack_require__(5444);
const partial_1 = __webpack_require__(5295);
class DeepFilter {
    constructor(_settings, _micromatchOptions) {
        this._settings = _settings;
        this._micromatchOptions = _micromatchOptions;
    }
    getFilter(basePath, positive, negative) {
        const matcher = this._getMatcher(positive);
        const negativeRe = this._getNegativePatternsRe(negative);
        return (entry) => this._filter(basePath, entry, matcher, negativeRe);
    }
    _getMatcher(patterns) {
        return new partial_1.default(patterns, this._settings, this._micromatchOptions);
    }
    _getNegativePatternsRe(patterns) {
        const affectDepthOfReadingPatterns = patterns.filter(utils.pattern.isAffectDepthOfReadingPattern);
        return utils.pattern.convertPatternsToRe(affectDepthOfReadingPatterns, this._micromatchOptions);
    }
    _filter(basePath, entry, matcher, negativeRe) {
        if (this._isSkippedByDeep(basePath, entry.path)) {
            return false;
        }
        if (this._isSkippedSymbolicLink(entry)) {
            return false;
        }
        const filepath = utils.path.removeLeadingDotSegment(entry.path);
        if (this._isSkippedByPositivePatterns(filepath, matcher)) {
            return false;
        }
        return this._isSkippedByNegativePatterns(filepath, negativeRe);
    }
    _isSkippedByDeep(basePath, entryPath) {
        /**
         * Avoid unnecessary depth calculations when it doesn't matter.
         */
        if (this._settings.deep === Infinity) {
            return false;
        }
        return this._getEntryLevel(basePath, entryPath) >= this._settings.deep;
    }
    _getEntryLevel(basePath, entryPath) {
        const entryPathDepth = entryPath.split('/').length;
        if (basePath === '') {
            return entryPathDepth;
        }
        const basePathDepth = basePath.split('/').length;
        return entryPathDepth - basePathDepth;
    }
    _isSkippedSymbolicLink(entry) {
        return !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink();
    }
    _isSkippedByPositivePatterns(entryPath, matcher) {
        return !this._settings.baseNameMatch && !matcher.match(entryPath);
    }
    _isSkippedByNegativePatterns(entryPath, patternsRe) {
        return !utils.pattern.matchAny(entryPath, patternsRe);
    }
}
exports.default = DeepFilter;


/***/ }),

/***/ 1343:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils = __webpack_require__(5444);
class EntryFilter {
    constructor(_settings, _micromatchOptions) {
        this._settings = _settings;
        this._micromatchOptions = _micromatchOptions;
        this.index = new Map();
    }
    getFilter(positive, negative) {
        const positiveRe = utils.pattern.convertPatternsToRe(positive, this._micromatchOptions);
        const negativeRe = utils.pattern.convertPatternsToRe(negative, this._micromatchOptions);
        return (entry) => this._filter(entry, positiveRe, negativeRe);
    }
    _filter(entry, positiveRe, negativeRe) {
        if (this._settings.unique && this._isDuplicateEntry(entry)) {
            return false;
        }
        if (this._onlyFileFilter(entry) || this._onlyDirectoryFilter(entry)) {
            return false;
        }
        if (this._isSkippedByAbsoluteNegativePatterns(entry.path, negativeRe)) {
            return false;
        }
        const filepath = this._settings.baseNameMatch ? entry.name : entry.path;
        const isMatched = this._isMatchToPatterns(filepath, positiveRe) && !this._isMatchToPatterns(entry.path, negativeRe);
        if (this._settings.unique && isMatched) {
            this._createIndexRecord(entry);
        }
        return isMatched;
    }
    _isDuplicateEntry(entry) {
        return this.index.has(entry.path);
    }
    _createIndexRecord(entry) {
        this.index.set(entry.path, undefined);
    }
    _onlyFileFilter(entry) {
        return this._settings.onlyFiles && !entry.dirent.isFile();
    }
    _onlyDirectoryFilter(entry) {
        return this._settings.onlyDirectories && !entry.dirent.isDirectory();
    }
    _isSkippedByAbsoluteNegativePatterns(entryPath, patternsRe) {
        if (!this._settings.absolute) {
            return false;
        }
        const fullpath = utils.path.makeAbsolute(this._settings.cwd, entryPath);
        return utils.pattern.matchAny(fullpath, patternsRe);
    }
    _isMatchToPatterns(entryPath, patternsRe) {
        const filepath = utils.path.removeLeadingDotSegment(entryPath);
        return utils.pattern.matchAny(filepath, patternsRe);
    }
}
exports.default = EntryFilter;


/***/ }),

/***/ 6654:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils = __webpack_require__(5444);
class ErrorFilter {
    constructor(_settings) {
        this._settings = _settings;
    }
    getFilter() {
        return (error) => this._isNonFatalError(error);
    }
    _isNonFatalError(error) {
        return utils.errno.isEnoentCodeError(error) || this._settings.suppressErrors;
    }
}
exports.default = ErrorFilter;


/***/ }),

/***/ 2576:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils = __webpack_require__(5444);
class Matcher {
    constructor(_patterns, _settings, _micromatchOptions) {
        this._patterns = _patterns;
        this._settings = _settings;
        this._micromatchOptions = _micromatchOptions;
        this._storage = [];
        this._fillStorage();
    }
    _fillStorage() {
        /**
         * The original pattern may include `{,*,**,a/*}`, which will lead to problems with matching (unresolved level).
         * So, before expand patterns with brace expansion into separated patterns.
         */
        const patterns = utils.pattern.expandPatternsWithBraceExpansion(this._patterns);
        for (const pattern of patterns) {
            const segments = this._getPatternSegments(pattern);
            const sections = this._splitSegmentsIntoSections(segments);
            this._storage.push({
                complete: sections.length <= 1,
                pattern,
                segments,
                sections
            });
        }
    }
    _getPatternSegments(pattern) {
        const parts = utils.pattern.getPatternParts(pattern, this._micromatchOptions);
        return parts.map((part) => {
            const dynamic = utils.pattern.isDynamicPattern(part, this._settings);
            if (!dynamic) {
                return {
                    dynamic: false,
                    pattern: part
                };
            }
            return {
                dynamic: true,
                pattern: part,
                patternRe: utils.pattern.makeRe(part, this._micromatchOptions)
            };
        });
    }
    _splitSegmentsIntoSections(segments) {
        return utils.array.splitWhen(segments, (segment) => segment.dynamic && utils.pattern.hasGlobStar(segment.pattern));
    }
}
exports.default = Matcher;


/***/ }),

/***/ 5295:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const matcher_1 = __webpack_require__(2576);
class PartialMatcher extends matcher_1.default {
    match(filepath) {
        const parts = filepath.split('/');
        const levels = parts.length;
        const patterns = this._storage.filter((info) => !info.complete || info.segments.length > levels);
        for (const pattern of patterns) {
            const section = pattern.sections[0];
            /**
             * In this case, the pattern has a globstar and we must read all directories unconditionally,
             * but only if the level has reached the end of the first group.
             *
             * fixtures/{a,b}/**
             *  ^ true/false  ^ always true
            */
            if (!pattern.complete && levels > section.length) {
                return true;
            }
            const match = parts.every((part, index) => {
                const segment = pattern.segments[index];
                if (segment.dynamic && segment.patternRe.test(part)) {
                    return true;
                }
                if (!segment.dynamic && segment.pattern === part) {
                    return true;
                }
                return false;
            });
            if (match) {
                return true;
            }
        }
        return false;
    }
}
exports.default = PartialMatcher;


/***/ }),

/***/ 257:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const path = __webpack_require__(5622);
const deep_1 = __webpack_require__(6983);
const entry_1 = __webpack_require__(1343);
const error_1 = __webpack_require__(6654);
const entry_2 = __webpack_require__(4029);
class Provider {
    constructor(_settings) {
        this._settings = _settings;
        this.errorFilter = new error_1.default(this._settings);
        this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions());
        this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions());
        this.entryTransformer = new entry_2.default(this._settings);
    }
    _getRootDirectory(task) {
        return path.resolve(this._settings.cwd, task.base);
    }
    _getReaderOptions(task) {
        const basePath = task.base === '.' ? '' : task.base;
        return {
            basePath,
            pathSegmentSeparator: '/',
            concurrency: this._settings.concurrency,
            deepFilter: this.deepFilter.getFilter(basePath, task.positive, task.negative),
            entryFilter: this.entryFilter.getFilter(task.positive, task.negative),
            errorFilter: this.errorFilter.getFilter(),
            followSymbolicLinks: this._settings.followSymbolicLinks,
            fs: this._settings.fs,
            stats: this._settings.stats,
            throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
            transform: this.entryTransformer.getTransformer()
        };
    }
    _getMicromatchOptions() {
        return {
            dot: this._settings.dot,
            matchBase: this._settings.baseNameMatch,
            nobrace: !this._settings.braceExpansion,
            nocase: !this._settings.caseSensitiveMatch,
            noext: !this._settings.extglob,
            noglobstar: !this._settings.globstar,
            posix: true,
            strictSlashes: false
        };
    }
}
exports.default = Provider;


/***/ }),

/***/ 4630:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const stream_1 = __webpack_require__(2413);
const stream_2 = __webpack_require__(2083);
const provider_1 = __webpack_require__(257);
class ProviderStream extends provider_1.default {
    constructor() {
        super(...arguments);
        this._reader = new stream_2.default(this._settings);
    }
    read(task) {
        const root = this._getRootDirectory(task);
        const options = this._getReaderOptions(task);
        const source = this.api(root, task, options);
        const destination = new stream_1.Readable({ objectMode: true, read: () => { } });
        source
            .once('error', (error) => destination.emit('error', error))
            .on('data', (entry) => destination.emit('data', options.transform(entry)))
            .once('end', () => destination.emit('end'));
        destination
            .once('close', () => source.destroy());
        return destination;
    }
    api(root, task, options) {
        if (task.dynamic) {
            return this._reader.dynamic(root, options);
        }
        return this._reader.static(task.patterns, options);
    }
}
exports.default = ProviderStream;


/***/ }),

/***/ 2405:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const sync_1 = __webpack_require__(6234);
const provider_1 = __webpack_require__(257);
class ProviderSync extends provider_1.default {
    constructor() {
        super(...arguments);
        this._reader = new sync_1.default(this._settings);
    }
    read(task) {
        const root = this._getRootDirectory(task);
        const options = this._getReaderOptions(task);
        const entries = this.api(root, task, options);
        return entries.map(options.transform);
    }
    api(root, task, options) {
        if (task.dynamic) {
            return this._reader.dynamic(root, options);
        }
        return this._reader.static(task.patterns, options);
    }
}
exports.default = ProviderSync;


/***/ }),

/***/ 4029:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils = __webpack_require__(5444);
class EntryTransformer {
    constructor(_settings) {
        this._settings = _settings;
    }
    getTransformer() {
        return (entry) => this._transform(entry);
    }
    _transform(entry) {
        let filepath = entry.path;
        if (this._settings.absolute) {
            filepath = utils.path.makeAbsolute(this._settings.cwd, filepath);
            filepath = utils.path.unixify(filepath);
        }
        if (this._settings.markDirectories && entry.dirent.isDirectory()) {
            filepath += '/';
        }
        if (!this._settings.objectMode) {
            return filepath;
        }
        return Object.assign(Object.assign({}, entry), { path: filepath });
    }
}
exports.default = EntryTransformer;


/***/ }),

/***/ 5582:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const path = __webpack_require__(5622);
const fsStat = __webpack_require__(109);
const utils = __webpack_require__(5444);
class Reader {
    constructor(_settings) {
        this._settings = _settings;
        this._fsStatSettings = new fsStat.Settings({
            followSymbolicLink: this._settings.followSymbolicLinks,
            fs: this._settings.fs,
            throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks
        });
    }
    _getFullEntryPath(filepath) {
        return path.resolve(this._settings.cwd, filepath);
    }
    _makeEntry(stats, pattern) {
        const entry = {
            name: pattern,
            path: pattern,
            dirent: utils.fs.createDirentFromStats(pattern, stats)
        };
        if (this._settings.stats) {
            entry.stats = stats;
        }
        return entry;
    }
    _isFatalError(error) {
        return !utils.errno.isEnoentCodeError(error) && !this._settings.suppressErrors;
    }
}
exports.default = Reader;


/***/ }),

/***/ 2083:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const stream_1 = __webpack_require__(2413);
const fsStat = __webpack_require__(109);
const fsWalk = __webpack_require__(6026);
const reader_1 = __webpack_require__(5582);
class ReaderStream extends reader_1.default {
    constructor() {
        super(...arguments);
        this._walkStream = fsWalk.walkStream;
        this._stat = fsStat.stat;
    }
    dynamic(root, options) {
        return this._walkStream(root, options);
    }
    static(patterns, options) {
        const filepaths = patterns.map(this._getFullEntryPath, this);
        const stream = new stream_1.PassThrough({ objectMode: true });
        stream._write = (index, _enc, done) => {
            return this._getEntry(filepaths[index], patterns[index], options)
                .then((entry) => {
                if (entry !== null && options.entryFilter(entry)) {
                    stream.push(entry);
                }
                if (index === filepaths.length - 1) {
                    stream.end();
                }
                done();
            })
                .catch(done);
        };
        for (let i = 0; i < filepaths.length; i++) {
            stream.write(i);
        }
        return stream;
    }
    _getEntry(filepath, pattern, options) {
        return this._getStat(filepath)
            .then((stats) => this._makeEntry(stats, pattern))
            .catch((error) => {
            if (options.errorFilter(error)) {
                return null;
            }
            throw error;
        });
    }
    _getStat(filepath) {
        return new Promise((resolve, reject) => {
            this._stat(filepath, this._fsStatSettings, (error, stats) => {
                return error === null ? resolve(stats) : reject(error);
            });
        });
    }
}
exports.default = ReaderStream;


/***/ }),

/***/ 6234:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const fsStat = __webpack_require__(109);
const fsWalk = __webpack_require__(6026);
const reader_1 = __webpack_require__(5582);
class ReaderSync extends reader_1.default {
    constructor() {
        super(...arguments);
        this._walkSync = fsWalk.walkSync;
        this._statSync = fsStat.statSync;
    }
    dynamic(root, options) {
        return this._walkSync(root, options);
    }
    static(patterns, options) {
        const entries = [];
        for (const pattern of patterns) {
            const filepath = this._getFullEntryPath(pattern);
            const entry = this._getEntry(filepath, pattern, options);
            if (entry === null || !options.entryFilter(entry)) {
                continue;
            }
            entries.push(entry);
        }
        return entries;
    }
    _getEntry(filepath, pattern, options) {
        try {
            const stats = this._getStat(filepath);
            return this._makeEntry(stats, pattern);
        }
        catch (error) {
            if (options.errorFilter(error)) {
                return null;
            }
            throw error;
        }
    }
    _getStat(filepath) {
        return this._statSync(filepath, this._fsStatSettings);
    }
}
exports.default = ReaderSync;


/***/ }),

/***/ 952:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_FILE_SYSTEM_ADAPTER = void 0;
const fs = __webpack_require__(5747);
const os = __webpack_require__(2087);
const CPU_COUNT = os.cpus().length;
exports.DEFAULT_FILE_SYSTEM_ADAPTER = {
    lstat: fs.lstat,
    lstatSync: fs.lstatSync,
    stat: fs.stat,
    statSync: fs.statSync,
    readdir: fs.readdir,
    readdirSync: fs.readdirSync
};
class Settings {
    constructor(_options = {}) {
        this._options = _options;
        this.absolute = this._getValue(this._options.absolute, false);
        this.baseNameMatch = this._getValue(this._options.baseNameMatch, false);
        this.braceExpansion = this._getValue(this._options.braceExpansion, true);
        this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, true);
        this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT);
        this.cwd = this._getValue(this._options.cwd, process.cwd());
        this.deep = this._getValue(this._options.deep, Infinity);
        this.dot = this._getValue(this._options.dot, false);
        this.extglob = this._getValue(this._options.extglob, true);
        this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, true);
        this.fs = this._getFileSystemMethods(this._options.fs);
        this.globstar = this._getValue(this._options.globstar, true);
        this.ignore = this._getValue(this._options.ignore, []);
        this.markDirectories = this._getValue(this._options.markDirectories, false);
        this.objectMode = this._getValue(this._options.objectMode, false);
        this.onlyDirectories = this._getValue(this._options.onlyDirectories, false);
        this.onlyFiles = this._getValue(this._options.onlyFiles, true);
        this.stats = this._getValue(this._options.stats, false);
        this.suppressErrors = this._getValue(this._options.suppressErrors, false);
        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, false);
        this.unique = this._getValue(this._options.unique, true);
        if (this.onlyDirectories) {
            this.onlyFiles = false;
        }
        if (this.stats) {
            this.objectMode = true;
        }
    }
    _getValue(option, value) {
        return option === undefined ? value : option;
    }
    _getFileSystemMethods(methods = {}) {
        return Object.assign(Object.assign({}, exports.DEFAULT_FILE_SYSTEM_ADAPTER), methods);
    }
}
exports.default = Settings;


/***/ }),

/***/ 5325:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.splitWhen = exports.flatten = void 0;
function flatten(items) {
    return items.reduce((collection, item) => [].concat(collection, item), []);
}
exports.flatten = flatten;
function splitWhen(items, predicate) {
    const result = [[]];
    let groupIndex = 0;
    for (const item of items) {
        if (predicate(item)) {
            groupIndex++;
            result[groupIndex] = [];
        }
        else {
            result[groupIndex].push(item);
        }
    }
    return result;
}
exports.splitWhen = splitWhen;


/***/ }),

/***/ 1230:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isEnoentCodeError = void 0;
function isEnoentCodeError(error) {
    return error.code === 'ENOENT';
}
exports.isEnoentCodeError = isEnoentCodeError;


/***/ }),

/***/ 7543:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createDirentFromStats = void 0;
class DirentFromStats {
    constructor(name, stats) {
        this.name = name;
        this.isBlockDevice = stats.isBlockDevice.bind(stats);
        this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
        this.isDirectory = stats.isDirectory.bind(stats);
        this.isFIFO = stats.isFIFO.bind(stats);
        this.isFile = stats.isFile.bind(stats);
        this.isSocket = stats.isSocket.bind(stats);
        this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
    }
}
function createDirentFromStats(name, stats) {
    return new DirentFromStats(name, stats);
}
exports.createDirentFromStats = createDirentFromStats;


/***/ }),

/***/ 5444:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.string = exports.stream = exports.pattern = exports.path = exports.fs = exports.errno = exports.array = void 0;
const array = __webpack_require__(5325);
exports.array = array;
const errno = __webpack_require__(1230);
exports.errno = errno;
const fs = __webpack_require__(7543);
exports.fs = fs;
const path = __webpack_require__(3873);
exports.path = path;
const pattern = __webpack_require__(1221);
exports.pattern = pattern;
const stream = __webpack_require__(8382);
exports.stream = stream;
const string = __webpack_require__(2203);
exports.string = string;


/***/ }),

/***/ 3873:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.removeLeadingDotSegment = exports.escape = exports.makeAbsolute = exports.unixify = void 0;
const path = __webpack_require__(5622);
const LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2; // ./ or .\\
const UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\())/g;
/**
 * Designed to work only with simple paths: `dir\\file`.
 */
function unixify(filepath) {
    return filepath.replace(/\\/g, '/');
}
exports.unixify = unixify;
function makeAbsolute(cwd, filepath) {
    return path.resolve(cwd, filepath);
}
exports.makeAbsolute = makeAbsolute;
function escape(pattern) {
    return pattern.replace(UNESCAPED_GLOB_SYMBOLS_RE, '\\$2');
}
exports.escape = escape;
function removeLeadingDotSegment(entry) {
    // We do not use `startsWith` because this is 10x slower than current implementation for some cases.
    // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
    if (entry.charAt(0) === '.') {
        const secondCharactery = entry.charAt(1);
        if (secondCharactery === '/' || secondCharactery === '\\') {
            return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT);
        }
    }
    return entry;
}
exports.removeLeadingDotSegment = removeLeadingDotSegment;


/***/ }),

/***/ 1221:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.matchAny = exports.convertPatternsToRe = exports.makeRe = exports.getPatternParts = exports.expandBraceExpansion = exports.expandPatternsWithBraceExpansion = exports.isAffectDepthOfReadingPattern = exports.endsWithSlashGlobStar = exports.hasGlobStar = exports.getBaseDirectory = exports.getPositivePatterns = exports.getNegativePatterns = exports.isPositivePattern = exports.isNegativePattern = exports.convertToNegativePattern = exports.convertToPositivePattern = exports.isDynamicPattern = exports.isStaticPattern = void 0;
const path = __webpack_require__(5622);
const globParent = __webpack_require__(4655);
const micromatch = __webpack_require__(6228);
const picomatch = __webpack_require__(8569);
const GLOBSTAR = '**';
const ESCAPE_SYMBOL = '\\';
const COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/;
const REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[.*]/;
const REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\(.*\|.*\)/;
const GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\(.*\)/;
const BRACE_EXPANSIONS_SYMBOLS_RE = /{.*(?:,|\.\.).*}/;
function isStaticPattern(pattern, options = {}) {
    return !isDynamicPattern(pattern, options);
}
exports.isStaticPattern = isStaticPattern;
function isDynamicPattern(pattern, options = {}) {
    /**
     * A special case with an empty string is necessary for matching patterns that start with a forward slash.
     * An empty string cannot be a dynamic pattern.
     * For example, the pattern `/lib/*` will be spread into parts: '', 'lib', '*'.
     */
    if (pattern === '') {
        return false;
    }
    /**
     * When the `caseSensitiveMatch` option is disabled, all patterns must be marked as dynamic, because we cannot check
     * filepath directly (without read directory).
     */
    if (options.caseSensitiveMatch === false || pattern.includes(ESCAPE_SYMBOL)) {
        return true;
    }
    if (COMMON_GLOB_SYMBOLS_RE.test(pattern) || REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) || REGEX_GROUP_SYMBOLS_RE.test(pattern)) {
        return true;
    }
    if (options.extglob !== false && GLOB_EXTENSION_SYMBOLS_RE.test(pattern)) {
        return true;
    }
    if (options.braceExpansion !== false && BRACE_EXPANSIONS_SYMBOLS_RE.test(pattern)) {
        return true;
    }
    return false;
}
exports.isDynamicPattern = isDynamicPattern;
function convertToPositivePattern(pattern) {
    return isNegativePattern(pattern) ? pattern.slice(1) : pattern;
}
exports.convertToPositivePattern = convertToPositivePattern;
function convertToNegativePattern(pattern) {
    return '!' + pattern;
}
exports.convertToNegativePattern = convertToNegativePattern;
function isNegativePattern(pattern) {
    return pattern.startsWith('!') && pattern[1] !== '(';
}
exports.isNegativePattern = isNegativePattern;
function isPositivePattern(pattern) {
    return !isNegativePattern(pattern);
}
exports.isPositivePattern = isPositivePattern;
function getNegativePatterns(patterns) {
    return patterns.filter(isNegativePattern);
}
exports.getNegativePatterns = getNegativePatterns;
function getPositivePatterns(patterns) {
    return patterns.filter(isPositivePattern);
}
exports.getPositivePatterns = getPositivePatterns;
function getBaseDirectory(pattern) {
    return globParent(pattern, { flipBackslashes: false });
}
exports.getBaseDirectory = getBaseDirectory;
function hasGlobStar(pattern) {
    return pattern.includes(GLOBSTAR);
}
exports.hasGlobStar = hasGlobStar;
function endsWithSlashGlobStar(pattern) {
    return pattern.endsWith('/' + GLOBSTAR);
}
exports.endsWithSlashGlobStar = endsWithSlashGlobStar;
function isAffectDepthOfReadingPattern(pattern) {
    const basename = path.basename(pattern);
    return endsWithSlashGlobStar(pattern) || isStaticPattern(basename);
}
exports.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern;
function expandPatternsWithBraceExpansion(patterns) {
    return patterns.reduce((collection, pattern) => {
        return collection.concat(expandBraceExpansion(pattern));
    }, []);
}
exports.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion;
function expandBraceExpansion(pattern) {
    return micromatch.braces(pattern, {
        expand: true,
        nodupes: true
    });
}
exports.expandBraceExpansion = expandBraceExpansion;
function getPatternParts(pattern, options) {
    let { parts } = picomatch.scan(pattern, Object.assign(Object.assign({}, options), { parts: true }));
    /**
     * The scan method returns an empty array in some cases.
     * See micromatch/picomatch#58 for more details.
     */
    if (parts.length === 0) {
        parts = [pattern];
    }
    /**
     * The scan method does not return an empty part for the pattern with a forward slash.
     * This is another part of micromatch/picomatch#58.
     */
    if (parts[0].startsWith('/')) {
        parts[0] = parts[0].slice(1);
        parts.unshift('');
    }
    return parts;
}
exports.getPatternParts = getPatternParts;
function makeRe(pattern, options) {
    return micromatch.makeRe(pattern, options);
}
exports.makeRe = makeRe;
function convertPatternsToRe(patterns, options) {
    return patterns.map((pattern) => makeRe(pattern, options));
}
exports.convertPatternsToRe = convertPatternsToRe;
function matchAny(entry, patternsRe) {
    return patternsRe.some((patternRe) => patternRe.test(entry));
}
exports.matchAny = matchAny;


/***/ }),

/***/ 8382:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.merge = void 0;
const merge2 = __webpack_require__(2578);
function merge(streams) {
    const mergedStream = merge2(streams);
    streams.forEach((stream) => {
        stream.once('error', (error) => mergedStream.emit('error', error));
    });
    mergedStream.once('close', () => propagateCloseEventToSources(streams));
    mergedStream.once('end', () => propagateCloseEventToSources(streams));
    return mergedStream;
}
exports.merge = merge;
function propagateCloseEventToSources(streams) {
    streams.forEach((stream) => stream.emit('close'));
}


/***/ }),

/***/ 2203:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isEmpty = exports.isString = void 0;
function isString(input) {
    return typeof input === 'string';
}
exports.isString = isString;
function isEmpty(input) {
    return input === '';
}
exports.isEmpty = isEmpty;


/***/ }),

/***/ 7340:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reusify = __webpack_require__(2113)

function fastqueue (context, worker, concurrency) {
  if (typeof context === 'function') {
    concurrency = worker
    worker = context
    context = null
  }

  var cache = reusify(Task)
  var queueHead = null
  var queueTail = null
  var _running = 0
  var errorHandler = null

  var self = {
    push: push,
    drain: noop,
    saturated: noop,
    pause: pause,
    paused: false,
    concurrency: concurrency,
    running: running,
    resume: resume,
    idle: idle,
    length: length,
    getQueue: getQueue,
    unshift: unshift,
    empty: noop,
    kill: kill,
    killAndDrain: killAndDrain,
    error: error
  }

  return self

  function running () {
    return _running
  }

  function pause () {
    self.paused = true
  }

  function length () {
    var current = queueHead
    var counter = 0

    while (current) {
      current = current.next
      counter++
    }

    return counter
  }

  function getQueue () {
    var current = queueHead
    var tasks = []

    while (current) {
      tasks.push(current.value)
      current = current.next
    }

    return tasks
  }

  function resume () {
    if (!self.paused) return
    self.paused = false
    for (var i = 0; i < self.concurrency; i++) {
      _running++
      release()
    }
  }

  function idle () {
    return _running === 0 && self.length() === 0
  }

  function push (value, done) {
    var current = cache.get()

    current.context = context
    current.release = release
    current.value = value
    current.callback = done || noop
    current.errorHandler = errorHandler

    if (_running === self.concurrency || self.paused) {
      if (queueTail) {
        queueTail.next = current
        queueTail = current
      } else {
        queueHead = current
        queueTail = current
        self.saturated()
      }
    } else {
      _running++
      worker.call(context, current.value, current.worked)
    }
  }

  function unshift (value, done) {
    var current = cache.get()

    current.context = context
    current.release = release
    current.value = value
    current.callback = done || noop

    if (_running === self.concurrency || self.paused) {
      if (queueHead) {
        current.next = queueHead
        queueHead = current
      } else {
        queueHead = current
        queueTail = current
        self.saturated()
      }
    } else {
      _running++
      worker.call(context, current.value, current.worked)
    }
  }

  function release (holder) {
    if (holder) {
      cache.release(holder)
    }
    var next = queueHead
    if (next) {
      if (!self.paused) {
        if (queueTail === queueHead) {
          queueTail = null
        }
        queueHead = next.next
        next.next = null
        worker.call(context, next.value, next.worked)
        if (queueTail === null) {
          self.empty()
        }
      } else {
        _running--
      }
    } else if (--_running === 0) {
      self.drain()
    }
  }

  function kill () {
    queueHead = null
    queueTail = null
    self.drain = noop
  }

  function killAndDrain () {
    queueHead = null
    queueTail = null
    self.drain()
    self.drain = noop
  }

  function error (handler) {
    errorHandler = handler
  }
}

function noop () {}

function Task () {
  this.value = null
  this.callback = noop
  this.next = null
  this.release = noop
  this.context = null
  this.errorHandler = null

  var self = this

  this.worked = function worked (err, result) {
    var callback = self.callback
    var errorHandler = self.errorHandler
    var val = self.value
    self.value = null
    self.callback = noop
    if (self.errorHandler) {
      errorHandler(err, val)
    }
    callback.call(self.context, err, result)
    self.release(self)
  }
}

module.exports = fastqueue


/***/ }),

/***/ 6330:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */



const util = __webpack_require__(1669);
const toRegexRange = __webpack_require__(1861);

const isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);

const transform = toNumber => {
  return value => toNumber === true ? Number(value) : String(value);
};

const isValidValue = value => {
  return typeof value === 'number' || (typeof value === 'string' && value !== '');
};

const isNumber = num => Number.isInteger(+num);

const zeros = input => {
  let value = `${input}`;
  let index = -1;
  if (value[0] === '-') value = value.slice(1);
  if (value === '0') return false;
  while (value[++index] === '0');
  return index > 0;
};

const stringify = (start, end, options) => {
  if (typeof start === 'string' || typeof end === 'string') {
    return true;
  }
  return options.stringify === true;
};

const pad = (input, maxLength, toNumber) => {
  if (maxLength > 0) {
    let dash = input[0] === '-' ? '-' : '';
    if (dash) input = input.slice(1);
    input = (dash + input.padStart(dash ? maxLength - 1 : maxLength, '0'));
  }
  if (toNumber === false) {
    return String(input);
  }
  return input;
};

const toMaxLen = (input, maxLength) => {
  let negative = input[0] === '-' ? '-' : '';
  if (negative) {
    input = input.slice(1);
    maxLength--;
  }
  while (input.length < maxLength) input = '0' + input;
  return negative ? ('-' + input) : input;
};

const toSequence = (parts, options) => {
  parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);

  let prefix = options.capture ? '' : '?:';
  let positives = '';
  let negatives = '';
  let result;

  if (parts.positives.length) {
    positives = parts.positives.join('|');
  }

  if (parts.negatives.length) {
    negatives = `-(${prefix}${parts.negatives.join('|')})`;
  }

  if (positives && negatives) {
    result = `${positives}|${negatives}`;
  } else {
    result = positives || negatives;
  }

  if (options.wrap) {
    return `(${prefix}${result})`;
  }

  return result;
};

const toRange = (a, b, isNumbers, options) => {
  if (isNumbers) {
    return toRegexRange(a, b, { wrap: false, ...options });
  }

  let start = String.fromCharCode(a);
  if (a === b) return start;

  let stop = String.fromCharCode(b);
  return `[${start}-${stop}]`;
};

const toRegex = (start, end, options) => {
  if (Array.isArray(start)) {
    let wrap = options.wrap === true;
    let prefix = options.capture ? '' : '?:';
    return wrap ? `(${prefix}${start.join('|')})` : start.join('|');
  }
  return toRegexRange(start, end, options);
};

const rangeError = (...args) => {
  return new RangeError('Invalid range arguments: ' + util.inspect(...args));
};

const invalidRange = (start, end, options) => {
  if (options.strictRanges === true) throw rangeError([start, end]);
  return [];
};

const invalidStep = (step, options) => {
  if (options.strictRanges === true) {
    throw new TypeError(`Expected step "${step}" to be a number`);
  }
  return [];
};

const fillNumbers = (start, end, step = 1, options = {}) => {
  let a = Number(start);
  let b = Number(end);

  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    if (options.strictRanges === true) throw rangeError([start, end]);
    return [];
  }

  // fix negative zero
  if (a === 0) a = 0;
  if (b === 0) b = 0;

  let descending = a > b;
  let startString = String(start);
  let endString = String(end);
  let stepString = String(step);
  step = Math.max(Math.abs(step), 1);

  let padded = zeros(startString) || zeros(endString) || zeros(stepString);
  let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
  let toNumber = padded === false && stringify(start, end, options) === false;
  let format = options.transform || transform(toNumber);

  if (options.toRegex && step === 1) {
    return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
  }

  let parts = { negatives: [], positives: [] };
  let push = num => parts[num < 0 ? 'negatives' : 'positives'].push(Math.abs(num));
  let range = [];
  let index = 0;

  while (descending ? a >= b : a <= b) {
    if (options.toRegex === true && step > 1) {
      push(a);
    } else {
      range.push(pad(format(a, index), maxLen, toNumber));
    }
    a = descending ? a - step : a + step;
    index++;
  }

  if (options.toRegex === true) {
    return step > 1
      ? toSequence(parts, options)
      : toRegex(range, null, { wrap: false, ...options });
  }

  return range;
};

const fillLetters = (start, end, step = 1, options = {}) => {
  if ((!isNumber(start) && start.length > 1) || (!isNumber(end) && end.length > 1)) {
    return invalidRange(start, end, options);
  }


  let format = options.transform || (val => String.fromCharCode(val));
  let a = `${start}`.charCodeAt(0);
  let b = `${end}`.charCodeAt(0);

  let descending = a > b;
  let min = Math.min(a, b);
  let max = Math.max(a, b);

  if (options.toRegex && step === 1) {
    return toRange(min, max, false, options);
  }

  let range = [];
  let index = 0;

  while (descending ? a >= b : a <= b) {
    range.push(format(a, index));
    a = descending ? a - step : a + step;
    index++;
  }

  if (options.toRegex === true) {
    return toRegex(range, null, { wrap: false, options });
  }

  return range;
};

const fill = (start, end, step, options = {}) => {
  if (end == null && isValidValue(start)) {
    return [start];
  }

  if (!isValidValue(start) || !isValidValue(end)) {
    return invalidRange(start, end, options);
  }

  if (typeof step === 'function') {
    return fill(start, end, 1, { transform: step });
  }

  if (isObject(step)) {
    return fill(start, end, 0, step);
  }

  let opts = { ...options };
  if (opts.capture === true) opts.wrap = true;
  step = step || opts.step || 1;

  if (!isNumber(step)) {
    if (step != null && !isObject(step)) return invalidStep(step, opts);
    return fill(start, end, 1, step);
  }

  if (isNumber(start) && isNumber(end)) {
    return fillNumbers(start, end, step, opts);
  }

  return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
};

module.exports = fill;


/***/ }),

/***/ 4655:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isGlob = __webpack_require__(4466);
var pathPosixDirname = __webpack_require__(5622).posix.dirname;
var isWin32 = __webpack_require__(2087).platform() === 'win32';

var slash = '/';
var backslash = /\\/g;
var enclosure = /[\{\[].*[\/]*.*[\}\]]$/;
var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/;
var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;

/**
 * @param {string} str
 * @param {Object} opts
 * @param {boolean} [opts.flipBackslashes=true]
 */
module.exports = function globParent(str, opts) {
  var options = Object.assign({ flipBackslashes: true }, opts);

  // flip windows path separators
  if (options.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
    str = str.replace(backslash, slash);
  }

  // special case for strings ending in enclosure containing path separator
  if (enclosure.test(str)) {
    str += slash;
  }

  // preserves full path in case of trailing path separator
  str += 'a';

  // remove path parts that are globby
  do {
    str = pathPosixDirname(str);
  } while (isGlob(str) || globby.test(str));

  // remove escape chars and return result
  return str.replace(escaped, '$1');
};


/***/ }),

/***/ 9038:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {promisify} = __webpack_require__(1669);
const fs = __webpack_require__(5747);
const path = __webpack_require__(5622);
const fastGlob = __webpack_require__(3664);
const gitIgnore = __webpack_require__(4777);
const slash = __webpack_require__(4111);

const DEFAULT_IGNORE = [
	'**/node_modules/**',
	'**/flow-typed/**',
	'**/coverage/**',
	'**/.git'
];

const readFileP = promisify(fs.readFile);

const mapGitIgnorePatternTo = base => ignore => {
	if (ignore.startsWith('!')) {
		return '!' + path.posix.join(base, ignore.slice(1));
	}

	return path.posix.join(base, ignore);
};

const parseGitIgnore = (content, options) => {
	const base = slash(path.relative(options.cwd, path.dirname(options.fileName)));

	return content
		.split(/\r?\n/)
		.filter(Boolean)
		.filter(line => !line.startsWith('#'))
		.map(mapGitIgnorePatternTo(base));
};

const reduceIgnore = files => {
	return files.reduce((ignores, file) => {
		ignores.add(parseGitIgnore(file.content, {
			cwd: file.cwd,
			fileName: file.filePath
		}));
		return ignores;
	}, gitIgnore());
};

const ensureAbsolutePathForCwd = (cwd, p) => {
	cwd = slash(cwd);
	if (path.isAbsolute(p)) {
		if (p.startsWith(cwd)) {
			return p;
		}

		throw new Error(`Path ${p} is not in cwd ${cwd}`);
	}

	return path.join(cwd, p);
};

const getIsIgnoredPredecate = (ignores, cwd) => {
	return p => ignores.ignores(slash(path.relative(cwd, ensureAbsolutePathForCwd(cwd, p))));
};

const getFile = async (file, cwd) => {
	const filePath = path.join(cwd, file);
	const content = await readFileP(filePath, 'utf8');

	return {
		cwd,
		filePath,
		content
	};
};

const getFileSync = (file, cwd) => {
	const filePath = path.join(cwd, file);
	const content = fs.readFileSync(filePath, 'utf8');

	return {
		cwd,
		filePath,
		content
	};
};

const normalizeOptions = ({
	ignore = [],
	cwd = slash(process.cwd())
} = {}) => {
	return {ignore, cwd};
};

module.exports = async options => {
	options = normalizeOptions(options);

	const paths = await fastGlob('**/.gitignore', {
		ignore: DEFAULT_IGNORE.concat(options.ignore),
		cwd: options.cwd
	});

	const files = await Promise.all(paths.map(file => getFile(file, options.cwd)));
	const ignores = reduceIgnore(files);

	return getIsIgnoredPredecate(ignores, options.cwd);
};

module.exports.sync = options => {
	options = normalizeOptions(options);

	const paths = fastGlob.sync('**/.gitignore', {
		ignore: DEFAULT_IGNORE.concat(options.ignore),
		cwd: options.cwd
	});

	const files = paths.map(file => getFileSync(file, options.cwd));
	const ignores = reduceIgnore(files);

	return getIsIgnoredPredecate(ignores, options.cwd);
};


/***/ }),

/***/ 3398:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const fs = __webpack_require__(5747);
const arrayUnion = __webpack_require__(9600);
const merge2 = __webpack_require__(2578);
const fastGlob = __webpack_require__(3664);
const dirGlob = __webpack_require__(2738);
const gitignore = __webpack_require__(9038);
const {FilterStream, UniqueStream} = __webpack_require__(2408);

const DEFAULT_FILTER = () => false;

const isNegative = pattern => pattern[0] === '!';

const assertPatternsInput = patterns => {
	if (!patterns.every(pattern => typeof pattern === 'string')) {
		throw new TypeError('Patterns must be a string or an array of strings');
	}
};

const checkCwdOption = (options = {}) => {
	if (!options.cwd) {
		return;
	}

	let stat;
	try {
		stat = fs.statSync(options.cwd);
	} catch (_) {
		return;
	}

	if (!stat.isDirectory()) {
		throw new Error('The `cwd` option must be a path to a directory');
	}
};

const getPathString = p => p.stats instanceof fs.Stats ? p.path : p;

const generateGlobTasks = (patterns, taskOptions) => {
	patterns = arrayUnion([].concat(patterns));
	assertPatternsInput(patterns);
	checkCwdOption(taskOptions);

	const globTasks = [];

	taskOptions = {
		ignore: [],
		expandDirectories: true,
		...taskOptions
	};

	for (const [index, pattern] of patterns.entries()) {
		if (isNegative(pattern)) {
			continue;
		}

		const ignore = patterns
			.slice(index)
			.filter(isNegative)
			.map(pattern => pattern.slice(1));

		const options = {
			...taskOptions,
			ignore: taskOptions.ignore.concat(ignore)
		};

		globTasks.push({pattern, options});
	}

	return globTasks;
};

const globDirs = (task, fn) => {
	let options = {};
	if (task.options.cwd) {
		options.cwd = task.options.cwd;
	}

	if (Array.isArray(task.options.expandDirectories)) {
		options = {
			...options,
			files: task.options.expandDirectories
		};
	} else if (typeof task.options.expandDirectories === 'object') {
		options = {
			...options,
			...task.options.expandDirectories
		};
	}

	return fn(task.pattern, options);
};

const getPattern = (task, fn) => task.options.expandDirectories ? globDirs(task, fn) : [task.pattern];

const getFilterSync = options => {
	return options && options.gitignore ?
		gitignore.sync({cwd: options.cwd, ignore: options.ignore}) :
		DEFAULT_FILTER;
};

const globToTask = task => glob => {
	const {options} = task;
	if (options.ignore && Array.isArray(options.ignore) && options.expandDirectories) {
		options.ignore = dirGlob.sync(options.ignore);
	}

	return {
		pattern: glob,
		options
	};
};

module.exports = async (patterns, options) => {
	const globTasks = generateGlobTasks(patterns, options);

	const getFilter = async () => {
		return options && options.gitignore ?
			gitignore({cwd: options.cwd, ignore: options.ignore}) :
			DEFAULT_FILTER;
	};

	const getTasks = async () => {
		const tasks = await Promise.all(globTasks.map(async task => {
			const globs = await getPattern(task, dirGlob);
			return Promise.all(globs.map(globToTask(task)));
		}));

		return arrayUnion(...tasks);
	};

	const [filter, tasks] = await Promise.all([getFilter(), getTasks()]);
	const paths = await Promise.all(tasks.map(task => fastGlob(task.pattern, task.options)));

	return arrayUnion(...paths).filter(path_ => !filter(getPathString(path_)));
};

module.exports.sync = (patterns, options) => {
	const globTasks = generateGlobTasks(patterns, options);

	const tasks = globTasks.reduce((tasks, task) => {
		const newTask = getPattern(task, dirGlob.sync).map(globToTask(task));
		return tasks.concat(newTask);
	}, []);

	const filter = getFilterSync(options);

	return tasks.reduce(
		(matches, task) => arrayUnion(matches, fastGlob.sync(task.pattern, task.options)),
		[]
	).filter(path_ => !filter(path_));
};

module.exports.stream = (patterns, options) => {
	const globTasks = generateGlobTasks(patterns, options);

	const tasks = globTasks.reduce((tasks, task) => {
		const newTask = getPattern(task, dirGlob.sync).map(globToTask(task));
		return tasks.concat(newTask);
	}, []);

	const filter = getFilterSync(options);
	const filterStream = new FilterStream(p => !filter(p));
	const uniqueStream = new UniqueStream();

	return merge2(tasks.map(task => fastGlob.stream(task.pattern, task.options)))
		.pipe(filterStream)
		.pipe(uniqueStream);
};

module.exports.generateGlobTasks = generateGlobTasks;

module.exports.hasMagic = (patterns, options) => []
	.concat(patterns)
	.some(pattern => fastGlob.isDynamicPattern(pattern, options));

module.exports.gitignore = gitignore;


/***/ }),

/***/ 2408:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {Transform} = __webpack_require__(2413);

class ObjectTransform extends Transform {
	constructor() {
		super({
			objectMode: true
		});
	}
}

class FilterStream extends ObjectTransform {
	constructor(filter) {
		super();
		this._filter = filter;
	}

	_transform(data, encoding, callback) {
		if (this._filter(data)) {
			this.push(data);
		}

		callback();
	}
}

class UniqueStream extends ObjectTransform {
	constructor() {
		super();
		this._pushed = new Set();
	}

	_transform(data, encoding, callback) {
		if (!this._pushed.has(data)) {
			this.push(data);
			this._pushed.add(data);
		}

		callback();
	}
}

module.exports = {
	FilterStream,
	UniqueStream
};


/***/ }),

/***/ 4777:
/***/ ((module) => {

// A simple implementation of make-array
function makeArray (subject) {
  return Array.isArray(subject)
    ? subject
    : [subject]
}

const EMPTY = ''
const SPACE = ' '
const ESCAPE = '\\'
const REGEX_TEST_BLANK_LINE = /^\s+$/
const REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/
const REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/
const REGEX_SPLITALL_CRLF = /\r?\n/g
// /foo,
// ./foo,
// ../foo,
// .
// ..
const REGEX_TEST_INVALID_PATH = /^\.*\/|^\.+$/

const SLASH = '/'
const KEY_IGNORE = typeof Symbol !== 'undefined'
  ? Symbol.for('node-ignore')
  /* istanbul ignore next */
  : 'node-ignore'

const define = (object, key, value) =>
  Object.defineProperty(object, key, {value})

const REGEX_REGEXP_RANGE = /([0-z])-([0-z])/g

// Sanitize the range of a regular expression
// The cases are complicated, see test cases for details
const sanitizeRange = range => range.replace(
  REGEX_REGEXP_RANGE,
  (match, from, to) => from.charCodeAt(0) <= to.charCodeAt(0)
    ? match
    // Invalid range (out of order) which is ok for gitignore rules but
    //   fatal for JavaScript regular expression, so eliminate it.
    : EMPTY
)

// See fixtures #59
const cleanRangeBackSlash = slashes => {
  const {length} = slashes
  return slashes.slice(0, length - length % 2)
}

// > If the pattern ends with a slash,
// > it is removed for the purpose of the following description,
// > but it would only find a match with a directory.
// > In other words, foo/ will match a directory foo and paths underneath it,
// > but will not match a regular file or a symbolic link foo
// >  (this is consistent with the way how pathspec works in general in Git).
// '`foo/`' will not match regular file '`foo`' or symbolic link '`foo`'
// -> ignore-rules will not deal with it, because it costs extra `fs.stat` call
//      you could use option `mark: true` with `glob`

// '`foo/`' should not continue with the '`..`'
const REPLACERS = [

  // > Trailing spaces are ignored unless they are quoted with backslash ("\")
  [
    // (a\ ) -> (a )
    // (a  ) -> (a)
    // (a \ ) -> (a  )
    /\\?\s+$/,
    match => match.indexOf('\\') === 0
      ? SPACE
      : EMPTY
  ],

  // replace (\ ) with ' '
  [
    /\\\s/g,
    () => SPACE
  ],

  // Escape metacharacters
  // which is written down by users but means special for regular expressions.

  // > There are 12 characters with special meanings:
  // > - the backslash \,
  // > - the caret ^,
  // > - the dollar sign $,
  // > - the period or dot .,
  // > - the vertical bar or pipe symbol |,
  // > - the question mark ?,
  // > - the asterisk or star *,
  // > - the plus sign +,
  // > - the opening parenthesis (,
  // > - the closing parenthesis ),
  // > - and the opening square bracket [,
  // > - the opening curly brace {,
  // > These special characters are often called "metacharacters".
  [
    /[\\$.|*+(){^]/g,
    match => `\\${match}`
  ],

  [
    // > a question mark (?) matches a single character
    /(?!\\)\?/g,
    () => '[^/]'
  ],

  // leading slash
  [

    // > A leading slash matches the beginning of the pathname.
    // > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
    // A leading slash matches the beginning of the pathname
    /^\//,
    () => '^'
  ],

  // replace special metacharacter slash after the leading slash
  [
    /\//g,
    () => '\\/'
  ],

  [
    // > A leading "**" followed by a slash means match in all directories.
    // > For example, "**/foo" matches file or directory "foo" anywhere,
    // > the same as pattern "foo".
    // > "**/foo/bar" matches file or directory "bar" anywhere that is directly
    // >   under directory "foo".
    // Notice that the '*'s have been replaced as '\\*'
    /^\^*\\\*\\\*\\\//,

    // '**/foo' <-> 'foo'
    () => '^(?:.*\\/)?'
  ],

  // starting
  [
    // there will be no leading '/'
    //   (which has been replaced by section "leading slash")
    // If starts with '**', adding a '^' to the regular expression also works
    /^(?=[^^])/,
    function startingReplacer () {
      // If has a slash `/` at the beginning or middle
      return !/\/(?!$)/.test(this)
        // > Prior to 2.22.1
        // > If the pattern does not contain a slash /,
        // >   Git treats it as a shell glob pattern
        // Actually, if there is only a trailing slash,
        //   git also treats it as a shell glob pattern

        // After 2.22.1 (compatible but clearer)
        // > If there is a separator at the beginning or middle (or both)
        // > of the pattern, then the pattern is relative to the directory
        // > level of the particular .gitignore file itself.
        // > Otherwise the pattern may also match at any level below
        // > the .gitignore level.
        ? '(?:^|\\/)'

        // > Otherwise, Git treats the pattern as a shell glob suitable for
        // >   consumption by fnmatch(3)
        : '^'
    }
  ],

  // two globstars
  [
    // Use lookahead assertions so that we could match more than one `'/**'`
    /\\\/\\\*\\\*(?=\\\/|$)/g,

    // Zero, one or several directories
    // should not use '*', or it will be replaced by the next replacer

    // Check if it is not the last `'/**'`
    (_, index, str) => index + 6 < str.length

      // case: /**/
      // > A slash followed by two consecutive asterisks then a slash matches
      // >   zero or more directories.
      // > For example, "a/**/b" matches "a/b", "a/x/b", "a/x/y/b" and so on.
      // '/**/'
      ? '(?:\\/[^\\/]+)*'

      // case: /**
      // > A trailing `"/**"` matches everything inside.

      // #21: everything inside but it should not include the current folder
      : '\\/.+'
  ],

  // intermediate wildcards
  [
    // Never replace escaped '*'
    // ignore rule '\*' will match the path '*'

    // 'abc.*/' -> go
    // 'abc.*'  -> skip this rule
    /(^|[^\\]+)\\\*(?=.+)/g,

    // '*.js' matches '.js'
    // '*.js' doesn't match 'abc'
    (_, p1) => `${p1}[^\\/]*`
  ],

  [
    // unescape, revert step 3 except for back slash
    // For example, if a user escape a '\\*',
    // after step 3, the result will be '\\\\\\*'
    /\\\\\\(?=[$.|*+(){^])/g,
    () => ESCAPE
  ],

  [
    // '\\\\' -> '\\'
    /\\\\/g,
    () => ESCAPE
  ],

  [
    // > The range notation, e.g. [a-zA-Z],
    // > can be used to match one of the characters in a range.

    // `\` is escaped by step 3
    /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
    (match, leadEscape, range, endEscape, close) => leadEscape === ESCAPE
      // '\\[bar]' -> '\\\\[bar\\]'
      ? `\\[${range}${cleanRangeBackSlash(endEscape)}${close}`
      : close === ']'
        ? endEscape.length % 2 === 0
          // A normal case, and it is a range notation
          // '[bar]'
          // '[bar\\\\]'
          ? `[${sanitizeRange(range)}${endEscape}]`
          // Invalid range notaton
          // '[bar\\]' -> '[bar\\\\]'
          : '[]'
        : '[]'
  ],

  // ending
  [
    // 'js' will not match 'js.'
    // 'ab' will not match 'abc'
    /(?:[^*])$/,

    // WTF!
    // https://git-scm.com/docs/gitignore
    // changes in [2.22.1](https://git-scm.com/docs/gitignore/2.22.1)
    // which re-fixes #24, #38

    // > If there is a separator at the end of the pattern then the pattern
    // > will only match directories, otherwise the pattern can match both
    // > files and directories.

    // 'js*' will not match 'a.js'
    // 'js/' will not match 'a.js'
    // 'js' will match 'a.js' and 'a.js/'
    match => /\/$/.test(match)
      // foo/ will not match 'foo'
      ? `${match}$`
      // foo matches 'foo' and 'foo/'
      : `${match}(?=$|\\/$)`
  ],

  // trailing wildcard
  [
    /(\^|\\\/)?\\\*$/,
    (_, p1) => {
      const prefix = p1
        // '\^':
        // '/*' does not match EMPTY
        // '/*' does not match everything

        // '\\\/':
        // 'abc/*' does not match 'abc/'
        ? `${p1}[^/]+`

        // 'a*' matches 'a'
        // 'a*' matches 'aa'
        : '[^/]*'

      return `${prefix}(?=$|\\/$)`
    }
  ],
]

// A simple cache, because an ignore rule only has only one certain meaning
const regexCache = Object.create(null)

// @param {pattern}
const makeRegex = (pattern, negative, ignorecase) => {
  const r = regexCache[pattern]
  if (r) {
    return r
  }

  // const replacers = negative
  //   ? NEGATIVE_REPLACERS
  //   : POSITIVE_REPLACERS

  const source = REPLACERS.reduce(
    (prev, current) => prev.replace(current[0], current[1].bind(pattern)),
    pattern
  )

  return regexCache[pattern] = ignorecase
    ? new RegExp(source, 'i')
    : new RegExp(source)
}

const isString = subject => typeof subject === 'string'

// > A blank line matches no files, so it can serve as a separator for readability.
const checkPattern = pattern => pattern
  && isString(pattern)
  && !REGEX_TEST_BLANK_LINE.test(pattern)

  // > A line starting with # serves as a comment.
  && pattern.indexOf('#') !== 0

const splitPattern = pattern => pattern.split(REGEX_SPLITALL_CRLF)

class IgnoreRule {
  constructor (
    origin,
    pattern,
    negative,
    regex
  ) {
    this.origin = origin
    this.pattern = pattern
    this.negative = negative
    this.regex = regex
  }
}

const createRule = (pattern, ignorecase) => {
  const origin = pattern
  let negative = false

  // > An optional prefix "!" which negates the pattern;
  if (pattern.indexOf('!') === 0) {
    negative = true
    pattern = pattern.substr(1)
  }

  pattern = pattern
  // > Put a backslash ("\") in front of the first "!" for patterns that
  // >   begin with a literal "!", for example, `"\!important!.txt"`.
  .replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, '!')
  // > Put a backslash ("\") in front of the first hash for patterns that
  // >   begin with a hash.
  .replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, '#')

  const regex = makeRegex(pattern, negative, ignorecase)

  return new IgnoreRule(
    origin,
    pattern,
    negative,
    regex
  )
}

const throwError = (message, Ctor) => {
  throw new Ctor(message)
}

const checkPath = (path, originalPath, doThrow) => {
  if (!isString(path)) {
    return doThrow(
      `path must be a string, but got \`${originalPath}\``,
      TypeError
    )
  }

  // We don't know if we should ignore EMPTY, so throw
  if (!path) {
    return doThrow(`path must not be empty`, TypeError)
  }

  // Check if it is a relative path
  if (checkPath.isNotRelative(path)) {
    const r = '`path.relative()`d'
    return doThrow(
      `path should be a ${r} string, but got "${originalPath}"`,
      RangeError
    )
  }

  return true
}

const isNotRelative = path => REGEX_TEST_INVALID_PATH.test(path)

checkPath.isNotRelative = isNotRelative
checkPath.convert = p => p

class Ignore {
  constructor ({
    ignorecase = true
  } = {}) {
    this._rules = []
    this._ignorecase = ignorecase
    define(this, KEY_IGNORE, true)
    this._initCache()
  }

  _initCache () {
    this._ignoreCache = Object.create(null)
    this._testCache = Object.create(null)
  }

  _addPattern (pattern) {
    // #32
    if (pattern && pattern[KEY_IGNORE]) {
      this._rules = this._rules.concat(pattern._rules)
      this._added = true
      return
    }

    if (checkPattern(pattern)) {
      const rule = createRule(pattern, this._ignorecase)
      this._added = true
      this._rules.push(rule)
    }
  }

  // @param {Array<string> | string | Ignore} pattern
  add (pattern) {
    this._added = false

    makeArray(
      isString(pattern)
        ? splitPattern(pattern)
        : pattern
    ).forEach(this._addPattern, this)

    // Some rules have just added to the ignore,
    // making the behavior changed.
    if (this._added) {
      this._initCache()
    }

    return this
  }

  // legacy
  addPattern (pattern) {
    return this.add(pattern)
  }

  //          |           ignored : unignored
  // negative |   0:0   |   0:1   |   1:0   |   1:1
  // -------- | ------- | ------- | ------- | --------
  //     0    |  TEST   |  TEST   |  SKIP   |    X
  //     1    |  TESTIF |  SKIP   |  TEST   |    X

  // - SKIP: always skip
  // - TEST: always test
  // - TESTIF: only test if checkUnignored
  // - X: that never happen

  // @param {boolean} whether should check if the path is unignored,
  //   setting `checkUnignored` to `false` could reduce additional
  //   path matching.

  // @returns {TestResult} true if a file is ignored
  _testOne (path, checkUnignored) {
    let ignored = false
    let unignored = false

    this._rules.forEach(rule => {
      const {negative} = rule
      if (
        unignored === negative && ignored !== unignored
        || negative && !ignored && !unignored && !checkUnignored
      ) {
        return
      }

      const matched = rule.regex.test(path)

      if (matched) {
        ignored = !negative
        unignored = negative
      }
    })

    return {
      ignored,
      unignored
    }
  }

  // @returns {TestResult}
  _test (originalPath, cache, checkUnignored, slices) {
    const path = originalPath
      // Supports nullable path
      && checkPath.convert(originalPath)

    checkPath(path, originalPath, throwError)

    return this._t(path, cache, checkUnignored, slices)
  }

  _t (path, cache, checkUnignored, slices) {
    if (path in cache) {
      return cache[path]
    }

    if (!slices) {
      // path/to/a.js
      // ['path', 'to', 'a.js']
      slices = path.split(SLASH)
    }

    slices.pop()

    // If the path has no parent directory, just test it
    if (!slices.length) {
      return cache[path] = this._testOne(path, checkUnignored)
    }

    const parent = this._t(
      slices.join(SLASH) + SLASH,
      cache,
      checkUnignored,
      slices
    )

    // If the path contains a parent directory, check the parent first
    return cache[path] = parent.ignored
      // > It is not possible to re-include a file if a parent directory of
      // >   that file is excluded.
      ? parent
      : this._testOne(path, checkUnignored)
  }

  ignores (path) {
    return this._test(path, this._ignoreCache, false).ignored
  }

  createFilter () {
    return path => !this.ignores(path)
  }

  filter (paths) {
    return makeArray(paths).filter(this.createFilter())
  }

  // @returns {TestResult}
  test (path) {
    return this._test(path, this._testCache, true)
  }
}

const factory = options => new Ignore(options)

const returnFalse = () => false

const isPathValid = path =>
  checkPath(path && checkPath.convert(path), path, returnFalse)

factory.isPathValid = isPathValid

// Fixes typescript
factory.default = factory

module.exports = factory

// Windows
// --------------------------------------------------------------
/* istanbul ignore if  */
if (
  // Detect `process` so that it can run in browsers.
  typeof process !== 'undefined'
  && (
    process.env && process.env.IGNORE_TEST_WIN32
    || process.platform === 'win32'
  )
) {
  /* eslint no-control-regex: "off" */
  const makePosix = str => /^\\\\\?\\/.test(str)
  || /["<>|\u0000-\u001F]+/u.test(str)
    ? str
    : str.replace(/\\/g, '/')

  checkPath.convert = makePosix

  // 'C:\\foo'     <- 'C:\\foo' has been converted to 'C:/'
  // 'd:\\foo'
  const REGIX_IS_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i
  checkPath.isNotRelative = path =>
    REGIX_IS_WINDOWS_PATH_ABSOLUTE.test(path)
    || isNotRelative(path)
}


/***/ }),

/***/ 6435:
/***/ ((module) => {

/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

module.exports = function isExtglob(str) {
  if (typeof str !== 'string' || str === '') {
    return false;
  }

  var match;
  while ((match = /(\\).|([@?!+*]\(.*\))/g.exec(str))) {
    if (match[2]) return true;
    str = str.slice(match.index + match[0].length);
  }

  return false;
};


/***/ }),

/***/ 4466:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var isExtglob = __webpack_require__(6435);
var chars = { '{': '}', '(': ')', '[': ']'};
var strictRegex = /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
var relaxedRegex = /\\(.)|(^!|[*?{}()[\]]|\(\?)/;

module.exports = function isGlob(str, options) {
  if (typeof str !== 'string' || str === '') {
    return false;
  }

  if (isExtglob(str)) {
    return true;
  }

  var regex = strictRegex;
  var match;

  // optionally relax regex
  if (options && options.strict === false) {
    regex = relaxedRegex;
  }

  while ((match = regex.exec(str))) {
    if (match[2]) return true;
    var idx = match.index + match[0].length;

    // if an open bracket/brace/paren is escaped,
    // set the index to the next closing character
    var open = match[1];
    var close = open ? chars[open] : null;
    if (open && close) {
      var n = str.indexOf(close, idx);
      if (n !== -1) {
        idx = n + 1;
      }
    }

    str = str.slice(idx);
  }
  return false;
};


/***/ }),

/***/ 5680:
/***/ ((module) => {

"use strict";
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function(num) {
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};


/***/ }),

/***/ 2578:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/*
 * merge2
 * https://github.com/teambition/merge2
 *
 * Copyright (c) 2014-2020 Teambition
 * Licensed under the MIT license.
 */
const Stream = __webpack_require__(2413)
const PassThrough = Stream.PassThrough
const slice = Array.prototype.slice

module.exports = merge2

function merge2 () {
  const streamsQueue = []
  const args = slice.call(arguments)
  let merging = false
  let options = args[args.length - 1]

  if (options && !Array.isArray(options) && options.pipe == null) {
    args.pop()
  } else {
    options = {}
  }

  const doEnd = options.end !== false
  const doPipeError = options.pipeError === true
  if (options.objectMode == null) {
    options.objectMode = true
  }
  if (options.highWaterMark == null) {
    options.highWaterMark = 64 * 1024
  }
  const mergedStream = PassThrough(options)

  function addStream () {
    for (let i = 0, len = arguments.length; i < len; i++) {
      streamsQueue.push(pauseStreams(arguments[i], options))
    }
    mergeStream()
    return this
  }

  function mergeStream () {
    if (merging) {
      return
    }
    merging = true

    let streams = streamsQueue.shift()
    if (!streams) {
      process.nextTick(endStream)
      return
    }
    if (!Array.isArray(streams)) {
      streams = [streams]
    }

    let pipesCount = streams.length + 1

    function next () {
      if (--pipesCount > 0) {
        return
      }
      merging = false
      mergeStream()
    }

    function pipe (stream) {
      function onend () {
        stream.removeListener('merge2UnpipeEnd', onend)
        stream.removeListener('end', onend)
        if (doPipeError) {
          stream.removeListener('error', onerror)
        }
        next()
      }
      function onerror (err) {
        mergedStream.emit('error', err)
      }
      // skip ended stream
      if (stream._readableState.endEmitted) {
        return next()
      }

      stream.on('merge2UnpipeEnd', onend)
      stream.on('end', onend)

      if (doPipeError) {
        stream.on('error', onerror)
      }

      stream.pipe(mergedStream, { end: false })
      // compatible for old stream
      stream.resume()
    }

    for (let i = 0; i < streams.length; i++) {
      pipe(streams[i])
    }

    next()
  }

  function endStream () {
    merging = false
    // emit 'queueDrain' when all streams merged.
    mergedStream.emit('queueDrain')
    if (doEnd) {
      mergedStream.end()
    }
  }

  mergedStream.setMaxListeners(0)
  mergedStream.add = addStream
  mergedStream.on('unpipe', function (stream) {
    stream.emit('merge2UnpipeEnd')
  })

  if (args.length) {
    addStream.apply(null, args)
  }
  return mergedStream
}

// check and pause streams for pipe.
function pauseStreams (streams, options) {
  if (!Array.isArray(streams)) {
    // Backwards-compat with old-style streams
    if (!streams._readableState && streams.pipe) {
      streams = streams.pipe(PassThrough(options))
    }
    if (!streams._readableState || !streams.pause || !streams.pipe) {
      throw new Error('Only readable stream can be merged.')
    }
    streams.pause()
  } else {
    for (let i = 0, len = streams.length; i < len; i++) {
      streams[i] = pauseStreams(streams[i], options)
    }
  }
  return streams
}


/***/ }),

/***/ 6228:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const util = __webpack_require__(1669);
const braces = __webpack_require__(610);
const picomatch = __webpack_require__(8569);
const utils = __webpack_require__(479);
const isEmptyString = val => typeof val === 'string' && (val === '' || val === './');

/**
 * Returns an array of strings that match one or more glob patterns.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm(list, patterns[, options]);
 *
 * console.log(mm(['a.js', 'a.txt'], ['*.js']));
 * //=> [ 'a.js' ]
 * ```
 * @param {String|Array<string>} list List of strings to match.
 * @param {String|Array<string>} patterns One or more glob patterns to use for matching.
 * @param {Object} options See available [options](#options)
 * @return {Array} Returns an array of matches
 * @summary false
 * @api public
 */

const micromatch = (list, patterns, options) => {
  patterns = [].concat(patterns);
  list = [].concat(list);

  let omit = new Set();
  let keep = new Set();
  let items = new Set();
  let negatives = 0;

  let onResult = state => {
    items.add(state.output);
    if (options && options.onResult) {
      options.onResult(state);
    }
  };

  for (let i = 0; i < patterns.length; i++) {
    let isMatch = picomatch(String(patterns[i]), { ...options, onResult }, true);
    let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
    if (negated) negatives++;

    for (let item of list) {
      let matched = isMatch(item, true);

      let match = negated ? !matched.isMatch : matched.isMatch;
      if (!match) continue;

      if (negated) {
        omit.add(matched.output);
      } else {
        omit.delete(matched.output);
        keep.add(matched.output);
      }
    }
  }

  let result = negatives === patterns.length ? [...items] : [...keep];
  let matches = result.filter(item => !omit.has(item));

  if (options && matches.length === 0) {
    if (options.failglob === true) {
      throw new Error(`No matches found for "${patterns.join(', ')}"`);
    }

    if (options.nonull === true || options.nullglob === true) {
      return options.unescape ? patterns.map(p => p.replace(/\\/g, '')) : patterns;
    }
  }

  return matches;
};

/**
 * Backwards compatibility
 */

micromatch.match = micromatch;

/**
 * Returns a matcher function from the given glob `pattern` and `options`.
 * The returned function takes a string to match as its only argument and returns
 * true if the string is a match.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.matcher(pattern[, options]);
 *
 * const isMatch = mm.matcher('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @param {String} `pattern` Glob pattern
 * @param {Object} `options`
 * @return {Function} Returns a matcher function.
 * @api public
 */

micromatch.matcher = (pattern, options) => picomatch(pattern, options);

/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.isMatch(string, patterns[, options]);
 *
 * console.log(mm.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(mm.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String} str The string to test.
 * @param {String|Array} patterns One or more glob patterns to use for matching.
 * @param {Object} [options] See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);

/**
 * Backwards compatibility
 */

micromatch.any = micromatch.isMatch;

/**
 * Returns a list of strings that _**do not match any**_ of the given `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.not(list, patterns[, options]);
 *
 * console.log(mm.not(['a.a', 'b.b', 'c.c'], '*.a'));
 * //=> ['b.b', 'c.c']
 * ```
 * @param {Array} `list` Array of strings to match.
 * @param {String|Array} `patterns` One or more glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Array} Returns an array of strings that **do not match** the given patterns.
 * @api public
 */

micromatch.not = (list, patterns, options = {}) => {
  patterns = [].concat(patterns).map(String);
  let result = new Set();
  let items = [];

  let onResult = state => {
    if (options.onResult) options.onResult(state);
    items.push(state.output);
  };

  let matches = micromatch(list, patterns, { ...options, onResult });

  for (let item of items) {
    if (!matches.includes(item)) {
      result.add(item);
    }
  }
  return [...result];
};

/**
 * Returns true if the given `string` contains the given pattern. Similar
 * to [.isMatch](#isMatch) but the pattern can match any part of the string.
 *
 * ```js
 * var mm = require('micromatch');
 * // mm.contains(string, pattern[, options]);
 *
 * console.log(mm.contains('aa/bb/cc', '*b'));
 * //=> true
 * console.log(mm.contains('aa/bb/cc', '*d'));
 * //=> false
 * ```
 * @param {String} `str` The string to match.
 * @param {String|Array} `patterns` Glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if the patter matches any part of `str`.
 * @api public
 */

micromatch.contains = (str, pattern, options) => {
  if (typeof str !== 'string') {
    throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
  }

  if (Array.isArray(pattern)) {
    return pattern.some(p => micromatch.contains(str, p, options));
  }

  if (typeof pattern === 'string') {
    if (isEmptyString(str) || isEmptyString(pattern)) {
      return false;
    }

    if (str.includes(pattern) || (str.startsWith('./') && str.slice(2).includes(pattern))) {
      return true;
    }
  }

  return micromatch.isMatch(str, pattern, { ...options, contains: true });
};

/**
 * Filter the keys of the given object with the given `glob` pattern
 * and `options`. Does not attempt to match nested keys. If you need this feature,
 * use [glob-object][] instead.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.matchKeys(object, patterns[, options]);
 *
 * const obj = { aa: 'a', ab: 'b', ac: 'c' };
 * console.log(mm.matchKeys(obj, '*b'));
 * //=> { ab: 'b' }
 * ```
 * @param {Object} `object` The object with keys to filter.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Object} Returns an object with only keys that match the given patterns.
 * @api public
 */

micromatch.matchKeys = (obj, patterns, options) => {
  if (!utils.isObject(obj)) {
    throw new TypeError('Expected the first argument to be an object');
  }
  let keys = micromatch(Object.keys(obj), patterns, options);
  let res = {};
  for (let key of keys) res[key] = obj[key];
  return res;
};

/**
 * Returns true if some of the strings in the given `list` match any of the given glob `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.some(list, patterns[, options]);
 *
 * console.log(mm.some(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
 * // true
 * console.log(mm.some(['foo.js'], ['*.js', '!foo.js']));
 * // false
 * ```
 * @param {String|Array} `list` The string or array of strings to test. Returns as soon as the first match is found.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch.some = (list, patterns, options) => {
  let items = [].concat(list);

  for (let pattern of [].concat(patterns)) {
    let isMatch = picomatch(String(pattern), options);
    if (items.some(item => isMatch(item))) {
      return true;
    }
  }
  return false;
};

/**
 * Returns true if every string in the given `list` matches
 * any of the given glob `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.every(list, patterns[, options]);
 *
 * console.log(mm.every('foo.js', ['foo.js']));
 * // true
 * console.log(mm.every(['foo.js', 'bar.js'], ['*.js']));
 * // true
 * console.log(mm.every(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
 * // false
 * console.log(mm.every(['foo.js'], ['*.js', '!foo.js']));
 * // false
 * ```
 * @param {String|Array} `list` The string or array of strings to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch.every = (list, patterns, options) => {
  let items = [].concat(list);

  for (let pattern of [].concat(patterns)) {
    let isMatch = picomatch(String(pattern), options);
    if (!items.every(item => isMatch(item))) {
      return false;
    }
  }
  return true;
};

/**
 * Returns true if **all** of the given `patterns` match
 * the specified string.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.all(string, patterns[, options]);
 *
 * console.log(mm.all('foo.js', ['foo.js']));
 * // true
 *
 * console.log(mm.all('foo.js', ['*.js', '!foo.js']));
 * // false
 *
 * console.log(mm.all('foo.js', ['*.js', 'foo.js']));
 * // true
 *
 * console.log(mm.all('foo.js', ['*.js', 'f*', '*o*', '*o.js']));
 * // true
 * ```
 * @param {String|Array} `str` The string to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch.all = (str, patterns, options) => {
  if (typeof str !== 'string') {
    throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
  }

  return [].concat(patterns).every(p => picomatch(p, options)(str));
};

/**
 * Returns an array of matches captured by `pattern` in `string, or `null` if the pattern did not match.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.capture(pattern, string[, options]);
 *
 * console.log(mm.capture('test/*.js', 'test/foo.js'));
 * //=> ['foo']
 * console.log(mm.capture('test/*.js', 'foo/bar.css'));
 * //=> null
 * ```
 * @param {String} `glob` Glob pattern to use for matching.
 * @param {String} `input` String to match
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns an array of captures if the input matches the glob pattern, otherwise `null`.
 * @api public
 */

micromatch.capture = (glob, input, options) => {
  let posix = utils.isWindows(options);
  let regex = picomatch.makeRe(String(glob), { ...options, capture: true });
  let match = regex.exec(posix ? utils.toPosixSlashes(input) : input);

  if (match) {
    return match.slice(1).map(v => v === void 0 ? '' : v);
  }
};

/**
 * Create a regular expression from the given glob `pattern`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.makeRe(pattern[, options]);
 *
 * console.log(mm.makeRe('*.js'));
 * //=> /^(?:(\.[\\\/])?(?!\.)(?=.)[^\/]*?\.js)$/
 * ```
 * @param {String} `pattern` A glob pattern to convert to regex.
 * @param {Object} `options`
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */

micromatch.makeRe = (...args) => picomatch.makeRe(...args);

/**
 * Scan a glob pattern to separate the pattern into segments. Used
 * by the [split](#split) method.
 *
 * ```js
 * const mm = require('micromatch');
 * const state = mm.scan(pattern[, options]);
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */

micromatch.scan = (...args) => picomatch.scan(...args);

/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const mm = require('micromatch');
 * const state = mm(pattern[, options]);
 * ```
 * @param {String} `glob`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as regex source string.
 * @api public
 */

micromatch.parse = (patterns, options) => {
  let res = [];
  for (let pattern of [].concat(patterns || [])) {
    for (let str of braces(String(pattern), options)) {
      res.push(picomatch.parse(str, options));
    }
  }
  return res;
};

/**
 * Process the given brace `pattern`.
 *
 * ```js
 * const { braces } = require('micromatch');
 * console.log(braces('foo/{a,b,c}/bar'));
 * //=> [ 'foo/(a|b|c)/bar' ]
 *
 * console.log(braces('foo/{a,b,c}/bar', { expand: true }));
 * //=> [ 'foo/a/bar', 'foo/b/bar', 'foo/c/bar' ]
 * ```
 * @param {String} `pattern` String with brace pattern to process.
 * @param {Object} `options` Any [options](#options) to change how expansion is performed. See the [braces][] library for all available options.
 * @return {Array}
 * @api public
 */

micromatch.braces = (pattern, options) => {
  if (typeof pattern !== 'string') throw new TypeError('Expected a string');
  if ((options && options.nobrace === true) || !/\{.*\}/.test(pattern)) {
    return [pattern];
  }
  return braces(pattern, options);
};

/**
 * Expand braces
 */

micromatch.braceExpand = (pattern, options) => {
  if (typeof pattern !== 'string') throw new TypeError('Expected a string');
  return micromatch.braces(pattern, { ...options, expand: true });
};

/**
 * Expose micromatch
 */

module.exports = micromatch;


/***/ }),

/***/ 467:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Stream = _interopDefault(__webpack_require__(2413));
var http = _interopDefault(__webpack_require__(8605));
var Url = _interopDefault(__webpack_require__(8835));
var https = _interopDefault(__webpack_require__(7211));
var zlib = _interopDefault(__webpack_require__(8761));

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = __webpack_require__(2877).convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
		if (!res) {
			res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
			if (res) {
				res.pop(); // drop last quote
			}
		}

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout,
							size: request.size
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

module.exports = exports = fetch;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.default = exports;
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.FetchError = FetchError;


/***/ }),

/***/ 3433:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const {promisify} = __webpack_require__(1669);
const fs = __webpack_require__(5747);

async function isType(fsStatType, statsMethodName, filePath) {
	if (typeof filePath !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof filePath}`);
	}

	try {
		const stats = await promisify(fs[fsStatType])(filePath);
		return stats[statsMethodName]();
	} catch (error) {
		if (error.code === 'ENOENT') {
			return false;
		}

		throw error;
	}
}

function isTypeSync(fsStatType, statsMethodName, filePath) {
	if (typeof filePath !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof filePath}`);
	}

	try {
		return fs[fsStatType](filePath)[statsMethodName]();
	} catch (error) {
		if (error.code === 'ENOENT') {
			return false;
		}

		throw error;
	}
}

exports.isFile = isType.bind(null, 'stat', 'isFile');
exports.isDirectory = isType.bind(null, 'stat', 'isDirectory');
exports.isSymlink = isType.bind(null, 'lstat', 'isSymbolicLink');
exports.isFileSync = isTypeSync.bind(null, 'statSync', 'isFile');
exports.isDirectorySync = isTypeSync.bind(null, 'statSync', 'isDirectory');
exports.isSymlinkSync = isTypeSync.bind(null, 'lstatSync', 'isSymbolicLink');


/***/ }),

/***/ 8569:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(3322);


/***/ }),

/***/ 6099:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const path = __webpack_require__(5622);
const WIN_SLASH = '\\\\/';
const WIN_NO_SLASH = `[^${WIN_SLASH}]`;

/**
 * Posix glob regex
 */

const DOT_LITERAL = '\\.';
const PLUS_LITERAL = '\\+';
const QMARK_LITERAL = '\\?';
const SLASH_LITERAL = '\\/';
const ONE_CHAR = '(?=.)';
const QMARK = '[^/]';
const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
const NO_DOT = `(?!${DOT_LITERAL})`;
const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
const STAR = `${QMARK}*?`;

const POSIX_CHARS = {
  DOT_LITERAL,
  PLUS_LITERAL,
  QMARK_LITERAL,
  SLASH_LITERAL,
  ONE_CHAR,
  QMARK,
  END_ANCHOR,
  DOTS_SLASH,
  NO_DOT,
  NO_DOTS,
  NO_DOT_SLASH,
  NO_DOTS_SLASH,
  QMARK_NO_DOT,
  STAR,
  START_ANCHOR
};

/**
 * Windows glob regex
 */

const WINDOWS_CHARS = {
  ...POSIX_CHARS,

  SLASH_LITERAL: `[${WIN_SLASH}]`,
  QMARK: WIN_NO_SLASH,
  STAR: `${WIN_NO_SLASH}*?`,
  DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
  NO_DOT: `(?!${DOT_LITERAL})`,
  NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
  NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
  START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
  END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
};

/**
 * POSIX Bracket Regex
 */

const POSIX_REGEX_SOURCE = {
  alnum: 'a-zA-Z0-9',
  alpha: 'a-zA-Z',
  ascii: '\\x00-\\x7F',
  blank: ' \\t',
  cntrl: '\\x00-\\x1F\\x7F',
  digit: '0-9',
  graph: '\\x21-\\x7E',
  lower: 'a-z',
  print: '\\x20-\\x7E ',
  punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
  space: ' \\t\\r\\n\\v\\f',
  upper: 'A-Z',
  word: 'A-Za-z0-9_',
  xdigit: 'A-Fa-f0-9'
};

module.exports = {
  MAX_LENGTH: 1024 * 64,
  POSIX_REGEX_SOURCE,

  // regular expressions
  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,

  // Replace globs with equivalent patterns to reduce parsing time.
  REPLACEMENTS: {
    '***': '*',
    '**/**': '**',
    '**/**/**': '**'
  },

  // Digits
  CHAR_0: 48, /* 0 */
  CHAR_9: 57, /* 9 */

  // Alphabet chars.
  CHAR_UPPERCASE_A: 65, /* A */
  CHAR_LOWERCASE_A: 97, /* a */
  CHAR_UPPERCASE_Z: 90, /* Z */
  CHAR_LOWERCASE_Z: 122, /* z */

  CHAR_LEFT_PARENTHESES: 40, /* ( */
  CHAR_RIGHT_PARENTHESES: 41, /* ) */

  CHAR_ASTERISK: 42, /* * */

  // Non-alphabetic chars.
  CHAR_AMPERSAND: 38, /* & */
  CHAR_AT: 64, /* @ */
  CHAR_BACKWARD_SLASH: 92, /* \ */
  CHAR_CARRIAGE_RETURN: 13, /* \r */
  CHAR_CIRCUMFLEX_ACCENT: 94, /* ^ */
  CHAR_COLON: 58, /* : */
  CHAR_COMMA: 44, /* , */
  CHAR_DOT: 46, /* . */
  CHAR_DOUBLE_QUOTE: 34, /* " */
  CHAR_EQUAL: 61, /* = */
  CHAR_EXCLAMATION_MARK: 33, /* ! */
  CHAR_FORM_FEED: 12, /* \f */
  CHAR_FORWARD_SLASH: 47, /* / */
  CHAR_GRAVE_ACCENT: 96, /* ` */
  CHAR_HASH: 35, /* # */
  CHAR_HYPHEN_MINUS: 45, /* - */
  CHAR_LEFT_ANGLE_BRACKET: 60, /* < */
  CHAR_LEFT_CURLY_BRACE: 123, /* { */
  CHAR_LEFT_SQUARE_BRACKET: 91, /* [ */
  CHAR_LINE_FEED: 10, /* \n */
  CHAR_NO_BREAK_SPACE: 160, /* \u00A0 */
  CHAR_PERCENT: 37, /* % */
  CHAR_PLUS: 43, /* + */
  CHAR_QUESTION_MARK: 63, /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: 62, /* > */
  CHAR_RIGHT_CURLY_BRACE: 125, /* } */
  CHAR_RIGHT_SQUARE_BRACKET: 93, /* ] */
  CHAR_SEMICOLON: 59, /* ; */
  CHAR_SINGLE_QUOTE: 39, /* ' */
  CHAR_SPACE: 32, /*   */
  CHAR_TAB: 9, /* \t */
  CHAR_UNDERSCORE: 95, /* _ */
  CHAR_VERTICAL_LINE: 124, /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, /* \uFEFF */

  SEP: path.sep,

  /**
   * Create EXTGLOB_CHARS
   */

  extglobChars(chars) {
    return {
      '!': { type: 'negate', open: '(?:(?!(?:', close: `))${chars.STAR})` },
      '?': { type: 'qmark', open: '(?:', close: ')?' },
      '+': { type: 'plus', open: '(?:', close: ')+' },
      '*': { type: 'star', open: '(?:', close: ')*' },
      '@': { type: 'at', open: '(?:', close: ')' }
    };
  },

  /**
   * Create GLOB_CHARS
   */

  globChars(win32) {
    return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
  }
};


/***/ }),

/***/ 2139:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const constants = __webpack_require__(6099);
const utils = __webpack_require__(479);

/**
 * Constants
 */

const {
  MAX_LENGTH,
  POSIX_REGEX_SOURCE,
  REGEX_NON_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_BACKREF,
  REPLACEMENTS
} = constants;

/**
 * Helpers
 */

const expandRange = (args, options) => {
  if (typeof options.expandRange === 'function') {
    return options.expandRange(...args, options);
  }

  args.sort();
  const value = `[${args.join('-')}]`;

  try {
    /* eslint-disable-next-line no-new */
    new RegExp(value);
  } catch (ex) {
    return args.map(v => utils.escapeRegex(v)).join('..');
  }

  return value;
};

/**
 * Create the message for a syntax error
 */

const syntaxError = (type, char) => {
  return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
};

/**
 * Parse the given input string.
 * @param {String} input
 * @param {Object} options
 * @return {Object}
 */

const parse = (input, options) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  input = REPLACEMENTS[input] || input;

  const opts = { ...options };
  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;

  let len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }

  const bos = { type: 'bos', value: '', output: opts.prepend || '' };
  const tokens = [bos];

  const capture = opts.capture ? '' : '?:';
  const win32 = utils.isWindows(options);

  // create constants based on platform, for windows or posix
  const PLATFORM_CHARS = constants.globChars(win32);
  const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);

  const {
    DOT_LITERAL,
    PLUS_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOT_SLASH,
    NO_DOTS_SLASH,
    QMARK,
    QMARK_NO_DOT,
    STAR,
    START_ANCHOR
  } = PLATFORM_CHARS;

  const globstar = (opts) => {
    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
  };

  const nodot = opts.dot ? '' : NO_DOT;
  const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
  let star = opts.bash === true ? globstar(opts) : STAR;

  if (opts.capture) {
    star = `(${star})`;
  }

  // minimatch options support
  if (typeof opts.noext === 'boolean') {
    opts.noextglob = opts.noext;
  }

  const state = {
    input,
    index: -1,
    start: 0,
    dot: opts.dot === true,
    consumed: '',
    output: '',
    prefix: '',
    backtrack: false,
    negated: false,
    brackets: 0,
    braces: 0,
    parens: 0,
    quotes: 0,
    globstar: false,
    tokens
  };

  input = utils.removePrefix(input, state);
  len = input.length;

  const extglobs = [];
  const braces = [];
  const stack = [];
  let prev = bos;
  let value;

  /**
   * Tokenizing helpers
   */

  const eos = () => state.index === len - 1;
  const peek = state.peek = (n = 1) => input[state.index + n];
  const advance = state.advance = () => input[++state.index];
  const remaining = () => input.slice(state.index + 1);
  const consume = (value = '', num = 0) => {
    state.consumed += value;
    state.index += num;
  };
  const append = token => {
    state.output += token.output != null ? token.output : token.value;
    consume(token.value);
  };

  const negate = () => {
    let count = 1;

    while (peek() === '!' && (peek(2) !== '(' || peek(3) === '?')) {
      advance();
      state.start++;
      count++;
    }

    if (count % 2 === 0) {
      return false;
    }

    state.negated = true;
    state.start++;
    return true;
  };

  const increment = type => {
    state[type]++;
    stack.push(type);
  };

  const decrement = type => {
    state[type]--;
    stack.pop();
  };

  /**
   * Push tokens onto the tokens array. This helper speeds up
   * tokenizing by 1) helping us avoid backtracking as much as possible,
   * and 2) helping us avoid creating extra tokens when consecutive
   * characters are plain text. This improves performance and simplifies
   * lookbehinds.
   */

  const push = tok => {
    if (prev.type === 'globstar') {
      const isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace');
      const isExtglob = tok.extglob === true || (extglobs.length && (tok.type === 'pipe' || tok.type === 'paren'));

      if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = 'star';
        prev.value = '*';
        prev.output = star;
        state.output += prev.output;
      }
    }

    if (extglobs.length && tok.type !== 'paren' && !EXTGLOB_CHARS[tok.value]) {
      extglobs[extglobs.length - 1].inner += tok.value;
    }

    if (tok.value || tok.output) append(tok);
    if (prev && prev.type === 'text' && tok.type === 'text') {
      prev.value += tok.value;
      prev.output = (prev.output || '') + tok.value;
      return;
    }

    tok.prev = prev;
    tokens.push(tok);
    prev = tok;
  };

  const extglobOpen = (type, value) => {
    const token = { ...EXTGLOB_CHARS[value], conditions: 1, inner: '' };

    token.prev = prev;
    token.parens = state.parens;
    token.output = state.output;
    const output = (opts.capture ? '(' : '') + token.open;

    increment('parens');
    push({ type, value, output: state.output ? '' : ONE_CHAR });
    push({ type: 'paren', extglob: true, value: advance(), output });
    extglobs.push(token);
  };

  const extglobClose = token => {
    let output = token.close + (opts.capture ? ')' : '');

    if (token.type === 'negate') {
      let extglobStar = star;

      if (token.inner && token.inner.length > 1 && token.inner.includes('/')) {
        extglobStar = globstar(opts);
      }

      if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
        output = token.close = `)$))${extglobStar}`;
      }

      if (token.prev.type === 'bos' && eos()) {
        state.negatedExtglob = true;
      }
    }

    push({ type: 'paren', extglob: true, value, output });
    decrement('parens');
  };

  /**
   * Fast paths
   */

  if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
    let backslashes = false;

    let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
      if (first === '\\') {
        backslashes = true;
        return m;
      }

      if (first === '?') {
        if (esc) {
          return esc + first + (rest ? QMARK.repeat(rest.length) : '');
        }
        if (index === 0) {
          return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '');
        }
        return QMARK.repeat(chars.length);
      }

      if (first === '.') {
        return DOT_LITERAL.repeat(chars.length);
      }

      if (first === '*') {
        if (esc) {
          return esc + first + (rest ? star : '');
        }
        return star;
      }
      return esc ? m : `\\${m}`;
    });

    if (backslashes === true) {
      if (opts.unescape === true) {
        output = output.replace(/\\/g, '');
      } else {
        output = output.replace(/\\+/g, m => {
          return m.length % 2 === 0 ? '\\\\' : (m ? '\\' : '');
        });
      }
    }

    if (output === input && opts.contains === true) {
      state.output = input;
      return state;
    }

    state.output = utils.wrapOutput(output, state, options);
    return state;
  }

  /**
   * Tokenize input until we reach end-of-string
   */

  while (!eos()) {
    value = advance();

    if (value === '\u0000') {
      continue;
    }

    /**
     * Escaped characters
     */

    if (value === '\\') {
      const next = peek();

      if (next === '/' && opts.bash !== true) {
        continue;
      }

      if (next === '.' || next === ';') {
        continue;
      }

      if (!next) {
        value += '\\';
        push({ type: 'text', value });
        continue;
      }

      // collapse slashes to reduce potential for exploits
      const match = /^\\+/.exec(remaining());
      let slashes = 0;

      if (match && match[0].length > 2) {
        slashes = match[0].length;
        state.index += slashes;
        if (slashes % 2 !== 0) {
          value += '\\';
        }
      }

      if (opts.unescape === true) {
        value = advance() || '';
      } else {
        value += advance() || '';
      }

      if (state.brackets === 0) {
        push({ type: 'text', value });
        continue;
      }
    }

    /**
     * If we're inside a regex character class, continue
     * until we reach the closing bracket.
     */

    if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
      if (opts.posix !== false && value === ':') {
        const inner = prev.value.slice(1);
        if (inner.includes('[')) {
          prev.posix = true;

          if (inner.includes(':')) {
            const idx = prev.value.lastIndexOf('[');
            const pre = prev.value.slice(0, idx);
            const rest = prev.value.slice(idx + 2);
            const posix = POSIX_REGEX_SOURCE[rest];
            if (posix) {
              prev.value = pre + posix;
              state.backtrack = true;
              advance();

              if (!bos.output && tokens.indexOf(prev) === 1) {
                bos.output = ONE_CHAR;
              }
              continue;
            }
          }
        }
      }

      if ((value === '[' && peek() !== ':') || (value === '-' && peek() === ']')) {
        value = `\\${value}`;
      }

      if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
        value = `\\${value}`;
      }

      if (opts.posix === true && value === '!' && prev.value === '[') {
        value = '^';
      }

      prev.value += value;
      append({ value });
      continue;
    }

    /**
     * If we're inside a quoted string, continue
     * until we reach the closing double quote.
     */

    if (state.quotes === 1 && value !== '"') {
      value = utils.escapeRegex(value);
      prev.value += value;
      append({ value });
      continue;
    }

    /**
     * Double quotes
     */

    if (value === '"') {
      state.quotes = state.quotes === 1 ? 0 : 1;
      if (opts.keepQuotes === true) {
        push({ type: 'text', value });
      }
      continue;
    }

    /**
     * Parentheses
     */

    if (value === '(') {
      increment('parens');
      push({ type: 'paren', value });
      continue;
    }

    if (value === ')') {
      if (state.parens === 0 && opts.strictBrackets === true) {
        throw new SyntaxError(syntaxError('opening', '('));
      }

      const extglob = extglobs[extglobs.length - 1];
      if (extglob && state.parens === extglob.parens + 1) {
        extglobClose(extglobs.pop());
        continue;
      }

      push({ type: 'paren', value, output: state.parens ? ')' : '\\)' });
      decrement('parens');
      continue;
    }

    /**
     * Square brackets
     */

    if (value === '[') {
      if (opts.nobracket === true || !remaining().includes(']')) {
        if (opts.nobracket !== true && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('closing', ']'));
        }

        value = `\\${value}`;
      } else {
        increment('brackets');
      }

      push({ type: 'bracket', value });
      continue;
    }

    if (value === ']') {
      if (opts.nobracket === true || (prev && prev.type === 'bracket' && prev.value.length === 1)) {
        push({ type: 'text', value, output: `\\${value}` });
        continue;
      }

      if (state.brackets === 0) {
        if (opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('opening', '['));
        }

        push({ type: 'text', value, output: `\\${value}` });
        continue;
      }

      decrement('brackets');

      const prevValue = prev.value.slice(1);
      if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
        value = `/${value}`;
      }

      prev.value += value;
      append({ value });

      // when literal brackets are explicitly disabled
      // assume we should match with a regex character class
      if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
        continue;
      }

      const escaped = utils.escapeRegex(prev.value);
      state.output = state.output.slice(0, -prev.value.length);

      // when literal brackets are explicitly enabled
      // assume we should escape the brackets to match literal characters
      if (opts.literalBrackets === true) {
        state.output += escaped;
        prev.value = escaped;
        continue;
      }

      // when the user specifies nothing, try to match both
      prev.value = `(${capture}${escaped}|${prev.value})`;
      state.output += prev.value;
      continue;
    }

    /**
     * Braces
     */

    if (value === '{' && opts.nobrace !== true) {
      increment('braces');

      const open = {
        type: 'brace',
        value,
        output: '(',
        outputIndex: state.output.length,
        tokensIndex: state.tokens.length
      };

      braces.push(open);
      push(open);
      continue;
    }

    if (value === '}') {
      const brace = braces[braces.length - 1];

      if (opts.nobrace === true || !brace) {
        push({ type: 'text', value, output: value });
        continue;
      }

      let output = ')';

      if (brace.dots === true) {
        const arr = tokens.slice();
        const range = [];

        for (let i = arr.length - 1; i >= 0; i--) {
          tokens.pop();
          if (arr[i].type === 'brace') {
            break;
          }
          if (arr[i].type !== 'dots') {
            range.unshift(arr[i].value);
          }
        }

        output = expandRange(range, opts);
        state.backtrack = true;
      }

      if (brace.comma !== true && brace.dots !== true) {
        const out = state.output.slice(0, brace.outputIndex);
        const toks = state.tokens.slice(brace.tokensIndex);
        brace.value = brace.output = '\\{';
        value = output = '\\}';
        state.output = out;
        for (const t of toks) {
          state.output += (t.output || t.value);
        }
      }

      push({ type: 'brace', value, output });
      decrement('braces');
      braces.pop();
      continue;
    }

    /**
     * Pipes
     */

    if (value === '|') {
      if (extglobs.length > 0) {
        extglobs[extglobs.length - 1].conditions++;
      }
      push({ type: 'text', value });
      continue;
    }

    /**
     * Commas
     */

    if (value === ',') {
      let output = value;

      const brace = braces[braces.length - 1];
      if (brace && stack[stack.length - 1] === 'braces') {
        brace.comma = true;
        output = '|';
      }

      push({ type: 'comma', value, output });
      continue;
    }

    /**
     * Slashes
     */

    if (value === '/') {
      // if the beginning of the glob is "./", advance the start
      // to the current index, and don't add the "./" characters
      // to the state. This greatly simplifies lookbehinds when
      // checking for BOS characters like "!" and "." (not "./")
      if (prev.type === 'dot' && state.index === state.start + 1) {
        state.start = state.index + 1;
        state.consumed = '';
        state.output = '';
        tokens.pop();
        prev = bos; // reset "prev" to the first token
        continue;
      }

      push({ type: 'slash', value, output: SLASH_LITERAL });
      continue;
    }

    /**
     * Dots
     */

    if (value === '.') {
      if (state.braces > 0 && prev.type === 'dot') {
        if (prev.value === '.') prev.output = DOT_LITERAL;
        const brace = braces[braces.length - 1];
        prev.type = 'dots';
        prev.output += value;
        prev.value += value;
        brace.dots = true;
        continue;
      }

      if ((state.braces + state.parens) === 0 && prev.type !== 'bos' && prev.type !== 'slash') {
        push({ type: 'text', value, output: DOT_LITERAL });
        continue;
      }

      push({ type: 'dot', value, output: DOT_LITERAL });
      continue;
    }

    /**
     * Question marks
     */

    if (value === '?') {
      const isGroup = prev && prev.value === '(';
      if (!isGroup && opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('qmark', value);
        continue;
      }

      if (prev && prev.type === 'paren') {
        const next = peek();
        let output = value;

        if (next === '<' && !utils.supportsLookbehinds()) {
          throw new Error('Node.js v10 or higher is required for regex lookbehinds');
        }

        if ((prev.value === '(' && !/[!=<:]/.test(next)) || (next === '<' && !/<([!=]|\w+>)/.test(remaining()))) {
          output = `\\${value}`;
        }

        push({ type: 'text', value, output });
        continue;
      }

      if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
        push({ type: 'qmark', value, output: QMARK_NO_DOT });
        continue;
      }

      push({ type: 'qmark', value, output: QMARK });
      continue;
    }

    /**
     * Exclamation
     */

    if (value === '!') {
      if (opts.noextglob !== true && peek() === '(') {
        if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
          extglobOpen('negate', value);
          continue;
        }
      }

      if (opts.nonegate !== true && state.index === 0) {
        negate();
        continue;
      }
    }

    /**
     * Plus
     */

    if (value === '+') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('plus', value);
        continue;
      }

      if ((prev && prev.value === '(') || opts.regex === false) {
        push({ type: 'plus', value, output: PLUS_LITERAL });
        continue;
      }

      if ((prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) || state.parens > 0) {
        push({ type: 'plus', value });
        continue;
      }

      push({ type: 'plus', value: PLUS_LITERAL });
      continue;
    }

    /**
     * Plain text
     */

    if (value === '@') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        push({ type: 'at', extglob: true, value, output: '' });
        continue;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Plain text
     */

    if (value !== '*') {
      if (value === '$' || value === '^') {
        value = `\\${value}`;
      }

      const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
      if (match) {
        value += match[0];
        state.index += match[0].length;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Stars
     */

    if (prev && (prev.type === 'globstar' || prev.star === true)) {
      prev.type = 'star';
      prev.star = true;
      prev.value += value;
      prev.output = star;
      state.backtrack = true;
      state.globstar = true;
      consume(value);
      continue;
    }

    let rest = remaining();
    if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
      extglobOpen('star', value);
      continue;
    }

    if (prev.type === 'star') {
      if (opts.noglobstar === true) {
        consume(value);
        continue;
      }

      const prior = prev.prev;
      const before = prior.prev;
      const isStart = prior.type === 'slash' || prior.type === 'bos';
      const afterStar = before && (before.type === 'star' || before.type === 'globstar');

      if (opts.bash === true && (!isStart || (rest[0] && rest[0] !== '/'))) {
        push({ type: 'star', value, output: '' });
        continue;
      }

      const isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace');
      const isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren');
      if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
        push({ type: 'star', value, output: '' });
        continue;
      }

      // strip consecutive `/**/`
      while (rest.slice(0, 3) === '/**') {
        const after = input[state.index + 4];
        if (after && after !== '/') {
          break;
        }
        rest = rest.slice(3);
        consume('/**', 3);
      }

      if (prior.type === 'bos' && eos()) {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = globstar(opts);
        state.output = prev.output;
        state.globstar = true;
        consume(value);
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;

        prev.type = 'globstar';
        prev.output = globstar(opts) + (opts.strictSlashes ? ')' : '|$)');
        prev.value += value;
        state.globstar = true;
        state.output += prior.output + prev.output;
        consume(value);
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && rest[0] === '/') {
        const end = rest[1] !== void 0 ? '|$' : '';

        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;

        prev.type = 'globstar';
        prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
        prev.value += value;

        state.output += prior.output + prev.output;
        state.globstar = true;

        consume(value + advance());

        push({ type: 'slash', value: '/', output: '' });
        continue;
      }

      if (prior.type === 'bos' && rest[0] === '/') {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
        state.output = prev.output;
        state.globstar = true;
        consume(value + advance());
        push({ type: 'slash', value: '/', output: '' });
        continue;
      }

      // remove single star from output
      state.output = state.output.slice(0, -prev.output.length);

      // reset previous token to globstar
      prev.type = 'globstar';
      prev.output = globstar(opts);
      prev.value += value;

      // reset output with globstar
      state.output += prev.output;
      state.globstar = true;
      consume(value);
      continue;
    }

    const token = { type: 'star', value, output: star };

    if (opts.bash === true) {
      token.output = '.*?';
      if (prev.type === 'bos' || prev.type === 'slash') {
        token.output = nodot + token.output;
      }
      push(token);
      continue;
    }

    if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
      token.output = value;
      push(token);
      continue;
    }

    if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
      if (prev.type === 'dot') {
        state.output += NO_DOT_SLASH;
        prev.output += NO_DOT_SLASH;

      } else if (opts.dot === true) {
        state.output += NO_DOTS_SLASH;
        prev.output += NO_DOTS_SLASH;

      } else {
        state.output += nodot;
        prev.output += nodot;
      }

      if (peek() !== '*') {
        state.output += ONE_CHAR;
        prev.output += ONE_CHAR;
      }
    }

    push(token);
  }

  while (state.brackets > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ']'));
    state.output = utils.escapeLast(state.output, '[');
    decrement('brackets');
  }

  while (state.parens > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ')'));
    state.output = utils.escapeLast(state.output, '(');
    decrement('parens');
  }

  while (state.braces > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', '}'));
    state.output = utils.escapeLast(state.output, '{');
    decrement('braces');
  }

  if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
    push({ type: 'maybe_slash', value: '', output: `${SLASH_LITERAL}?` });
  }

  // rebuild the output if we had to backtrack at any point
  if (state.backtrack === true) {
    state.output = '';

    for (const token of state.tokens) {
      state.output += token.output != null ? token.output : token.value;

      if (token.suffix) {
        state.output += token.suffix;
      }
    }
  }

  return state;
};

/**
 * Fast paths for creating regular expressions for common glob patterns.
 * This can significantly speed up processing and has very little downside
 * impact when none of the fast paths match.
 */

parse.fastpaths = (input, options) => {
  const opts = { ...options };
  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  const len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }

  input = REPLACEMENTS[input] || input;
  const win32 = utils.isWindows(options);

  // create constants based on platform, for windows or posix
  const {
    DOT_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOTS,
    NO_DOTS_SLASH,
    STAR,
    START_ANCHOR
  } = constants.globChars(win32);

  const nodot = opts.dot ? NO_DOTS : NO_DOT;
  const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
  const capture = opts.capture ? '' : '?:';
  const state = { negated: false, prefix: '' };
  let star = opts.bash === true ? '.*?' : STAR;

  if (opts.capture) {
    star = `(${star})`;
  }

  const globstar = (opts) => {
    if (opts.noglobstar === true) return star;
    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
  };

  const create = str => {
    switch (str) {
      case '*':
        return `${nodot}${ONE_CHAR}${star}`;

      case '.*':
        return `${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '*.*':
        return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '*/*':
        return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;

      case '**':
        return nodot + globstar(opts);

      case '**/*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;

      case '**/*.*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '**/.*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;

      default: {
        const match = /^(.*?)\.(\w+)$/.exec(str);
        if (!match) return;

        const source = create(match[1]);
        if (!source) return;

        return source + DOT_LITERAL + match[2];
      }
    }
  };

  const output = utils.removePrefix(input, state);
  let source = create(output);

  if (source && opts.strictSlashes !== true) {
    source += `${SLASH_LITERAL}?`;
  }

  return source;
};

module.exports = parse;


/***/ }),

/***/ 3322:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const path = __webpack_require__(5622);
const scan = __webpack_require__(2429);
const parse = __webpack_require__(2139);
const utils = __webpack_require__(479);
const constants = __webpack_require__(6099);
const isObject = val => val && typeof val === 'object' && !Array.isArray(val);

/**
 * Creates a matcher function from one or more glob patterns. The
 * returned function takes a string to match as its first argument,
 * and returns true if the string is a match. The returned matcher
 * function also takes a boolean as the second argument that, when true,
 * returns an object with additional information.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch(glob[, options]);
 *
 * const isMatch = picomatch('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @name picomatch
 * @param {String|Array} `globs` One or more glob patterns.
 * @param {Object=} `options`
 * @return {Function=} Returns a matcher function.
 * @api public
 */

const picomatch = (glob, options, returnState = false) => {
  if (Array.isArray(glob)) {
    const fns = glob.map(input => picomatch(input, options, returnState));
    const arrayMatcher = str => {
      for (const isMatch of fns) {
        const state = isMatch(str);
        if (state) return state;
      }
      return false;
    };
    return arrayMatcher;
  }

  const isState = isObject(glob) && glob.tokens && glob.input;

  if (glob === '' || (typeof glob !== 'string' && !isState)) {
    throw new TypeError('Expected pattern to be a non-empty string');
  }

  const opts = options || {};
  const posix = utils.isWindows(options);
  const regex = isState
    ? picomatch.compileRe(glob, options)
    : picomatch.makeRe(glob, options, false, true);

  const state = regex.state;
  delete regex.state;

  let isIgnored = () => false;
  if (opts.ignore) {
    const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
    isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
  }

  const matcher = (input, returnObject = false) => {
    const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix });
    const result = { glob, state, regex, posix, input, output, match, isMatch };

    if (typeof opts.onResult === 'function') {
      opts.onResult(result);
    }

    if (isMatch === false) {
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (isIgnored(input)) {
      if (typeof opts.onIgnore === 'function') {
        opts.onIgnore(result);
      }
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (typeof opts.onMatch === 'function') {
      opts.onMatch(result);
    }
    return returnObject ? result : true;
  };

  if (returnState) {
    matcher.state = state;
  }

  return matcher;
};

/**
 * Test `input` with the given `regex`. This is used by the main
 * `picomatch()` function to test the input string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.test(input, regex[, options]);
 *
 * console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
 * // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp} `regex`
 * @return {Object} Returns an object with matching info.
 * @api public
 */

picomatch.test = (input, regex, options, { glob, posix } = {}) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected input to be a string');
  }

  if (input === '') {
    return { isMatch: false, output: '' };
  }

  const opts = options || {};
  const format = opts.format || (posix ? utils.toPosixSlashes : null);
  let match = input === glob;
  let output = (match && format) ? format(input) : input;

  if (match === false) {
    output = format ? format(input) : input;
    match = output === glob;
  }

  if (match === false || opts.capture === true) {
    if (opts.matchBase === true || opts.basename === true) {
      match = picomatch.matchBase(input, regex, options, posix);
    } else {
      match = regex.exec(output);
    }
  }

  return { isMatch: Boolean(match), match, output };
};

/**
 * Match the basename of a filepath.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.matchBase(input, glob[, options]);
 * console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
 * @return {Boolean}
 * @api public
 */

picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
  const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
  return regex.test(path.basename(input));
};

/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.isMatch(string, patterns[, options]);
 *
 * console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String|Array} str The string to test.
 * @param {String|Array} patterns One or more glob patterns to use for matching.
 * @param {Object} [options] See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);

/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const result = picomatch.parse(pattern[, options]);
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as a regex source string.
 * @api public
 */

picomatch.parse = (pattern, options) => {
  if (Array.isArray(pattern)) return pattern.map(p => picomatch.parse(p, options));
  return parse(pattern, { ...options, fastpaths: false });
};

/**
 * Scan a glob pattern to separate the pattern into segments.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.scan(input[, options]);
 *
 * const result = picomatch.scan('!./foo/*.js');
 * console.log(result);
 * { prefix: '!./',
 *   input: '!./foo/*.js',
 *   start: 3,
 *   base: 'foo',
 *   glob: '*.js',
 *   isBrace: false,
 *   isBracket: false,
 *   isGlob: true,
 *   isExtglob: false,
 *   isGlobstar: false,
 *   negated: true }
 * ```
 * @param {String} `input` Glob pattern to scan.
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */

picomatch.scan = (input, options) => scan(input, options);

/**
 * Create a regular expression from a parsed glob pattern.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const state = picomatch.parse('*.js');
 * // picomatch.compileRe(state[, options]);
 *
 * console.log(picomatch.compileRe(state));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `state` The object returned from the `.parse` method.
 * @param {Object} `options`
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */

picomatch.compileRe = (parsed, options, returnOutput = false, returnState = false) => {
  if (returnOutput === true) {
    return parsed.output;
  }

  const opts = options || {};
  const prepend = opts.contains ? '' : '^';
  const append = opts.contains ? '' : '$';

  let source = `${prepend}(?:${parsed.output})${append}`;
  if (parsed && parsed.negated === true) {
    source = `^(?!${source}).*$`;
  }

  const regex = picomatch.toRegex(source, options);
  if (returnState === true) {
    regex.state = parsed;
  }

  return regex;
};

picomatch.makeRe = (input, options, returnOutput = false, returnState = false) => {
  if (!input || typeof input !== 'string') {
    throw new TypeError('Expected a non-empty string');
  }

  const opts = options || {};
  let parsed = { negated: false, fastpaths: true };
  let prefix = '';
  let output;

  if (input.startsWith('./')) {
    input = input.slice(2);
    prefix = parsed.prefix = './';
  }

  if (opts.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
    output = parse.fastpaths(input, options);
  }

  if (output === undefined) {
    parsed = parse(input, options);
    parsed.prefix = prefix + (parsed.prefix || '');
  } else {
    parsed.output = output;
  }

  return picomatch.compileRe(parsed, options, returnOutput, returnState);
};

/**
 * Create a regular expression from the given regex source string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.toRegex(source[, options]);
 *
 * const { output } = picomatch.parse('*.js');
 * console.log(picomatch.toRegex(output));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `source` Regular expression source string.
 * @param {Object} `options`
 * @return {RegExp}
 * @api public
 */

picomatch.toRegex = (source, options) => {
  try {
    const opts = options || {};
    return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''));
  } catch (err) {
    if (options && options.debug === true) throw err;
    return /$^/;
  }
};

/**
 * Picomatch constants.
 * @return {Object}
 */

picomatch.constants = constants;

/**
 * Expose "picomatch"
 */

module.exports = picomatch;


/***/ }),

/***/ 2429:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const utils = __webpack_require__(479);
const {
  CHAR_ASTERISK,             /* * */
  CHAR_AT,                   /* @ */
  CHAR_BACKWARD_SLASH,       /* \ */
  CHAR_COMMA,                /* , */
  CHAR_DOT,                  /* . */
  CHAR_EXCLAMATION_MARK,     /* ! */
  CHAR_FORWARD_SLASH,        /* / */
  CHAR_LEFT_CURLY_BRACE,     /* { */
  CHAR_LEFT_PARENTHESES,     /* ( */
  CHAR_LEFT_SQUARE_BRACKET,  /* [ */
  CHAR_PLUS,                 /* + */
  CHAR_QUESTION_MARK,        /* ? */
  CHAR_RIGHT_CURLY_BRACE,    /* } */
  CHAR_RIGHT_PARENTHESES,    /* ) */
  CHAR_RIGHT_SQUARE_BRACKET  /* ] */
} = __webpack_require__(6099);

const isPathSeparator = code => {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
};

const depth = token => {
  if (token.isPrefix !== true) {
    token.depth = token.isGlobstar ? Infinity : 1;
  }
};

/**
 * Quickly scans a glob pattern and returns an object with a handful of
 * useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
 * `glob` (the actual pattern), and `negated` (true if the path starts with `!`).
 *
 * ```js
 * const pm = require('picomatch');
 * console.log(pm.scan('foo/bar/*.js'));
 * { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {Object} Returns an object with tokens and regex source string.
 * @api public
 */

const scan = (input, options) => {
  const opts = options || {};

  const length = input.length - 1;
  const scanToEnd = opts.parts === true || opts.scanToEnd === true;
  const slashes = [];
  const tokens = [];
  const parts = [];

  let str = input;
  let index = -1;
  let start = 0;
  let lastIndex = 0;
  let isBrace = false;
  let isBracket = false;
  let isGlob = false;
  let isExtglob = false;
  let isGlobstar = false;
  let braceEscaped = false;
  let backslashes = false;
  let negated = false;
  let finished = false;
  let braces = 0;
  let prev;
  let code;
  let token = { value: '', depth: 0, isGlob: false };

  const eos = () => index >= length;
  const peek = () => str.charCodeAt(index + 1);
  const advance = () => {
    prev = code;
    return str.charCodeAt(++index);
  };

  while (index < length) {
    code = advance();
    let next;

    if (code === CHAR_BACKWARD_SLASH) {
      backslashes = token.backslashes = true;
      code = advance();

      if (code === CHAR_LEFT_CURLY_BRACE) {
        braceEscaped = true;
      }
      continue;
    }

    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
      braces++;

      while (eos() !== true && (code = advance())) {
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }

        if (code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          continue;
        }

        if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }

          break;
        }

        if (braceEscaped !== true && code === CHAR_COMMA) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }

          break;
        }

        if (code === CHAR_RIGHT_CURLY_BRACE) {
          braces--;

          if (braces === 0) {
            braceEscaped = false;
            isBrace = token.isBrace = true;
            finished = true;
            break;
          }
        }
      }

      if (scanToEnd === true) {
        continue;
      }

      break;
    }

    if (code === CHAR_FORWARD_SLASH) {
      slashes.push(index);
      tokens.push(token);
      token = { value: '', depth: 0, isGlob: false };

      if (finished === true) continue;
      if (prev === CHAR_DOT && index === (start + 1)) {
        start += 2;
        continue;
      }

      lastIndex = index + 1;
      continue;
    }

    if (opts.noext !== true) {
      const isExtglobChar = code === CHAR_PLUS
        || code === CHAR_AT
        || code === CHAR_ASTERISK
        || code === CHAR_QUESTION_MARK
        || code === CHAR_EXCLAMATION_MARK;

      if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
        isGlob = token.isGlob = true;
        isExtglob = token.isExtglob = true;
        finished = true;

        if (scanToEnd === true) {
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              code = advance();
              continue;
            }

            if (code === CHAR_RIGHT_PARENTHESES) {
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          continue;
        }
        break;
      }
    }

    if (code === CHAR_ASTERISK) {
      if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
      isGlob = token.isGlob = true;
      finished = true;

      if (scanToEnd === true) {
        continue;
      }
      break;
    }

    if (code === CHAR_QUESTION_MARK) {
      isGlob = token.isGlob = true;
      finished = true;

      if (scanToEnd === true) {
        continue;
      }
      break;
    }

    if (code === CHAR_LEFT_SQUARE_BRACKET) {
      while (eos() !== true && (next = advance())) {
        if (next === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }

        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
          isBracket = token.isBracket = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
    }

    if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
      negated = token.negated = true;
      start++;
      continue;
    }

    if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
      isGlob = token.isGlob = true;

      if (scanToEnd === true) {
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_LEFT_PARENTHESES) {
            backslashes = token.backslashes = true;
            code = advance();
            continue;
          }

          if (code === CHAR_RIGHT_PARENTHESES) {
            finished = true;
            break;
          }
        }
        continue;
      }
      break;
    }

    if (isGlob === true) {
      finished = true;

      if (scanToEnd === true) {
        continue;
      }

      break;
    }
  }

  if (opts.noext === true) {
    isExtglob = false;
    isGlob = false;
  }

  let base = str;
  let prefix = '';
  let glob = '';

  if (start > 0) {
    prefix = str.slice(0, start);
    str = str.slice(start);
    lastIndex -= start;
  }

  if (base && isGlob === true && lastIndex > 0) {
    base = str.slice(0, lastIndex);
    glob = str.slice(lastIndex);
  } else if (isGlob === true) {
    base = '';
    glob = str;
  } else {
    base = str;
  }

  if (base && base !== '' && base !== '/' && base !== str) {
    if (isPathSeparator(base.charCodeAt(base.length - 1))) {
      base = base.slice(0, -1);
    }
  }

  if (opts.unescape === true) {
    if (glob) glob = utils.removeBackslashes(glob);

    if (base && backslashes === true) {
      base = utils.removeBackslashes(base);
    }
  }

  const state = {
    prefix,
    input,
    start,
    base,
    glob,
    isBrace,
    isBracket,
    isGlob,
    isExtglob,
    isGlobstar,
    negated
  };

  if (opts.tokens === true) {
    state.maxDepth = 0;
    if (!isPathSeparator(code)) {
      tokens.push(token);
    }
    state.tokens = tokens;
  }

  if (opts.parts === true || opts.tokens === true) {
    let prevIndex;

    for (let idx = 0; idx < slashes.length; idx++) {
      const n = prevIndex ? prevIndex + 1 : start;
      const i = slashes[idx];
      const value = input.slice(n, i);
      if (opts.tokens) {
        if (idx === 0 && start !== 0) {
          tokens[idx].isPrefix = true;
          tokens[idx].value = prefix;
        } else {
          tokens[idx].value = value;
        }
        depth(tokens[idx]);
        state.maxDepth += tokens[idx].depth;
      }
      if (idx !== 0 || value !== '') {
        parts.push(value);
      }
      prevIndex = i;
    }

    if (prevIndex && prevIndex + 1 < input.length) {
      const value = input.slice(prevIndex + 1);
      parts.push(value);

      if (opts.tokens) {
        tokens[tokens.length - 1].value = value;
        depth(tokens[tokens.length - 1]);
        state.maxDepth += tokens[tokens.length - 1].depth;
      }
    }

    state.slashes = slashes;
    state.parts = parts;
  }

  return state;
};

module.exports = scan;


/***/ }),

/***/ 479:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const path = __webpack_require__(5622);
const win32 = process.platform === 'win32';
const {
  REGEX_BACKSLASH,
  REGEX_REMOVE_BACKSLASH,
  REGEX_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_GLOBAL
} = __webpack_require__(6099);

exports.isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);
exports.hasRegexChars = str => REGEX_SPECIAL_CHARS.test(str);
exports.isRegexChar = str => str.length === 1 && exports.hasRegexChars(str);
exports.escapeRegex = str => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
exports.toPosixSlashes = str => str.replace(REGEX_BACKSLASH, '/');

exports.removeBackslashes = str => {
  return str.replace(REGEX_REMOVE_BACKSLASH, match => {
    return match === '\\' ? '' : match;
  });
};

exports.supportsLookbehinds = () => {
  const segs = process.version.slice(1).split('.').map(Number);
  if (segs.length === 3 && segs[0] >= 9 || (segs[0] === 8 && segs[1] >= 10)) {
    return true;
  }
  return false;
};

exports.isWindows = options => {
  if (options && typeof options.windows === 'boolean') {
    return options.windows;
  }
  return win32 === true || path.sep === '\\';
};

exports.escapeLast = (input, char, lastIdx) => {
  const idx = input.lastIndexOf(char, lastIdx);
  if (idx === -1) return input;
  if (input[idx - 1] === '\\') return exports.escapeLast(input, char, idx - 1);
  return `${input.slice(0, idx)}\\${input.slice(idx)}`;
};

exports.removePrefix = (input, state = {}) => {
  let output = input;
  if (output.startsWith('./')) {
    output = output.slice(2);
    state.prefix = './';
  }
  return output;
};

exports.wrapOutput = (input, state = {}, options = {}) => {
  const prepend = options.contains ? '' : '^';
  const append = options.contains ? '' : '$';

  let output = `${prepend}(?:${input})${append}`;
  if (state.negated === true) {
    output = `(?:^(?!${output}).*$)`;
  }
  return output;
};


/***/ }),

/***/ 2113:
/***/ ((module) => {

"use strict";


function reusify (Constructor) {
  var head = new Constructor()
  var tail = head

  function get () {
    var current = head

    if (current.next) {
      head = current.next
    } else {
      head = new Constructor()
      tail = head
    }

    current.next = null

    return current
  }

  function release (obj) {
    tail.next = obj
    tail = obj
  }

  return {
    get: get,
    release: release
  }
}

module.exports = reusify


/***/ }),

/***/ 5288:
/***/ ((module) => {

/*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
module.exports = runParallel

function runParallel (tasks, cb) {
  var results, pending, keys
  var isSync = true

  if (Array.isArray(tasks)) {
    results = []
    pending = tasks.length
  } else {
    keys = Object.keys(tasks)
    results = {}
    pending = keys.length
  }

  function done (err) {
    function end () {
      if (cb) cb(err, results)
      cb = null
    }
    if (isSync) process.nextTick(end)
    else end()
  }

  function each (i, err, result) {
    results[i] = result
    if (--pending === 0 || err) {
      done(err)
    }
  }

  if (!pending) {
    // empty
    done(null)
  } else if (keys) {
    // object
    keys.forEach(function (key) {
      tasks[key](function (err, result) { each(key, err, result) })
    })
  } else {
    // array
    tasks.forEach(function (task, i) {
      task(function (err, result) { each(i, err, result) })
    })
  }

  isSync = false
}


/***/ }),

/***/ 4111:
/***/ ((module) => {

"use strict";

module.exports = path => {
	const isExtendedLengthPath = /^\\\\\?\\/.test(path);
	const hasNonAscii = /[^\u0000-\u0080]+/.test(path); // eslint-disable-line no-control-regex

	if (isExtendedLengthPath || hasNonAscii) {
		return path;
	}

	return path.replace(/\\/g, '/');
};


/***/ }),

/***/ 1861:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */



const isNumber = __webpack_require__(5680);

const toRegexRange = (min, max, options) => {
  if (isNumber(min) === false) {
    throw new TypeError('toRegexRange: expected the first argument to be a number');
  }

  if (max === void 0 || min === max) {
    return String(min);
  }

  if (isNumber(max) === false) {
    throw new TypeError('toRegexRange: expected the second argument to be a number.');
  }

  let opts = { relaxZeros: true, ...options };
  if (typeof opts.strictZeros === 'boolean') {
    opts.relaxZeros = opts.strictZeros === false;
  }

  let relax = String(opts.relaxZeros);
  let shorthand = String(opts.shorthand);
  let capture = String(opts.capture);
  let wrap = String(opts.wrap);
  let cacheKey = min + ':' + max + '=' + relax + shorthand + capture + wrap;

  if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
    return toRegexRange.cache[cacheKey].result;
  }

  let a = Math.min(min, max);
  let b = Math.max(min, max);

  if (Math.abs(a - b) === 1) {
    let result = min + '|' + max;
    if (opts.capture) {
      return `(${result})`;
    }
    if (opts.wrap === false) {
      return result;
    }
    return `(?:${result})`;
  }

  let isPadded = hasPadding(min) || hasPadding(max);
  let state = { min, max, a, b };
  let positives = [];
  let negatives = [];

  if (isPadded) {
    state.isPadded = isPadded;
    state.maxLen = String(state.max).length;
  }

  if (a < 0) {
    let newMin = b < 0 ? Math.abs(b) : 1;
    negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
    a = state.a = 0;
  }

  if (b >= 0) {
    positives = splitToPatterns(a, b, state, opts);
  }

  state.negatives = negatives;
  state.positives = positives;
  state.result = collatePatterns(negatives, positives, opts);

  if (opts.capture === true) {
    state.result = `(${state.result})`;
  } else if (opts.wrap !== false && (positives.length + negatives.length) > 1) {
    state.result = `(?:${state.result})`;
  }

  toRegexRange.cache[cacheKey] = state;
  return state.result;
};

function collatePatterns(neg, pos, options) {
  let onlyNegative = filterPatterns(neg, pos, '-', false, options) || [];
  let onlyPositive = filterPatterns(pos, neg, '', false, options) || [];
  let intersected = filterPatterns(neg, pos, '-?', true, options) || [];
  let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
  return subpatterns.join('|');
}

function splitToRanges(min, max) {
  let nines = 1;
  let zeros = 1;

  let stop = countNines(min, nines);
  let stops = new Set([max]);

  while (min <= stop && stop <= max) {
    stops.add(stop);
    nines += 1;
    stop = countNines(min, nines);
  }

  stop = countZeros(max + 1, zeros) - 1;

  while (min < stop && stop <= max) {
    stops.add(stop);
    zeros += 1;
    stop = countZeros(max + 1, zeros) - 1;
  }

  stops = [...stops];
  stops.sort(compare);
  return stops;
}

/**
 * Convert a range to a regex pattern
 * @param {Number} `start`
 * @param {Number} `stop`
 * @return {String}
 */

function rangeToPattern(start, stop, options) {
  if (start === stop) {
    return { pattern: start, count: [], digits: 0 };
  }

  let zipped = zip(start, stop);
  let digits = zipped.length;
  let pattern = '';
  let count = 0;

  for (let i = 0; i < digits; i++) {
    let [startDigit, stopDigit] = zipped[i];

    if (startDigit === stopDigit) {
      pattern += startDigit;

    } else if (startDigit !== '0' || stopDigit !== '9') {
      pattern += toCharacterClass(startDigit, stopDigit, options);

    } else {
      count++;
    }
  }

  if (count) {
    pattern += options.shorthand === true ? '\\d' : '[0-9]';
  }

  return { pattern, count: [count], digits };
}

function splitToPatterns(min, max, tok, options) {
  let ranges = splitToRanges(min, max);
  let tokens = [];
  let start = min;
  let prev;

  for (let i = 0; i < ranges.length; i++) {
    let max = ranges[i];
    let obj = rangeToPattern(String(start), String(max), options);
    let zeros = '';

    if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
      if (prev.count.length > 1) {
        prev.count.pop();
      }

      prev.count.push(obj.count[0]);
      prev.string = prev.pattern + toQuantifier(prev.count);
      start = max + 1;
      continue;
    }

    if (tok.isPadded) {
      zeros = padZeros(max, tok, options);
    }

    obj.string = zeros + obj.pattern + toQuantifier(obj.count);
    tokens.push(obj);
    start = max + 1;
    prev = obj;
  }

  return tokens;
}

function filterPatterns(arr, comparison, prefix, intersection, options) {
  let result = [];

  for (let ele of arr) {
    let { string } = ele;

    // only push if _both_ are negative...
    if (!intersection && !contains(comparison, 'string', string)) {
      result.push(prefix + string);
    }

    // or _both_ are positive
    if (intersection && contains(comparison, 'string', string)) {
      result.push(prefix + string);
    }
  }
  return result;
}

/**
 * Zip strings
 */

function zip(a, b) {
  let arr = [];
  for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]]);
  return arr;
}

function compare(a, b) {
  return a > b ? 1 : b > a ? -1 : 0;
}

function contains(arr, key, val) {
  return arr.some(ele => ele[key] === val);
}

function countNines(min, len) {
  return Number(String(min).slice(0, -len) + '9'.repeat(len));
}

function countZeros(integer, zeros) {
  return integer - (integer % Math.pow(10, zeros));
}

function toQuantifier(digits) {
  let [start = 0, stop = ''] = digits;
  if (stop || start > 1) {
    return `{${start + (stop ? ',' + stop : '')}}`;
  }
  return '';
}

function toCharacterClass(a, b, options) {
  return `[${a}${(b - a === 1) ? '' : '-'}${b}]`;
}

function hasPadding(str) {
  return /^-?(0+)\d/.test(str);
}

function padZeros(value, tok, options) {
  if (!tok.isPadded) {
    return value;
  }

  let diff = Math.abs(tok.maxLen - String(value).length);
  let relax = options.relaxZeros !== false;

  switch (diff) {
    case 0:
      return '';
    case 1:
      return relax ? '0?' : '0';
    case 2:
      return relax ? '0{0,2}' : '00';
    default: {
      return relax ? `0{0,${diff}}` : `0{${diff}}`;
    }
  }
}

/**
 * Cache
 */

toRegexRange.cache = {};
toRegexRange.clearCache = () => (toRegexRange.cache = {});

/**
 * Expose `toRegexRange`
 */

module.exports = toRegexRange;


/***/ }),

/***/ 2877:
/***/ ((module) => {

module.exports = eval("require")("encoding");


/***/ }),

/***/ 6417:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");;

/***/ }),

/***/ 8614:
/***/ ((module) => {

"use strict";
module.exports = require("events");;

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 8605:
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ 7211:
/***/ ((module) => {

"use strict";
module.exports = require("https");;

/***/ }),

/***/ 2087:
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ 2413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");;

/***/ }),

/***/ 8835:
/***/ ((module) => {

"use strict";
module.exports = require("url");;

/***/ }),

/***/ 1669:
/***/ ((module) => {

"use strict";
module.exports = require("util");;

/***/ }),

/***/ 8761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__webpack_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(3109);
/******/ })()
;
//# sourceMappingURL=index.js.map