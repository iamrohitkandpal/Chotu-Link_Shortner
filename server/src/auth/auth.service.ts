import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';

@Injectable()
export class AuthService {
    // DI: NESTJS AUTo Inject karega services ko idhar
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    // For REGISTER
    async register(input: RegisterInput) {
        const { email, password, name } = input;

        const existingUser = await this.prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new ConflictException("User Already Exists!")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });

        const token = this.generateToken(user.id);

        return { accessToken: token, user };
    }

    // For LOGIN
    async login(input: LoginInput) {
        const { email, password } = input;

        const user = await this.prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw new UnauthorizedException("Invalid Credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid Credentials");
        }

        const token = this.generateToken(user.id);

        return { accessToken: token, user };
    }

    // Helper method to generate JWT token
    private generateToken(userId: string): string {
        const payload = { sub: userId };

        return this.jwtService.sign(payload);
    }

    // Another Helper method to get User by Id
    async getUserById(id: string) {
        return this.prisma.user.findUnique({
            where: { id }
        });
    }
}
