import { extname } from 'path'
import { string } from '@ioc:Adonis/Core/Helpers'

class EditFilename{

    public async rename(clientName) {
        const random = string.generateRandom(6)
        const fileExtname = extname(clientName)
        const name = clientName.split('.')[0]
        return name.replace(new RegExp(' ', 'g'), '-')+"-"+random+fileExtname
    }
}

export default new EditFilename