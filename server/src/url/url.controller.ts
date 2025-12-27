import { Controller, Get, NotFoundException, Param, Req, Res } from "@nestjs/common";
import { UrlService } from "./url.service.js";
import * as express from "express";

@Controller('url')
export class UrlController {
    constructor(private urlService: UrlService) {}

    @Get(':shortCode')
    async redirectUrl(
        @Param('shortCode') shortCode: string,
        @Req() req: express.Request,
        @Res() res: express.Response
    ) {
        try {
            const ipAddress = req.ip;
            const userAgent = req.headers['user-agent'];

            const originalUrl = await this.urlService.redirect(shortCode, ipAddress, userAgent);

            return res.redirect(originalUrl);
        } catch (error) {
            throw new NotFoundException('Short URL not found!');
        }
    }

    @Get()
    healthCheck() {
        return { status: "OK", message: "Chutku API is Running!"};
    }
}