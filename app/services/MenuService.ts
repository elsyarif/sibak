import Database from '@ioc:Adonis/Lucid/Database';
import Menu from '../Models/Menu';

class MenuService{

    async assignRoleMenu(){}

    async findAll(){
        const menu = await Menu.all()

        return menu
    }

    async roleMenus(roleId: string){
        const userMenus = await Database.rawQuery(`SELECT m.* FROM role_menus rm
                                                  INNER JOIN menus m on rm.menu_id = m.id
                                                  WHERE m.is_active = TRUE
                                                    AND rm.role_id = ?
                                                    ORDER BY m.sort`, [roleId])

        let mainMenu : any[] = []
        for (let i = 0; i < userMenus.length; i++) {
            mainMenu[userMenus[i].id] = {
                id: userMenus[i].id,
                parent_id: userMenus[i].parent_id,
                title: userMenus[i].title,
                meta_title: userMenus[i].meta_title,
                icon: userMenus[i].icon,
                link: userMenus[i].link,
                sort: userMenus[i].sort
            }
        }

        return this.menuNode(mainMenu, 0)
    }

    //TODO: Maping menu berdasarkan parent id dan menjadikan object
	menuNode(menu: any[], parent: number) {
		const mainMenu: any[] = []

		for (let i = 1; i < menu.length; i++) {
			if (menu[i] == undefined) {
				i++
			}

			if (menu[i] != undefined && menu[i].parent_id === parent) {
                mainMenu.push({
					id: menu[i].id,
					parent_id: menu[i].parent_id,
					title: menu[i].title,
					meta_title: menu[i].meta_title,
					icon: menu[i].icon,
					link: menu[i].link,
					sort: menu[i].sort,
					sub_menu: this.menuNode(menu, i)
				})
			}
		}

		return mainMenu
	}
}

export default new MenuService
