import { Controller, Get, Post, doFormidable } from '../../../@common';
import { PictureService } from '../../../service/function/picture';
import { Picture } from '../../../entity/picture';
const pictureService = new PictureService();
@Controller('/picture')
export class PictureController {
    @Post('/upload')
    async uploadPicture(req, res) {
        let { fileUrl, fileName } = await doFormidable(req, {
            type: 'images',
            reg: /^.*\.(?:jpg|png|jpeg)$/i
        });;
        let picture: Picture = {
            imgUrl: fileUrl,
            alt: fileName.replace(/(\.[^\.]+)$/, '')
        }
        picture.imgUrl = fileUrl;
        pictureService.saveOrUpdateAny(Picture, picture);
        res.sendSuccess(fileUrl);
    }
}