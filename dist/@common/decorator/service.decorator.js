"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var property_1 = require("../utils/property");
var database_mysql_1 = require("../db/database_mysql");
var typeorm_1 = require("typeorm");
exports.Service = function () {
    return function (target) {
        property_1.__DefinePrivateProperty(target.prototype, '_identity', 'service');
        property_1.__DefinePrivateProperty(target.prototype, 'execute', database_mysql_1.execute);
        property_1.__DefinePrivateProperty(target.prototype, 'getRepository', typeorm_1.getRepository);
        property_1.__DefinePrivateProperty(target.prototype, 'getManager', typeorm_1.getManager);
        property_1.__DefinePrivateProperty(target.prototype, 'getConnection', typeorm_1.getConnection);
        // return new target();
        return target;
    };
};
