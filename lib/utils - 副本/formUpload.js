const formidable = new require("formidable").IncomingForm();
const path = require("path");
const fs = require("fs");
const xlsx = require('node-xlsx');

// 先模拟 后面再分配目录
const uploadConfig = (global.config || {}).upload ? global.config.upload : {
    uploadDir: path.resolve(__dirname, '../static/uploads/'),
    filePath: 'http://10.28.46.36:81/file/'
}

exports._doFormidable = async function _doFormidable(ctx, options = 'images') {
    try {
        if (typeof options == 'string') {
            options = { type: options }
        }
        let result = await _formidableInit(ctx.req, {
            uploadDir: path.join(uploadConfig.uploadDir, options.type)
        });
        if (!result.fields) {
            throw new Error(result.err);
        }
        let file = result.files.file;
        if (file.size == 0) {
            throw new Error("上传文件不能为空~");
        }
        let filePath = (path.parse(file.path) || { base: '' });
        try {
            if (options.reg && !options.reg.test(filePath.ext)) {
                // 删除文件
                _deleteFolder(file.path);
                throw new Error("文件格式不合法~");
            }
        } catch (e) {
            throw new Error("文件类型校验失败~");
        }
        return {
            fileUrl: `${uploadConfig.filePath+options.type}/${filePath.base}`,
            fileBase: filePath.base
        }
    } catch (e) {
        throw new Error(e.message);
    }
}


let index = 0;
// 遍历创建文件夹
function _mkdirDirectory(directory, count) {
    if (count >= 5) return true;
    try {
        let isMkdir = fs.existsSync(directory);
        logger2(null, 'isMkdir: ' + isMkdir);
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
            logger2(null, '开始上传文件');
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
        logger2(null, '删除文件成功');
        // logger.info('删除文件成功');
    } else {
        logger2(null, '路径不存在，文件删除失败: ' + url);
        // logger.info('路径不存在，文件删除失败: ' + url);
    }
}