import { NgModule } from '@angular/core';
import {
	NbIconModule,
	NbButtonModule,
	NbCardModule,
	NbInputModule,
	NbRadioModule,
	NbAccordionModule
} from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidateInterviewFeedbackComponent } from './candidate-interview-feedback.component';
import { StarRatingInputModule } from '../../star-rating/star-rating-input/star-rating-input.module';
import { CandidateSelectModule } from '../candidate-select/candidate-select.module';
import { CandidatePersonalQualitiesService } from '../../../@core/services/candidate-personal-qualities.service';
import { CandidateTechnologiesService } from '../../../@core/services/candidate-technologies.service';
import { StarRatingOutputModule } from '../../star-rating/star-rating-output/star-rating-output.module';
import { CandidateCriterionsRatingService } from '../../../@core/services/candidate-criterions-rating.service';
import { TranslateModule } from '../../translate/translate.module';

@NgModule({
	imports: [
		ThemeModule,
		FormsModule,
		NbCardModule,
		ReactiveFormsModule,
		ThemeModule,
		NbInputModule,
		NbButtonModule,
		NbRadioModule,
		NbIconModule,
		StarRatingInputModule,
		StarRatingOutputModule,
		CandidateSelectModule,
		NbAccordionModule,
		TranslateModule
	],
	exports: [CandidateInterviewFeedbackComponent],
	declarations: [CandidateInterviewFeedbackComponent],
	providers: [
		CandidateTechnologiesService,
		CandidatePersonalQualitiesService,
		CandidateCriterionsRatingService
	]
})
export class CandidateInterviewFeedbackModule {}
