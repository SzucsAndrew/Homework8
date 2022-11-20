import { Component, OnInit } from '@angular/core';
import { IdeasService } from '../ideas.service';
import { Idea } from '../models/idea.model';

@Component({
  selector: 'app-list-ideas',
  templateUrl: './list-ideas.component.html',
  styleUrls: ['./list-ideas.component.scss']
})
export class ListIdeasComponent implements OnInit {
  ideas: Idea[] = [];
  constructor(private ideasService: IdeasService) { }

  ngOnInit(): void {
    this.listIdeas();
  }

  listIdeas() {
    this.ideasService.listIdeas().subscribe(ideas => this.ideas = ideas);
  }

  upvote(idea: Idea){
    this.ideasService.upvoteIdea(idea).subscribe(() => this.listIdeas());
  }

  downvote(idea: Idea){
    this.ideasService.downvoteIdea(idea).subscribe(() => this.listIdeas());
  }

  deleteIdea(idea: Idea){
    this.ideasService.deleteIdea(idea).subscribe(() => this.listIdeas());
  }
}
