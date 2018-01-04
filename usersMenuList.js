(function() {
    var Web = {
        _isClick: true,
        _data: {
            id: 0,
            menuName: '',
            menuKey: '',
            menuUri: '',
            parentId: 0,
            isMenu: 1,
            descriptor: ''
        },
        _searchData: {
            menuName: ''
        },
        init: function() {
            CommFunc.fSideBarCurMenu('systemSubMenu', 'usersMenuList'); //左侧菜单选中
            this.bindEvent();
        },
        initUserBox: function() {
            if (!this._data.id) {
                $('#usersMenuBoxTitle').html('添加菜单');
                $('#usersMenuBoxSubmit').html('添加');
                $('#menuName').val('');
                $('#menuKEY').val('');
                $('#menuUri').val('');
                $('#usersMenuBoxMenuId').val(0);
                $('#menuIsMenu').attr('checked', true);
                $('#menuDescriptor').val('');
            } else {
                $('#usersMenuBoxTitle').html('编辑菜单');
                $('#usersMenuBoxSubmit').html('修改');
                $('#menuName').val(this._data.menuName);
                $('#menuKEY').val(this._data.menuKey);
                $('#menuUri').val(this._data.menuUri);
                $('#usersMenuBoxMenuId').val(this._data.parentId);
                $('#menuIsMenu').attr('checked', !!this._data.isMenu);
                $('#menuDescriptor').val(this._data.descriptor);
            }
            $('#addUserMenuBox').show();
        },
        loadListData: function() {
            if (!this._isClick) { return; }
            this._isClick = false;
            var _self = this;
            var url = "/noderestapi/management/usersmenu/list";
            CommFunc.fGetData({
                type: 'post',
                contentType: "application/json",
                url: url,
                data: JSON.stringify(this._searchData)
            }, function(req) {
                if (req.status == 1) {
                    if (req.results.length > 0) {
                        var data = req.results;
                        var url = "/static/views/users/usersMenuList.ejs";
                        $.get(url, function(str) {
                            str = str.substring(str.indexOf('<tbody id="ul_infoLis') + 1, str.indexOf('</tbody>') - 1)
                            var htmlStr = ejs.render(str, { menuList: data, promise: "1" });
                            $("#ul_infoList").html(htmlStr);
                        })
                    } else {
                        $("#ul_infoList").html("<tr><td class='noInfoMsg center' colspan=7><p >暂无数据信息</p></td></tr>");

                    }
                } else {
                    $("#ul_infoList").html("<tr><td colspan=7><p class='noInfoMsg'>" + req.errmsg + "</p></td></tr>");
                }
                _self._isClick = true;
            }, function(req) {
                $("#ul_infoList").html("<tr><td colspan=7><p class='noInfoMsg'>服务器有点忙，请稍后重试</p></td></tr>");
                _self._isClick = true;
            });
        },
        deleteUsersMenu: function(id) {
            if (!this._isClick) { return; }
            this._isClick = false;
            var _self = this;
            var url = "/noderestapi/management/usersmenu/delete/" + id;
            CommFunc.fGetData({
                type: 'get',
                contentType: "application/json",
                url: url,
            }, function(req) {
                if (req.status == 1) {
                    msgBox.mAlert(req.results || "删除成功！", function() {
                        window.location.reload();
                    });
                } else {
                    msgBox.mAlert(req.errmsg || '删除失败');
                }
                _self._isClick = true;
            }, function(req) {
                msgBox.mAlert(req.errmsg || '删除失败');
                _self._isClick = true;
            });
        },
        saveOrupdateUsersMenu: function(data) {
            if (!this._isClick) { return; }
            this._isClick = false;
            var _self = this;
            var url = "/noderestapi/management/usersmenu/saveOrUpdate";
            CommFunc.fGetData({
                type: 'post',
                contentType: "application/json",
                url: url,
                data: JSON.stringify(this._data)
            }, function(req) {
                if (req.status == 1) {
                    msgBox.mAlert(req.results || "操作成功！", function() {
                        window.location.reload();
                    });
                } else {
                    msgBox.mAlert(req.errmsg || '操作失败');
                    _self._isClick = true;
                }
            }, function(req) {
                msgBox.mAlert(req.errmsg || '操作失败');
                _self._isClick = true;
            });
        },
        saveSort: function(arr) {
            var url = "/noderestapi/management/usersmenu/savesort";
            CommFunc.fGetData({
                type: 'post',
                contentType: "application/json",
                url: url,
                data: JSON.stringify({ arr: arr })
            }, function(req) {
                if (req.status == 1) {
                    msgBox.mAlert(req.results || "操作成功！", function() {
                        window.location.reload();
                    });
                } else {
                    msgBox.mAlert(req.errmsg || '操作失败');
                }
                _self._isClick = true;
            }, function(req) {
                msgBox.mAlert(req.errmsg || '操作失败');
                _self._isClick = true;
            });
        },
        bindEvent: function() {
            var _self = this;
            $('#submitSeach').on('click', function() {
                var menuName = $('#menuSearchName').val();
                // if (!menuName) {
                //     return;
                // }
                _self._searchData.menuName = menuName;
                _self.loadListData();
            });
            $(document).on('click', '.btnDeleteUserMenu', function() {
                var id = this.dataset.id,
                    menuname = this.dataset.menuname;
                msgBox({
                    msg: '是否删除用户组  "' + menuname + '"',
                    btnS: [{
                        'name': '确定',
                        'callback': function(o) {
                            if (!/^[1-9][0-9]?$/.test(id)) {
                                msgBox.mAlert('id信息异常，请刷新页面重试');
                                return;
                            }
                            _self.deleteUsersMenu(id);
                            o.close();
                        }
                    }, {
                        'name': '取消',
                        'callback': function(o) {
                            o.close();
                        }
                    }]
                })

            });
            // 打开子菜单列表
            $(document).on('click', '.menu-close', function() {
                var id = this.dataset.id;
                var subTr = $('[data-parentid=' + id + ']');
                subTr.show();
                $(this).attr('class', 'menu-open');
            });
            // 关闭子菜单列表
            $(document).on('click', '.menu-open', function() {
                var id = this.dataset.id;
                var subTr = $('[data-parentid=' + id + ']');
                subTr.hide();
                $(this).attr('class', 'menu-close');
            });

            $(document).on('click', '#showAddInfo', function() {
                _self._data.id = 0;
                _self.initUserBox()
            });
            //弹框关闭事件
            $('#addUserMenuBox').on('click', '.close', function() {
                $("#addUserMenuBox").hide();
            });
            $(document).on('click', '#usersMenuBoxSubmit', function() {
                var vali = _self.valiFrom();
                if (!vali) return false;
                _self.saveOrupdateUsersMenu();
            });

            $(document).on('click', '.btnUpdateUserMenu', function() {
                var $this = $(this),
                    id = $this.data('id'),
                    tr = $(this).parents('tr'),
                    descriptor = tr.attr('title'),
                    menuName = tr.data('menuname'),
                    parentId = tr.data('parentid'),
                    menuKey = tr.data('menukey'),
                    isMenu = tr.data('ismenu'),
                    menuUri = tr.data('menuuri');
                if (!/^[1-9][0-9]?$/.test(id)) {
                    msgBox.mAlert('id信息异常，请刷新页面重试');
                    return;
                }
                if (!/^[0-9]+$/.test(parentId)) {
                    msgBox.mAlert('parentId信息异常，请刷新页面重试');
                    return;
                }
                if (!/^[01]$/.test(isMenu)) {
                    msgBox.mAlert('isMenu信息异常，请刷新页面重试');
                    return;
                }
                _self._data.id = id;
                _self._data.menuName = menuName;
                _self._data.menuKey = menuKey;
                _self._data.menuUri = menuUri;
                _self._data.descriptor = descriptor;
                _self._data.parentId = +parentId;
                _self._data.isMenu = +isMenu;
                _self.initUserBox();
            });

            $('tbody tr').on('dragover', function(ev) {
                ev.preventDefault();
            }).on('dragstart', function(ev) {
                let target = ev.target;
                // 拖动元提升到tr
                while (target.tagName.toLocaleUpperCase() != 'TR') {
                    target = target.parentNode;
                }
                ev.originalEvent.dataTransfer.setData("evId", target.id);
            }).on('drop', function(ev) {
                ev.preventDefault();

                let target = ev.target;
                // 存放容器提升到tr
                while (target.tagName.toLocaleUpperCase() != 'TR') {
                    target = target.parentNode;
                }
                // dragEv 拖动元素
                var evId = ev.originalEvent.dataTransfer.getData("evId"),
                    dragEv = document.getElementById(evId),
                    ulInfoList = document.getElementById('ul_infoList');
                var siblings = [];
                // 移动父节点时需要带动子节点
                if (evId.substr(0, 3) == 'ptr') {
                    var elemnt = dragEv.nextSibling;
                    while (elemnt) {
                        // elemnt = 1 !== elemnt.nodeType ? elemnt.nextSibling : elemnt.id.substr(0, 3) != "ptr" ? siblings.push(elemnt) && elemnt.nextSibling : null;
                        if (1 === elemnt.nodeType) {
                            if (elemnt.id.substr(0, 3) != "ptr") {
                                siblings.push(elemnt);
                                elemnt = elemnt.nextSibling;
                            } else {
                                elemnt = null;
                            }
                        } else {
                            elemnt = elemnt.nextSibling;
                        }
                    }
                    // 如果是子元素， 则一直找到下一个ptr为止
                    if (target.id.substr(0, 3) == 'ctr') {
                        var elemnt = target.nextSibling;
                        while (elemnt) {
                            if (1 === elemnt.nodeType) {
                                if (elemnt.id.substr(0, 3) == "ptr") {
                                    target = elemnt;
                                    elemnt = null;
                                }
                            }
                            elemnt = elemnt && elemnt.nextSibling;
                        }
                    }
                    if (target) {
                        ulInfoList.insertBefore(dragEv, target);
                        siblings.forEach(function(item) {
                            ulInfoList.insertBefore(item, target);
                        })
                    } else {
                        ulInfoList.appendChild(dragEv)
                        siblings.forEach(function(item) {
                            ulInfoList.appendChild(item);
                        })
                    }
                } else { // 移动子节点时需要判断存放的位置是父节点后还是子节点后
                    if (target.id.substr(0, 3) == 'ptr') {
                        var iElem = target.getElementsByTagName('i'),
                            i = 0;
                        for (; i < iElem.length; i++) {

                            if (/(\b| )menu-close(\b| )/.test(iElem[i].className)) {
                                iElem[i].className = iElem[i].className.replace(/(\b| )menu-close(\b| )/, '$1menu-open$2');
                            }
                        }
                        var elemnt = target.nextSibling;
                        if (elemnt) {
                            ulInfoList.insertBefore(dragEv, elemnt);
                        } else {
                            ulInfoList.appendChild(dragEv);
                        }
                        // 展开当前存放容器所属的所有子菜单 
                        while (elemnt) {
                            if (1 === elemnt.nodeType) {
                                if (elemnt.id.substr(0, 3) == "ptr") {
                                    elemnt = null;
                                } else {
                                    elemnt.style.display = '';
                                }
                            }
                            elemnt = elemnt && elemnt.nextSibling;
                        }
                        var id = target.dataset.id;
                        dragEv.dataset.parentid = target.dataset.id;
                    }
                }

                document.getElementById('sortSave').style.display = 'block';
            });
            $('#sortSave').on('click', function() {
                var arr = [];
                $.each($('#ul_infoList tr'), function(index, item) {
                    arr.push([+item.dataset.id, +item.dataset.parentid, ++index]);
                });
                _self.saveSort(arr);
            });
        },
        valiFrom: function() {

            var menuName = $('#menuName').val(),
                menuKey = $('#menuKEY').val(),
                menuUri = $('#menuUri').val(),
                parentId = $('#usersMenuBoxMenuId').val(),
                isMenu = 0,
                descriptor = $('#menuDescriptor').val();
            if ($('#menuIsMenu').is(':checked')) {
                isMenu = 1;

            }
            if (!menuName || menuName.replace(/ +/g, '').length == 0) {
                msgBox.mAlert('菜单名称不能为空');
                return false;
            }
            if (menuName.length > 10) {
                msgBox.mAlert('菜单名称不能超过10个字符');
                return false;
            }
            if (!menuKey || menuKey.replace(/ +/g, '').length == 0) {
                msgBox.mAlert('菜单Key不能为空');
                return false;
            }
            if (menuKey.length > 50) {
                msgBox.mAlert('菜单Key不能超过50个字符');
                return false;
            }
            if (menuUri && menuUri.length > 150) {
                msgBox.mAlert('菜单地址不能超过150个字符');
                return false;
            }
            if (descriptor && descriptor.length > 250) {
                msgBox.mAlert('备注说明不能超过250个字符');
                return false;
            }

            this._data.menuName = menuName;
            this._data.menuKey = menuKey;
            this._data.menuUri = menuUri;
            this._data.descriptor = descriptor;
            this._data.parentId = +parentId;
            this._data.isMenu = +isMenu;
            return true;
        }
    }
    Web.init();
})();