import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGaurd } from '@nestjs/passport';
import { PUBLIC_METHOD_METADATA } from '@gauzy/common';

@Injectable()
export class AuthGuard extends PassportAuthGaurd('jwt') {
	constructor(
		private readonly _reflector: Reflector
	) {
		super();
	}

	canActivate(context: ExecutionContext) {

		/*
		* PUBLIC decorator method level
		*/
		const isMethodPublic = this._reflector.get<boolean>(
			PUBLIC_METHOD_METADATA,
			context.getHandler()
		);

		/*
		* PUBLIC decorator class level
		*/
		const isClassPublic = this._reflector.get<boolean>(
			PUBLIC_METHOD_METADATA,
			context.getClass()
		);

		/*
		* IF methods/class are publics allowed them
		*/
		if (isMethodPublic || isClassPublic) {
			return true;
		}

		// Make sure to check the authorization, for now, just return false to have a difference between public routes.
		return super.canActivate(context);
	}
}