import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IdeasService } from '../ideas.service';
import { Idea } from '../models/idea.model';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  @Input() idea!: Idea;
  @Output() vote = new EventEmitter<boolean>();

  constructor(private ideasService : IdeasService) { }

  ngOnInit(): void {
  }

  upvote() {
    this.ideasService.upvoteIdea(this.idea)
      .subscribe(() => this.vote.emit(true));
  }

  downvote() {
    this.ideasService.downvoteIdea(this.idea)
      .subscribe(() => this.vote.emit(false));
  }

}
