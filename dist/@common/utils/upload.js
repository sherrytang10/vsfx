"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var formidable = require('formidable').IncomingForm();
var path = require("path");
var fs = require("fs");
// const xlsx = require('node-xlsx');
// 先模拟 后面再分配目录
var uploadConfig = {
    uploadDir: path.resolve(__dirname, '/data/web_tbwork_static'),
    filePath: 'http://static.qualc.cn/'
};
var index = 0;
// 遍历创建文件夹
function _mkdirDirectory(directory, count) {
    if (count === void 0) { count = 0; }
    if (count >= 5)
        return true;
    try {
        var isMkdir = fs.existsSync(directory);
        // logger.info('isMkdir: ' + isMkdir);
        if (!isMkdir) {
            fs.mkdirSync(directory);
        }
    }
    catch (e) {
        var tempDire = path.join(directory, '../');
        _mkdirDirectory(tempDire, ++index);
        fs.mkdirSync(directory);
    }
}
function _formidableInit(req, options) {
    return new Promise(function (resolve, reject) {
        try {
            var directory = options.uploadDir || uploadConfig.uploadDir;
            // 校验存放路径是否存在
            _mkdirDirectory(directory);
            // logger.info('开始上传文件');
            formidable.uploadDir = directory;
            // 是否保持原文件扩展名
            formidable.keepExtensions = true;
            // 上传文件的最大大小
            // formidable.maxFieldsSize = 20 * 1024 * 1024;
            // let fileName = ( path.parse(directory) || {base: ''}).base;
            formidable.parse(req, function (err, fields, files) {
                if (fields === void 0) { fields = true; }
                resolve({ fields: fields, files: files });
            });
        }
        catch (e) {
            resolve({ fields: false, err: e.message });
        }
    });
}
function _deleteFolder(url) {
    var files = [];
    if (fs.existsSync(url)) {
        fs.unlinkSync(url);
        console.log(null, '删除文件成功');
    }
    else {
        console.log(null, '路径不存在，文件删除失败: ' + url);
    }
}
function doFormidable(req, options) {
    return __awaiter(this, void 0, void 0, function () {
        var rResult, result, file, filePath, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rResult = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    if (!options) {
                        options = 'images';
                    }
                    if (typeof options == 'string') {
                        options = { type: options };
                    }
                    result = void 0;
                    return [4 /*yield*/, _formidableInit(req, {
                            uploadDir: path.join(uploadConfig.uploadDir, options.type)
                        })];
                case 2:
                    result = _a.sent();
                    if (!result.fields) {
                        throw new Error('ErrCode: 3,' + result.err);
                    }
                    file = result.files.file;
                    if (file.size == 0) {
                        throw new Error('ErrCode: 3,' + "上传文件不能为空~");
                    }
                    filePath = (path.parse(file.path) || { base: '' });
                    try {
                        if (options.reg && !options.reg.test(filePath.ext)) {
                            // 删除文件
                            _deleteFolder(path.join(uploadConfig.uploadDir, options.type));
                            throw new Error('ErrCode: 3,' + "文件格式不合法~");
                        }
                    }
                    catch (e) {
                        throw new Error('ErrCode: 3,' + "文件类型校验失败~");
                    }
                    return [2 /*return*/, {
                            fileUrl: uploadConfig.filePath + options.type + "/" + filePath.base,
                            fileBase: filePath.base,
                            fileName: file.name
                        }];
                case 3:
                    e_1 = _a.sent();
                    throw new Error('ErrCode: 3,' + e_1.message);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.doFormidable = doFormidable;
