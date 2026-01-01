import { Injectable, NotFoundException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUrlInput } from './dto/create-url.input.js';

@Injectable()
export class UrlService {
    constructor(private prisma: PrismaService) { }

    // To generate a short code of 6 chars
    private generateShortCode(): string {
        return nanoid(6);
    }

    // To create a short url
    async createUrl(userId: string, input: CreateUrlInput) {
        let shortCode = this.generateShortCode();

        while (await this.prisma.url.findUnique({ where: { shortCode } })) {
            shortCode = this.generateShortCode();
        }

        return this.prisma.url.create({
            data: {
                shortCode,
                originalUrl: input.originalUrl,
                userId,
            },
            include: { user: true }
        });
    }

    // To get a user's URLs
    async getUserUrls(userId: string) {
        return this.prisma.url.findMany({
            where: { userId },
            include: {
                user: true,
                _count: { select: { clicks: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    // To get URL by short code (no click tracking)
    async getUrlByCode(shortCode: string) {
        return this.prisma.url.findUnique({
            where: { shortCode },
        });
    }

    // To click separately (fire and forget)
    async trackClick(urlId: string, ipAddress?: string, userAgent?: string) {
        return await this.prisma.click.create({
            data: {
                urlId,
                ipAddress,
                userAgent,
            }
        });
    }

    // To delete the url 
    async deleteUrl(userId: string, urlId: string) {
        const url = await this.prisma.url.findFirst({
            where: { id: urlId, userId }
        });

        if (!url) {
            throw new NotFoundException('URL not found!');
        }

        await this.prisma.url.delete({ where: { id: urlId } });
        return true;
    }
}
