import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeasService } from '../ideas.service';
import { Idea } from '../models/idea.model';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.scss']
})
export class IdeaComponent implements OnInit {
  id: string;
  idea: Idea = null;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private ideasService: IdeasService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.ideasService.getIdea(this.id).subscribe(
        (res) => this.idea = res
      );
    });
  }

  vote(upvote : boolean) {
    this.router.navigateByUrl('/ideas');
  }
}
