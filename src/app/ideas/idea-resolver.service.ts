import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IdeasService } from './ideas.service';
import { Idea } from './models/idea.model';

@Injectable({
  providedIn: 'root'
})
export class IdeaResolverService implements Resolve<Idea> {

  constructor(private ideaService: IdeasService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Idea | Observable<Idea> | Promise<Idea> {
    const id = route.queryParamMap.get('id');
    if(!id) {
      return undefined;
    }
    
    return this.ideaService.getIdea(id);
  }
}
