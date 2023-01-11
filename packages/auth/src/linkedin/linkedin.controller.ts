import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '@gauzy/common';
import { SocialAuthService } from './../social-auth.service';
import { IIncomingRequest, RequestCtx } from './../request-context.decorator';

@Controller('linkedin')
@Public()
export class LinkedinController {
	constructor(public readonly service: SocialAuthService) {}

	@Get('')
	@UseGuards(AuthGuard('linkedin'))
	linkedinLogin(@Req() req: any) {}

	@Get('callback')
	@UseGuards(AuthGuard('linkedin'))
	async linkedinLoginCallback(
		@RequestCtx() requestCtx: IIncomingRequest,
		@Res() res
	) {
		const { user } = requestCtx;
		const {
			success,
			authData
		} = await this.service.validateOAuthLoginEmail(user.emails);
		return this.service.routeRedirect(success, authData, res);
	}
}
