import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { IdeasService } from '../ideas.service';

@Component({
  selector: 'app-new-idea',
  templateUrl: './new-idea.component.html',
  styleUrls: ['./new-idea.component.scss']
})
export class NewIdeaComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  isEditing = false;
  ideaId: string;

  constructor(private ideaService: IdeasService, private router : Router, private snackBar : MatSnackBar, private activateRoute : ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.activateRoute.data.subscribe(data => {
      const idea = data.idea;
      this.isEditing = !!idea;
      if(this.isEditing) {
        this.ideaId = idea.id;
        this.form.setValue({
          name: idea.name,
          description: idea.description
        });
      } else {
        this.form.reset();
      }
    });
   }

  ngOnInit(): void {
  }

  submitted(){
    this.isLoading = true;
    const data = this.form.value;

    const request = this.isEditing 
      ? this.ideaService.updateIdea(this.ideaId, data.name, data.description)
      : this.ideaService.createIdea(data.name, data.description);

    request
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        () => this.router.navigateByUrl('/ideas'),
        () => this.snackBar.open('An error occured submit','Ok',{duration: 5000})
      );
  }
}
