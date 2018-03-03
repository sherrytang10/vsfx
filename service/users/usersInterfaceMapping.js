module.exports = {
    // userInterfaceAllList: `select ui.id,ui.interfaceName, ui.interfaceName, ui.interfaceUri, concat(group_concat(um.menuName),",") menuName from users_interface ui, users_menu um where find_in_set(um.id, ui.menuIds)`,

    interfaceTypeList: `select interfaceType from users_interface group by interfaceType;`,
    anySave: `insert into users_interface( menuIds,interfaceName, interfaceUri,interfaceType,descriptor, disabled, operaUser, createUser,operaType, createDate,updateDate) values(?,?,?,?,?,?,?,?,'save',now(),now());`,
    anyUpdate: `update users_interface set menuIds=?,interfaceName=?,interfaceUri=?,interfaceType=?,descriptor=?,disabled=?,operaUser=?,operaType='update',updateDate=now() where id =?;`,
    anyPublic: `update users_interface set disabled = 1,operaUser=?,operaType='publish',updateDate=now() where id=?;`,
    anyDisabled: `update users_interface set disabled = 0,operaUser=?,operaType='disabled',updateDate=now() where id=?;`,
    anyDelete: `delete from users_interface where id = ?`
}