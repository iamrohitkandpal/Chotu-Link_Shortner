import { Controller, Get, NotFoundException, Param, Req, Res } from "@nestjs/common";
import { UrlService } from "./url.service.js";
import * as express from "express";

@Controller()
export class UrlController {
    constructor(private urlService: UrlService) {}

    @Get(':shortCode')
    async redirectUrl(
        @Param('shortCode') shortCode: string,
        @Req() req: express.Request,
        @Res() res: express.Response
    ) {
        const url = await this.urlService.getUrlByCode(shortCode);

        if (!url) {
            throw new NotFoundException('Short URL not Found!');
        }

        this.urlService.trackClick(url.id, req.ip, req.headers['user-agent'])
            .catch(err => console.error('Click tracking failed: ', err));

        return res.redirect(url.originalUrl);
    }

    @Get()
    healthCheck() {
        return { status: "OK", message: "Chutku API is Running!"};
    }
}