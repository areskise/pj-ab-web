export default function menuApp(menuDefault, perIds) {
    let menu = []
    let mainMenu = menuDefault.find(menu => menu.title==='main')
    let organizationMenu = menuDefault.find(menu => menu.title==='manage-organization')
    let userMenu = menuDefault.find(menu => menu.title==='manage-user')
    let staffMenu = userMenu.children.find(menu => menu.title==='staff')
    let addStaff = staffMenu.children.find(menu => menu.title==='add')
    let updateStaff = staffMenu.children.find(menu => menu.title==='update')
    let customerMenu = userMenu.children.find(menu => menu.title==='customer')
    let addCustomer = customerMenu.children.find(menu => menu.title==='add')
    let updateCustomer = customerMenu.children.find(menu => menu.title==='update')
    let huiMenu = menuDefault.find(menu => menu.title==='manage-hui')
    let hui = huiMenu.children.find(menu => menu.title==='manage-hui')
    let report = huiMenu.children.find(menu => menu.title==='report')
    if(perIds.includes(mainMenu.value)) {
        menu.push(mainMenu)
    }
    if(perIds.includes(organizationMenu.value)) {
        menu.push(organizationMenu)
    }
    if(perIds.includes(userMenu.value)) {
        menu.push(userMenu)
    } else { 
        if(perIds.includes(staffMenu.value) && !perIds.includes(customerMenu.value)) {
            if(!perIds.includes(addCustomer.value) && perIds.includes(updateCustomer.value)) {
                customerMenu = {
                    "label": "Khách hàng",
                    "title": "customer",
                    "value": "646f8ad04e4fb00d95ee26ae",
                    "sub": true,
                    "children": [updateCustomer]
                }
                userMenu = {
                    "label": "Quản lý người dùng",
                    "title": "manage-user",
                    "value": "646f8a5a4e4fb00d95ee26aa",
                    "sub": true,
                    "children": [staffMenu,customerMenu]
                }
                menu.push(userMenu)
            } else if(perIds.includes(addCustomer.value) && !perIds.includes(updateCustomer.value)) {
                customerMenu = {
                    "label": "Khách hàng",
                    "title": "customer",
                    "value": "646f8ad04e4fb00d95ee26ae",
                    "sub": true,
                    "children": [addCustomer]
                }
                userMenu = {
                    "label": "Quản lý người dùng",
                    "title": "manage-user",
                    "value": "646f8a5a4e4fb00d95ee26aa",
                    "sub": true,
                    "children": [staffMenu,customerMenu]
                }
                menu.push(userMenu)
            } else {
                userMenu = {
                    "label": "Quản lý người dùng",
                    "title": "manage-user",
                    "value": "646f8a5a4e4fb00d95ee26aa",
                    "sub": true,
                    "children": [staffMenu]
                }
                menu.push(userMenu)
            }
        } else if(!perIds.includes(staffMenu.value) && perIds.includes(customerMenu.value)) {
            if(perIds.includes(addStaff.value) && !perIds.includes(updateStaff.value)) {
                staffMenu = {
                    "label": "Nhân viên",
                    "title": "staff",
                    "value": "646f8a924e4fb00d95ee26ac",
                    "sub": true,
                    "children": [addStaff]
                }
                userMenu = {
                    "label": "Quản lý người dùng",
                    "title": "manage-user",
                    "value": "646f8a5a4e4fb00d95ee26aa",
                    "sub": true,
                    "children": [staffMenu,customerMenu]
                }
            } else if(!perIds.includes(addStaff.value) && perIds.includes(updateStaff.value)) {
                staffMenu = {
                    "label": "Nhân viên",
                    "title": "staff",
                    "value": "646f8a924e4fb00d95ee26ac",
                    "sub": true,
                    "children": [updateStaff]
                }
                userMenu = {
                    "label": "Quản lý người dùng",
                    "title": "manage-user",
                    "value": "646f8a5a4e4fb00d95ee26aa",
                    "sub": true,
                    "children": [staffMenu,customerMenu]
                }
            } else {
                userMenu = {
                    "label": "Quản lý người dùng",
                    "title": "manage-user",
                    "value": "646f8a5a4e4fb00d95ee26aa",
                    "sub": true,
                    "children": [customerMenu]
                }
            }
            menu.push(userMenu)
        } else if(!perIds.includes(staffMenu.value) && !perIds.includes(customerMenu.value)) {
            userMenu = {
                "label": "Quản lý người dùng",
                "title": "manage-user",
                "value": "646f8a5a4e4fb00d95ee26aa",
                "sub": true,
                "children": []
            }
            if(!perIds.includes(addStaff.value) && perIds.includes(updateStaff.value)) {
                staffMenu = {
                    "label": "Nhân viên",
                    "title": "staff",
                    "value": "646f8a924e4fb00d95ee26ac",
                    "sub": true,
                    "children": [updateStaff]
                }
                userMenu.children.push(staffMenu)
            } else if(perIds.includes(addStaff.value) && !perIds.includes(updateStaff.value)) {
                staffMenu = {
                    "label": "Nhân viên",
                    "title": "staff",
                    "value": "646f8a924e4fb00d95ee26ac",
                    "sub": true,
                    "children": [addStaff]
                }
                userMenu.children.push(staffMenu)
            } 
            if(!perIds.includes(addCustomer.value) && perIds.includes(updateCustomer.value)) {
                customerMenu = {
                    "label": "Khách hàng",
                    "title": "customer",
                    "value": "646f8ad04e4fb00d95ee26ae",
                    "sub": true,
                    "children": [updateCustomer]
                }
                userMenu.children.push(customerMenu)
            } else if(perIds.includes(addCustomer.value) && !perIds.includes(updateCustomer.value)) {
                customerMenu = {
                    "label": "Khách hàng",
                    "title": "customer",
                    "value": "646f8ad04e4fb00d95ee26ae",
                    "sub": true,
                    "children": [addCustomer]
                }
                userMenu.children.push(customerMenu)
            }
            menu.push(userMenu)
        }
    }
    if(perIds.includes(huiMenu.value)) {
        menu.push(huiMenu)
    } else {
        if(perIds.includes(hui.value) && !perIds.includes(report.value)) {
            huiMenu = {
                "label": "Quản lý hụi",
                "title": "manage-hui",
                "value": "6478a3238cf76c1e8a41e7fe",
                "sub": true,
                "children": [hui]
            }
            menu.push(huiMenu)
        }
        if(!perIds.includes(hui.value) && perIds.includes(report.value)) {
            huiMenu = {
                "label": "Quản lý hụi",
                "title": "manage-hui",
                "value": "6478a3238cf76c1e8a41e7fe",
                "sub": true,
                "children": [report]
            }
            menu.push(huiMenu)
        }
    }
    return menu
}