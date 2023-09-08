export default function menuApp(menuDefault, perIds) {
    return (menuDefault.map(menu=>{
        if (perIds.includes(menu.value)) {
            if(!menu.sub) {
                return {
                  label: menu.label,
                  title: menu.title,
                  value: menu.value,
                  sub: false
                }
            } else {
                return {
                    label: menu.label,
                    title: menu.title,
                    value: menu.value,
                    sub: true,
                    children: menu.children.map(child=>{
                        if(!child.sub) {
                            return {
                                label: child.label,
                                title: child.title,
                                value: child.value,
                                sub: false
                            }
                        } else {
                            return {
                                label: child.label,
                                title: child.title,
                                value: child.value,
                                sub: true,
                                children: child.children.map(children=>({
                                    label: children.label,
                                    title: children.title,
                                    value: children.value,
                                    sub: false
                                })).filter(value => value !== undefined)
                            }
                        }
                    }).filter(value => value !== undefined)
                }
            }
        } else {
            if(menu.sub) {
                return {
                    label: menu.label,
                    title: menu.title,
                    value: menu.value,
                    sub: true,
                    children: menu.children.map(child=>{
                        if (perIds.includes(child.value)) {
                            if(!child.sub) {
                                return {
                                    label: child.label,
                                    title: child.title,
                                    value: child.value,
                                    sub: false
                                }
                            } else {
                                return {
                                    label: child.label,
                                    title: child.title,
                                    value: child.value,
                                    sub: true,
                                    children: child.children.map(children=>({
                                        label: children.label,
                                        title: children.title,
                                        value: children.value,
                                        sub: false
                                    })).filter(value => value !== undefined)
                                }
                            }
                        } else {
                            if(child.sub) {
                                return {
                                    label: child.label,
                                    title: child.title,
                                    value: child.value,
                                    sub: true,
                                    children: child.children.map(children=>{
                                        if (perIds.includes(children.value)) {
                                            if(!children.sub) {
                                                return {
                                                    label: children.label,
                                                    title: children.title,
                                                    value: children.value,
                                                    sub: false
                                                }
                                            }
                                        }
                                    }).filter(value => value !== undefined)
                                }
                            }
                        }
                    }).filter(value => value !== undefined)
                }
            }
        }
    }).filter(value => value !== undefined));
}