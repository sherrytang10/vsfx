const formidable = require('formidable').IncomingForm();
const path = require("path");
const fs = require("fs");
import { optionsObj, resultObj } from './upload.d';
// const xlsx = require('node-xlsx');

// 先模拟 后面再分配目录
const uploadConfig = {
    uploadDir: path.resolve(__dirname, '/data/web_tbwork_static'),
    filePath: 'http://static.qualc.cn/'
}

let index = 0;
// 遍历创建文件夹
function _mkdirDirectory(directory, count = 0) {
    if (count >= 5) return true;
    try {
        let isMkdir = fs.existsSync(directory);
        // logger.info('isMkdir: ' + isMkdir);
        if (!isMkdir) {
            fs.mkdirSync(directory);
        }
    } catch (e) {
        let tempDire = path.join(directory, '../');
        _mkdirDirectory(tempDire, ++index);
        fs.mkdirSync(directory);
    }
}

function _formidableInit(req, options) {
    return new Promise((resolve, reject) => {
        try {
            let directory = options.uploadDir || uploadConfig.uploadDir;
            // 校验存放路径是否存在
            _mkdirDirectory(directory)
            // logger.info('开始上传文件');
            formidable.uploadDir = directory;

            // 是否保持原文件扩展名
            formidable.keepExtensions = true;
            // 上传文件的最大大小
            // formidable.maxFieldsSize = 20 * 1024 * 1024;
            // let fileName = ( path.parse(directory) || {base: ''}).base;
            formidable.parse(req, (err, fields = true, files) => {
                resolve({ fields, files });
            });
        } catch (e) {
            resolve({ fields: false, err: e.message });
        }
    });
}

function _deleteFolder(url) {
    let files = [];
    if (fs.existsSync(url)) {
        fs.unlinkSync(url);
        console.log(null, '删除文件成功');
    } else {
        console.log(null, '路径不存在，文件删除失败: ' + url);
    }
}

export async function doFormidable(req, options: optionsObj | string) {
    let rResult = {};
    try {
        if (!options) {
            options = 'images';
        }
        if (typeof options == 'string') {
            options = { type: options }
        }
        let result;
        result = await _formidableInit(req, {
            uploadDir: path.join(uploadConfig.uploadDir, options.type)
        });
        if (!result.fields) {
            throw new Error('ErrCode: 3,' + result.err);
        }
        let file = result.files.file;
        if (file.size == 0) {
            throw new Error('ErrCode: 3,' + "上传文件不能为空~");
        }
        let filePath = (path.parse(file.path) || { base: '' });
        try {
            if (options.reg && !options.reg.test(filePath.ext)) {
                // 删除文件
                _deleteFolder(path.join(uploadConfig.uploadDir, options.type));
                throw new Error('ErrCode: 3,' + "文件格式不合法~");
            }
        } catch (e) {
            throw new Error('ErrCode: 3,' + "文件类型校验失败~");
        }
        return {
            fileUrl: `${uploadConfig.filePath + options.type}/${filePath.base}`,
            fileBase: filePath.base,
            fileName: file.name
        }
    } catch (e) {
        throw new Error('ErrCode: 3,' + e.message);
    }
}