import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdeaResolverService } from './idea-resolver.service';
import { IdeaComponent } from './idea/idea.component';
import { ListIdeasComponent } from './list-ideas/list-ideas.component';
import { NewIdeaComponent } from './new-idea/new-idea.component';

const routes: Routes = [
  {
    path: '',
    component: ListIdeasComponent
  },
  {
    path: 'new',
    resolve: {idea: IdeaResolverService},
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    component: NewIdeaComponent
  },
  {
    path: ':id',
    component: IdeaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdeasRoutingModule { }
