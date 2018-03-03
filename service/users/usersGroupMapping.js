module.exports = {
    usersGroupUpdateMenu: `update users_group set menuIds = ?,operaUser=?,operaType='update',updateDate=now() where id = ?`,
    usersGroupUpdateInterface: `update users_group set interfaceIds = ?,operaUser=?,operaType='update',updateDate=now() where id = ?`,
    userGroupList: `select  id,groupName, menuIds, interfaceIds from users_group where 1 = 1`,

    anySave: `insert into users_group(groupName, operaUser, createUser,operaType, createDate,updateDate) values(?,?,?,'save',now(),now())`,
    // anySave: `insert into users_group(groupName, menuIds, interfaceIds, disabled, operaUser, createUser,operaType, createDate,updateDate) values(?,?,?,?,?,?,'save',now(),now())`,
    anyUpdate: `update users_group set groupName=?,operaUser=?,operaType='update',updateDate=now() where id =?`,
    // anyUpdate: `update users_group set groupName=?,menuIds=?,interfaceIds=?,disabled=?,operaUser=?,operaType='update',updateDate=now() where id =?`,
    anyPublic: `update users_group set disabled = 1,operaUser=?,operaType='publish',updateDate=now() where id=?`,
    anyDisabled: `update users_group set disabled = 0,operaUser=?,operaType='disabled',updateDate=now() where id=?`,
    anyDelete: `delete from users_group where id = ?`
}