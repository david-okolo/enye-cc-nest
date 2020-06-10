import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {

    constructor(
        private profileService: ProfileService
    ) {}

    @UseGuards(JwtGuard)
    @Get()
    async getProfile(@Request() req) {
        return await this.profileService.getProfileData(req.user.userId)
    }
}
