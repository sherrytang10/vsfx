import { Controller, Get, Post, Validation } from '../../../lib/@common';
import { PictureService } from '../../../service/function/picture';
import { doFormidable } from '../../../lib/utils/upload';

@Controller('/picture')
export class PictureController {
    @Post('/upload')
    async uploadPicture(req, res) {
        let { fileUrl, fileName } = await doFormidable(req, {
            type: 'images',
            reg: /^.*\.(?:jpg|png|jpeg)$/i
        });;
        let picture = {
            imgUrl: fileUrl,
            alt: fileName.replace(/(\.[^\.]+)$/, '')
        }
        picture.imgUrl = fileUrl;
        PictureService.saveAny('picture', picture);
        res.sendSuccess(fileUrl);
    }
}